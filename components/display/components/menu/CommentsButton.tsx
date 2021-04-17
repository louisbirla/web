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
import { isToday, formatDistance, isYesterday, format } from "date-fns"
import { User } from "../../../user/userAtom"
import { StarIcon } from "@chakra-ui/icons"
import { ComponentObject, DisplayObject } from "display-api"
import { ComponentDelegate } from "../../ComponentDelegate"
import { RichTextEditor } from "../richtext/RichText"
import { Text as SlateText } from "slate"
import { slateTextToComponent } from "../richtext/slateDisplayConversion"

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

export const useCommentsButton = (blockId: number): [JSX.Element, () => void, RefObject<any>] => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef: RefObject<any> = useRef()

	const [commentsResponse] = useQuery<BlockResult, BlockRequest>({
		query: GET_BLOCK_COMMENTS,
		variables: { id: blockId },
	})
	const comments = commentsResponse.data?.blockById.comments

	const [, setStarred] = useMutation<SetStarredResult, SetStarredVars>(SetStarredQuery)
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

	const renderCommentItem = (comment: Comment) => {
		const displayName = comment.author.displayName || comment.author.username
		let timing = ""
		if (comment.createdAt) {
			let date = new Date(comment.createdAt)
			if (isToday(date)) {
				timing = `Today, ${formatDistance(date, new Date(), { addSuffix: true, includeSeconds: true })}`
			} else if (isYesterday(date)) {
				timing = `Yesterday, at ${format(date, "p")}`
			} else {
				timing = format(date, "PP', at 'p")
			}
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
									<MenuItem>
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
					<Flex width='100%' ml='12' fontSize='xs'>
						{renderCommentContent(comment)}
					</Flex>
					{comment.block.commentsCount > 0 && <Button>{`${comment.block.commentsCount} replies`}</Button>}
				</ListItem>
				<Divider />
			</>
		)
	}

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
					<DrawerHeader>Comments</DrawerHeader>
					<DrawerBody>
						{comments?.length === 0 ? (
							<Text>No comments found!</Text>
						) : (
							<List>{comments && comments.map((comment: Comment) => renderCommentItem(comment))}</List>
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
							justifyContent='flex-end'
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
