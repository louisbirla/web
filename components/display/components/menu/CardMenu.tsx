import { Box, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { MenuComponent } from "display-api"
import { Bell, BellOff, MessageSquare, MoreHorizontal, Share, Star, Trash, User } from "react-feather"
import { StarIcon } from "@chakra-ui/icons"
import { useShareButton } from "./ShareButton"
import { useDeleteBlockButton } from "./DeleteBlockButton"
import { useStarButton } from "./StarButton"
import { useNotificationsButton } from "./NotificationsButton"
import { usePermissionButton } from "./PermissionsButton"
import { CustomMenu } from "./CustomMenu"
import { useCommentsButton } from "./CommentsButton"
import { genActionObject } from "../../ActionObject"
import { IconComponent } from "../Icon"

export const CardMenu: React.FC<{ menu: MenuComponent; margin?: boolean }> = ({ menu, margin }) => {
	const [starButton] = useStarButton(menu.block_id, menu.star_button?.starred ?? false)
	const [notificationButton] = useNotificationsButton(menu.block_id, menu.notifications_enabled ?? false)
	const [shareButton] = useShareButton(menu.block_id)
	const [drawer, openDrawer, btnRef] = usePermissionButton(menu.block_id, menu.permissions?.public ?? false)
	const [commentDrawer, openCommentDrawer, btnCommentRef] = useCommentsButton(menu.block_id)
	const [deleteButton, deleteDialog] = useDeleteBlockButton(menu.block_id)
	let customListed = menu.custom?.filter(({ listed }) => listed)
	let customNotListed = menu.custom?.filter(({ listed }) => !listed)
	return (
		<>
			{customNotListed && <CustomMenu customMenu={customNotListed} margin={margin} />}
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
					{customListed &&
						customListed.map((item) => {
							const [ActionWrap, action] = genActionObject(item.interact)
							return (
								<ActionWrap>
									<MenuItem key={item.text} onClick={action}>
										<Box mr={2}>
											<IconComponent color='none' size={17} name={item.icon} />
										</Box>
										{item.text}
									</MenuItem>
								</ActionWrap>
							)
						})}
					{menu.star_button && (
						<MenuItem onClick={starButton} command={`${menu.star_button.count}`}>
							{menu.star_button.starred ? <StarIcon mr={2} /> : <Icon as={Star} mr={2} size={17} />}
							{menu.star_button.starred ? "Unstar" : "Star"}
						</MenuItem>
					)}
					<>
						<MenuItem onClick={openCommentDrawer} ref={btnCommentRef} command={`${menu.comment_count}`}>
							{<Icon as={MessageSquare} mr={2} size={17} />}
							Comments
						</MenuItem>
					</>
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
			{drawer}
			{commentDrawer}
		</>
	)
}
