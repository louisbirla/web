import { Button, ButtonGroup, Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { loginPanelOpen } from "../user/auth/LoginPanel"
import { signupPanelOpen } from "../user/auth/SignupPanel"

export const NoUserNav: React.FC = () => {
	const [, setLoginPanelShown] = useAtom(loginPanelOpen)
	const [, setSignupPanelShown] = useAtom(signupPanelOpen)

	return (
		<Flex>
			<ButtonGroup size='sm' isAttached>
				<Button colorScheme='blue' variant='solid' onClick={() => setLoginPanelShown(true)}>
					Log in
				</Button>
				<Button colorScheme='yellow' variant='solid' onClick={() => setSignupPanelShown(true)}>
					Sign up
				</Button>
			</ButtonGroup>
		</Flex>
	)
}
