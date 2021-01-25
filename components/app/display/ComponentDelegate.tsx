import { Text } from "@chakra-ui/core"
import { ComponentObject } from "display-api"
import { TextComponent } from "./Text"
import { CardComponent } from "./Card"
import { InputComponent } from "./Input"

export const ComponentDelegate: React.FC<{ component: ComponentObject }> = ({ component }) => {
	switch (component.cid) {
		case "text":
			return <TextComponent {...component.args} />
		case "card":
			return <CardComponent {...component.args} />
		case "input":
			return <InputComponent {...component.args} />
		default:
			return <Text>Bad Component.</Text>
	}
}
