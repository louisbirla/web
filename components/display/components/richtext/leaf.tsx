import { Box, Text } from "@chakra-ui/layout"
import { RenderLeafProps } from "slate-react"

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
	if (leaf.code) {
		children = (
			<Box as='code' bg='gray.300' rounded='md' p='3px'>
				{children}
			</Box>
		)
	}

	if (leaf.bold) {
		children = <strong>{children}</strong>
	}

	if (leaf.italic) {
		children = <em>{children}</em>
	}

	if (leaf.underline) {
		children = <u>{children}</u>
	}

	if (leaf.strikethrough) {
		children = <s>{children}</s>
	}

	if (leaf.heading) {
		children = (
			<Text as='span' fontSize='3xl' fontWeight='bold'>
				{children}
			</Text>
		)
	}

	return <span {...attributes}>{children}</span>
}
