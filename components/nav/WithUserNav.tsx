import { Flex } from "@chakra-ui/react"
import { User } from "../user/userAtom"
import { CreditsMenu } from "./CreditsMenu"
import { CreateBlockButton } from "./CreateBlockButton"
import { UserMenu } from "./UserMenu"
import { NotificationsMenu } from "./notifications/NotificationsMenu"

export const WithUserNav: React.FC<{ user: User }> = ({ user }) => {
	return (
		<Flex>
			<CreditsMenu user={user} />
			<NotificationsMenu user={user} />
			<UserMenu user={user} />
			<CreateBlockButton />
		</Flex>
	)
}
