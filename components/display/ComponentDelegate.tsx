import { Text } from "@chakra-ui/react"
import { ComponentObject } from "display-api"
import { CardComponent } from "./components/Card"
import { InputComponent } from "./components/Input"
import { StackComponent } from "./components/Stack"
import { ButtonComponent } from "./components/Button"
import { BadgeComponent } from "./components/Badge"
import { CheckboxComponent } from "./components/Checkbox"
import { TextComponent } from "./components/Text"
import { ProgressComponent } from "./components/Progress"

export type Environment = "create" | "page"

export const ComponentDelegate: React.FC<{ component: ComponentObject; env?: Environment }> = ({ component, env }) => {
	switch (component.cid) {
		case "text":
			return <TextComponent env={env} {...component.args} />
		case "card":
			return <CardComponent {...component.args} />
		case "input":
			return <InputComponent {...component.args} />
		case "stack":
			return <StackComponent {...component.args} />
		case "button":
			return <ButtonComponent {...component.args} />
		case "badge":
			return <BadgeComponent {...component.args} />
		case "checkbox":
			return <CheckboxComponent {...component.args} />
		case "progress":
			return <ProgressComponent {...component.args} />
		default:
			return <Text color='red'>Error When Rendering Component.</Text>
	}
}
