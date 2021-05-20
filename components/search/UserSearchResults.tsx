import { Avatar, Box, Flex, LinkBox, LinkOverlay, Stack, StackDivider, Text } from "@chakra-ui/react"
import { gql, useQuery } from "urql"
import NextLink from "next/link"
import { useAtom } from "jotai"
import { userAtom } from "../user/userAtom"
import { HStack, Spinner } from "@chakra-ui/react"
import { Suspense } from "react"

export const UserQuery = gql`
	query ($query: String!) {
		searchUsers(query: $query) {
			displayName
			username
			id
		}
	}
`

export type UserResult = { displayName?: string; username: string; id: number }
export type UserQueryResults = { searchUsers: UserResult[] }
export type QueryVars = { query: string }

export const UserSearchResults: React.FC<{
	query: string
	setQuery: (query: string) => void
	onChoose?: (result: UserResult) => void
}> = ({ query, setQuery, onChoose }) => {
	let [userRes] = useQuery<UserQueryResults, QueryVars>({
		query: UserQuery,
		variables: { query },
	})

	return (
		<Suspense fallback={<Spinner />}>
			<UserResults
				onChoose={onChoose}
				setQuery={setQuery}
				loading={userRes.fetching}
				users={userRes.data?.searchUsers}
			/>
		</Suspense>
	)
}

export const UserResults: React.FC<{
	users?: UserResult[]
	loading?: boolean
	global?: boolean
	setQuery: (query: string) => void
	onChoose?: (result: UserResult) => void
}> = ({ users = [], loading, global, setQuery, onChoose }) => {
	const [self] = useAtom(userAtom)
	if (loading === true) {
		return (
			<Box display='block' py={4}>
				<Text>Loading...</Text>
			</Box>
		)
	}
	if (users.length === 0) {
		return (
			<Box display='block' py={4}>
				<Text>No results.</Text>
			</Box>
		)
	}
	const results = users.map((user, i) => {
		const displayName = user.displayName || user.username
		const isLast = users.length === i + 1
		const isYou = self?.username === user.username
		const content = (
			<Flex alignItems='center'>
				<Avatar size='sm' name={displayName} />
				<Stack textAlign='left' ml={2} spacing={0}>
					<HStack spacing={1}>
						<Text fontWeight='bold'>{displayName}</Text>
						{isYou && <Text color='gray.500'>(you)</Text>}
					</HStack>
					<Text>@{user.username}</Text>
				</Stack>
			</Flex>
		)

		if (onChoose) {
			return (
				<Box
					key={user.username}
					cursor='pointer'
					px={4}
					py={1}
					_hover={{ bg: "gray.200" }}
					borderBottomRadius={global && isLast ? 20 : undefined}
					pb={global && isLast ? 3 : 1}
					onClick={() => {
						onChoose(user)
						setQuery("")
					}}
				>
					{content}
				</Box>
			)
		}

		return (
			<LinkBox
				key={user.username}
				cursor='pointer'
				px={4}
				py={1}
				_hover={{ bg: "gray.200" }}
				borderBottomRadius={global && isLast ? 20 : undefined}
				pb={global && isLast ? 3 : 1}
				onClick={() => setQuery("")}
			>
				<LinkOverlay as={NextLink} href={`/u/${user.username}`}>
					{content}
				</LinkOverlay>
			</LinkBox>
		)
	})
	return (
		<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
			{results}
		</Stack>
	)
}
