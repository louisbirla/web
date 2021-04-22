import { useDisclosure } from "@chakra-ui/hooks"
import { Divider, Flex, List, ListItem, Text } from "@chakra-ui/layout"
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
} from "@chakra-ui/modal"
import { RefObject, useRef } from "react"
import { gql, useQuery } from "urql"
import { ComponentObject } from "display-api"
import { ComponentDelegate } from "../../ComponentDelegate"
import { BadgeComponent } from "../Badge"
import { Button } from "@chakra-ui/button"
import { format } from "date-fns"

const allUpdates = gql`
	query {
		allUpdates {
			id
			display
			createdAt
			seen
		}
	}
`

type Update = {
	id: number
	display: string
	createdAt: string
	seen: boolean
}
type UpdatesResult = { allUpdates: Array<Update> }

export const useUpdatesButton = (): [JSX.Element, () => void, RefObject<any>] => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef: RefObject<any> = useRef()

	const [updatesResponse] = useQuery<UpdatesResult>({
		query: allUpdates,
	})

	const updates = updatesResponse.data?.allUpdates

	const drawer = (
		<Drawer size='md' isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
			<DrawerOverlay>
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>{"What's New?"}</DrawerHeader>
					<DrawerBody>
						{updates?.length === 0 ? (
							<Text>There are no new updates</Text>
						) : (
							<List>
								{updates &&
									updates.map((update: Update) => {
										return (
											<>
												<ListItem pt='6' pb='4'>
													<RenderUpdateItem update={update} />
												</ListItem>
												<Divider />
											</>
										)
									})}
							</List>
						)}
					</DrawerBody>
					<DrawerFooter borderTop='1px' borderColor='#DCDCDC'>
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

export const RenderUpdateItem: React.FC<{ update: Update }> = ({ update }) => {
	const display: ComponentObject = JSON.parse(update.display)
	const date = new Date(update.createdAt) 
	const dateStr = format(date, 'MM/dd/yyyy')
	return (
		<>
			<Flex mb={4} width='100%' justifyContent='space-between' align='center'>
				<Text color='#333333' fontSize='md' fontWeight='bold'>
					What's New {date && `- ${dateStr}`}
				</Text>
				{!update.seen && <BadgeComponent text='New' variant='Outline' />}
			</Flex>
			<ComponentDelegate component={display} />
		</>
	)
}