import { Button, ButtonGroup, Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { AuthAtom } from "../user/auth/AuthScreen"

export const NoUserNav: React.FC = () => {
	const [, setAuthAtom] = useAtom(AuthAtom)

	return (
		<Flex>
			<ButtonGroup size='sm' isAttached>
				<Button colorScheme='blue' variant='solid' onClick={() => setAuthAtom("login")}>
					Log in
				</Button>
				<Button colorScheme='yellow' variant='solid' onClick={() => setAuthAtom("signup")}>
					Sign up
				</Button>
			</ButtonGroup>
		</Flex>
	)
}
