import { Heading, Text, Link as ChakraLink } from "@chakra-ui/core"
import { Layout } from "../components/Layout"

const AppPage = () => {
	return (
		<Layout>
			<Heading>Help</Heading>
			<Text>Welcome to our help page.</Text>
			<Text>
				Feel free to email the Loop team at{" "}
				<ChakraLink fontWeight='bold' textColor='#466EFD' href='mailto:team@loop.page'>
					team@loop.page
				</ChakraLink>
			</Text>
		</Layout>
	)
}

export default AppPage
