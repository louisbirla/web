import { Box, Flex, HStack, Stack } from "@chakra-ui/react"
import { StackArgs } from "display-api"
import { ComponentDelegate } from "../ComponentDelegate"

export const StackComponent: React.FC<StackArgs> = ({ direction = "Fit", items }) => {
	const content = items.map(({ component }) => (
		<Box>
			<ComponentDelegate key={JSON.stringify(component)} component={component} />
		</Box>
	))
	switch (direction) {
		case "Horizontal":
			return <HStack>{content}</HStack>
		case "Fit":
			return (
				<Flex flexWrap='wrap' justifyItems='flex-start'>
					{content}
				</Flex>
			)
		default:
			return <Stack>{content}</Stack>
	}
}
