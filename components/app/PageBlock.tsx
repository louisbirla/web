import { Box } from "@chakra-ui/core"
import { DisplayObject } from "display-api"
import { Loader } from "react-feather"
import { gql, useQuery } from "urql"
import { DisplayRender } from "./display/DisplayRender"

const BlockQuery = gql`
	query($id: Int!) {
		blockById(id: $id) {
			pageDisplay
		}
	}
`

type BlockResult = { blockById: { pageDisplay: string } }
type BlockArgs = { id: number }

export const PageBlock: React.FC<{ id: number; display?: DisplayObject }> = ({ id, display }) => {
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
		return <Loader />
	}

	return (
		<Box>
			<DisplayRender display={display} />
		</Box>
	)
}
