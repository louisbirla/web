import { DropdownArgs } from "display-api"
import { genActionObject } from "../ActionObject"
import Select from "react-select"
import { useState } from "react"
import { setMethodVar } from "../method"
import { HStack, Text } from "@chakra-ui/layout"
import { IconComponent } from "./Icon"

export const DropdownComponent: React.FC<DropdownArgs> = ({
	disabled,
	default: initial,
	name,
	on_change,
	options,
	readonly,
}) => {
	const [value, setValue] = useState(initial)
	const [ActionWrap, action] = genActionObject(on_change)
	if (options.length == 0) {
		disabled = true
	}
	const optionList = options.map((option, i) => ({
		value: i,
		label: (
			<HStack>
				{option.icon && <IconComponent size='1em' color='none' name={option.icon} />}
				<Text>{option.text}</Text>
			</HStack>
		),
	}))
	const onChange = (value?: number) => {
		setValue(value)
		name && setMethodVar(name, value)
		action()
	}
	return (
		<ActionWrap>
			<Select
				value={value == undefined ? undefined : optionList[value]}
				onChange={(option) => {
					onChange(option?.value)
				}}
				isDisabled={disabled}
				isReadonly={readonly}
				options={optionList}
				isSearchable={false}
			/>
		</ActionWrap>
	)
}
