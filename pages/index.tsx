import { Spinner } from "@chakra-ui/core"
import { Suspense } from "react"
import { Layout } from "../components/Layout"
import { Dashboard } from "../components/pages/Dashboard"

const AppPage = () => {
	return (
		<Layout>
			<Suspense fallback={<Spinner />}>
				<Dashboard />
			</Suspense>
		</Layout>
	)
}

export default AppPage
