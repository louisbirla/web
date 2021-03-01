import { Spinner } from "@chakra-ui/react"
import { Suspense } from "react"
import { useRouter } from "next/router"
import { UserPage } from "../../components/user/UserPage"
import { Layout } from "../../components/Layout"

const UserNextPage = () => {
	const router = useRouter()
	const username = router.query.username as string
	return (
		<Layout contain={{ mx: 0, mt: 12 }}>
			<Suspense fallback={<Spinner />}>
				<UserPage username={username} />
			</Suspense>
		</Layout>
	)
}

export default UserNextPage
