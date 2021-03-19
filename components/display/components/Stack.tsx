import { Box, Flex, HStack, Stack } from "@chakra-ui/react"
import { StackArgs } from "display-api"
import { ComponentDelegate, Environment } from "../ComponentDelegate"

export const StackComponent: React.FC<StackArgs & { env?: Environment }> = ({ direction = "Fit", items, env }) => {
	const content = items.map(({ component }, i) => (
		<Box key={`${i}${component.cid}`}>
			<ComponentDelegate env={env} key={JSON.stringify(component)} component={component} />
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
