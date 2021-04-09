import { IconButton } from "@chakra-ui/react"
import Icon from "@chakra-ui/icon"
import { Box, Divider, Flex, Heading, HStack, Spacer, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { Check, ChevronLeft } from "react-feather"
import { IconComponent } from "../display/components/Icon"
import { IconName } from "display-api"
import { FilterType, ViewType } from "./SearchResults"
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
type BlockType = { desc: string; name: string; icon: IconName }
type TypesQueryResult = { blockTypes: BlockType[] }

export const SearchSubFilters: React.FC<{
	filterType?: FilterType
	setView?: Function
	filterObject?: any
	setFilterObject?: Function
}> = ({ filterType, setView, filterObject, setFilterObject }) => {
	let [typeRes] = useQuery<TypesQueryResult>({
		query: TypesQuery,
	})

	let types = typeRes.data?.blockTypes

	const [value, setValue] = useState("")

	const sortingOptions = ["Star count", "Last updated", "Creation date"]

	const renderItem = (text: string, key: string, isSelected: boolean = false, iconName?: IconName) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				pb={9.5}
				onClick={() => {
					filterObject[key] = text
					setFilterObject && setFilterObject(filterObject)
					setView && setView(ViewType.SearchFilters)
				}}
			>
				<Flex alignItems='center'>
					{iconName && <IconComponent name={iconName} />}
					<Text ml='2'>{text}</Text>
					<Spacer />
					{isSelected && <Icon ml='2' color='#111111' as={Check} />}
				</Flex>
			</Box>
		)
	}

	const renderfilterType = () => {
		if (filterType === FilterType.SortBy) {
			return (
				<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
					{sortingOptions.map((option) => {
						return renderItem(option, "sortBy", option === filterObject?.sortBy)
					})}
				</Stack>
			)
		} else if (filterType === FilterType.Owner) {
			return (
				<HStack flexDirection='column'>
					<SearchComponent value={value} setValue={setValue} />
					{value !== "" && (
						<UserSearchResults
							setQuery={setValue}
							query={value}
							onChoose={(item) => {
								const name = item.displayName ?? item.username
								filterObject.owner = name
								setFilterObject && setFilterObject(filterObject)
								setView && setView(ViewType.SearchFilters)
							}}
						/>
					)}
				</HStack>
			)
		} else if (filterType === FilterType.BlockType) {
			return (
				<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
					{types?.map((block: BlockType) =>
						renderItem(block.name, "blockType", block.name === filterObject?.blockType, block.icon),
					)}
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
					<Heading size='sm'>{filterType}</Heading>
					<Spacer />
				</Flex>
			</Box>
			<Divider borderColor='gray.500' />
			{renderfilterType()}
		</>
	)
}
