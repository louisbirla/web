import { Box, Button, Icon, MenuButton, MenuItem, MenuList, Menu, Avatar } from "@chakra-ui/react"
import { ChevronDown, HelpCircle, LogOut, User as UserIcon, Info } from "react-feather"
import Link from "next/link"
import { User } from "../user/userAtom"
import { useLogout } from "../../utils/auth"
import { useUpdatesButton } from "../display/components/menu/WhatsNewButton"

export const UserMenu: React.FC<{ user: User }> = ({ user }) => {
	const [logout] = useLogout()
	const [drawer, openDrawer, btnRef] = useUpdatesButton()

	return (
		<>
			<Box ml={4}>
				<Menu>
					<MenuButton
						size='sm'
						as={Button}
						rightIcon={<Icon as={ChevronDown} />}
						leftIcon={<Avatar size='xs' name={user.displayName || user.username} />}
						variant='nostyle'
						color='white'
					>
						{user.displayName || user.username}
					</MenuButton>
					<MenuList>
						<Link href={`/u/${user.username}`}>
							<MenuItem>
								<Icon as={UserIcon} mr={2} />
							Profile
							</MenuItem>
						</Link>
						<MenuItem ref={btnRef} onClick={openDrawer}>
							<Icon as={Info} mr={2} />
							What's New?
						</MenuItem>
						<Link href={`/help`}>
							<MenuItem>
								<Icon as={HelpCircle} mr={2} />
								Help
							</MenuItem>
						</Link>
						<MenuItem onClick={logout}>
							<Icon as={LogOut} mr={2} />
							Log Out
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
			{drawer}
		</>
	)
}
