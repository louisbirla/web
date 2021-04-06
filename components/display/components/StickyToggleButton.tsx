import { StickyToggleButtonArgs } from "display-api"
import { useState } from "react"
import { genActionObject } from "../ActionObject"
import { setMethodVar } from "../method"
import { ButtonComponent } from "./Button"

export const StickyToggleButtonComponent: React.FC<StickyToggleButtonArgs> = ({
	button,
	name,
	on_change,
	default_value,
}) => {
	const [ActionWrap, action] = genActionObject(on_change)
	const [isEnabled, setEnabled] = useState<boolean>(default_value ?? true)

	const onChange = () => {
		setEnabled(!isEnabled)
		name && setMethodVar(name, isEnabled)
		action()
	}

	return (
		<ActionWrap>
			<ButtonComponent
				text={button.text}
				variant={button.variant}
				icon={button.icon}
				size={button.size}
				color_scheme={isEnabled ? button.color_scheme : "gray"}
				disabled={button.disabled}
				readonly={true}
				onChange={onChange}
			/>
		</ActionWrap>
	)
}
