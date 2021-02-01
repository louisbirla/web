import Head from "next/head"
import { Box, BoxProps } from "@chakra-ui/react"
import { Nav } from "./nav/Nav"

export const Layout: React.FC<{ title?: string; contain?: BoxProps }> = ({ children, title = "Loop", contain }) => {
	return (
		<Box>
			<Head>
				<title>{title}</title>
			</Head>
			<Nav />
			<Box mt={20} mx={20} {...contain}>
				{children}
			</Box>
		</Box>
	)
}
