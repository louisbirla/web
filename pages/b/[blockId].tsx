import { Spinner } from "@chakra-ui/core"
import { Suspense } from "react"
import { useRouter } from "next/router"
import { PageRender } from "../../components/display/PageRender"
import { Layout } from "../../components/Layout"

const BlockPage = () => {
	const router = useRouter()
	const id = router.query.blockId as string
	return (
		<Layout>
			<Suspense fallback={<Spinner />}>
				<PageRender id={parseInt(id)} />
			</Suspense>
		</Layout>
	)
}

export default BlockPage
