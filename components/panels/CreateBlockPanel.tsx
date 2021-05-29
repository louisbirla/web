import { Box, Flex, Spinner, Stack, Text } from "@chakra-ui/react"
import { CreationObject } from "display-api"
import { gql, useQuery, useMutation } from "urql"
import { ComponentDelegate } from "../display/ComponentDelegate"
import { Button } from "@chakra-ui/react"
import { populate_template } from "../display/method"
import { atom, useAtom } from "jotai"
import { useState } from "react"
import { Card } from "../display/components/Card"
import { blue } from "../../utils/theme/colors"

export type CreateReject = () => void
export type CreateResolve = (id: number) => void
export const CreateBlockAtom =
	atom<{ resolve: CreateResolve; reject: CreateReject; type: string } | undefined>(undefined)

const CreateBlockQuery = gql`
	mutation ($type: String!, $input: String!) {
		createBlock(type: $type, input: $input) {
			id
		}
	}
`

type CreateBlockResult = { createBlock: { id: number } }
type CreateBlockArgs = { type: string; input: string }

const CreationDisplayQuery = gql`
	query ($type: String!) {
		blockCreationDisplay(type: $type)
	}
`

type CreationDisplayResult = { blockCreationDisplay: string }
type CreationDisplayArgs = { type: string }

const empty_reject = () => {}
const def_resolve = (id: number) => {
	location.href = `/b/${id}`
}
export const WithCreateBlock: React.FC = ({ children }) => {
	const [params] = useAtom(CreateBlockAtom)
	let reject = params?.reject || empty_reject
	let resolve = params?.resolve || def_resolve
	let type = params?.type || ""
	let enabled = params != undefined

	if (enabled) {
		return <CreateBlockContent done={resolve} type={type} cancel={reject} />
	}

	return <>{children}</>
}

const CreateBlockContent: React.FC<{ type: string; done: (id: number) => void; cancel: () => void }> = ({
	type,
	done,
	cancel,
}) => {
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
				<Box mt='4rem' mb={4} display='block'>
					<Flex width='100%' justifyContent='space-between'>
						<Box>
							<ComponentDelegate env='create' component={creationObject.header_component} />
						</Box>
						<Stack direction='row' spacing={4} align='center'>
							<Button variant='outline' colorScheme='blue' onClick={cancel}>
								Cancel
							</Button>
							<Button mt={4} colorScheme='blue' onClick={() => createBlock(creationObject.input_template)}>
								Create
							</Button>
						</Stack>
					</Flex>
				</Box>
				<Box>
					{error && <Text color='red'>{error}</Text>}
					<Card maxW='60em' py={6} borderLeft={`3px solid ${blue[500]}`}>
						<ComponentDelegate env='create' component={creationObject.main_component} />
					</Card>
				</Box>
			</>
		)
	}

	if (displayResult.error?.message) {
		return <Text color='red'>{displayResult.error.message}</Text>
	}
	return <Spinner />
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
