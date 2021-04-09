import { Box, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { gql, useQuery } from "urql"
import { Spinner } from "@chakra-ui/react"
import { Suspense, useState } from "react"
import { Crumb } from "../nav/Breadcrumb"
import { UserQuery, UserQueryResults, UserResults } from "./UserSearchResults"
import { BlockResults } from "./BlockSearchResults"
import { useAtom } from "jotai"
import { searchQueryAtom } from "./SearchComponent"
import { SearchFilters } from "./SearchFilters"
import { SearchSubFilters } from "./SearchSubFilters"

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

export enum ViewType {
	SearchResults,
	SearchFilters,
	SearchSubFilters,
}
export enum FilterType {
	SortBy = "Sort By",
	Owner = "Owner",
	BlockType = "Block Type",
}

export const SearchResults: React.FC<{ query: string }> = ({ query }) => {
	const [filterObject, setFilterObject] = useState({})

	let [userRes] = useQuery<UserQueryResults, QueryVars>({
		query: UserQuery,
		variables: { query },
	})
	let [blockRes] = useQuery<BlockQueryResults, QueryVars>({
		query: BlockQuery,
		variables: { query },
	})
	const [, setQuery] = useAtom(searchQueryAtom)

	const [currentView, setCurrentView] = useState<ViewType>(ViewType.SearchResults)
	const [selectedFilter, setSelectedFilter] = useState<FilterType>(FilterType.SortBy)

	return (
		<Box shadow='lg' width={400} bg='white' borderTopRadius={40} borderBottomRadius={20} pt={1} display='block'>
			{currentView === ViewType.SearchResults && (
				<Tabs align='center'>
					<TabList fontWeight='bold'>
						<Tab mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
							Blocks ({blockRes.data?.searchBlocks.length ?? ".."})
						</Tab>
						<Tab mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
							People ({userRes.data?.searchUsers.length ?? ".."})
						</Tab>
						<Button variant='link' colorScheme='blue' onClick={() => setCurrentView(ViewType.SearchFilters)}>
							Filters
						</Button>
					</TabList>
					<TabPanels>
						<TabPanel padding={0}>
							<Suspense fallback={<Spinner />}>
								<BlockResults
									global
									setQuery={setQuery}
									loading={blockRes.fetching}
									breadcrumbs={blockRes.data?.searchBlocks}
								/>
							</Suspense>
						</TabPanel>
						<TabPanel padding={0}>
							<Suspense fallback={<Spinner />}>
								<UserResults global setQuery={setQuery} loading={userRes.fetching} users={userRes.data?.searchUsers} />
							</Suspense>
						</TabPanel>
					</TabPanels>
				</Tabs>
			)}
			{currentView === ViewType.SearchFilters && (
				<SearchFilters
					setView={setCurrentView}
					setSelectedFilter={setSelectedFilter}
					filterObject={filterObject}
					setFilterObject={setFilterObject}
				/>
			)}
			{currentView === ViewType.SearchSubFilters && (
				<SearchSubFilters
					filterType={selectedFilter}
					setView={setCurrentView}
					filterObject={filterObject}
					setFilterObject={setFilterObject}
				/>
			)}
		</Box>
	)
}
