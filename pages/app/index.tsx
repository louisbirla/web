import { Center, Text } from "@chakra-ui/core"
import { Welcome } from "../../components/app/Welcome"
import { Suspense } from "react"

const AppPage = () => {
	return (
		<Center bgColor='#EDEFF1' py={10}>
			<Suspense fallback={<Text>Loading...</Text>}>
				<Welcome />
			</Suspense>
		</Center>
	)
}

export default AppPage
