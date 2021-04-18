import { useDisclosure } from "@chakra-ui/hooks"
import { Divider, Flex, HStack, List, ListItem, Spacer, Text } from "@chakra-ui/layout"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/modal"
import { RefObject, useRef, useState } from "react"
import { gql, useMutation, useQuery } from "urql"
import { Avatar, Button, Icon, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/react"
import { MoreHorizontal, Send, Star } from "react-feather"
import { User } from "../../../user/userAtom"
import { StarIcon } from "@chakra-ui/icons"
import { ComponentObject, DisplayObject } from "display-api"
import { ComponentDelegate } from "../../ComponentDelegate"
import { RichTextEditor } from "../richtext/RichText"
import { Text as SlateText } from "slate"
import { slateTextToComponent } from "../richtext/slateDisplayConversion"
import { getFormattedTime } from "../../../../utils/helper"

export const GET_BLOCK_COMMENTS = gql`
	query($id: Int!) {
		blockById(id: $id) {
			comments {
				id
				createdAt
				starred
				starCount
				author {
					displayName
					username
				}
				block {
					id
					type
					starred
					pageDisplay
					embedDisplay
					commentsCount
				}
			}
		}
	}
`

export const SetStarredQuery = gql`
	mutation($blockId: Int!, $starred: Boolean!) {
		setStarred(blockId: $blockId, starred: $starred) {
			id
		}
	}
`

const CreateBlockQuery = gql`
	mutation($type: String!, $input: String!) {
		createBlock(type: $type, input: $input) {
			id
		}
	}
`

const CreateCommentQuery = gql`
	mutation($blockId: Int!, $contentId: Int!) {
		createComment(blockId: $blockId, contentId: $contentId) {
			id
			createdAt
			starCount
			author {
				displayName
				username
			}
		}
	}
`

export type SetStarredResult = { setStarred: { id: number } }
export type SetStarredVars = { blockId: number; starred: boolean }

export type Block = {
	id: number
	pageDisplay: string
	embedDisplay: string
	starred: boolean
	starCount: number
	commentsCount: number
	type: string
}

export type Comment = {
	id: number
	author: User
	starred: boolean
	starredCount: number
	block: Block
	createdAt: string
}

export type BlockResult = { blockById: { comments: Array<Comment> } }
export type BlockRequest = { id: number }

export type CreateBlockResult = { createBlock: { id: number } }
export type CreateBlockArgs = { type: string; input: string }

export type CreateCommentResult = { createComment: Comment }
export type CreateCommentArgs = { blockId: number; contentId: number }

export const useCommentsButton = (blockId: number, title?: string): [JSX.Element, () => void, RefObject<any>] => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef: RefObject<any> = useRef()

	const [commentsResponse] = useQuery<BlockResult, BlockRequest>({
		query: GET_BLOCK_COMMENTS,
		variables: { id: blockId },
	})
	const comments = commentsResponse.data?.blockById.comments

	const initialValue = [
		{
			text: "",
		},
	]
	let [value, doSetValue] = useState<SlateText[]>(initialValue)

	const [createBlockResponse, createBlockMut] = useMutation<CreateBlockResult, CreateBlockArgs>(CreateBlockQuery)
	const [createCommentResponse, createCommentMut] = useMutation<CreateCommentResult, CreateCommentArgs>(
		CreateCommentQuery,
	)

	const onEnter = async () => {
		let cval = value.map(slateTextToComponent)
		const content = { content: cval }
		const input = JSON.stringify(content)
		const type = "text"
		createBlockMut({
			type,
			input,
		}).then((res) => {
			const contentId = res.data?.createBlock?.id
			if (contentId) {
				createCommentMut({ blockId, contentId }).then((res) => {
					if (res.data?.createComment?.id) {
						//TODO: this is not working
						//doSetValue(initialValue)
					}
				})
			}
		})
	}

	const drawer = (
		<Drawer size='md' isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{title ? title : "Comments"}</DrawerHeader>
					<DrawerBody>
						{comments?.length === 0 ? (
							<Text>No comments found!</Text>
						) : (
							<List>{comments && comments.map((comment: Comment) => <RenderCommentItem comment={comment} />)}</List>
						)}
					</DrawerBody>
					<DrawerFooter borderTop='1px' borderColor='#DCDCDC'>
						<RichTextEditor
							value={value}
							setValue={doSetValue}
							editable={true}
							onEnter={() => {
								onEnter()
							}}
						/>
						<Spacer />
						<IconButton
							isLoading={createBlockResponse.fetching || createCommentResponse.fetching}
							disabled={value.length == 0 || value[0].text == ""}
							color='#5E5E5E'
							onClick={() => onEnter()}
							size='sm'
							aria-label='Enter comment'
							icon={<Send size={20} />}
							variant='ghost'
						/>
					</DrawerFooter>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	)
	return [drawer, onOpen, btnRef]
}

