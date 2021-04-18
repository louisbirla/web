import { Fade, HStack, Stack } from "@chakra-ui/react"
import { ComponentObject, DisplayListArgs, MenuComponent } from "display-api"
import { useState } from "react"
import { ComponentDelegate } from "../ComponentDelegate"
import { Card } from "./Card"
import { CardMenu } from "./menu/CardMenu"

export const DisplaylistComponent: React.FC<DisplayListArgs> = ({ items, color }) => {
	color = color || "#5D80FE"
	const content = items.map(({ component, menu }, i) => (
		<DisplaylistItem key={`${i}${component.cid}`} component={component} menu={menu} />
	))
	return (
		<Card display='block' mx='auto' width='100%' maxW='95vw' p={4} pl={9} borderLeft={`5px solid ${color}`}>
			<Stack>{content}</Stack>
		</Card>
	)
}
export const DisplaylistItem: React.FC<{ component: ComponentObject; menu?: MenuComponent }> = ({
	component,
	menu,
}) => {
	const [isMouseover, setIsMouseover] = useState(false)
	return (
		<HStack onMouseEnter={() => setIsMouseover(true)} onMouseLeave={() => setIsMouseover(false)} spacing={3}>
			{menu && (
				<Fade in={isMouseover}>
					<Stack flexDirection='column-reverse' h='100%'>
						<CardMenu margin={false} menu={menu} />
					</Stack>
				</Fade>
			)}
			<ComponentDelegate env='displaylist' component={component} />
		</HStack>
	)
}
