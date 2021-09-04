import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	Flex,
	LinkBox,
	LinkOverlay,
	Stack,
	StackDivider,
	Text,
} from "@chakra-ui/react"
import { gql, useQuery } from "urql"
import NextLink from "next/link"
import { Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import { Crumb } from "../nav/Breadcrumb"
import { IconComponent } from "../display/components/Icon"
import { BlockSortType } from "./SearchSubFilters"
import { IconName } from "display-api"

const BlockQuery = gql`
	query($query: String!, $filters: BlockSearchFilters, $sortBy: BlockSortType) {
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

export type OnChooseBlockResult = { id: number }
type BlockSearchFilters = { starred?: boolean; blockType?: string }
type BlockResults = { id: number; color: string; icon: string; crumbs: Crumb[] }
type BlockQueryResults = { searchBlocks: Array<BlockResults> }
type QueryVars = { query: string; filters?: BlockSearchFilters; sortBy?: BlockSortType }

export const BlockSearchResults: React.FC<{
	query: string
	setQuery: (query: string) => void
	onChoose?: (result: OnChooseBlockResult) => void
}> = ({ query, setQuery, onChoose }) => {
	let [blockRes] = useQuery<BlockQueryResults, QueryVars>({
		query: BlockQuery,
		variables: { query },
	})

	return (
		<Suspense fallback={<Spinner />}>
			<BlockResults
				onChoose={onChoose}
				setQuery={setQuery}
				loading={blockRes.fetching}
				blockResults={blockRes.data?.searchBlocks}
			/>
		</Suspense>
	)
}

export const BlockResults: React.FC<{
	blockResults?: BlockResults[]
	loading?: boolean
	global?: boolean
	setQuery: (query: string) => void
	onChoose?: (result: OnChooseBlockResult) => void
}> = ({ blockResults = [], loading, global, setQuery, onChoose }) => {
	if (loading === true) {
		return (
			<Box display='block' py={4}>
				<Text>Loading...</Text>
				<Text>Block search results will get quicker soon.</Text>
			</Box>
		)
	}
	if (blockResults.length === 0) {
		return (
			<Box display='block' py={4}>
				<Text>No results.</Text>
			</Box>
		)
	}
	const results = blockResults.map((blockResult, i) => {
		const isLast = blockResults.length === i + 1
		const crumbs = blockResult.crumbs
		const lastCrumbIndex = crumbs.length - 1
		const blockId = crumbs[lastCrumbIndex].blockId
		const content = (
			<Flex alignItems='center' textAlign='left'>
				<IconComponent color={blockResult.color} name={blockResult.icon as IconName} />
				<Breadcrumb ml={4} spacing={1} display='block'>
					{crumbs.map((crumb) => (
						<BreadcrumbItem key={crumb.name}>
							<Text>{crumb.name}</Text>
						</BreadcrumbItem>
					))}
				</Breadcrumb>
			</Flex>
		)

		if (onChoose) {
			return (
				<Box
					key={blockId}
					cursor='pointer'
					px={4}
					pt={7.5}
					_hover={{ bg: "gray.200" }}
					borderBottomRadius={isLast && global ? 20 : undefined}
					pb={isLast && global ? 6 : 9.5}
					onClick={() => {
						setQuery("")
						onChoose({ id: blockId })
					}}
				>
					{content}
				</Box>
			)
		}

		return (
			<LinkBox
				key={blockId}
				cursor='pointer'
				px={4}
				pt={7.5}
				_hover={{ bg: "gray.200" }}
				borderBottomRadius={isLast && global ? 20 : undefined}
				pb={isLast && global ? 6 : 9.5}
				onClick={() => setQuery("")}
			>
				<LinkOverlay as={NextLink} href={`/b/${blockId}`}>
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
