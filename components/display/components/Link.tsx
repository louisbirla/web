import { Link, Text } from "@chakra-ui/react"
import { LinkArgs } from "display-api"
import NextLink from "next/link"
import { text_color } from "../../../utils/theme/colors"

export const LinkComponent: React.FC<LinkArgs> = ({ text, external, app_path, url, no_style }) => {
	let color = no_style ? text.color ?? text_color : "blue.500"
	let textDec = no_style ? undefined : "underline"
	let fontWeight = text.bold ? "bold" : undefined
	if (app_path) {
		return (
			<Link href={app_path} as={NextLink} isExternal={external}>
				<Text cursor='pointer' fontWeight={fontWeight} color={color} textDecoration={textDec}>
					{text.text}
				</Text>
			</Link>
		)
	}
	return (
		<Link href={url} fontWeight={fontWeight} isExternal={external} color={color} textDecoration={textDec}>
			{text.text}
		</Link>
	)
}
