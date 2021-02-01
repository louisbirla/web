import { Box, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { Search, XCircle } from "react-feather"
import { useState } from "react"
import { SearchResults } from "./SearchResults"
import { atom, useAtom } from 'jotai';

export const searchQueryAtom = atom("")

export const SearchComponent: React.FC = () => {
	const [value, setValue] = useAtom(searchQueryAtom)
	return (
		<Box position='fixed' display='flex' width='100vw' justifyContent='center' flexDirection='row' top={1}>
			<Box>
				<InputGroup display='block' width={400}>
					<InputLeftElement pointerEvents='none' children={<Icon color='#909090' as={Search} />} />
					<Input
						value={value}
						onChange={(e) => setValue(e.target.value)}
						textColor='white'
						bg='#4b4b4b'
						borderRadius={100}
						borderColor='#a1a1a1'
						height={10}
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
				{value !== "" && <SearchResults query={value} />}
			</Box>
		</Box>
	)
}
