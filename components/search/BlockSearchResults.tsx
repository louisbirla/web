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

const BlockQuery = gql`
	query($query: String!) {
		searchBlocks(query: $query) {
			blockId
			name
		}
	}
`

export type OnChooseBlockResult = { id: number }
type BlockQueryResults = { searchBlocks: Crumb[][] }
type QueryVars = { query: string }

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
				breadcrumbs={blockRes.data?.searchBlocks}
			/>
		</Suspense>
	)
}

export const BlockResults: React.FC<{
	breadcrumbs?: Crumb[][]
	loading?: boolean
	global?: boolean
	setQuery: (query: string) => void
	onChoose?: (result: OnChooseBlockResult) => void
}> = ({ breadcrumbs = [], loading, global, setQuery, onChoose }) => {
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
		const content = (
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
