import { HStack, Stack } from "@chakra-ui/react"
import { DisplayListArgs } from "display-api"
import { ComponentDelegate } from "../ComponentDelegate"
import { Card } from "./Card"
import { CardMenu } from "./menu/CardMenu"

export const DisplaylistComponent: React.FC<DisplayListArgs> = ({ items, color }) => {
	color = color || "#5D80FE"
	const content = items.map(({ component, menu }, i) => (
		<HStack key={`${i}${component.cid}`}>
			{menu && (
				<Stack flexDirection='column-reverse' h='100%'>
					<CardMenu margin={false} menu={menu} />
				</Stack>
			)}
			<ComponentDelegate component={component} />
		</HStack>
	))
	return (
		<Card display='block' mx='auto' width={1000} maxW='95vw' p={4} pl={9} borderLeft={`5px solid ${color}`}>
			<Stack>{content}</Stack>
		</Card>
	)
}
// TODO: Hide menu until hover over block
