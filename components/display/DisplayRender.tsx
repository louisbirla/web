import { Box, Flex, Heading } from "@chakra-ui/react"
import { DisplayObject } from "display-api"
import Head from "next/head"
import { ComponentDelegate } from "./ComponentDelegate"
import { CardMenu } from "./components/menu/CardMenu"

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
		} else if (display.meta.page.header_component) {
			meta = (
				<>
					{meta}
					<ComponentDelegate component={display.meta.page.header_component} />
				</>
			)
		}
		if (display.meta.page.menu) {
			meta = (
				<>
					<Flex justifyContent='space-between'>
						<Box>{meta}</Box>
						<Box>
							<CardMenu menu={display.meta.page.menu} />
						</Box>
					</Flex>
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