export const RenderCommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
	const [, setStarred] = useMutation<SetStarredResult, SetStarredVars>(SetStarredQuery)
	const [commentDrawer, openCommentDrawer, btnCommentRef] = useCommentsButton(comment.block.id, "Threads")

	const displayName = comment.author.displayName || comment.author.username
	let timing = ""
	if (comment.createdAt) {
		timing = getFormattedTime(comment.createdAt)
	}

	const renderCommentContent = (comment: Comment) => {
		let display: ComponentObject
		if (comment.block.type === "text" || comment.block.type === "data") {
			const displayObject: DisplayObject = comment.block?.pageDisplay && JSON.parse(comment.block.pageDisplay)
			display = displayObject.display
			if (display.cid === "richtext") {
				display.args.editable = false
			}
		} else {
			display = comment.block?.embedDisplay && JSON.parse(comment.block.embedDisplay)
		}
		return <ComponentDelegate component={display} />
	}

	return (
		<>
			<ListItem pt='4' pb='4'>
				<Flex width='100%' justifyContent='space-between' align='flex-start'>
					<Flex alignItems='center'>
						<HStack spacing={4} align='flex-start'>
							<Avatar size='sm' name={displayName} />
							<Text color='#333333' fontSize='xs' fontWeight='bold'>
								{displayName}
							</Text>
							<Text color='#7C7C7C' fontSize='xs'>
								{timing}
							</Text>
						</HStack>
					</Flex>
					<HStack>
						{comment.block.starred ? (
							<StarIcon
								onClick={() => setStarred({ starred: !comment.block.starred, blockId: comment.block.id })}
								size='16'
								color='#FFCA7A'
							/>
						) : (
							<Icon
								as={Star}
								onClick={() => setStarred({ starred: !comment.block.starred, blockId: comment.block.id })}
								size='16'
								color='#FFCA7A'
							/>
						)}
						<Text color='#7C7C7C' fontSize='xs'>
							{comment.starredCount > 0 && `${comment.starredCount} stars`}
						</Text>
						<Menu closeOnSelect={false} size='xs'>
							<MenuButton
								as={IconButton}
								size='xs'
								aria-label='Menu'
								icon={<MoreHorizontal size='16' />}
								color='#b3cddb'
								variant='nostyle'
							/>
							<MenuList>
								<MenuItem ref={btnCommentRef} onClick={openCommentDrawer}>
									<Text fontSize='15'>Reply</Text>
								</MenuItem>
								<MenuDivider ml='3' mr='3' />
								<MenuItem>
									<Text fontSize='15'>Pin</Text>
								</MenuItem>
								<MenuDivider ml='3' mr='3' />
								<MenuItem>
									<Text fontSize='15'>Delete</Text>
								</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</Flex>
				<Flex ml='12' mb={2} fontSize='xs'>
					{renderCommentContent(comment)}
				</Flex>
				{comment.block.commentsCount > 0 && (
					<Button ref={btnCommentRef} onClick={openCommentDrawer} ml='12' size='xs' variant='link'>{`${
						comment.block.commentsCount
					} ${comment.block.commentsCount === 1 ? "reply" : "replies"}`}</Button>
				)}
			</ListItem>
			<Divider />
			{commentDrawer}
		</>
	)
}
