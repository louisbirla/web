import { Box, ButtonGroup, Input, IconButton, Icon, Text, Button, Textarea } from "@chakra-ui/react"
import { InputArgs } from "display-api"
import { setMethodVar, blockMethod } from "../method"
import { useState } from "react"
import { Check, X } from "react-feather"
import { TextComponent } from "./Text"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export const InputComponent: React.FC<InputArgs> = ({
	initial_value,
	name,
	label,
	type,
	confirm_cancel,
	mask,
	size,
}) => {
	const [value, setValue] = useState(initial_value)
	const [error, setError] = useState<string>()
	const [inputShown, setInputShown] = useState(mask == undefined ? true : false)
	let buttons = <></>
	if (confirm_cancel?.enabled) {
		let cancelButton: JSX.Element | undefined = (
			<IconButton
				onClick={() => {
					setValue(initial_value)
					mask && setInputShown(false)
				}}
				aria-label='Cancel change'
				icon={<Icon as={X} />}
			/>
		)
		let confirmButton: JSX.Element | undefined = (
			<IconButton
				onClick={async () => {
					const res = await blockMethod(confirm_cancel.on_confirm.method)
					if (res.error) {
						setError(res.error.message)
					} else if (mask) {
						setInputShown(false)
					}
				}}
				aria-label='Confirm change'
				icon={<Icon as={Check} />}
			/>
		)
		if (mask) {
			if (!inputShown) {
				cancelButton = undefined
				confirmButton = undefined
			}
		} else {
			if (initial_value === value) {
				cancelButton = undefined
				confirmButton = undefined
			}
		}
		buttons = (
			<ButtonGroup pl={3} size='sm' isAttached variant='outline'>
				{confirmButton}
				{cancelButton}
			</ButtonGroup>
		)
	}
	let width = 300
	let input = () => (
		<Input
			onChange={(e) => {
				const new_val = e.target.value
				setValue(new_val)
				name && setMethodVar(name, new_val)
			}}
			bg='white'
			value={value}
			name={name}
			placeholder={label}
			width={width}
			isInvalid={error != undefined}
		/>
	)
	if (size === "Small") {
		width = 150
	} else if (size === "Large") {
		width = 400
	} else if (size === "MultiLine") {
		input = () => (
			<Textarea
				onChange={(e) => {
					const new_val = e.target.value
					setValue(new_val)
					name && setMethodVar(name, new_val)
				}}
				bg='white'
				value={value}
				name={name}
				placeholder={label}
				isInvalid={error != undefined}
				resize='none'
				size='lg'
			/>
		)
	} else if (size === "Flexible") {
		input = () => (
			<Textarea
				onChange={(e) => {
					const new_val = e.target.value
					setValue(new_val)
					name && setMethodVar(name, new_val)
				}}
				bg='white'
				value={value}
				name={name}
				placeholder={label}
				isInvalid={error != undefined}
				size='xs'
			/>
		)
	}
	if (type === "Date") {
		input = () => (
			<Box borderWidth={2} rounded='lg' p={1}>
				<DatePicker
					onChange={(date) => {
						const new_val = date?.toString()
						setValue(new_val)
						name && setMethodVar(name, new_val)
					}}
					selected={value == undefined ? new Date() : new Date(value)}
					name={name}
					showTimeSelect={false}
					showTimeInput={false}
				/>
			</Box>
		)
	} else if (type === "Time") {
		input = () => (
			<Box borderWidth={2} rounded='lg' p={1}>
				<DatePicker
					onChange={(date) => {
						const new_val = date?.toString()
						setValue(new_val)
						name && setMethodVar(name, new_val)
					}}
					showTimeSelect
					showTimeSelectOnly
					timeIntervals={15}
					selected={value == undefined ? new Date() : new Date(value)}
					timeCaption='Time'
					dateFormat='h:mm aa'
					name={name}
				/>
			</Box>
		)
	}
	return (
		<Box display='inline-block'>
			{mask && !inputShown && (
				<Button variant='ghost' fontWeight='normal' onClick={() => setInputShown(true)}>
					<TextComponent {...mask.args} />
				</Button>
			)}
			{inputShown && input()}
			{buttons}
			<Text colorScheme='red'>{error}</Text>
		</Box>
	)
}
