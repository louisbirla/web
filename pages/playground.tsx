import { Spinner, Heading, Textarea, HStack, Text, Box } from "@chakra-ui/react"
import { Suspense, useState } from "react"
import { ComponentDelegate } from "../components/display/ComponentDelegate"
import { Layout } from "../components/Layout"

const AppPage = () => {
	const [jsonString, setJson] = useState("")

	let jsonWorks = false
	let json: any = {}
	try {
		json = JSON.parse(jsonString)
		jsonWorks = true
	} catch {}

	return (
		<Layout contain={{ mt: 12 }}>
			<Suspense fallback={<Spinner />}>
				<Heading as='h1'>Display API Playground</Heading>
				<HStack alignItems='top' mt={2}>
					<Textarea
						isInvalid={!jsonWorks}
						bg='white'
						placeholder='Display API JSON here'
						value={jsonString}
						onChange={(e) => setJson(e.target.value)}
						maxW='50vw'
					/>
					<Box>
						<Suspense fallback={<Text>Component broke</Text>}>
							{jsonWorks && <ComponentDelegate component={json} />}
						</Suspense>
					</Box>
				</HStack>
			</Suspense>
		</Layout>
	)
}

export default AppPage
