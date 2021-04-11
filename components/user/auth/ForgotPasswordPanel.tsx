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

export const forgotPasswordPanelOpen = atom(false)

export const ForgotPassword = gql`
	mutation($username: String!) {
		forgotPassword(username: $username) {
			sessionCode
			email
		}
	}
`

export const ConfirmForgotPassword = gql`
	mutation($username: String!, $sessionCode: String!, $verificationCode: String!, $newPassword: String!) {
		confirmForgotPassword(
			username: $username
			sessionCode: $sessionCode
			verificationCode: $verificationCode
			newPassword: $newPassword
		) {
			token
		}
	}
`

type ForgotPasswordResult = { forgotPassword: { sessionCode: string } }
type ForgotPasswordVars = { username: string }

type ConfirmForgotPasswordResult = { confirmForgotPassword: { token: string } }
type ConfirmForgotPasswordVars = {
	username: string
	sessionCode: string
	verificationCode: string
	newPassword: string
}

export const ForgotPasswordPanel: React.FC = () => {
	const [isShown, setShown] = useAtom(forgotPasswordPanelOpen)
	const { register, handleSubmit, errors } = useForm()
	const [isLoading, setIsLoading] = useState(false)
	const [showVerificationCode, setShowVerificationCode] = useState(false)
	const [sessionCode, setSessionCode] = useState("")
	const [readOnlyUserNameField, setReadOnlyUserNameField] = useState(false)

	const [forgotPasswordResult, forgotPassword] = useMutation<ForgotPasswordResult, ForgotPasswordVars>(ForgotPassword)
	const [confirmForgotPasswordResult, confirmForgotPassword] = useMutation<
		ConfirmForgotPasswordResult,
		ConfirmForgotPasswordVars
	>(ConfirmForgotPassword)

	let gqlError = forgotPasswordResult.error ? (
		<Text color='red.500'>{forgotPasswordResult.error.message.replace(/\[\w+\]/g, "")}</Text>
	) : confirmForgotPasswordResult.error ? (
		<Text color='red.500'>{confirmForgotPasswordResult.error.message.replace(/\[\w+\]/g, "")}</Text>
	) : null

	const closePanel = () => {
		setShown(false)
	}

	const onSubmit = (formData: any) => {
		setIsLoading(true)
		if (!formData.verificationCode) {
			const forgotPasswordRequest: ForgotPasswordVars = { username: formData.username }
			forgotPassword(forgotPasswordRequest).then(({ data }) => {
				setIsLoading(false)
				if (data != undefined) {
					const code = data.forgotPassword.sessionCode
					setReadOnlyUserNameField(true)
					setSessionCode(code)
					setShowVerificationCode(true)
				}
			})
		} else {
			const request: ConfirmForgotPasswordVars = {
				username: formData.username,
				newPassword: formData.newPassword,
				sessionCode: sessionCode,
				verificationCode: formData.verificationCode,
			}
			confirmForgotPassword(request).then(({ data }) => {
				setIsLoading(false)
				if (data != undefined) {
					const token = data.confirmForgotPassword.token
					localStorage.setItem("token", token)
					closePanel()
					location.reload()
				}
			})
		}
	}

	return (
		<Modal isOpen={isShown} onClose={closePanel}>
			<ModalOverlay />
			<ModalContent m='auto'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalHeader>Forgot Password</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing={3}>
							<Input
								placeholder='username'
								name='username'
								readOnly={readOnlyUserNameField}
								ref={register({ required: true })}
							/>
							{errors.password && <Text color='red.500'>This is required</Text>}
							{showVerificationCode && (
								<>
									<Input
										name='newPassword'
										type='password'
										placeholder='New Password'
										ref={register({ required: true })}
									/>
									<Input
										name='verificationCode'
										type='text'
										placeholder='Verification code'
										ref={register({ required: true })}
									/>
								</>
							)}
							{errors.verificationCode && <Text color='red.500'>This is required</Text>}
							{gqlError}
						</Stack>
					</ModalBody>
					<ModalFooter>
						<Spacer />
						<Button type='submit' isLoading={isLoading} colorScheme='blue'>
							{showVerificationCode ? "Verify" : "Save"}
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}
