import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
} from "@chakra-ui/modal"
import { useRef, useState } from "react"
import { gql, useMutation } from "urql"
import { Button } from "@chakra-ui/react"

export const DeleteBlockQuery = gql`
	mutation ($blockId: Int!) {
		deleteBlock(blockId: $blockId)
	}
`
export type DeleteBlockVars = { blockId: number }

export const useDeleteBlockButton = (blockId: number): [() => void, JSX.Element] => {
	const [deleteBlockResult, doDelete] = useMutation<{}, DeleteBlockVars>(DeleteBlockQuery)
	const [confirmOpen, setConfirmOpen] = useState(false)
	const onClose = () => setConfirmOpen(false)
	const deleteBlock = () => {
		doDelete({ blockId }).then(() => onClose())
	}
	const cancelRef: any = useRef()
	const onClick = () => setConfirmOpen(true)
	const dialog = (
		<AlertDialog isOpen={confirmOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
			<AlertDialogOverlay>
				<AlertDialogContent>
					<AlertDialogHeader fontSize='lg' fontWeight='bold'>
						Delete Block
					</AlertDialogHeader>

					<AlertDialogBody>
						Are you sure? You can't undo this action afterwards.{" "}
						<b>As of Feb 20, deleting a block does not work, a fix will be rolled out soon.</b>
					</AlertDialogBody>

					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>
							Cancel
						</Button>
						<Button isLoading={deleteBlockResult.fetching} colorScheme='red' onClick={deleteBlock} ml={3}>
							Delete
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	)
	return [onClick, dialog]
}
