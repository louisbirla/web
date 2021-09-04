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
import { LinkComponent } from "./components/Link"
import { ActionPopoverComponent } from "./components/ActionPopover"
import { DropdownComponent } from "./components/Dropdown"
import React from "react"
import { RichTextComponent } from "./components/richtext/RichText"
import { DisplaylistComponent } from "./components/Displaylist"
import { StickyToggleButtonComponent } from "./components/StickyToggleButton"
import { IconComponent } from "./components/Icon"

export type Environment = "create" | "page" | "cardheader" | "popover" | "displaylist"

export const ComponentDelegate: React.FC<{ component: ComponentObject; env?: Environment }> = ({ component, env }) => {
	if (component) {
		component.args = component?.args || {}
	} else {
		return <Text color='red'>Error When Rendering Component.</Text>
	}
	switch (component.cid) {
		case "text":
			return <TextComponent env={env} {...component.args} />
		case "card":
			return <CardComponent env={env} {...component.args} />
		case "input":
			return <InputComponent {...component.args} />
		case "stack":
			return <StackComponent env={env} {...component.args} />
		case "button":
			return <ButtonComponent {...component.args} />
		case "badge":
			return <BadgeComponent {...component.args} />
		case "checkbox":
			return <CheckboxComponent {...component.args} />
		case "progress":
			return <ProgressComponent env={env} {...component.args} />
		case "link":
			return <LinkComponent {...component.args} />
		case "actionpopover":
			return <ActionPopoverComponent {...component.args} />
		case "dropdown":
			return <DropdownComponent {...component.args} />
		case "richtext":
			return <RichTextComponent {...component.args} />
		case "displaylist":
			return <DisplaylistComponent {...component.args} />
		case "stickytogglebutton":
			return <StickyToggleButtonComponent {...component.args} />
		case "icon":
			return <IconComponent {...component.args} />
		default:
			return <Text color='red'>Error When Rendering Component.</Text>
	}
}
