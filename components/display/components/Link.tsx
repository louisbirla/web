import { Link, Text } from "@chakra-ui/react"
import { LinkArgs } from "display-api"
import NextLink from "next/link"

export const LinkComponent: React.FC<LinkArgs> = ({ text, external, app_path, url }) => {
	if (app_path) {
		return (
			<Link href={app_path} as={NextLink} isExternal={external}>
				<Text cursor='pointer' color={text.args.color || "blue.500"} textDecoration='underline'>
					{text.args.text}
				</Text>
			</Link>
		)
	}
	return (
		<Link href={url} isExternal={external} color={text.args.color || "blue.500"} textDecoration='underline'>
			{text.args.text}
		</Link>
	)
}
