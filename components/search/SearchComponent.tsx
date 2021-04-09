import { Box, HStack, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { Search, XCircle } from "react-feather"
import { SearchResults } from "./SearchResults"
import { atom, useAtom } from "jotai"

export const searchQueryAtom = atom("")

export const GlobalSearchComponent: React.FC = () => {
	const [value, setValue] = useAtom(searchQueryAtom)

	return (
		<Box position='fixed' display='flex' width='100vw' justifyContent='center' flexDirection='row' top={1}>
			<HStack flexDirection='column'>
				<SearchComponent value={value} setValue={setValue} global />
				{value !== "" && <SearchResults query={value} />}
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
