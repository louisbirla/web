import { extendTheme } from "@chakra-ui/react"
import { blue, orange, yellow, text_color } from "./colors"

export const theme = extendTheme({
	colors: {
		blue,
		orange,
		yellow,
	},
	styles: {
		global: {
			body: {
				bg: "#EDEFF1",
				color: text_color,
			},
		},
	},
	components: {
		Button: {
			variants: {
				nostyle: {
					_focus: {
						bg: "none",
					},
					_active: { bg: "none" },
					_hover: {
						bg: "none",
					},
					_expanded: {
						bg: "none",
					},
				},
			},
		},
	},
})
