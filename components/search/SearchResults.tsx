import {
	Avatar,
	Box,
	Breadcrumb,
	BreadcrumbItem,
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
import { Crumb } from "../nav/Breadcrumb"
import { IconComponent } from "../display/components/Icon"

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

const BlockQuery = gql`
	query($query: String!) {
		searchBlocks(query: $query) {
			blockId
			name
		}
	}
`

type BlockQueryResults = { searchBlocks: Crumb[][] }
type QueryVars = { query: string }

export const SearchResults: React.FC<{ query: string }> = ({ query }) => {
	let [userRes] = useQuery<UserQueryResults, QueryVars>({
		query: UserQuery,
		variables: { query },
	})
	let [blockRes] = useQuery<BlockQueryResults, QueryVars>({
		query: BlockQuery,
		variables: { query },
	})

	return (
		<Box shadow='lg' width={400} bg='white' borderTopRadius={40} borderBottomRadius={20} pt={1} display='block'>
			<Tabs align='center'>
				<TabList fontWeight='bold'>
					<Tab mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
						Blocks ({blockRes.data?.searchBlocks.length ?? ".."})
					</Tab>
					<Tab mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
						People ({userRes.data?.searchUsers.length ?? ".."})
					</Tab>
				</TabList>
				<TabPanels>
					<TabPanel padding={0}>
						<Suspense fallback={<Spinner />}>
							<BlockResults loading={blockRes.fetching} breadcrumbs={blockRes.data?.searchBlocks} />
						</Suspense>
					</TabPanel>
					<TabPanel padding={0}>
						<Suspense fallback={<Spinner />}>
							<UserResults loading={userRes.fetching} users={userRes.data?.searchUsers} />
						</Suspense>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	)
}

const UserResults: React.FC<{ users?: UserArray; loading?: boolean }> = ({ users = [], loading }) => {
	const [self] = useAtom(userAtom)
	const [, setQuery] = useAtom(searchQueryAtom)
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
		<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
			{results}
		</Stack>
	)
}

const BlockResults: React.FC<{ breadcrumbs?: Crumb[][]; loading?: boolean }> = ({ breadcrumbs = [], loading }) => {
	const [, setQuery] = useAtom(searchQueryAtom)
	if (loading === true) {
		return (
			<Box display='block' py={4}>
				<Text>Loading...</Text>
				<Text>Block search results will get quicker soon.</Text>
			</Box>
		)
	}
	if (breadcrumbs.length === 0) {
		return (
			<Box display='block' py={4}>
				<Text>No results.</Text>
			</Box>
		)
	}
	const results = breadcrumbs.map((crumbs, i) => {
		const isLast = breadcrumbs.length === i + 1
		const lastCrumbIndex = crumbs.length - 1
		const blockId = crumbs[lastCrumbIndex].blockId

		return (
			<LinkBox
				key={blockId}
				cursor='pointer'
				px={4}
				pt={7.5}
				_hover={{ bg: "gray.200" }}
				borderBottomRadius={isLast ? 20 : undefined}
				pb={isLast ? 6 : 9.5}
				onClick={() => setQuery("")}
			>
				<LinkOverlay as={NextLink} href={`/b/${blockId}`}>
					<Flex alignItems='center'>
						<IconComponent name='Folder' />
						<Breadcrumb ml={2} spacing={1} display='block'>
							{crumbs.map((crumb) => (
								<BreadcrumbItem key={crumb.name}>
									<Text>{crumb.name}</Text>
								</BreadcrumbItem>
							))}
						</Breadcrumb>
					</Flex>
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
