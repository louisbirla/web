import { Heading, Stack, Text } from "@chakra-ui/core"
import { StackArgs } from "display-api"
import { ComponentDelegate } from "./ComponentDelegate"

export const StackComponent: React.FC<StackArgs> = ({ direction, items }) => {
	return <Stack>
		{items.map(({ component }) => <ComponentDelegate key={JSON.stringify(component)} component={component} />)}
	</Stack>
}
