import { Flex } from "@chakra-ui/react"
import { User } from "../user/userAtom"
import { CreateBlockButton } from "./CreateBlockButton"
import { UserMenu } from "./UserMenu"
import { NotificationsMenu } from "./notifications/NotificationsMenu"

export const WithUserNav: React.FC<{ user: User }> = ({ user }) => {
	return (
		<Flex>
			<NotificationsMenu />
			<UserMenu user={user} />
			<CreateBlockButton />
		</Flex>
	)
}
