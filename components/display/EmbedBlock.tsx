import { Box } from "@chakra-ui/react"
import { ComponentObject } from "display-api"
import { Loader } from "react-feather"
import { gql, useQuery } from "urql"
import { ComponentDelegate } from "./ComponentDelegate"

const BlockQuery = gql`
	query($id: Int!) {
		blockById(id: $id) {
			embedDisplay
		}
	}
`

type BlockResult = { blockById: { embedDisplay: string } }
type BlockArgs = { id: number }

export const EmbedBlock: React.FC<{ id: number; component?: ComponentObject }> = ({ id, component }) => {
	let [res] = useQuery<BlockResult, BlockArgs>({
		query: BlockQuery,
		variables: { id },
		pause: false,
		requestPolicy: "network-only",
	})

	let block = res.data?.blockById

	if (block?.embedDisplay) {
		component = JSON.parse(block.embedDisplay)
	}

	if (!component) {
		return <Loader />
	}

	return (
		<Box>
			<ComponentDelegate component={component} />
		</Box>
	)
}
