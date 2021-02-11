import { Box, Button } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { createBlockAtom } from "../panels/CreateBlockPanel"
import { useChooseType } from "../panels/ChooseTypePanel"

export const CreateBlockButton: React.FC = () => {
	const [, setCreating] = useAtom(createBlockAtom)
	const chooseType = useChooseType()

	return (
		<Box color='#393939' ml={4}>
			<Button
				onClick={() => chooseType().then((name) => setCreating(name))}
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
