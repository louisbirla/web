import { gql, useMutation, UseMutationState } from "urql"

export const SetStarredQuery = gql`
	mutation($blockId: Int!, $starred: Boolean!) {
		setStarred(blockId: $blockId, starred: $starred) {
			id
		}
	}
`
export type SetStarredResult = { setStarred: { id: number } }
export type SetStarredVars = { blockId: number; starred: boolean }

export const useStarButton = (
	blockId: number,
	starred: boolean,
): [() => void, UseMutationState<SetStarredResult, SetStarredVars>] => {
	const [starredResult, setStarred] = useMutation<SetStarredResult, SetStarredVars>(SetStarredQuery)
	const onClick = () => setStarred({ starred: !starred, blockId })
	return [onClick, starredResult]
}
