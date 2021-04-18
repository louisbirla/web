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
import { Avatar, Button, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Box } from "@chakra-ui/react"
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
					starCount
					pageDisplay
					embedDisplay
					commentsCount
				}
			}
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

const SetCommentStarred = gql`
	mutation($commentId: Int!, $starred: Boolean!) {
		setCommentStarred(commentId: $commentId, starred: $starred) {
			id
			starCount
			starred
		}
	}
`

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
	starCount: number
	block: Block
	createdAt: string
}

export type BlockResult = { blockById: { comments: Array<Comment> } }
export type BlockRequest = { id: number }

export type CreateBlockResult = { createBlock: { id: number } }
export type CreateBlockArgs = { type: string; input: string }

export type CreateCommentResult = { createComment: Comment }
export type CreateCommentArgs = { blockId: number; contentId: number }

export type CommentStarredResult = { setCommentStarred: { id: number; starCount: number; starred: boolean } }
export type CommentStarredArgs = { commentId: number; starred: boolean }

export const useCommentsButton = (blockId: number, comment?: Comment): [JSX.Element, () => void, RefObject<any>] => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef: RefObject<any> = useRef()

	const [commentsResponse] = useQuery<BlockResult, BlockRequest>({
		query: GET_BLOCK_COMMENTS,
		variables: { id: blockId }
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
						//TODO: this is broken when used with enter key
						doSetValue(initialValue)
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
					<DrawerHeader>{comment ? 'Thread' : 'Comments'}</DrawerHeader>
					{comment &&
						<Box p='4' boxShadow='xl' pt='6' pb='4' bgColor='#F5F5F5'>
							<RenderCommentItem comment={comment} isPreview={true} />
						</Box>
					}
					<DrawerBody>
						{comments?.length === 0 ? (
							<Text>No comments found!</Text>
						) : (
							<List>
								{comments && comments.map((comment: Comment) => {
									return <>
										<ListItem pt='6' pb='4'>
											<RenderCommentItem comment={comment} />
										</ListItem>
										<Divider />
									</>
								})}
							</List>
						)}
					</DrawerBody>
					<DrawerFooter borderTop='1px' borderColor='#DCDCDC'>
						<RichTextEditor
							value={value}
							setValue={doSetValue}
							editable={true}
							onEnter={() => {
								// onEnter()
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

export const RenderCommentItem: React.FC<{ comment: Comment, isPreview?: boolean }> = ({ comment, isPreview }) => {
	const [commentDrawer, openCommentDrawer, btnCommentRef] = useCommentsButton(comment.block.id, comment)
	const [, setCommentStarred] = useMutation<CommentStarredResult, CommentStarredArgs>(SetCommentStarred)

	const displayName = comment.author.displayName || comment.author.username
	let timing = ""
	if (comment.createdAt) {
		timing = getFormattedTime(comment.createdAt)
	}

	const handleStarring = () => {
		const request: CommentStarredArgs = { commentId: comment.id, starred: !comment.starred }
		setCommentStarred(request)
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
					<Button variant='link' onClick={handleStarring} aria-label='Toggle star status'>
						<HStack>
							{comment.starred ? <StarIcon color='#FFCA7A' /> : <Icon color='#FFCA7A' as={Star} size={17} />}
							<Text color='#A0A0A0' fontSize='11'>
								{`${comment.starCount} stars`}
							</Text>
						</HStack>
					</Button>
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
						</MenuList>
					</Menu>
				</HStack>
			</Flex>
			<Flex ml='12' mb={2} fontSize='xs'>
				{renderCommentContent(comment)}
			</Flex>
			{comment.block.commentsCount > 0 && (
				<Button disabled={isPreview} ref={btnCommentRef} onClick={openCommentDrawer} ml='12' size='xs' variant='link'>
					{`${comment.block.commentsCount} ${comment.block.commentsCount === 1 ? "reply" : "replies"}`}
				</Button>
			)}
			{ commentDrawer}
		</>
	)
}