import { TextComponent, TextPreset } from "display-api"
import { Text } from "slate"

/** Transforms Display API components into slate text elements */
export const componentToSlateText = (component: TextComponent): Text => {
	let textArgs = component.args
	const { text, bold, underline, monospace, preset, strikethrough, italic } = textArgs
	let heading = false
	if (preset === "Heading") {
		heading = true
	}
	return {
		bold,
		code: monospace,
		heading,
		italic,
		strikethrough,
		text,
		underline,
	}
}

/** Transforms slate text elements into Display API components  */
export const slateTextToComponent = (node: any): TextComponent => {
	let preset: TextPreset | undefined = undefined
	if (node.heading) {
		preset = "Heading"
	}
	return {
		cid: "text",
		args: {
			bold: node.bold,
			italic: node.italic,
			monospace: node.code,
			preset,
			strikethrough: node.strikethrough,
			text: node.text,
			underline: node.underline,
		},
	}
}
