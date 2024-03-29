import { StarIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Flex, Heading, Icon, Spinner, Text, Tooltip, useToast, VStack } from "@chakra-ui/react"
import { Edit, Star } from "react-feather"
import { gql, useMutation, useQuery } from "urql"
import { ComponentDelegate } from "../display/ComponentDelegate"
import { useStarButton } from "../display/components/menu/StarButton"
import { useAtom } from "jotai"
import { userAtom } from "./userAtom"
import { EditableDisplayName } from "./DisplayName"
import { useChangeUsername } from "./ChangeUsername"
import { useChangePassword } from "./ChangePassword"
import { useChangeEmail } from "./changeEmail"
import { SearchComponentWrapper } from "../display/components/Search"

const UserPageQuery = gql`
	query($username: String!) {
		userByName(username: $username) {
			id
			displayName
			username
			email
			featured {
				id
				embedDisplay
				starred
				starCount
			}
		}
	}
`

type UserPageQueryResult = {
	userByName?: {
		id: number
		username: string
		displayName?: string
		email?: string
		featured?: {
			id: number
			embedDisplay: string
			starCount: number
			starred: boolean
		}
	}
}
type UserPageQueryVars = { username: string }

const SET_SPECIAL_BLOCK = gql`
	mutation($blockId: Int!, $type: String!) {
		setSpecialBlock(blockId: $blockId, type: $type) {
			id
		}
	}
`
type SetSpecialBlockResult = { setSpecialBlock: { id: number } }
type SetSpecialBlockRequest = { blockId: number; type: string }

const REMOVE_SPECIAL_BLOCK = gql`
	mutation($type: String!) {
		removeSpecialBlock(type: $type) {
			id
		}
	}
`
type RemoveSpecialBlockResult = { removeSpecialBlock: { id: number } }
type RemoveSpecialBlockRequest = { type: string }

export const UserPage: React.FC<{ username: string }> = ({ username }) => {
	const [res, refetch] = useQuery<UserPageQueryResult | undefined, UserPageQueryVars>({
		query: UserPageQuery,
		variables: { username },
	})
	const [, setSpecialBlock] = useMutation<SetSpecialBlockResult, SetSpecialBlockRequest>(SET_SPECIAL_BLOCK)
	const [, removeSpecialBlock] = useMutation<RemoveSpecialBlockResult, RemoveSpecialBlockRequest>(REMOVE_SPECIAL_BLOCK)

	const [star] = useStarButton(
		res.data?.userByName?.featured?.id ?? 0,
		res.data?.userByName?.featured?.starred ?? false,
	)
	const [logged] = useAtom(userAtom)
	const changeUsername = useChangeUsername()
	const changeEmail = useChangeEmail()
	const changePassword = useChangePassword()

	const toast = useToast()

	const handleRemoveFeatureBlock = () => {
		const request: RemoveSpecialBlockRequest = { type: "FEATURED" }
		removeSpecialBlock(request)
	}

	if (res.data?.userByName) {
		let user = res.data.userByName
		let displayName = user.displayName || user.username
		return (
			<Box>
				<Flex px={20} py={5} bg='white' width='100vw' alignItems='center'>
					<Avatar mr={20} size='2xl' name={displayName} />
					<Box>
						{logged?.id === user.id ? (
							<EditableDisplayName after={refetch} name={displayName} />
						) : (
							<Heading as='h2' fontWeight='bold' fontSize='3xl'>
								{displayName}
							</Heading>
						)}
						<Text>
							{logged?.id === user.id ? (
								<Button
									variant='link'
									fontSize='md'
									fontWeight='normal'
									color='#393939'
									onClick={() => {
										changeUsername().then((username) => {
											location.href = `/u/${username}`
										})
									}}
								>
									@{user.username}{" "}
								</Button>
							) : (
								`@${user.username} `
							)}
							{user.featured ? (
								<Tooltip label={user.featured.starred ? "Unstar User" : "Star User"} hasArrow>
									<Button
										variant='ghost'
										size='xs'
										onClick={() => star().then(() => refetch())}
										leftIcon={
											user.featured.starred ? (
												<StarIcon mb={0.6} color='#ffca7a' />
											) : (
												<Icon color='#ffca7a' mb={0.6} as={Star} size={17} />
											)
										}
									>
										{user.featured.starCount} star{user.featured.starCount === 1 ? "" : "s"}
									</Button>
								</Tooltip>
							) : (
								<Button
									isDisabled
									variant='ghost'
									size='xs'
									leftIcon={<Icon color='#ffca7a' mb={0.6} as={Star} size={17} />}
								>
									0 stars
								</Button>
							)}
						</Text>
						<Text>
							{logged?.id === user.id && (
								<Button
									variant='link'
									fontSize='md'
									fontWeight='normal'
									color='#393939'
									onClick={() => {
										changeEmail().then((email) => {
											toast({
												title: "Email Updated",
												description: `Email successfully updated for ${email}`,
												status: "success",
												duration: 3000,
												isClosable: true,
											})
										})
									}}
								>
									{user.email ?? "Add Email"}
								</Button>
							)}
						</Text>
						{logged?.id === user.id && (
							<Button
								variant='link'
								size='sm'
								color='#393939'
								onClick={() =>
									changePassword().then((username) => {
										toast({
											title: "Password Updated",
											description: `Password successfully updated for ${username}`,
											status: "success",
											duration: 3000,
											isClosable: true,
										})
									})
								}
								leftIcon={<Icon color='#ffca7a' as={Edit} />}
							>
								Change Password
							</Button>
						)}
					</Box>
				</Flex>
				<Box mt={5} textAlign='center'>
					{user.featured ? (
						<>
							<Text fontWeight='bold' fontSize='2xl'>
								Featured block
							</Text>
							<VStack>
								<ComponentDelegate component={JSON.parse(user.featured.embedDisplay)} />
								<Button
									justifyContent='flex-end'
									colorScheme='blue'
									variant='solid'
									onClick={() => handleRemoveFeatureBlock()}
								>
									Remove
								</Button>
							</VStack>
						</>
					) : (
						<>
							<Text fontWeight='bold' fontSize='2xl'>
								{displayName} has no featured block
							</Text>
							<SearchComponentWrapper
								component={{ cid: "search", type: "Block" }}
								onChoose={(result) => {
									const request: SetSpecialBlockRequest = { blockId: result.id, type: "FEATURED" }
									setSpecialBlock(request)
								}}
							>
								<Button justifyContent='flex-end' colorScheme='blue' variant='solid'>
									Add
								</Button>
							</SearchComponentWrapper>
						</>
					)}
				</Box>
			</Box>
		)
	}

	if (res.error) {
		return <Text color='red'>{res.error.message}</Text>
	}

	return <Spinner />
}
