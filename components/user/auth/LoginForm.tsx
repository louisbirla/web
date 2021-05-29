import { Button, IconButton } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Heading, HStack, Spacer, Stack, Text } from "@chakra-ui/layout"
import { useAtom } from "jotai"
import { gql, useMutation } from "urql"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Eye, EyeOff } from "react-feather"
import { AuthAtom } from "./AuthScreen"
import { isThisAnAuthPage } from "../../../utils/isAuthPage"

const LoginMutation = gql`
	mutation ($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
		}
	}
`

type LoginMutationResult = { login: { token: string } }
type LoginMutationVars = { username: string; password: string }

export const LoginForm = () => {
	const [, setAuth] = useAtom(AuthAtom)
	const { register, handleSubmit } = useForm<LoginMutationVars>()
	const [isLoading, setIsLoading] = useState(false)
	const [loginResult, loginMut] = useMutation<LoginMutationResult, LoginMutationVars>(LoginMutation)
	const [showPassword, setShowPassword] = useState(false)

	let error = loginResult.error && <Text color='red.500'>{loginResult.error.message.replace(/\[\w+\]/g, "")}</Text>

	const login = (data: LoginMutationVars) => {
		setIsLoading(true)
		loginMut(data).then(({ data }) => {
			setIsLoading(false)
			if (data != undefined) {
				const token = data.login.token
				localStorage.setItem("token", token)
				if (isThisAnAuthPage()) {
					location.href = "/"
				} else {
					location.reload()
				}
			}
		})
	}

	return (
		<form onSubmit={handleSubmit(login)}>
			<Heading textAlign='center' size='lg' pb='4'>
				Log In
			</Heading>
			<Heading textAlign='center' size='xs' pb='8' color='#778593'>
				Login to start boosting your productivity!
			</Heading>
			<Stack spacing='6'>
				<Stack>
					<Text color='#778593' fontSize='xs'>
						Username
					</Text>
					<Input size='lg' ref={register} name='username' />
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
					Log In
				</Button>
				<HStack alignSelf='center'>
					<Text color='#778593' fontSize='sm'>
						Don't have an account?{" "}
					</Text>
					<Button
						colorScheme='blue'
						variant='link'
						onClick={() => {
							setAuth("signup")
						}}
					>
						Sign Up
					</Button>
				</HStack>
				<Button
					colorScheme='blue'
					variant='link'
					onClick={() => {
						setAuth("forgot")
					}}
				>
					Forgot Password?
				</Button>
			</Stack>
		</form>
	)
}
