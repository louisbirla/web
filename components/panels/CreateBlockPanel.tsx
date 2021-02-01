import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
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

export const createBlockAtom = atom<string | undefined>(undefined)

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

export const CreateBlockPanel: React.FC = () => {
	const [creating, setCreating] = useAtom(createBlockAtom)
	let close = () => setCreating(undefined)

	return (
		<Modal isOpen={creating !== undefined} onClose={close}>
			<ModalOverlay />
			<ModalContent>
				<ModalCloseButton />
				{creating && <CreateBlockContent done={close} type={creating} />}
			</ModalContent>
		</Modal>
	)
}

const CreateBlockContent: React.FC<{ type: string; done: () => void }> = ({ type, done }) => {
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
		} else {
			done()
		}
	}

	if (displayResult.data?.blockCreationDisplay != undefined) {
		let creationObject: CreationObject = JSON.parse(displayResult.data.blockCreationDisplay)
		return (
			<>
				<ModalHeader>
					<ComponentDelegate component={creationObject.header_component} />
				</ModalHeader>
				<ModalBody>
					<ComponentDelegate component={creationObject.main_component} />
					{error && <Text colorScheme='red'>{error}</Text>}
				</ModalBody>
				<ModalFooter>
					<Button mt={5} colorScheme='blue' color='white' onClick={() => createBlock(creationObject.input_template)}>
						Create
					</Button>
				</ModalFooter>
			</>
		)
	}

	if (displayResult.error?.message) {
		return (
			<ModalBody>
				<Text colorScheme='red'>{displayResult.error.message}</Text>
			</ModalBody>
		)
	}
	return (
		<ModalBody>
			<Spinner />
		</ModalBody>
	)
}
