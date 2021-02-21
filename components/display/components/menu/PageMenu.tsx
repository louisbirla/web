import { Icon, IconButton, HStack, Button } from "@chakra-ui/react"
import { MenuComponent } from "display-api"
import { Bell, BellOff, Share, Star, User } from "react-feather"
import { StarIcon } from "@chakra-ui/icons"
import { useShareButton } from "./ShareButton"
import { useStarButton } from "./StarButton"
import { useNotificationsButton } from "./NotificationsButton"

export const PageMenu: React.FC<{ menu: MenuComponent }> = ({ menu }) => {
	const [starButton] = useStarButton(menu.block_id, menu.star_button?.starred ?? false)
	const [notificationButton] = useNotificationsButton(menu.block_id, menu.notifications_enabled ?? false)
	const [shareButton] = useShareButton(menu.block_id)
	const props = {
		variant: "ghost",
		color: "#7182a5",
		size: "md",
	}
	return (
		<HStack spacing={0}>
			{menu.star_button && (
				<Button onClick={starButton} aria-label='Toggle star status' {...props}>
					{menu.star_button.starred ? <StarIcon mr={1} /> : <Icon mr={1} as={Star} size={17} />}
					{menu.star_button.count}
				</Button>
			)}
			{menu.notifications_enabled != undefined && (
				<IconButton
					icon={menu.notifications_enabled ? <Icon as={BellOff} size={17} /> : <Icon as={Bell} size={17} />}
					onClick={notificationButton}
					aria-label='Toggle notifications'
					{...props}
				/>
			)}
			{menu.permissions && (
				<Button isDisabled aria-label='Block permissions' {...props}>
					<Icon as={User} size={17} mr={1} />
					{menu.permissions.edit + menu.permissions.full + menu.permissions.view}
				</Button>
			)}
			<IconButton {...props} icon={<Icon as={Share} size={17} />} onClick={shareButton} aria-label='Share block link' />
		</HStack>
	)
}
