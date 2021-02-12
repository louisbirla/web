import { Box, Spinner } from "@chakra-ui/react"
import { DisplayObject } from "display-api"
import { gql, useQuery } from "urql"
import { DisplayRender } from "./DisplayRender"
import { Breadcrumb, Crumb } from "../nav/Breadcrumb"

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
