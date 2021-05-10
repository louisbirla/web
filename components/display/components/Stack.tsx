import { Box, Flex, HStack, Stack } from "@chakra-ui/react"
import { StackArgs } from "display-api"
import { ComponentDelegate, Environment } from "../ComponentDelegate"
import Masonry from "react-masonry-css"

export const StackComponent: React.FC<StackArgs & { env?: Environment }> = ({
	direction = "Fit",
	items,
	env,
	align_x,
	align_y,
	spacing,
}) => {
	let justifyContent = "normal"
	if (spacing === "Around") {
		justifyContent = "space-around"
	} else if (spacing === "Between") {
		justifyContent = "space-between"
	}
	const content = items.map(({ component }, i) => (
		<Box m={1} key={`${i}${component.cid}`} display='inline-block'>
			<ComponentDelegate env={env} component={component} />
		</Box>
	))
	switch (direction ?? "Fit") {
		case "Horizontal":
			return (
				<HStack width='100%' justifyContent={justifyContent} alignItems={flexLang(align_y)}>
					{content}
				</HStack>
			)
		case "Masonry":
			return (
				<Masonry breakpointCols={2} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
					{content}
				</Masonry>
			)
		case "Fit":
			return (
				<Flex
					width='100%'
					justifyContent={justifyContent}
					alignItems={flexLang(align_y)}
					flexWrap='wrap'
					justifyItems='flex-start'
				>
					{content}
				</Flex>
			)
		default:
			return (
				<Stack width='100%' justifyContent={justifyContent} alignItems={flexLang(align_x)}>
					{content}
				</Stack>
			)
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
