import { IconButton } from "@chakra-ui/react"
import Icon from "@chakra-ui/icon"
import { Box, Divider, Flex, Heading, HStack, Spacer, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { Check, ChevronLeft } from "react-feather"
import { IconComponent } from "../display/components/Icon"
import { IconName } from "display-api"
import { FilterViewType, ViewType } from "./SearchResults"
import { useState } from "react"
import { SearchComponent } from "./SearchComponent"
import { gql, useQuery } from "urql"
import { UserSearchResults } from "./UserSearchResults"

const TypesQuery = gql`
	query {
		blockTypes {
			desc
			name
			icon
		}
	}
`

export enum BlockSortType {
	DEFAULT = "DEFAULT",
	STAR_COUNT = "STAR_COUNT",
	UPDATED = "UPDATED",
	CREATED = "CREATED",
}

type BlockType = { desc: string; name: string; icon: IconName }
type TypesQueryResult = { blockTypes: BlockType[] }

export const SearchSubFilters: React.FC<{
	filterViewType?: FilterViewType
	setView?: Function
	filterObject?: any
	setFilterObject?: Function
}> = ({ filterViewType, setView, filterObject, setFilterObject }) => {
	let [typeRes] = useQuery<TypesQueryResult>({
		query: TypesQuery,
	})

	let types = typeRes.data?.blockTypes

	const [value, setValue] = useState("")

	const sortingOptions = [
		{ key: BlockSortType.DEFAULT, name: "Default" },
		{ key: BlockSortType.STAR_COUNT, name: "Star count" },
		{ key: BlockSortType.UPDATED, name: "Last updated" },
		{ key: BlockSortType.CREATED, name: "Creation date" },
	]

	const renderSortingItem = (item: any) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				pb={9.5}
				onClick={() => {
					filterObject.sortBy = item
					setFilterObject && setFilterObject(filterObject)
					setView && setView(ViewType.SearchFilters)
				}}
			>
				<Flex alignItems='center'>
					<Text ml='2'>{item.name}</Text>
					<Spacer />
					{item.key === filterObject?.sortBy && <Icon ml='2' color='#111111' as={Check} />}
				</Flex>
			</Box>
		)
	}

	const renderBlockItem = (block: BlockType) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				pb={9.5}
				onClick={() => {
					filterObject.blockType = block.name
					setFilterObject && setFilterObject(filterObject)
					setView && setView(ViewType.SearchFilters)
				}}
			>
				<Flex alignItems='center'>
					{block.icon && <IconComponent name={block.icon} />}
					<Text ml='2'>{block.name}</Text>
					<Spacer />
					{block.name === filterObject?.blockType && <Icon ml='2' color='#111111' as={Check} />}
				</Flex>
			</Box>
		)
	}

	const renderfilterType = () => {
		if (filterViewType === FilterViewType.SortBy) {
			return (
				<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
					{sortingOptions.map(renderSortingItem)}
				</Stack>
			)
		} else if (filterViewType === FilterViewType.Owner) {
			return (
				<HStack flexDirection='column'>
					<SearchComponent value={value} setValue={setValue} />
					{value !== "" && (
						<UserSearchResults
							setQuery={setValue}
							query={value}
							onChoose={(item) => {
								filterObject.owner = item
								setFilterObject && setFilterObject(filterObject)
								setView && setView(ViewType.SearchFilters)
							}}
						/>
					)}
				</HStack>
			)
		} else if (filterViewType === FilterViewType.BlockType) {
			return (
				<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
					{types?.map(renderBlockItem)}
				</Stack>
			)
		}
	}
	return (
		<>
			<Box px={5} pb={3} pt={3}>
				<Flex>
					<IconButton
						aria-label='back'
						variant='link'
						colorScheme='blue'
						icon={<Icon as={ChevronLeft} onClick={() => setView && setView(ViewType.SearchFilters)} />}
					/>
					<Spacer />
					<Heading size='sm'>{filterViewType}</Heading>
					<Spacer />
				</Flex>
			</Box>
			<Divider borderColor='gray.500' />
			{renderfilterType()}
		</>
	)
}
