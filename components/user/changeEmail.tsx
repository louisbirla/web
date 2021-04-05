import {
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	Button,
	ModalFooter,
	Text,
	Stack,
	ModalHeader,
} from "@chakra-ui/react"
import { useState } from "react"
import { atom, useAtom } from "jotai"
import { useForm } from "react-hook-form"
import { gql } from "@urql/core"
import { User } from "./userAtom"
import { useMutation } from "urql"

export const UpdateEmailMutation = gql`
	mutation($newEmail: String!) {
		updateEmail(newEmail: $newEmail) {
			id
			email
			username
		}
	}
`
type UpdateEmailResult = { updatePassword: User }
type UpdateEmailVars = { newPassword: string; password: string }

export type Reject = () => void
export type Resolve = (email: string) => void
export const ChangeEmailAtom = atom<{ resolve: Resolve; reject: Reject } | undefined>(undefined)

const empty_reject = () => {}
// const empty_resolve = (_: string) => {}

export const ChangeEmailModal: React.FC<{ email: string }> = ({ email }) => {
	let [params] = useAtom(ChangeEmailAtom)
	let reject = params?.reject || empty_reject
	// let resolve = params?.resolve || empty_resolve
	let enabled = params != undefined

	const [updateEmailResult /*updateEmail*/] = useMutation<UpdateEmailResult, UpdateEmailVars>(UpdateEmailMutation)
	const { register, handleSubmit, /*watch,*/ errors } = useForm()
	const [isLoading /*setIsLoading*/] = useState(false)
	const [emailValue, setEmailValue] = useState(email)
	const [showVerificationCode, setShowVerificationCode] = useState(false)
	const [disabledEmailField, setDisabledEmailField] = useState(false)

	let gqlError = updateEmailResult.error && (
		<Text color='red.500'>{updateEmailResult.error.message.replace(/\[\w+\]/g, "")}</Text>
	)

	const onSubmit = (formData: any) => {
		console.log(formData)
		setDisabledEmailField(true)
		setShowVerificationCode(true)
		// setIsLoading(true)
		// updateEmail(formData).then(({ data }) => {
		//     setIsLoading(false)
		//     if (data != undefined) {
		//         const email = data.updateEmail.email
		//         resolve(email)
		//     }
		// })
	}

	return (
		<Modal size='xl' isOpen={enabled} onClose={reject}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Change Email</ModalHeader>
				<ModalCloseButton />
				{enabled && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<Stack spacing={3}>
								<Input
									name='email'
									value={emailValue}
									type='email'
									onChange={(e) => setEmailValue(e.target.value)}
									placeholder='Enter new email'
									disabled={disabledEmailField}
									ref={register({ required: true })}
								/>
								{errors.password && <Text color='red.500'>This is required</Text>}
								{showVerificationCode && (
									<Input
										name='verificationCode'
										type='text'
										placeholder='Verification code'
										ref={register({ required: true })}
									/>
								)}
								{errors.verificationCode && <Text color='red.500'>This is required</Text>}
								{gqlError}
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button type='submit' isLoading={isLoading} colorScheme='blue'>
								{showVerificationCode ? "Verify" : "Save"}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}

export const useChangeEmail = () => {
	const [, setPromise] = useAtom(ChangeEmailAtom)
	return () =>
		new Promise((resolve: Resolve, reject) => {
			setPromise({
				reject: () => {
					setPromise(undefined)
					reject()
				},
				resolve: (email) => {
					setPromise(undefined)
					resolve(email)
				},
			})
		})
}
