import { Box, Icon, IconButton, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/core"
import { Search, XCircle } from "react-feather"
import { useState } from "react"

export const SearchComponent: React.FC = () => {
	const [value, setValue] = useState("")
	return (
		<Box position='fixed' display='flex' width='100vw' justifyContent='center'>
			<InputGroup width={400}>
				<InputLeftElement pointerEvents='none' children={<Icon color='#909090' as={Search} />} />
				<Input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					textColor='white'
					bg='#4b4b4b'
					borderRadius={100}
					borderColor='#a1a1a1'
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
		</Box>
	)
}
