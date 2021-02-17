import { Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import { Layout } from "../components/Layout"
import { Dashboard } from "../components/pages/Dashboard"

const AppPage = () => {
	return (
		<Layout contain={{ mt: 12 }}>
			<Suspense fallback={<Spinner />}>
				<Dashboard />
			</Suspense>
		</Layout>
	)
}

export default AppPage
