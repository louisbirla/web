import { Box, Button, ButtonGroup, Heading, Spinner, Text } from "@chakra-ui/react"
import { DisplayObject } from "display-api"
import { gql, useQuery } from "urql"
import { DisplayRender } from "./DisplayRender"
import { Breadcrumb, Crumb } from "../nav/Breadcrumb"
import Link from "next/link"

const BlockQuery = gql`
	query($id: Int!) {
		blockById(id: $id) {
			pageDisplay
			breadcrumb {
				name
				blockId
			}
		}
	}
`

type BlockResult = { blockById: { pageDisplay: string; breadcrumb: Crumb[] } }
type BlockArgs = { id: number }

export const PageRender: React.FC<{ id: number; display?: DisplayObject; withBreadcrumb?: boolean }> = ({
	id,
	display,
	withBreadcrumb = false,
}) => {
	let [res] = useQuery<BlockResult, BlockArgs>({
		query: BlockQuery,
		variables: { id },
		pause: false,
		requestPolicy: "network-only",
	})

	let block = res.data?.blockById

	if (block == null && !res.fetching) {
		return (
			<Box pt={4} maxW='35em' mx='auto'>
				<Heading>Block not found.</Heading>
				<Text>
					The block with ID <code>{id}</code> is inaccessible because it either does not exist or you do not have
					permission to access it.
				</Text>
				<ButtonGroup size='sm' mt={5}>
					<Button
						onClick={() => {
							history.back()
						}}
						colorScheme='teal'
					>
						Back
					</Button>
					<Link href='/'>
						<Button colorScheme='blue'>Dashboard</Button>
					</Link>
				</ButtonGroup>
			</Box>
		)
	}

	if (block?.pageDisplay) {
		display = JSON.parse(block.pageDisplay)
	}

	if (!display) {
		return <Spinner />
	}

	let crumbs = res.data?.blockById.breadcrumb

	return (
		<Box>
			{withBreadcrumb && crumbs && <Breadcrumb crumbs={crumbs} />}
			<DisplayRender display={display} />
		</Box>
	)
}
