import Head from "next/head"
import { Box, Icon, IconButton, Center, VStack, Text, HStack } from "@chakra-ui/core"
import { GitHub } from "react-feather"
import { Link } from "./basic/Link"
import { LogoImage } from "./LogoImage"
import { Nav } from "./nav/Nav"

type Props = {
	title?: string
	noLogo?: boolean
	noNav?: boolean
}

export const Layout: React.FC<Props> = ({ children, title = "Loop", noLogo = false, noNav = false }) => (
	<Box>
		<Head>
			<title>{title}</title>
		</Head>
		<Box as='header'>
			<VStack spacing={0}>
				{noLogo || (
					<Link href='/'>
						<HStack
							_hover={{
								opacity: 0.7,
							}}
						>
							<LogoImage height='1.5rem' />
							<Text fontWeight='800' fontSize='2rem'>
								Loop
							</Text>
						</HStack>
					</Link>
				)}
				{noNav || <Nav mb={5} />}
			</VStack>
		</Box>
		{children}
		<Box as='footer' mt={10}>
			<Center color='gray.500'>
				<VStack>
					<Nav />
					<Box>
						<Link href='https://github.com/loop-revolution'>
							<IconButton icon={<Icon as={GitHub} color='gray.500' />} aria-label='GitHub Repository' />
						</Link>
					</Box>
					<Text>© 2021 Loop Revolution</Text>
				</VStack>
			</Center>
		</Box>
	</Box>
)
