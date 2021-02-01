import {
	Avatar,
	Box,
	Flex,
	LinkBox,
	LinkOverlay,
	Stack,
	StackDivider,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react"
import { gql, useQuery } from "urql"
import NextLink from "next/link"
import { useAtom } from "jotai"
import { userAtom } from "../user/userAtom"
import { HStack, Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import { searchQueryAtom } from "./SearchComponent"

const UserQuery = gql`
	query($query: String!) {
		searchUsers(query: $query) {
			displayName
			username
		}
	}
`

type UserArray = Array<{ displayName?: string; username: string }>
type UserQueryResults = { searchUsers: UserArray }
type UserQueryVars = { query: string }

export const SearchResults: React.FC<{ query: string }> = ({ query }) => {
	let [userRes] = useQuery<UserQueryResults, UserQueryVars>({
		query: UserQuery,
		variables: { query },
	})

	return (
		<Box width={400} bg='white' borderTopRadius={40} borderBottomRadius={20} pt={1} display='block'>
			<Tabs defaultIndex={1} align='center'>
				<TabList fontWeight='bold'>
					<Tab isDisabled mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
						Blocks
					</Tab>
					<Tab mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
						People ({userRes.data?.searchUsers.length ?? ".."})
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>Coming soon!</TabPanel>
					<TabPanel padding={0}>
						<Suspense fallback={<Spinner />}>
							<UserResults users={userRes.data?.searchUsers} />
						</Suspense>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	)
}

const UserResults: React.FC<{ users?: UserArray }> = ({ users = [] }) => {
	const [self] = useAtom(userAtom)
	const [, setQuery] = useAtom(searchQueryAtom)
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

		return (
			<LinkBox
				key={user.username}
				cursor='pointer'
				px={4}
				py={1}
				_hover={{ bg: "gray.200" }}
				borderBottomRadius={isLast ? 20 : undefined}
				pb={isLast ? 3 : 1}
				onClick={() => setQuery("")}
			>
				<LinkOverlay as={NextLink} href={`/u/${user.username}`}>
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
				</LinkOverlay>
			</LinkBox>
		)
	})
	return (
		<Stack spacing={0} divider={<StackDivider borderColor='gray.200' />}>
			{results}
		</Stack>
	)
}
