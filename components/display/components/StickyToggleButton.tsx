import { StickyToggleButtonArgs } from "display-api"
import { useState } from "react"
import { ButtonComponent } from "./Button"

export const StickyToggleButtonComponent: React.FC<StickyToggleButtonArgs> = ({
	button,
	name,
	on_change,
	default_value,
}) => {
	const [isEnabled, setEnabled] = useState<boolean>(default_value ?? true)

	const onChange = () => {
		setEnabled(!isEnabled)
	}

	return (
		<ButtonComponent
			text={name ? name : button.text}
			variant={button.variant}
			icon={button.icon}
			size={button.size}
			color_scheme={isEnabled ? button.color_scheme : "gray"}
			disabled={button.disabled}
			readonly={true}
			interact={on_change}
			onChange={onChange}
		/>
	)
}
