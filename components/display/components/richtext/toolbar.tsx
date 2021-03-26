import { useEffect, useRef } from "react"
import { Editor, Range } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import { Box } from "@chakra-ui/layout"
import { createPortal } from "react-dom"
import { toggleMark } from "./marking"
import { Button } from "@chakra-ui/button"

export const HoveringToolbar = () => {
	const ref = useRef<HTMLDivElement | null>()
	const editor = useSlate()

	useEffect(() => {
		const el = ref.current
		const { selection } = editor

		if (!el) {
			return
		}

		if (
			!selection ||
			!ReactEditor.isFocused(editor) ||
			Range.isCollapsed(selection) ||
			Editor.string(editor, selection) === ""
		) {
			el.removeAttribute("style")
			return
		}

		const domSelection = window.getSelection()
		if (domSelection == null) {
			throw new Error("Window selection broke")
		}
		const domRange = domSelection.getRangeAt(0)
		const rect = domRange.getBoundingClientRect()
		el.style.opacity = "1"
		el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
		el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
	})

	return (
		<Portal>
			<Box
				ref={ref as any}
				position='absolute'
				zIndex={1}
				top='-10000px'
				left='-10000px'
				opacity={0}
				bg='white'
				shadow='lg'
				rounded='md'
				transition='opacity 0.75s'
				mt='-14'
			>
				<ToolbarButton format='bold' editor={editor} />
				<ToolbarButton format='italic' editor={editor} />
				<ToolbarButton format='underline' editor={editor} />
				<ToolbarButton format='code' editor={editor} />
				<ToolbarButton format='heading' editor={editor} />
				<ToolbarButton format='strikethrough' editor={editor} />
			</Box>
		</Portal>
	)
}

const ToolbarButton: React.FC<{ format: string; editor: ReactEditor }> = ({ format, editor }) => {
	let display = <></>
	switch (format) {
		case "bold":
			display = <b>B</b>
			break
		case "italic":
			display = <em>I</em>
			break
		case "underline":
			display = <u>U</u>
			break
		case "strikethrough":
			display = <s>{"S"}</s>
			break
		case "code":
			display = <code>{"<>"}</code>
			break
		case "heading":
			display = <span>{"H"}</span>
			break
	}
	return (
		<Button
			color={isMarkActive(editor, format) ? "blue.500" : undefined}
			p={0.5}
			m={0}
			onClick={() => toggleMark(editor, format)}
			variant='unstyled'
			size='sm'
		>
			{display}
		</Button>
	)
}

const isMarkActive = (editor: Editor, format: string) => {
	const marks = Editor.marks(editor)
	return marks ? marks[format] === true : false
}

export const Portal: React.FC = ({ children }) => {
	return createPortal(children, document.body)
}
