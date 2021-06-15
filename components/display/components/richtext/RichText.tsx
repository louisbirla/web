import { RichTextArgs } from "display-api"
import { useCallback, useEffect, useMemo, useState } from "react"
import { createEditor, Text } from "slate"
import { Editable, RenderLeafProps, Slate, withReact } from "slate-react"
import { withHistory } from "slate-history"
import isHotkey from "is-hotkey"
import { componentToSlateText, slateTextToComponent } from "./slateDisplayConversion"
import { toggleMark } from "./marking"
import { Leaf } from "./leaf"
import { HoveringToolbar } from "./toolbar"
import { blockMethod, setMethodVar } from "../../method"
import { Box } from "@chakra-ui/layout"

// Largely pulled from https://github.com/ianstormtaylor/slate/blob/master/site/examples

const HOTKEYS: {
	[key: string]: string
} = {
	"mod+b": "bold",
	"mod+i": "italic",
	"mod+u": "underline",
	"mod+e": "code",
	"alt+1": "heading",
	"mod+shift+s": "strikethrough",
}

export const RichTextComponent: React.FC<RichTextArgs> = ({
	content,
	editable = false,
	name,
	save,
	on_enter,
	bordered,
}) => {
	let [value, doSetValue] = useState<Text[]>(content.map(componentToSlateText))

	// After the user doesn't do anything for 1000 seconds, save
	useEffect(() => {
		const saveTimeout = setTimeout(() => {
			let cval = value.map(slateTextToComponent)
			if (save && cval != content) {
				save && blockMethod(save)
			}
		}, 1000)
		return () => clearTimeout(saveTimeout)
	}, [value])

	const setValue = useCallback(
		(val: Text[]) => {
			doSetValue(val)
			let cval = val.map(slateTextToComponent)
			name && setMethodVar(name, cval)
		},
		[name],
	)

	useEffect(() => {
		setValue(value)
	}, [])

	const onEnter = () => {
		on_enter && blockMethod(on_enter)
	}

	return (
		<Box
			rounded='lg'
			p={bordered ? 2 : undefined}
			minW='95%'
			border={bordered ? "1px solid rgb(226, 232, 240)" : undefined}
		>
			<RichTextEditor value={value} setValue={setValue} editable={editable} onEnter={onEnter} />
		</Box>
	)
}

export const RichTextEditor: React.FC<{
	value: Text[]
	setValue: (newVal: Text[]) => void
	editable?: boolean
	onEnter?: Function
}> = ({ value, setValue, editable, onEnter }) => {
	const editor = useMemo(() => withHistory(withReact(createEditor())), [])
	const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])

	if (value.length === 0) {
		value = [
			{
				text: "",
			},
		]
	}

	return (
		<Slate
			editor={editor}
			value={[{ type: "paragraph", children: value }]}
			onChange={(val) => setValue(val[0].children as Text[])}
		>
			<HoveringToolbar />
			<Editable
				readOnly={!editable}
				renderLeaf={renderLeaf}
				placeholder='Start typing...'
				style={{ minWidth: "15em", maxWidth: "38vw" }}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault()

						// move the cursor to the beginning of the input before setting the empty state
						const point = { path: [0, 0], offset: 0 }
						editor.selection = { anchor: point, focus: point }

						// For good measure, you can reset the history as well
						editor.history = { redos: [], undos: [] }
						onEnter && onEnter()
						return
					}
					for (const hotkey in HOTKEYS) {
						if (isHotkey(hotkey, event as any)) {
							event.preventDefault()
							const mark: string = HOTKEYS[hotkey]
							toggleMark(editor, mark)
						}
					}
				}}
			/>
		</Slate>
	)
}
