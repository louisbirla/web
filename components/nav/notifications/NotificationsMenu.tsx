import {
	Box,
	Flex,
	IconButton,
	Link,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	StackDivider,
	Text,
} from "@chakra-ui/react"
import { gql } from "@urql/core"
import { Bell } from "react-feather"
import { useMutation, useQuery, useSubscription } from "urql"
import { Stack } from "@chakra-ui/react"
import { ClearNotifsButton } from "./ClearNotifsButton"
import { isToday, formatDistance, isYesterday, format } from "date-fns"
import NextLink from "next/link"
import { bg, yellow } from "../../../utils/theme/colors"
import { SmallCloseIcon } from "@chakra-ui/icons"

const NotificationsQuery = gql`
	query {
		notifications {
			name
			description
			blockLink
			id
			time
		}
	}
`
const NewNotifications = gql`
	subscription($token: String) {
		notifications(token: $token) {
			name
			description
			blockLink
			id
			time
		}
	}
`
type Notification = {
	name: string
	description: string
	blockLink?: number
	id: number
	time?: string
}
type NotificationsResponse = { notifications: Notification[] }

export const NotificationsMenu: React.FC = () => {
	let [res, refetch] = useQuery<NotificationsResponse>({ query: NotificationsQuery, requestPolicy: "network-only" })
	let notifs = res.data?.notifications ?? []
	let token = localStorage.getItem("token")
	let [] = useSubscription<{ notifications: Notification }>(
		{ query: NewNotifications, variables: { token } },
		(_, res) => {
			refetch()
			return res
		},
	)
	return (
		<Box display='block'>
			<Popover>
				<PopoverTrigger>
					<IconButton
						height={9}
						width={3}
						icon={
							<>
								<Bell size={20} />
								{notifs.length > 0 && (
									<Box
										m={0}
										width={2}
										height={2}
										rounded='full'
										position='relative'
										bottom={2}
										right={2}
										bg={yellow[400]}
									/>
								)}
							</>
						}
						color='#9ca1a6'
						variant='nostyle'
						aria-label='Notifications'
					/>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverCloseButton />
					<PopoverHeader display='flex' justifyContent='space-between'>
						Notifications {notifs.length > 0 && <ClearNotifsButton then={refetch} />}
					</PopoverHeader>
					<PopoverBody>
						{notifs.length > 0 ? (
							<>
								<Stack maxH='80vh' overflow='scroll' divider={<StackDivider borderColor='gray.200' />}>
									{notifs.map((notif) => (
										<NotificationComponent key={notif.id} notif={notif} afterClear={refetch} />
									))}
								</Stack>
							</>
						) : (
							<Text>You have no new notifications</Text>
						)}
					</PopoverBody>
				</PopoverContent>
			</Popover>
		</Box>
	)
}

const ClearOneNotifQuery = gql`
	mutation($id: Int) {
		clearOneNotif(id: $id)
	}
`
type ClearOneNotifVars = { id: number }

const NotificationComponent: React.FC<{ notif: Notification; afterClear: () => void }> = ({ notif, afterClear }) => {
	const [res, clear] = useMutation<{}, ClearOneNotifVars>(ClearOneNotifQuery)
	let timing = ""
	if (notif.time) {
		let date = new Date(notif.time)
		if (isToday(date)) {
			timing = `Today, ${formatDistance(date, new Date(), { addSuffix: true, includeSeconds: true })}`
		} else if (isYesterday(date)) {
			timing = `Yesterday, at ${format(date, "p")}`
		} else {
			timing = format(date, "PP', at 'p")
		}
	}
	let content = (
		<Box p={2}>
			<Text fontWeight='medium'>{notif.name}</Text>
			<Text color='#a5a5a5'>{notif.description}</Text>
			<Text color='#a5a5a5' opacity={0.68} fontSize='sm'>
				{timing}
			</Text>
		</Box>
	)
	if (notif.blockLink != null) {
		content = (
			<Link as={NextLink} href={`/b/${notif.blockLink}`}>
				<Box rounded='md' cursor='pointer' _hover={{ bg }}>
					{content}
				</Box>
			</Link>
		)
	}
	return (
		<Flex alignItems='center'>
			<IconButton
				isLoading={res.fetching}
				onClick={() => clear({ id: notif.id }).then(afterClear)}
				color='#a5a5a5'
				variant='ghost'
				size='xs'
				icon={<SmallCloseIcon />}
				aria-label='Clear one notification'
			/>
			{content}
		</Flex>
	)
}
