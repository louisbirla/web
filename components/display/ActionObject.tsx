import { ActionObject } from "display-api"
import { blockMethod } from "./method"
import { SearchComponentWrapper } from "./components/Search"
import { Box } from "@chakra-ui/layout"

export const genActionObject = (object?: ActionObject): [React.FC, () => void] => {
	let Wrapper: React.FC = ({ children }) => <Box>{children}</Box>
	let action = () => {}

	if (object?.method) {
		let method = object.method
		action = () => blockMethod(method)
	} else if (object?.search) {
		let search = object.search
		Wrapper = ({ children }) => <SearchComponentWrapper component={search}>{children}</SearchComponentWrapper>
	} else if (object?.redirect) {
		if (object.redirect.app_path) {
			let path = object.redirect.app_path
			action = () => {
				location.href = location.origin + "/" + path
			}
		} else if (object.redirect.url) {
			let url = object.redirect.url
			action = () => {
				location.href = url
			}
		}
	}

	return [Wrapper, action]
}
