import { Button, IconButton, Switch } from "@chakra-ui/react"
import Icon from "@chakra-ui/icon"
import { Box, Divider, Flex, Heading, Spacer, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { ChevronLeft, ChevronRight } from "react-feather"
import { FilterViewType, ViewType } from "./SearchResults"
import { useState } from "react"

export const SearchFilters: React.FC<{
	setView: Function
	setSelectedFilter: Function
	filterObject: any
	setFilterObject: Function
}> = ({ setView, setSelectedFilter, filterObject, setFilterObject }) => {
	const [starred, setStarred] = useState<boolean>(false)
	const renderItem = (text: string, value: string, filterViewType: FilterViewType) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				pb={9.5}
				onClick={() => {
					setView(ViewType.SearchSubFilters)
					setSelectedFilter(filterViewType)
				}}
			>
				<Flex alignItems='center'>
					<Text color='#4B4B4B' fontSize={15} fontWeight={600}>
						{text}
					</Text>
					<Spacer />
					<Text color='#4B4B4B' fontSize={15} fontWeight={400}>
						{value}
					</Text>
					<Icon ml='2' color='#111111' as={ChevronRight} />
				</Flex>
			</Box>
		)
	}

	const renderStarToggle = (text: string, isLast: boolean = false) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				borderBottomRadius={isLast && global ? 20 : undefined}
				pb={isLast && global ? 6 : 9.5}
			>
				<Flex alignItems='center'>
					<Text color='#4B4B4B' fontSize={15} fontWeight={600}>
						{text}
					</Text>
					<Spacer />
					<Switch
						size='md'
						isChecked={filterObject.starred}
						onChange={() => {
							setStarred(!starred)
							filterObject.starred = !filterObject.starred
							setFilterObject(filterObject)
						}}
					/>
				</Flex>
			</Box>
		)
	}
	return (
		<>
			<Box px={5} pb={3} pt={3}>
				<Flex>
					<IconButton
						aria-label='back'
						variant='link'
						colorScheme='blue'
						icon={<Icon as={ChevronLeft} onClick={() => setView(ViewType.SearchResults)} />}
					/>
					<Spacer />
					<Heading size='sm'>Filters</Heading>
					<Spacer />
					<Button
						variant='link'
						colorScheme='blue'
						onClick={() => {
							setFilterObject({})
						}}
					>
						Reset
					</Button>
				</Flex>
			</Box>
			<Divider borderColor='gray.500' />
			<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
				{renderItem(FilterViewType.SortBy, filterObject?.sortBy?.name, FilterViewType.SortBy)}
				{renderItem(FilterViewType.Owner, filterObject?.owner?.displayName ?? filterObject?.owner?.username, FilterViewType.Owner)}
				{renderItem(FilterViewType.BlockType, filterObject?.blockType, FilterViewType.BlockType)}
				{renderStarToggle("Only Starred", true)}
			</Stack>
		</>
	)
}
