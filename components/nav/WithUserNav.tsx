import { Flex } from "@chakra-ui/react"
import { User } from "../user/userAtom"
import { CreditsMenu } from "./CreditsMenu"
import { CreateBlockButton } from "./CreateBlockButton"
import { UserMenu } from "./UserMenu"

export const WithUserNav: React.FC<{ user: User }> = ({ user }) => {
	return (
		<Flex>
			<CreditsMenu user={user} />
			<UserMenu user={user} />
			<CreateBlockButton />
		</Flex>
	)
}
