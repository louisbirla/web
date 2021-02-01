import { Box, Spinner } from "@chakra-ui/react"
import { DisplayObject } from "display-api"
import { gql, useQuery } from "urql"
import { DisplayRender } from "./DisplayRender"

const BlockQuery = gql`
	query($id: Int!) {
		blockById(id: $id) {
			pageDisplay
		}
	}
`

type BlockResult = { blockById: { pageDisplay: string } }
type BlockArgs = { id: number }

export const PageRender: React.FC<{ id: number; display?: DisplayObject }> = ({ id, display }) => {
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

	return (
		<Box>
			<DisplayRender display={display} />
		</Box>
	)
}
