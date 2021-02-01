import { Box, Button } from "@chakra-ui/core"
import { User } from "../user/userAtom"

export const CreditsMenu: React.FC<{ user: User }> = ({ user }) => {
	return (
		<Box display='block'>
			<Button color='#9ca1a6' size='sm' variant='nostyle'>
				{user.credits} credits
			</Button>
		</Box>
	)
}
