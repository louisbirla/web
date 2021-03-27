import { Editor } from "slate"

// Largely pulled from https://github.com/ianstormtaylor/slate/blob/master/site/examples

export const toggleMark = (editor: Editor, format: string) => {
	const isActive = isMarkActive(editor, format)

	if (isActive) {
		Editor.removeMark(editor, format)
	} else {
		Editor.addMark(editor, format, true)
	}
}

const isMarkActive = (editor: Editor, format: string) => {
	const marks = Editor.marks(editor)
	return marks ? marks[format] === true : false
}
