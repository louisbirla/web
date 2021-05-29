import { Button, IconButton } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Heading, Spacer, Stack, Text } from "@chakra-ui/layout"
import { useAtom } from "jotai"
import { gql, useMutation } from "urql"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "react-feather"
import { AuthAtom } from "./AuthScreen"

export const ForgotPassword = gql`
	mutation ($username: String!) {
		forgotPassword(username: $username) {
			sessionCode
			email
		}
	}
`

export const ConfirmForgotPassword = gql`
	mutation ($username: String!, $sessionCode: String!, $verificationCode: String!, $newPassword: String!) {
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

export const ForgotPasswordForm = () => {
	const [, setAuth] = useAtom(AuthAtom)
	const { register, handleSubmit, errors } = useForm()
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [sessionCode, setSessionCode] = useState("")
	const [showVerificationCode, setShowVerificationCode] = useState(false)
	const [readOnlyUserNameField, setReadOnlyUserNameField] = useState(false)

	const [forgotPasswordResult, forgotPassword] = useMutation<ForgotPasswordResult, ForgotPasswordVars>(ForgotPassword)
	const [confirmForgotPasswordResult, confirmForgotPassword] =
		useMutation<ConfirmForgotPasswordResult, ConfirmForgotPasswordVars>(ConfirmForgotPassword)

	let error = forgotPasswordResult.error ? (
		<Text color='red.500'>{forgotPasswordResult.error.message.replace(/\[\w+\]/g, "")}</Text>
	) : confirmForgotPasswordResult.error ? (
		<Text color='red.500'>{confirmForgotPasswordResult.error.message.replace(/\[\w+\]/g, "")}</Text>
	) : null

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
					location.reload()
				}
			})
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<IconButton
				aria-label='back to signup'
				icon={<ArrowLeft size={20} />}
				size='xs'
				onClick={() => {
					setAuth("login")
				}}
			/>
			<Heading textAlign='center' size='lg' pb={4}>
				Forgot Password
			</Heading>
			<Heading textAlign='center' size='xs' pb='8' color='#778593'>
				Enter your username to reset password
			</Heading>
			<Stack spacing='6'>
				<Stack>
					<Text color='#778593' fontSize='xs'>
						Username
					</Text>
					<Input size='lg' name='username' readOnly={readOnlyUserNameField} ref={register({ required: true })} />
					{errors.username && <Text color='red.500'>This is required</Text>}
				</Stack>
				{showVerificationCode && (
					<>
						<Stack>
							<Text color='#778593' fontSize='xs'>
								New Password
							</Text>
							<InputGroup size='lg'>
								<Input
									size='lg'
									type={showPassword ? "text" : "password"}
									name='newPassword'
									ref={register({ required: true })}
								/>
								<InputRightElement>
									<IconButton
										backgroundColor='transparent'
										aria-label='Show/Hide Password'
										icon={showPassword ? <Eye /> : <EyeOff />}
										onClick={() => setShowPassword(!showPassword)}
									/>
								</InputRightElement>
							</InputGroup>
							{errors.newPassword && <Text color='red.500'>This is required</Text>}
						</Stack>
						<Stack>
							<Text color='#778593' fontSize='xs'>
								Verification Code
							</Text>
							<Input size='lg' name='verificationCode' type='text' ref={register({ required: true })} />
							{errors.verificationCode && <Text color='red.500'>This is required</Text>}
						</Stack>
					</>
				)}
				{error}
				<Spacer />
				<Button size='lg' type='submit' isLoading={isLoading} colorScheme='blue' variant='solid'>
					{showVerificationCode ? "Verify" : "Continue"}
				</Button>
			</Stack>
		</form>
	)
}
