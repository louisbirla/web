import { Heading, Text } from "@chakra-ui/core"
import { TextArgs } from "display-api"

export const TextComponent: React.FC<TextArgs> = ({ text, color, preset }) => {
	if (preset === "Heading") {
		return <Heading color={color}>{text}</Heading>
	}
	return <Text color={color}>{text}</Text>
}
