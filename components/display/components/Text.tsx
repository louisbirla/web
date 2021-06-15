import { Heading, Text } from "@chakra-ui/react"
import { TextArgs } from "display-api"
import { Environment } from "../ComponentDelegate"

export const TextComponent: React.FC<TextArgs & { env?: Environment }> = ({
	text,
	color,
	preset,
	env,
	bold,
	italic,
	underline,
	strikethrough,
	monospace,
}) => {
	if (preset === "Heading") {
		return (
			<Heading mx={2} size={env === "create" ? "lg" : undefined} color={color}>
				{text}
			</Heading>
		)
	}
	if (preset === "Info") {
		color = "gray.500"
	}
	let component = <Text color={color}>{text}</Text>

	if (bold) {
		component = <b>{component}</b>
	}
	if (underline) {
		component = <u>{component}</u>
	}
	if (italic) {
		component = <em>{component}</em>
	}
	if (monospace) {
		component = <code>{component}</code>
	}
	if (strikethrough) {
		component = <s>{component}</s>
	}

	return component
}
