import { Button } from "@chakra-ui/button"
import { gql } from "@urql/core"
import { useMutation } from "urql"

const ClearNotifsQuery = gql`
	mutation {
		clearAllNotifs
	}
`

export const ClearNotifsButton: React.FC<{ then: () => void }> = ({ then }) => {
	const [res, clear] = useMutation(ClearNotifsQuery)
	return (
		<Button
			color='#a5a5a5'
			mr={8}
			isLoading={res.fetching}
			onClick={() => clear().then(then)}
			variant='ghost'
			size='xs'
		>
			Clear all
		</Button>
	)
}
