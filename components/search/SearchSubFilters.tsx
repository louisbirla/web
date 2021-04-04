import {
	Button,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
} from "@chakra-ui/react"
import Icon from "@chakra-ui/icon"
import { Box, Divider, Flex, Heading, Spacer, Stack, StackDivider, Text } from "@chakra-ui/layout"
import { Check, ChevronLeft } from "react-feather"
import { IconComponent } from "../display/components/Icon"
import { IconName, SearchComponent } from "display-api"
import { FilterType, ViewType } from "./SearchComponent"
import { SearchComponentBody } from "../display/components/Search"

export const SearchSubFilters: React.FC<{ filterType: FilterType; setView: Function }> = ({ filterType, setView }) => {
	const renderItem = (text: string, isSelected: boolean = false, iconName?: IconName, isLast?: boolean) => {
		return (
			<Box
				cursor='pointer'
				px={4}
				pt={7.5}
				borderBottomRadius={isLast && global ? 20 : undefined}
				pb={isLast && global ? 6 : 9.5}
				onClick={() => {}}
			>
				<Flex alignItems='center'>
					{iconName && <IconComponent name={iconName} />}
					<Text>{text}</Text>
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
					{renderItem("Default", true)}
					{renderItem("Star count")}
					{renderItem("Last updated")}
					{renderItem("Last updated")}
				</Stack>
			)
		} else if (filterType === FilterType.Owner) {
			// const searchComponent: SearchComponent = { cid: 'search', action_text: 'Choose a User', type: 'User' }
			return (
				<></>
				// <SearchComponentBody component={searchComponent} onChoose={() => { }} />
				// <Popover closeOnBlur={false} closeOnEsc={false}>
				//     <PopoverTrigger>{children}</PopoverTrigger>
				//     <PopoverContent>
				//         <PopoverArrow />
				//         <PopoverCloseButton />
				//         <PopoverHeader fontWeight='bold' textAlign='center'>
				//             {searchComponent.action_text ?? (searchComponent.type === "User" ? "Choose a User" : "Choose a Block")}
				//         </PopoverHeader>
				//         <SearchComponentBody component={searchComponent} onChoose={() => { }} />
				//     </PopoverContent>
				// </Popover>
			)
		} else if (filterType === FilterType.BlockType) {
			console.log("filterType: ", filterType)
			return (
				<Stack maxH='80vh' overflow='scroll' spacing={0} divider={<StackDivider borderColor='gray.200' />}>
					{renderItem("Task", true, "TaskComplete")}
					{renderItem("Habit", false, "Box")}
					{renderItem("Chat", false, "Message")}
					{renderItem("Group", false, "Folder")}
					{renderItem("Text", false, "Feed")}
				</Stack>
			)
		}
	}
	return (
		<Box shadow='lg' width={400} bg='white' borderTopRadius={40} borderBottomRadius={20} pt={1} display='block'>
			<Box borderTopRadius={20} px={5} pb={global ? 6 : 9.5} pt={7.5}>
				<Flex>
					<IconButton
						aria-label='back'
						variant='link'
						colorScheme='blue'
						icon={<Icon as={ChevronLeft} onClick={() => setView(ViewType.SearchFilters)} />}
					/>
					<Spacer />
					<Heading size='sm'>{filterType}</Heading>
					<Spacer />
				</Flex>
			</Box>
			<Divider borderColor='gray.500' />
			{renderfilterType()}
		</Box>
	)
}
