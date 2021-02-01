import { Text } from "@chakra-ui/react"
import { ComponentObject } from "display-api"
import { TextComponent } from "./components/Text"
import { CardComponent } from "./components/Card"
import { InputComponent } from "./components/Input"
import { StackComponent } from "./components/Stack"

export const ComponentDelegate: React.FC<{ component: ComponentObject }> = ({ component }) => {
	switch (component.cid) {
		case "text":
			return <TextComponent {...component.args} />
		case "card":
			return <CardComponent {...component.args} />
		case "input":
			return <InputComponent {...component.args} />
		case "stack":
			return <StackComponent {...component.args} />
		default:
			return <Text>Bad Component.</Text>
	}
}
