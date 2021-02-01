import { Box, Heading, Text, Flex } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { gql, useQuery } from "urql"
import { EmbedBlock } from "../display/EmbedBlock"
import { userAtom } from "../user/userAtom"

const UserBlocks = gql`
	query($id: Int!) {
		userById(id: $id) {
			blocks {
				id
				embedDisplay
			}
		}
	}
`

type UserBlocksResult = { userById: { blocks: Array<{ id: number; embedDisplay: string }> } }
type UserBlocksVars = { id: number }

export const Dashboard: React.FC = () => {
	const [user] = useAtom(userAtom)

	if (user) {
		return <UserDashboard />
	}

	return (
		<Box>
			<Text>Welcome! Please log in or sign up to continue.</Text>
		</Box>
	)
}

const UserDashboard: React.FC = () => {
	const [user] = useAtom(userAtom)

	if (user == undefined) {
		return <Dashboard />
	}

	const [res] = useQuery<UserBlocksResult, UserBlocksVars>({
		query: UserBlocks,
		variables: { id: user?.id },
	})
	let blocks = res.data?.userById.blocks.map(({ id, embedDisplay }) => (
		<EmbedBlock component={JSON.parse(embedDisplay)} id={id} key={id} />
	))

	return (
		<Box>
			<Heading pt={3}>Hello, {user.username}</Heading>
			<Text>You are user #{user.id}</Text>
			<Text pt={5}>Your blocks:</Text>
			<Flex flexWrap='wrap' maxW='70vw'>
				{blocks}
			</Flex>
		</Box>
	)
}
