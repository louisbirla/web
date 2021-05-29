import { Flex } from "@chakra-ui/layout"
import { gql } from "@urql/core"
import { Button, Input, Tooltip } from "@chakra-ui/react"
import { useState } from "react"
import { useMutation } from "urql"

const UpdateQuery = gql`
	mutation ($newDisplayName: String) {
		updateDisplayName(newDisplayName: $newDisplayName) {
			id
		}
	}
`
type UpdateQueryVars = { newDisplayName: string }

export const EditableDisplayName: React.FC<{ after: () => void; name: string }> = ({ after, name }) => {
	const [editing, setEditing] = useState(false)
	const [value, setValue] = useState(name)
	const [, update] = useMutation<{}, UpdateQueryVars>(UpdateQuery)
	const [loading, setLoading] = useState(false)
	if (editing) {
		return (
			<Flex flexWrap='wrap' textAlign='right' alignItems='center'>
				<Input
					m={1}
					width={300}
					fontWeight='bold'
					fontSize='2xl'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				{name !== value.trim() && (
					<>
						<Button
							isLoading={loading}
							onClick={() => {
								setLoading(true)
								update({ newDisplayName: value }).then(() => {
									after()
									setEditing(false)
									setLoading(false)
								})
							}}
							mx={1}
							size='sm'
							colorScheme='blue'
						>
							Confirm
						</Button>
					</>
				)}
				<Button onClick={() => setEditing(false)} mx={1} size='sm' colorScheme='orange'>
					Cancel
				</Button>
			</Flex>
		)
	}
	return (
		<Tooltip hasArrow label='Edit display name'>
			<Button onClick={() => setEditing(true)} p={0} variant='ghost' fontWeight='bold' fontSize='3xl'>
				{name}
			</Button>
		</Tooltip>
	)
}
