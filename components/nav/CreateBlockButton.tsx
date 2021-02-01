import { Box, Button } from "@chakra-ui/core"
import { useAtom } from "jotai"
import { createBlockAtom } from "../panels/CreateBlockPanel"

export const CreateBlockButton: React.FC = () => {
	const [, setCreating] = useAtom(createBlockAtom)

	return (
		<Box color='#393939' ml={4}>
			<Button
				onClick={() => setCreating(prompt("Which block type? (text|data)") || undefined)}
				size='sm'
				variant='outline'
				colorScheme='white'
				_hover={{ borderColor: "#466EFD" }}
				color='white'
				display='block'
				mx='auto'
			>
				Create Block
			</Button>
		</Box>
	)
}
