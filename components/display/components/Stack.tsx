import { Box, Flex, HStack, Stack } from "@chakra-ui/react"
import { StackArgs } from "display-api"
import { ComponentDelegate, Environment } from "../ComponentDelegate"

export const StackComponent: React.FC<StackArgs & { env?: Environment }> = ({
	direction = "Fit",
	items,
	env,
	align_x,
	align_y,
}) => {
	const content = items.map(({ component }, i) => (
		<Box m={1} key={`${i}${component.cid}`} display='inline-block'>
			<ComponentDelegate env={env} component={component} />
		</Box>
	))
	switch (direction ?? "Fit") {
		case "Horizontal":
			return <HStack alignItems={flexLang(align_y)}>{content}</HStack>
		case "Fit":
			return (
				<Flex alignItems={flexLang(align_y)} flexWrap='wrap' justifyItems='flex-start'>
					{content}
				</Flex>
			)
		default:
			return <Stack alignItems={flexLang(align_x)}>{content}</Stack>
	}
}

function flexLang(s?: string) {
	if (s == "Middle") {
		return "center"
	}
	if (s == "Bottom" || s == "Right") {
		return "flex-end"
	}
	return "flex-start"
}
