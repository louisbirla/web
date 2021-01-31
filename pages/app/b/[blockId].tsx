import { Box, Center, Link, Text } from "@chakra-ui/core"
import { Suspense } from "react"
import { useRouter } from "next/router"
import { PageBlock } from "../../../components/app/PageBlock"
import NextLink from "next/link"

const BlockPage = () => {
	const router = useRouter()
	const id = router.query.blockId as string
	return (
			<Box bgColor='#EDEFF1'>
			<Box pl={10}>
				<NextLink href='/app'>
					<Link fontWeight='bold' color='#5D80FE'>
						App Home
					</Link>
				</NextLink>
			</Box>
			<Center py={10}>
				<Suspense fallback={<Text>Loading...</Text>}>
					<PageBlock id={parseInt(id)} />
				</Suspense>
			</Center>
			</Box>
	)
}

export default BlockPage
