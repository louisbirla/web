import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react"
import { atom, useAtom } from "jotai"
import { gql, useMutation } from "urql"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { forgotPasswordPanelOpen } from "./ForgotPasswordPanel"

export const loginPanelOpen = atom(false)

const LoginMutation = gql`
	mutation($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			token
		}
	}
`

type LoginMutationResult = { login: { token: string } }

type LoginMutationVars = { username: string; password: string }

export const LoginPanel: React.FC = () => {
	const [isShown, setShown] = useAtom(loginPanelOpen)
	const [loginResult, loginMut] = useMutation<LoginMutationResult, LoginMutationVars>(LoginMutation)
	const { register, handleSubmit } = useForm<LoginMutationVars>()
	const [isLoading, setIsLoading] = useState(false)
	const [, setForgotPasswordPanelShown] = useAtom(forgotPasswordPanelOpen)
	const [, setLoginPanelShown] = useAtom(loginPanelOpen)

	const closePanel = () => {
		setShown(false)
	}

	const login = (data: LoginMutationVars) => {
		setIsLoading(true)
		loginMut(data).then(({ data }) => {
			setIsLoading(false)
			if (data != undefined) {
				const token = data.login.token
				localStorage.setItem("token", token)
				closePanel()
				location.reload()
			}
		})
	}

	let error = loginResult.error && <Text color='red.500'>{loginResult.error.message.replace(/\[\w+\]/g, "")}</Text>

	return (
		<Modal isOpen={isShown} onClose={closePanel}>
			<ModalOverlay />
			<ModalContent m='auto'>
				<form onSubmit={handleSubmit(login)}>
					<ModalHeader>Log In</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={3}>
							<Input ref={register} placeholder='username' name='username' />
							<Input placeholder='password' type='password' name='password' ref={register} />
						</Stack>
						{error}
					</ModalBody>
					<ModalFooter>
						<Button
							size='sm'
							isLoading={isLoading}
							colorScheme='blue'
							variant='link'
							onClick={() => {
								setLoginPanelShown(false)
								setForgotPasswordPanelShown(true)
							}}
						>
							Forgot Password?
						</Button>
						<Spacer />
						<Button type='submit' isLoading={isLoading} colorScheme='blue' variant='outline'>
							Log In
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}
