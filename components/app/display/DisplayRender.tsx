import { Heading } from "@chakra-ui/core"
import { DisplayObject } from "display-api"
import Head from "next/head"
import { ComponentDelegate } from "./ComponentDelegate"

export const DisplayRender: React.FC<{ display: DisplayObject }> = ({ display }) => {
	const component = display.display
	let meta = <></>

	if (display.meta?.page) {
		if (display.meta.page.title) {
			meta = (
				<>
					{meta}
					<Head>
						<title>{display.meta.page.title}</title>
					</Head>
				</>
			)
		}
		if (display.meta.page.header) {
			meta = (
				<>
					{meta}
					<Heading size='xl'>{display.meta.page.header}</Heading>
				</>
			)
		}
	}

	return (
		<>
			{meta}
			<ComponentDelegate component={component} />
		</>
	)
}
