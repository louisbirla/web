import { Button } from "@chakra-ui/button"
import { Stack, Text } from "@chakra-ui/layout"
import { atom, useAtom } from "jotai"

export type AuthAtomStates = false | "login" | "signup" | "forgot"
export const AuthAtom = atom<AuthAtomStates>(false)

export const TempAuthScreen = () => {
	const [authState, setAuth] = useAtom(AuthAtom)
	return (
		<Stack>
			<Button onClick={() => setAuth(false)}>Back</Button>
			<Text>Auth screens should be here</Text>
			<Text>Need to do {authState}</Text>
		</Stack>
	)
}
