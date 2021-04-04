import { Box, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { Search, XCircle } from "react-feather"
import { SearchResults } from "./SearchResults"
import { atom, useAtom } from "jotai"
import { SearchFilters } from "./SearchFilters"
import { useState } from "react"
import { SearchSubFilters } from "./SearchSubFilters"

export const searchQueryAtom = atom("")

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

export const GlobalSearchComponent: React.FC = () => {
	const [value, setValue] = useAtom(searchQueryAtom)
	const [currentView, setCurrentView] = useState<ViewType>(ViewType.SearchResults)

	const setView = (view: ViewType) => {
		setCurrentView(view)
	}

	return (
		<Box position='fixed' display='flex' width='100vw' justifyContent='center' flexDirection='row' top={1}>
			<HStack flexDirection='column'>
				<SearchComponent value={value} setValue={setValue} global />
				{value !== "" && currentView === ViewType.SearchResults && (
					<SearchResults query={value} onClickFilter={setView} />
				)}
				{value !== "" && currentView === ViewType.SearchFilters && <SearchFilters setView={setView} />}
				{value !== "" && currentView === ViewType.SearchSubFilters && (
					<SearchSubFilters filterType={FilterType.Owner} setView={setView} />
				)}
			</HStack>
		</Box>
	)
}

export const SearchComponent: React.FC<{
	value: string
	setValue: (newVal: string) => void
	global?: boolean
	placeholder?: string
}> = ({ value, setValue, global = false, placeholder }) => {
	return (
		<InputGroup display='block' width={global ? 400 : undefined}>
			<InputLeftElement pointerEvents='none' children={<Icon color='#909090' as={Search} />} />
			<Input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				textColor={global ? "white" : undefined}
				bg={global ? "#4b4b4b" : undefined}
				borderRadius={100}
				borderColor='#a1a1a1'
				height={10}
				placeholder={placeholder}
			/>
			{value !== "" && (
				<InputRightElement
					children={
						<IconButton
							variant='nostyle'
							aria-label='Clear the input'
							onClick={() => setValue("")}
							color='#a1a1a1'
							icon={<Icon as={XCircle} />}
						/>
					}
				/>
			)}
		</InputGroup>
	)
}
