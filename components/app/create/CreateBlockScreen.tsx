import { Box, Spinner, Text } from "@chakra-ui/core"
import { CreationObject } from "display-api"
import { gql, useQuery, useMutation } from "urql"
import { ComponentDelegate } from "../display/ComponentDelegate"
import { Button } from "@chakra-ui/core"

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

export const CreateBlockScreen: React.FC<{ type: string; done: () => void }> = ({ type, done }) => {
	let [, createBlockMut] = useMutation<CreateBlockResult, CreateBlockArgs>(CreateBlockQuery)
	let [displayResult] = useQuery<CreationDisplayResult, CreationDisplayArgs>({
		query: CreationDisplayQuery,
		variables: { type },
	})

	const createBlock = async (template: string) => {
		let input = template
		let vars = template.match(/\$\[[\w\d]+\]\$/g)
		if (vars) {
			vars.forEach((wrappedName: string) => {
				const name = wrappedName.replace(/[\$\[\]]/g, "")
				const value = localStorage.getItem(`loop_davar_${name}`)
				if (value) {
					input = input.replace(wrappedName, value)
				}
			})
		}
		const res = await createBlockMut({
			type: "data",
			input,
		})

		if (res.data?.createBlock?.id != undefined) {
			done()
		}
	}

	if (displayResult.data?.blockCreationDisplay != undefined) {
		let creationObject: CreationObject = JSON.parse(displayResult.data.blockCreationDisplay)
		return (
			<Box>
				<ComponentDelegate component={creationObject.header_component} />
				<ComponentDelegate component={creationObject.main_component} />
				<Button mt={5} colorScheme='purple' onClick={() => createBlock(creationObject.input_template)}>
					Create
				</Button>
			</Box>
		)
	}

	if (displayResult.error?.message) {
		return <Text color='red'>{displayResult.error.message}</Text>
	}
	return <Spinner />
}
