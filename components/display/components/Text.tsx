import { Heading, Text } from "@chakra-ui/react"
import { TextArgs } from "display-api"
import { Environment } from "../ComponentDelegate"

export const TextComponent: React.FC<TextArgs & { env?: Environment }> = ({ text, color, preset, env }) => {
	if (preset === "Heading") {
		return (
			<Heading size={env === "create" ? "lg" : undefined} color={color}>
				{text}
			</Heading>
		)
	}
	return <Text color={color}>{text}</Text>
}
