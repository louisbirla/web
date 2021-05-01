import { Button, IconButton } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Center, Heading, HStack, Spacer, Stack, Text } from "@chakra-ui/layout"
import { useAtom } from "jotai"
import { gql, useMutation } from "urql"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "react-feather"
import { AuthAtom } from "./AuthScreen"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { isThisAnAuthPage } from "../../../utils/isAuthPage"

const SignupMutation = gql`
	mutation($username: String!, $password: String!, $email: String!, $displayName: String) {
		signup(username: $username, password: $password, email: $email, displayName: $displayName) {
			sessionCode
		}
	}
`
type SignupMutationResult = { signup: { sessionCode: string } }
type SignupMutationVars = { username: string; password: string; email: string; displayName?: string }

const ConfirmMutation = `
  mutation ($username: String!, $sessionCode: String!, $verificationCode: String!) {
    confirmEmail(username: $username, sessionCode: $sessionCode, verificationCode: $verificationCode) {
      token
    }
  }
`

type ConfirmMutationResult = { confirmEmail: { token: string } }
type ConfirmMutationVars = { username: string; sessionCode: string; verificationCode: string }

export const SignupForm: React.FC = () => {
	const [sessionCode, setSessionCode] = useState("")
	const [username, setUsername] = useState("")
	const [mode, setMode] = useState<"signup" | "confirm">("signup")

	const afterSignup = (username: string, sessionCode: string) => {
		setUsername(username)
		setSessionCode(sessionCode)
		setMode("confirm")
	}

	const content =
		mode === "signup" ? (
			<SignupStep next={afterSignup} />
		) : (
			<VerificationStep username={username} sessionCode={sessionCode} back={() => setMode("signup")} />
		)

	return content
}

export const SignupStep: React.FC<{ next: (username: string, sessionCode: string) => void }> = ({ next }) => {
	const [, setAuth] = useAtom(AuthAtom)
	const [signupResult, signupMut] = useMutation<SignupMutationResult, SignupMutationVars>(SignupMutation)
	const [isLoading, setIsLoading] = useState(false)
	const { register, handleSubmit } = useForm<SignupMutationVars>()
	const [showPassword, setShowPassword] = useState(false)

	const signup = (formData: SignupMutationVars) => {
		setIsLoading(true)
		signupMut(formData).then(({ data }) => {
			setIsLoading(false)
			if (data != undefined) {
				next(formData.username, data.signup.sessionCode)
			}
		})
	}

	let error = signupResult.error && <Text color='red.500'>{signupResult.error.message.replace(/\[\w+\]/g, "")}</Text>

	return (
		<form onSubmit={handleSubmit(signup)}>
			<Heading textAlign='center' size='lg' pb='4'>
				Sign Up
			</Heading>
			<Stack spacing='6'>
				<Stack>
					<Text color='#778593' fontSize='xs'>
						Display Name
					</Text>
					<Input size='lg' ref={register} name='displayName' />
				</Stack>
				<Stack>
					<Text color='#778593' fontSize='xs'>
						Username
					</Text>
					<Input size='lg' ref={register} name='username' />
				</Stack>
				<Stack>
					<Text color='#778593' fontSize='xs'>
						Email Address
					</Text>
					<Input size='lg' ref={register} name='email' />
				</Stack>
				<Stack>
					<Text color='#778593' fontSize='xs'>
						Password
					</Text>
					<InputGroup size='lg'>
						<Input size='lg' type={showPassword ? "text" : "password"} name='password' ref={register} />
						<InputRightElement>
							<IconButton
								backgroundColor='transparent'
								aria-label='Show/Hide Password'
								icon={showPassword ? <Eye /> : <EyeOff />}
								onClick={() => setShowPassword(!showPassword)}
							/>
						</InputRightElement>
					</InputGroup>
				</Stack>
				{error}
				<Spacer />
				<Button size='lg' type='submit' isLoading={isLoading} colorScheme='blue' variant='solid'>
					Create Free Account
				</Button>
				<HStack alignSelf='center'>
					<Text color='#778593' fontSize='sm'>
						Already have an account?{" "}
					</Text>
					<Button
						colorScheme='blue'
						variant='link'
						onClick={() => {
							setAuth("login")
						}}
					>
						Sign In
					</Button>
				</HStack>
			</Stack>
		</form>
	)
}

export const VerificationStep: React.FC<{ username: string; sessionCode: string; back: () => void }> = ({
	username,
	sessionCode,
	back,
}) => {
	const [confirmResult, confirmMut] = useMutation<ConfirmMutationResult, ConfirmMutationVars>(ConfirmMutation)
	const [, setIsLoading] = useState(false)

	const confirmEmail = (code: string) => {
		setIsLoading(true)
		confirmMut({ username, sessionCode, verificationCode: code }).then(({ data }) => {
			setIsLoading(false)
			if (data != undefined) {
				const token = data.confirmEmail.token
				localStorage.setItem("token", token)
				if (isThisAnAuthPage()) {
					location.href = "/"
				} else {
					location.reload()
				}
			}
		})
	}

	let error = confirmResult.error && <Text color='red.500'>{confirmResult.error.message.replace(/\[\w+\]/g, "")}</Text>

	return (
		<Stack>
			<HStack>
				<IconButton aria-label='back to signup' icon={<ArrowLeft size={20} />} size='xs' onClick={back} />
			</HStack>
			<Heading textAlign='center' size='lg' pb={4}>
				Confirm Email
			</Heading>
			<Heading textAlign='center' size='xs' pb='8' color='#778593'>
				Please enter the 6-digit verification code we sent to your email.
			</Heading>
			<Center>
				<HStack display='inline-block' mb={5} mt={2}>
					<PinInput placeholder='' onComplete={confirmEmail}>
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
						<PinInputField />
					</PinInput>
				</HStack>
			</Center>
			{error}
		</Stack>
	)
}
