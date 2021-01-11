import { Box, Button, Heading, Text, HStack } from '@chakra-ui/core';
import { atom, useAtom } from "jotai"
import { client } from "../../pages/_app"
import { useLogout } from "../../utils/auth"
import { loginPanelOpen } from "./LoginPanel"
import { signupPanelOpen } from './SignupPanel';

const UserQuery = `
  query {
    whoami {
			id
			username
			credits
		}
  }
`

type User = { id: number; username: string; credits: number }
type UserQueryResult = { whoami: User }

export const userAtom = atom(
  async (): Promise<User | null> => {
    let result = await client.query<UserQueryResult>(UserQuery).toPromise()
    if (result.data?.whoami?.username) {
      return result.data?.whoami
    }
    return null
  },
)

export const Welcome: React.FC = () => {
  const [user] = useAtom(userAtom)
  const [, setLoginPanelShown] = useAtom(loginPanelOpen)
  const [, setSignupPanelShown] = useAtom(signupPanelOpen)
  const [logout] = useLogout()

  if (user) {
    return (
      <Box>
        <Button size='xs' colorScheme='red' variant='outline' onClick={logout}>
          Log out
        </Button>
				<Heading pt={3}>Hello, {user.username}</Heading>
				<Text>You are user #{user.id}</Text>
				<Text>You have {user.credits} credits.</Text>
      </Box>
    )
  }

  return (
    <Box>
      <HStack spacing={3}>
        <Button colorScheme='blue' variant='solid' onClick={() => setLoginPanelShown(true)}>
          Log in
        </Button>
        <Button colorScheme='yellow' variant='solid' onClick={() => setSignupPanelShown(true)}>
          Sign up
        </Button>
      </HStack>
    </Box>
  )
}
