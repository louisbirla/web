import { Button, IconButton, Switch } from "@chakra-ui/react"
import Icon from "@chakra-ui/icon"
import { Box, Divider, Flex, Heading, HStack, Spacer, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { Tab, TabList, Tabs } from "@chakra-ui/tabs"
import { ArrowLeft, ChevronLeft, ChevronRight } from "react-feather"
import { ViewType } from "./SearchComponent"

export const SearchFilters: React.FC<{ setView: Function }> = ({ setView }) => {
	const renderItem = (text: string, value: string, isLast: boolean = false) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				borderBottomRadius={isLast && global ? 20 : undefined}
				pb={isLast && global ? 6 : 9.5}
				onClick={() => {
					setView(ViewType.SearchSubFilters)
				}}
			>
				<Flex alignItems='center'>
					<Text>{text}</Text>
					<Spacer />
					<Text color='#4B4B4B' fontSize={15} fontWeight={400}>
						{value}
					</Text>
					<Icon ml='2' color='#111111' as={ChevronRight} />
				</Flex>
			</Box>
		)
	}

	const renderStarToggle = (text: string, value: boolean, isLast: boolean = false) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				borderBottomRadius={isLast && global ? 20 : undefined}
				pb={isLast && global ? 6 : 9.5}
				onClick={() => {
					setView(ViewType.SearchSubFilters)
				}}
			>
				<Flex alignItems='center'>
					<Text>{text}</Text>
					<Spacer />
					<Switch size='md' defaultChecked={value} />
				</Flex>
			</Box>
		)
	}
	return (
		<Box shadow='lg' width={400} bg='white' borderTopRadius={40} borderBottomRadius={20} pt={1} display='block'>
			<Box borderTopRadius={20} px={5} pb={global ? 6 : 9.5} pt={7.5}>
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
					<Button variant='link' colorScheme='blue' onClick={() => {}}>
						Reset
					</Button>
				</Flex>
			</Box>
			<Divider borderColor='gray.500' />
			<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
				{renderItem("Sort By", "Star Count")}
				{renderItem("Owner", "Salman")}
				{renderItem("Block Type", "All")}
				{renderStarToggle("Only Starred", true, true)}
			</Stack>
		</Box>
	)
}
