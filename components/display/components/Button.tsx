import { Button, ButtonProps, IconButton } from "@chakra-ui/button"
import { ButtonArgs } from "display-api"
import { IconComponent } from "./Icon"
import { genActionObject } from "../ActionObject"

export const ButtonComponent: React.FC<ButtonArgs & { props?: ButtonProps }> = ({
	interact,
	icon,
	text,
	variant = "ghost",
	size = "20",
	color_scheme,
	props,
}) => {
	const [ActionWrap, action] = genActionObject(interact)
	if (text.trim().length == 0) {
		return (
			<ActionWrap>
				<IconButton
					m={1}
					onClick={action}
					variant={variant}
					icon={<IconComponent color={color_scheme} size={size} name={icon} />}
					aria-label={`${icon} button`}
					{...props}
				/>
			</ActionWrap>
		)
	} else {
		return (
			<ActionWrap>
				<Button m={1} variant={variant} onClick={action} size={size} {...props}>
					{icon && <IconComponent color={color_scheme} name={icon} />}
					{text}
				</Button>
			</ActionWrap>
		)
	}
}
