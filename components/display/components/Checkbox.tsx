import { Checkbox } from "@chakra-ui/checkbox"
import { CheckboxArgs } from "display-api"
import { useState } from "react"
import { TextComponent } from "./Text"
import { genActionObject } from "../ActionObject"
import { setMethodVar } from "../method"

export const CheckboxComponent: React.FC<CheckboxArgs> = ({
	text,
	variant,
	color_scheme,
	value,
	on_change,
	color,
	readonly,
	disabled,
	name,
}) => {
	let [checked, setChecked] = useState(value === 2 ? true : value === 1)
	let [indeterminate, setIndeterminate] = useState(value === 2 ? true : false)
	const [ActionWrap, action] = genActionObject(on_change)
	const change = () => {
		if (variant === "Cancel") {
			if (indeterminate) {
				setChecked(false)
				setIndeterminate(false)
				name && setMethodVar(name, 0)
			} else if (checked) {
				setIndeterminate(true)
				name && setMethodVar(name, 2)
			} else {
				setChecked(true)
				setIndeterminate(false)
				name && setMethodVar(name, 1)
			}
		} else {
			if (checked) {
				setChecked(false)
				name && setMethodVar(name, 0)
			} else {
				setChecked(true)
				name && setMethodVar(name, 1)
			}
		}
		action()
	}
	return (
		<ActionWrap>
			<Checkbox
				isChecked={checked}
				isIndeterminate={indeterminate}
				onChange={change}
				iconColor={color}
				colorScheme={color_scheme}
				isReadonly={readonly}
				isDisabled={disabled}
			>
				{text && <TextComponent {...text.args} />}
			</Checkbox>
		</ActionWrap>
	)
}
