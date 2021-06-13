import {
	Input,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
	Stack,
	ModalHeader,
	ModalFooter,
	Button,
	Text,
} from "@chakra-ui/react"
import { atom, useAtom } from "jotai"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { gql, useMutation } from "urql"
import { User } from "./userAtom"

const UpdateUsernameMutation = gql`
	mutation ($newUsername: String!, $password: String!) {
		updateUsername(newUsername: $newUsername, password: $password) {
			id
			username
			displayName
		}
	}
`

type UpdateUsernameMutationResult = { updateUsername: User }
type UpdateUsernameMutationVars = { newUsername: string; password: string }

export type Reject = () => void
export type Resolve = (username: string) => void
export const ChangeUsernameAtom = atom<{ resolve: Resolve; reject: Reject } | undefined>(undefined)

const empty_reject = () => {}
const empty_resolve = (_: string) => {}

export const ChangeUsernameModal: React.FC<{ username: string }> = ({ username }) => {
	let [params] = useAtom(ChangeUsernameAtom)
	let reject = params?.reject || empty_reject
	let resolve = params?.resolve || empty_resolve
	let enabled = params != undefined

	const [updateUsernameResult, updateUsername] = useMutation<UpdateUsernameMutationResult, UpdateUsernameMutationVars>(
		UpdateUsernameMutation,
	)
	const { register, handleSubmit, errors } = useForm<UpdateUsernameMutationVars>()
	const [isLoading, setIsLoading] = useState(false)
	const [usernameValue, setUsernameValue] = useState(username)

	let gqlError = updateUsernameResult.error && (
		<Text color='red.500'>{updateUsernameResult.error.message.replace(/\[\w+\]/g, "")}</Text>
	)

	const onSubmit = (formData: UpdateUsernameMutationVars) => {
		setIsLoading(true)
		updateUsername(formData).then(({ data }) => {
			setIsLoading(false)
			if (data != undefined) {
				const username = data.updateUsername.username
				resolve(username)
			}
		})
	}

	return (
		<Modal size='xl' isOpen={enabled} onClose={reject}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Change Username</ModalHeader>
				<ModalCloseButton />
				{enabled && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody>
							<Stack spacing={3}>
								<Input
									defaultValue={username}
									value={usernameValue}
									onChange={(e) => setUsernameValue(e.target.value)}
									name='newUsername'
									placeholder='Username'
									ref={register({ required: true })}
								/>
								{errors.newUsername && <Text color='red.500'>This is required</Text>}
								<Input name='password' placeholder='Password' type='password' ref={register({ required: true })} />
								{errors.password && <Text color='red.500'>This is required</Text>}
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

export const useChangeUsername = () => {
	const [, setPromise] = useAtom(ChangeUsernameAtom)
	return () =>
		new Promise((resolve: Resolve, reject: Reject) => {
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
