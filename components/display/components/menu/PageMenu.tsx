import { Icon, IconButton, HStack, Button, Text, Tooltip } from "@chakra-ui/react"
import { MenuComponent } from "display-api"
import { Bell, BellOff, MessageSquare, Share, Star, User } from "react-feather"
import { StarIcon } from "@chakra-ui/icons"
import { useShareButton } from "./ShareButton"
import { useStarButton } from "./StarButton"
import { useNotificationsButton } from "./NotificationsButton"
import { usePermissionButton } from "./PermissionsButton"
import { CustomMenu } from "./CustomMenu"
import { useCommentsButton } from "./CommentsButton"

export const PageMenu: React.FC<{ menu: MenuComponent }> = ({ menu }) => {
	const [starButton] = useStarButton(menu.block_id, menu.star_button?.starred ?? false)
	const [notificationButton] = useNotificationsButton(menu.block_id, menu.notifications_enabled ?? false)
	const [shareButton] = useShareButton(menu.block_id)
	const [drawer, openDrawer, btnRef] = usePermissionButton(menu.block_id, menu.permissions?.public ?? false)
	const [commentDrawer, openCommentDrawer, btnCommentRef] = useCommentsButton(menu.block_id)
	const props = {
		variant: "ghost",
		color: "#7182a5",
		size: "md",
	}
	return (
		<HStack>
			{menu.custom && (
				<>
					<HStack spacing={0}>
						<CustomMenu customMenu={menu.custom} color={props.color} />
					</HStack>
					<Text color='#b3cddb'>|</Text>
				</>
			)}
			<HStack spacing={0}>
				{menu.star_button && (
					<Tooltip hasArrow label={menu.star_button.starred ? "Unstar" : "Star"}>
						<Button onClick={starButton} aria-label='Toggle star status' {...props}>
							{menu.star_button.starred ? <StarIcon mr={1} /> : <Icon mr={1} as={Star} size={17} />}
							{menu.star_button.count}
						</Button>
					</Tooltip>
				)}
				{menu.notifications_enabled != undefined && (
					<Tooltip hasArrow label={menu.notifications_enabled ? "Disable Notifications" : "Enable Notifications"}>
						<IconButton
							icon={menu.notifications_enabled ? <Icon as={BellOff} size={17} /> : <Icon as={Bell} size={17} />}
							onClick={notificationButton}
							aria-label='Toggle notifications'
							{...props}
						/>
					</Tooltip>
				)}
				{menu.permissions && (
					<>
						<Tooltip hasArrow label='Permissions'>
							<Button onClick={openDrawer} ref={btnRef} aria-label='Block permissions' {...props}>
								<Icon as={User} size={17} mr={1} />
								{menu.permissions.edit + menu.permissions.full + menu.permissions.view}
							</Button>
						</Tooltip>
						{drawer}
					</>
				)}
				<>
					<Tooltip hasArrow label='Comments'>
						<Button onClick={openCommentDrawer} ref={btnCommentRef} aria-label='Block Comments' {...props}>
							<Icon as={MessageSquare} size={17} mr={1} />
						</Button>
					</Tooltip>
					{commentDrawer}
				</>
				<Tooltip hasArrow label='Share'>
					<IconButton
						{...props}
						icon={<Icon as={Share} size={17} />}
						onClick={shareButton}
						aria-label='Share block link'
					/>
				</Tooltip>
			</HStack>
		</HStack>
	)
}
