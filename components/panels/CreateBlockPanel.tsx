import {
	Box,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Spinner,
	Text,
} from "@chakra-ui/react"
import { CreationObject } from "display-api"
import { gql, useQuery, useMutation } from "urql"
import { ComponentDelegate } from "../display/ComponentDelegate"
import { Button } from "@chakra-ui/react"
import { populate_template } from "../display/method"
import { atom, useAtom } from "jotai"
import { useState } from "react"

export type CreateReject = () => void
export type CreateResolve = (id: number) => void
export const CreateBlockAtom = atom<{ resolve: CreateResolve; reject: CreateReject; type: string } | undefined>(
	undefined,
)

const CreateBlockQuery = gql`
	mutation($type: String!, $input: String!) {
		createBlock(type: $type, input: $input) {
			id
		}
	}
`

type CreateBlockResult = { createBlock: { id: number } }
type CreateBlockArgs = { type: string; input: string }

const CreationDisplayQuery = gql`
	query($type: String!) {
		blockCreationDisplay(type: $type)
	}
`

type CreationDisplayResult = { blockCreationDisplay: string }
type CreationDisplayArgs = { type: string }

const empty_reject = () => {}
const def_resolve = (id: number) => {
	location.href = `/b/${id}`
}
export const CreateBlockPanel: React.FC = () => {
	const [params] = useAtom(CreateBlockAtom)
	let reject = params?.reject || empty_reject
	let resolve = params?.resolve || def_resolve
	let type = params?.type || ""
	let enabled = params != undefined

	return (
		<Modal isOpen={enabled} onClose={reject}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				{enabled && <CreateBlockContent done={resolve} type={type} />}
			</ModalContent>
		</Modal>
	)
}

const CreateBlockContent: React.FC<{ type: string; done: (id: number) => void }> = ({ type, done }) => {
	let [error, setError] = useState<string>()
	let [, createBlockMut] = useMutation<CreateBlockResult, CreateBlockArgs>(CreateBlockQuery)
	let [displayResult] = useQuery<CreationDisplayResult, CreationDisplayArgs>({
		query: CreationDisplayQuery,
		variables: { type },
	})

	const createBlock = async (template: string) => {
		let input = populate_template(template)
		const res = await createBlockMut({
			type,
			input,
		})

		if (res.error) {
			setError(res.error.message)
		} else if (res.data?.createBlock.id) {
			done(res.data?.createBlock.id)
		} else {
			alert("Something broke")
		}
	}

	if (displayResult.data?.blockCreationDisplay != undefined) {
		let creationObject: CreationObject = JSON.parse(displayResult.data.blockCreationDisplay)
		return (
			<>
				<ModalBody>
					<Box mb={5}>
						<ComponentDelegate env='create' component={creationObject.header_component} />
					</Box>
					<ComponentDelegate env='create' component={creationObject.main_component} />
					{error && <Text color='red'>{error}</Text>}
				</ModalBody>
				<ModalFooter>
					<Button mt={4} colorScheme='blue' color='white' onClick={() => createBlock(creationObject.input_template)}>
						Create
					</Button>
				</ModalFooter>
			</>
		)
	}

	if (displayResult.error?.message) {
		return (
			<ModalBody>
				<Text color='red'>{displayResult.error.message}</Text>
			</ModalBody>
		)
	}
	return (
		<ModalBody>
			<Spinner />
		</ModalBody>
	)
}

export const useCreateBlock = () => {
	const [, setPromise] = useAtom(CreateBlockAtom)
	return (type: string) =>
		new Promise((resolve: CreateResolve, reject) => {
			setPromise({
				reject: () => {
					setPromise(undefined)
					reject()
				},
				resolve: (id) => {
					setPromise(undefined)
					resolve(id)
				},
				type,
			})
		})
}
