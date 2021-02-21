import { gql, useMutation, UseMutationState } from "urql"

export const SetNotificationsQuery = gql`
	mutation($blockId: Int!, $enabled: Boolean!) {
		setNotifs(blockId: $blockId, enabled: $enabled) {
			id
		}
	}
`
export type SetNotificationsResult = { setNotifs: { id: number } }
export type SetNotificationsVars = { blockId: number; enabled: boolean }

export const useNotificationsButton = (
	blockId: number,
	enabled: boolean,
): [() => void, UseMutationState<SetNotificationsResult, SetNotificationsVars>] => {
	const [notifsResult, setNotifs] = useMutation<SetNotificationsResult, SetNotificationsVars>(SetNotificationsQuery)
	const onClick = () => setNotifs({ enabled: !enabled, blockId })
	return [onClick, notifsResult]
}
