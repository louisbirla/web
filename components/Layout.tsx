import Head from "next/head"
import { Box, BoxProps, Text } from "@chakra-ui/react"
import { Nav } from "./nav/Nav"

export const Layout: React.FC<{ title?: string; contain?: BoxProps }> = ({ children, title = "Loop", contain }) => {
	return (
		<Box>
			<Head>
				<title>{title}</title>
			</Head>
			<Nav />
			<Box minH='100vh' mt={20} mx={20} {...contain}>
				{children}
			</Box>
			<Box width='100%' textAlign='center'>
				<Text opacity={0.8}>&#169; Loop Revolution</Text>
			</Box>
		</Box>
	)
}
