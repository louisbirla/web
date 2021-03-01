import { Box, Button } from "@chakra-ui/react"
import { useCreateBlock } from "../panels/CreateBlockPanel"
import { useChooseType } from "../panels/ChooseTypePanel"

export const CreateBlockButton: React.FC = () => {
	const createBlock = useCreateBlock()
	const chooseType = useChooseType()

	return (
		<Box color='#393939' ml={4}>
			<Button
				onClick={() =>
					chooseType()
						.then(createBlock)
						.then((id) => {
							location.href = `/b/${id}`
						})
				}
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
