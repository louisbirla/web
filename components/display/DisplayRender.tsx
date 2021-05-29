import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Heading } from "@chakra-ui/react"
import { DisplayObject } from "display-api"
import Head from "next/head"
import { ComponentDelegate } from "./ComponentDelegate"
import { PageMenu } from "./components/menu/PageMenu"
import { isMobile } from "react-device-detect"

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
					{isMobile && (
						<Alert status='warning' mb='5'>
							<Box flex='1'>
								<AlertTitle>Notice!</AlertTitle>
								<AlertDescription>
									Email your mobile device information at team@loop.page to receive instructions on how to install the
									mobile app on your phone.
								</AlertDescription>
							</Box>
						</Alert>
					)}
					<Flex justifyContent='space-between'>
						<Box>{meta}</Box>
						<Box>
							<PageMenu menu={display.meta.page.menu} />
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
