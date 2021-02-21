import { useToast, useClipboard } from "@chakra-ui/react"

export const useShareButton = (blockId: number) => {
	const toast = useToast()
	const { onCopy } = useClipboard(`https://app.loop.page/b/${blockId}`)
	const toastShared = () =>
		toast({
			title: "Link Copied to Clipboard",
			description: `The link to block #${blockId} was copied.`,
			status: "info",
			duration: 3000,
		})
	const onClick = () => {
		onCopy()
		toastShared()
	}
	return [onClick]
}
