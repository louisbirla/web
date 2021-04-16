import { Center, HStack, Stack, VStack } from "@chakra-ui/layout"
import { IconButton, Image } from "@chakra-ui/react"
import { atom, useAtom } from "jotai"
import { ArrowLeft } from "react-feather"
import { Card } from "../../display/components/Card"
import { ForgotPasswordForm } from "./ForgotPasswordForm"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

export type AuthAtomStates = false | "login" | "signup" | "forgot"
export const AuthAtom = atom<AuthAtomStates>(false)

export const AuthScreen = () => {
	const [authState, setAuth] = useAtom(AuthAtom)

	return (
		<Stack minH='100vh' bgImage={"url(/login-background.svg)"} backgroundSize='cover' bgRepeat='no-repeat'>
			<Center mt='10'>
				<VStack>
					<HStack w='full'>
						<IconButton
							aria-label='back to signup'
							icon={<ArrowLeft size={20} />}
							size='xs'
							onClick={() => {
								setAuth(false)
							}}
						/>
					</HStack>
					<Image src='/light-logo.svg' height='20' alt='Loop Logo' />
					<Card w='lg' p='16'>
						{authState === "login" && <LoginForm />}
						{authState === "signup" && <SignupForm />}
						{authState === "forgot" && <ForgotPasswordForm />}
					</Card>
				</VStack>
			</Center>
		</Stack>
	)
}
