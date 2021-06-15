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

export const UpdatePasswordMutation = gql`
	mutation ($newPassword: String!, $password: String!) {
		updatePassword(newPassword: $newPassword, password: $password) {
			id
			username
		}
	}
`
type UpdatePasswordResult = { updatePassword: User }
type UpdatePasswordVars = { newPassword: string; password: string }

export type Reject = () => void
export type Resolve = (username: string) => void
export const ChangePasswordAtom = atom<{ resolve: Resolve; reject: Reject } | undefined>(undefined)

const empty_reject = () => {}
const empty_resolve = (_: string) => {}

export const ChangePasswordModal: React.FC = () => {
	let [params] = useAtom(ChangePasswordAtom)
	let reject = params?.reject || empty_reject
	let resolve = params?.resolve || empty_resolve
	let enabled = params != undefined

	const [updatePasswordResult, updatePassword] = useMutation<UpdatePasswordResult, UpdatePasswordVars>(
		UpdatePasswordMutation,
	)
	const { register, handleSubmit, watch, errors } = useForm()
	const [isLoading, setIsLoading] = useState(false)

	let gqlError = updatePasswordResult.error && (
		<Text color='red.500'>{updatePasswordResult.error.message.replace(/\[\w+\]/g, "")}</Text>
	)

	const onSubmit = (formData: any) => {
		setIsLoading(true)
		updatePassword(formData).then(({ data }) => {
			setIsLoading(false)
			if (data != undefined) {
				const username = data.updatePassword.username
				resolve(username)
			}
		})
	}

	return (
		<Modal size='xl' isOpen={enabled} onClose={reject}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Change Password</ModalHeader>
				<ModalCloseButton />
				{enabled && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<Stack spacing={3}>
								<Input
									name='password'
									type='password'
									placeholder='Current Password'
									ref={register({ required: true })}
								/>
								{errors.password && <Text color='red.500'>This is required</Text>}
								<Input
									name='newPassword'
									type='password'
									placeholder='New Password'
									ref={register({ required: true })}
								/>
								{errors.newPassword && <Text color='red.500'>This is required</Text>}
								<Input
									name='confirmPassword'
									type='password'
									placeholder='Confirm Password'
									ref={register({
										required: true,
										validate: (value) => value === watch("newPassword") || "Passwords don't match.",
									})}
								/>
								{errors.confirmPassword && (
									<Text color='red.500'>
										{errors.confirmPassword.message != "" ? errors.confirmPassword.message : "This is required."}
									</Text>
								)}
								{gqlError}
							</Stack>
						</ModalBody>
						<ModalFooter>
							<Button type='submit' isLoading={isLoading} colorScheme='blue'>
								Save
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}

export const useChangePassword = () => {
	const [, setPromise] = useAtom(ChangePasswordAtom)
	return () =>
		new Promise((resolve: Resolve, reject) => {
			setPromise({
				reject: () => {
					setPromise(undefined)
					reject()
				},
				resolve: (username) => {
					setPromise(undefined)
					resolve(username)
				},
			})
		})
}
