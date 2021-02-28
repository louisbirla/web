import { Button } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { Flex, Text } from "@chakra-ui/layout"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/modal"
import { Switch } from "@chakra-ui/switch"
import { RefObject, useRef, useState } from "react"
import { gql, useMutation } from "urql"
import { Icon, Tooltip } from "@chakra-ui/react"
import { Info } from "react-feather"

export const SetVisibilityQuery = gql`
	mutation($blockId: Int!, $public: Boolean!) {
		updateVisibility(public: $public, blockId: $blockId) {
			id
		}
	}
`
export type SetVisibilityArgsVars = { blockId: number; public: boolean }

export const usePermissionButton = (blockId: number, pub: boolean): [JSX.Element, () => void, RefObject<any>] => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef: RefObject<any> = useRef()
	const [visLoading, setVisLoading] = useState(false)
	const [visRes, setVis] = useMutation<{}, SetVisibilityArgsVars>(SetVisibilityQuery)

	const drawer = (
		<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>Block Permissions</DrawerHeader>

					<DrawerBody>
						<Flex width='100%' justifyContent='space-between'>
							<Flex alignItems='center'>
								<Tooltip
									hasArrow
									label='Anybody can see public blocks'
									aria-label='Information about public vs private blocks'
								>
									<Icon as={Info} color='gray' />
								</Tooltip>
								<Text ml={2} display='inline'>
									Public
								</Text>
							</Flex>
							<Switch
								isDisabled={visLoading}
								onClick={() => {
									setVisLoading(true)
									setVis({ public: !pub, blockId })
										.then(() => setVisLoading(false))
										.catch(() => setVisLoading(false))
								}}
								isChecked={pub}
							/>
						</Flex>
						<Text color='red'>{visRes.error?.message}</Text>
					</DrawerBody>

					<DrawerFooter>
						<Button onClick={onClose} colorScheme='orange'>
							Done
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</DrawerOverlay>
		</Drawer>
	)
	return [drawer, onOpen, btnRef]
}
