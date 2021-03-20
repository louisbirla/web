import { StarIcon } from "@chakra-ui/icons"
import {
	Avatar,
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
	Tooltip,
	useToast,
} from "@chakra-ui/react"
import { Edit, Star } from "react-feather"
import { gql, useQuery } from "urql"
import { ComponentDelegate } from "../display/ComponentDelegate"
import { useStarButton } from "../display/components/menu/StarButton"
import { useAtom } from "jotai"
import { userAtom } from "./userAtom"
import { EditableDisplayName } from "./DisplayName"
import { useChangeUsername } from "./ChangeUsername"
import { useChangePassword } from "./ChangePassword"

const UserPageQuery = gql`
	query($username: String!) {
		userByName(username: $username) {
			id
			displayName
			username
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
		featured?: {
			id: number
			embedDisplay: string
			starCount: number
			starred: boolean
		}
	}
}
type UserPageQueryVars = { username: string }

export const UserPage: React.FC<{ username: string }> = ({ username }) => {
	const [res, refetch] = useQuery<UserPageQueryResult | undefined, UserPageQueryVars>({
		query: UserPageQuery,
		variables: { username },
	})
	const [star] = useStarButton(
		res.data?.userByName?.featured?.id ?? 0,
		res.data?.userByName?.featured?.starred ?? false,
	)
	const [logged] = useAtom(userAtom)
	const changeUsername = useChangeUsername()
	const changePassword = useChangePassword()
	const toast = useToast()

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
							<Button
								variant='link'
								onClick={() => {
									changeUsername().then((username) => {
										location.href = `/u/${username}`
									})
								}}
							>
								@{user.username}{" "}
							</Button>
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
						<Button
							variant='link'
							size='sm'
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
					</Box>
				</Flex>
				<Box mt={5} textAlign='center'>
					{user.featured ? (
						<>
							<Text fontWeight='bold' fontSize='2xl'>
								Featured block
							</Text>
							<ComponentDelegate component={JSON.parse(user.featured.embedDisplay)} />
						</>
					) : (
						<Text fontWeight='bold' fontSize='2xl'>
							{displayName} has no featured block
						</Text>
						// TODO: Add ability to add a featured block for yourself
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
