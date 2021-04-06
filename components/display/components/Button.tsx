import { Button, ButtonProps, IconButton, Box } from "@chakra-ui/react"
import { ButtonArgs } from "display-api"
import { IconComponent } from "./Icon"
import { genActionObject } from "../ActionObject"

export const ButtonComponent: React.FC<ButtonArgs & { props?: ButtonProps } & { onChange?: Function }> = ({
	interact,
	icon,
	text,
	variant,
	size: jsonSize,
	color_scheme,
	props,
	disabled,
	readonly,
	onChange,
}) => {
	let size: string | undefined = jsonSize
	switch (size) {
		case "Small":
			size = "sm"
			break
		case "Medium":
			size = "md"
			break
		case "Large":
			size = "lg"
			break
	}
	const [ActionWrap, action] = genActionObject(interact)
	if (text.trim().length == 0) {
		return (
			<ActionWrap>
				<IconButton
					m={1}
					onClick={() => {
						action()
						onChange && onChange()
					}}
					variant={variant?.toLowerCase()}
					icon={<IconComponent color='none' size='1.3em' name={icon} />}
					aria-label={`${icon} button`}
					isDisabled={disabled}
					isReadonly={readonly}
					colorScheme={color_scheme}
					size={size}
					{...props}
				/>
			</ActionWrap>
		)
	} else {
		return (
			<ActionWrap>
				<Button
					m={1}
					variant={variant?.toLowerCase()}
					onClick={() => {
						action()
						onChange && onChange()
					}}
					size={size}
					isDisabled={disabled}
					isReadonly={readonly}
					colorScheme={color_scheme}
					{...props}
				>
					{icon && (
						<Box mr={2}>
							<IconComponent size='1.3em' color='none' name={icon} />
						</Box>
					)}
					{text}
				</Button>
			</ActionWrap>
		)
	}
}
