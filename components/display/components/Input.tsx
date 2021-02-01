import { Box, ButtonGroup, Input, IconButton, Icon, Text } from "@chakra-ui/react"
import { InputArgs } from "display-api"
import { setMethodVar, blockMethod } from "../method"
import { useState } from "react"
import { Check, X } from "react-feather"

export const InputComponent: React.FC<InputArgs> = ({ initial_value, name, label, type, confirm_cancel }) => {
	const [value, setValue] = useState(initial_value)
	const [error, setError] = useState<string>()
	let buttons = <></>
	if (confirm_cancel?.enabled) {
		if (value !== initial_value) {
			buttons = (
				<ButtonGroup pl={3} size='sm' isAttached variant='outline'>
					<IconButton
						onClick={async () => {
							const res = await blockMethod(confirm_cancel.on_confirm.method)
							if (res.error) {
								setError(res.error.message)
							}
						}}
						aria-label='Confirm change'
						icon={<Icon as={Check} />}
					/>
					<IconButton onClick={() => setValue(initial_value)} aria-label='Cancel change' icon={<Icon as={X} />} />
				</ButtonGroup>
			)
		}
	}
	return (
		<Box display='inline-block'>
			<Input
				onChange={(e) => {
					const new_val = e.target.value
					setValue(new_val)
					name && setMethodVar(name, new_val)
				}}
				bg='white'
				value={value}
				name={name}
				type={type}
				placeholder={label}
				width={300}
				isInvalid={error != undefined}
			/>
			{buttons}
			<Text colorScheme='red'>{error}</Text>
		</Box>
	)
}
