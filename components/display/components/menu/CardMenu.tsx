import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { MenuComponent } from "display-api"
import { Bell, BellOff, MoreHorizontal, Share, Star, Trash, User } from "react-feather"
import { StarIcon } from "@chakra-ui/icons"
import { useShareButton } from "./ShareButton"
import { useDeleteBlockButton } from "./DeleteBlockButton"
import { useStarButton } from "./StarButton"
import { useNotificationsButton } from "./NotificationsButton"
import { usePermissionButton } from "./PermissionsButton"
import { CustomMenu } from "./CustomMenu"

export const CardMenu: React.FC<{ menu: MenuComponent }> = ({ menu }) => {
	const [starButton] = useStarButton(menu.block_id, menu.star_button?.starred ?? false)
	const [notificationButton] = useNotificationsButton(menu.block_id, menu.notifications_enabled ?? false)
	const [shareButton] = useShareButton(menu.block_id)
	const [drawer, openDrawer, btnRef] = usePermissionButton(menu.block_id, menu.permissions?.public ?? false)
	const [deleteButton, deleteDialog] = useDeleteBlockButton(menu.block_id)
	return (
		<>
			<Menu closeOnSelect={false}>
				<MenuButton
					as={IconButton}
					size='xs'
					aria-label='Menu'
					icon={<MoreHorizontal size={30} />}
					color='#b3cddb'
					variant='nostyle'
				/>
				<MenuList>
					{menu.star_button && (
						<MenuItem onClick={starButton} command={`${menu.star_button.count}`}>
							{menu.star_button.starred ? <StarIcon mr={2} /> : <Icon as={Star} mr={2} size={17} />}
							{menu.star_button.starred ? "Unstar" : "Star"}
						</MenuItem>
					)}
					{menu.notifications_enabled != undefined && (
						<MenuItem onClick={notificationButton}>
							{menu.notifications_enabled ? (
								<Icon as={BellOff} mr={2} size={17} />
							) : (
								<Icon as={Bell} mr={2} size={17} />
							)}
							{menu.notifications_enabled ? "Disable Notifications" : "Enable Notifications"}
						</MenuItem>
					)}
					{menu.permissions && (
						<>
							<MenuItem
								onClick={openDrawer}
								ref={btnRef}
								command={`${menu.permissions.edit + menu.permissions.full + menu.permissions.view}`}
							>
								{<Icon as={User} mr={2} size={17} />}
								Permissions
							</MenuItem>
							{drawer}
						</>
					)}
					{menu.delete && (
						<MenuItem onClick={deleteButton} disabled>
							{<Icon as={Trash} mr={2} size={17} />}
							Delete Block
						</MenuItem>
					)}
					{deleteDialog}
					<MenuItem onClick={shareButton}>
						<Icon as={Share} mr={2} size={17} />
						Share
					</MenuItem>
				</MenuList>
			</Menu>
			{menu.custom && <CustomMenu customMenu={menu.custom} />}
		</>
	)
}
