import { Flex, HStack, Stack } from "@chakra-ui/core"
import { StackArgs } from "display-api"
import { ComponentDelegate } from "../ComponentDelegate"

export const StackComponent: React.FC<StackArgs> = ({ direction = "vertical", items }) => {
	const content = items.map(({ component }) => (
		<ComponentDelegate key={JSON.stringify(component)} component={component} />
	))
	switch (direction) {
		case "horizontal":
			return <HStack>{content}</HStack>
		case "fit":
			return <Flex flexWrap='wrap'>{content}</Flex>
		default:
			return <Stack>{content}</Stack>
	}
}
