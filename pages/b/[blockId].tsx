import { Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import { useRouter } from "next/router"
import { PageRender } from "../../components/display/PageRender"
import { Layout } from "../../components/Layout"

const BlockPage = () => {
	const router = useRouter()
	const id = router.query.blockId as string
	return (
		<Layout contain={{ mt: 12 }}>
			<Suspense fallback={<Spinner />}>
				<PageRender withBreadcrumb id={parseInt(id)} />
			</Suspense>
		</Layout>
	)
}

export default BlockPage
