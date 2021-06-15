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
import { SearchSubFilters, BlockSortType } from "./SearchSubFilters"
import { User } from "../user/userAtom"

const BlockQuery = gql`
	query ($query: String!, $filters: BlockSearchFilters, $sortBy: BlockSortType) {
		searchBlocks(query: $query, filters: $filters, sortBy: $sortBy) {
			id
			color
			icon
			crumbs {
				blockId
				name
			}
		}
	}
`

type BlockSearchFilters = { starred?: boolean; blockType?: string; ownerId?: number }
type BlockResults = { id: number; color: string; icon: string; crumbs: Crumb[] }

type BlockQueryResults = { searchBlocks: Array<BlockResults> }
type QueryVars = { query: string; filters?: BlockSearchFilters; sortBy?: BlockSortType }

export enum ViewType {
	SearchResults,
	SearchFilters,
	SearchSubFilters,
}
export enum FilterViewType {
	SortBy = "Sort By",
	Owner = "Owner",
	BlockType = "Block Type",
}

type FilterType = { sortBy?: { key: BlockSortType; name: string }; blockType?: string; owner?: User; starred?: boolean }

export const SearchResults: React.FC<{ query: string }> = ({ query }) => {
	const [filterObject, setFilterObject] = useState<FilterType>({
		sortBy: undefined,
		blockType: undefined,
		owner: undefined,
		starred: undefined,
	})
	const [currentView, setCurrentView] = useState<ViewType>(ViewType.SearchResults)
	const [selectedFilter, setSelectedFilter] = useState<FilterViewType>(FilterViewType.SortBy)
	const [tabIndex, setTabIndex] = useState(0)
	const [, setQuery] = useAtom(searchQueryAtom)

	let [userRes] = useQuery<UserQueryResults, QueryVars>({
		query: UserQuery,
		variables: { query },
	})

	let [blockRes] = useQuery<BlockQueryResults, QueryVars>({
		query: BlockQuery,
		variables: {
			query,
			filters: {
				blockType: filterObject?.blockType,
				starred: filterObject?.starred,
				ownerId: filterObject?.owner?.id,
			},
			sortBy: filterObject?.sortBy?.key,
		},
	})

	return (
		<Box shadow='lg' width={400} bg='white' borderTopRadius={40} borderBottomRadius={20} pt={1} display='block'>
			{currentView === ViewType.SearchResults && (
				<Tabs align='center' onChange={(index) => setTabIndex(index)}>
					<TabList fontWeight='bold'>
						<Tab mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
							Blocks ({blockRes.data?.searchBlocks.length ?? ".."})
						</Tab>
						<Tab mx={5} _selected={{ fontWeight: 500, borderBottom: "4px solid #7C99FF" }}>
							People ({userRes.data?.searchUsers.length ?? ".."})
						</Tab>
						<Button
							disabled={tabIndex == 1}
							variant='link'
							colorScheme='blue'
							onClick={() => setCurrentView(ViewType.SearchFilters)}
						>
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
									blockResults={blockRes.data?.searchBlocks}
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
					filterViewType={selectedFilter}
					setView={setCurrentView}
					filterObject={filterObject}
					setFilterObject={setFilterObject}
				/>
			)}
		</Box>
	)
}
