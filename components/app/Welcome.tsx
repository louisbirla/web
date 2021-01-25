import { Box, Button, Heading, Text, HStack, Divider, Flex } from "@chakra-ui/core"
import { atom, useAtom } from "jotai"
import { client } from "../../pages/_app"
import { useLogout } from "../../utils/auth"
import { loginPanelOpen } from "./LoginPanel"
import { signupPanelOpen } from "./SignupPanel"
import { gql, useQuery } from "urql"
import { EmbedBlock } from "./EmbedBlock"
import { useState } from "react"
import { CreateBlockScreen } from "./create/CreateBlockScreen"

const UserQuery = gql`
	query {
		whoami {
			id
			username
			credits
		}
	}
`

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

type User = { id: number; username: string; credits: number }
type UserQueryResult = { whoami: User }

type UserBlocksResult = { userById: { blocks: Array<{ id: number; embedDisplay: string }> } }
type UserBlocksVars = { id: number }

export const userAtom = atom(
	async (): Promise<User | null> => {
		let result = await client.query<UserQueryResult>(UserQuery).toPromise()
		if (result.data?.whoami?.username) {
			return result.data?.whoami
		}
		return null
	},
)

export const Welcome: React.FC = () => {
	const [user] = useAtom(userAtom)
	const [, setLoginPanelShown] = useAtom(loginPanelOpen)
	const [, setSignupPanelShown] = useAtom(signupPanelOpen)

	if (user) {
		return <UserDashboard />
	}

	return (
		<Box>
			<HStack spacing={3}>
				<Button colorScheme='blue' variant='solid' onClick={() => setLoginPanelShown(true)}>
					Log in
				</Button>
				<Button colorScheme='yellow' variant='solid' onClick={() => setSignupPanelShown(true)}>
					Sign up
				</Button>
			</HStack>
		</Box>
	)
}

const UserDashboard: React.FC = () => {
	const [user] = useAtom(userAtom)
	const [logout] = useLogout()
	const [createOpen, setCreateOpen] = useState(false)

	if (user == undefined) {
		return <Welcome />
	}

	const [res, reFetchBlocks] = useQuery<UserBlocksResult, UserBlocksVars>({
		query: UserBlocks,
		variables: { id: user?.id },
	})
	let blocks = res.data?.userById.blocks.map(({ id }) => <EmbedBlock id={id} key={id} />)

	const createBlock = () => {
		setCreateOpen(true)
	}

	if (createOpen) {
		return (
			<Box>
				<Button size='xs' colorScheme='yellow' variant='solid' onClick={() => setCreateOpen(false)}>
					Back
				</Button>
				<CreateBlockScreen
					type='data'
					done={() => {
						setCreateOpen(false)
						reFetchBlocks()
					}}
				/>
			</Box>
		)
	}

	return (
		<Box>
			<Button size='xs' colorScheme='red' variant='outline' onClick={logout}>
				Log out
			</Button>
			<Heading pt={3}>Hello, {user.username}</Heading>
			<Text>You are user #{user.id}</Text>
			<Text>You have {user.credits} credits.</Text>
			<Text pt={5}>Here's a block for you:</Text>
			<Flex>{blocks}</Flex>
			<Divider my={4} />
			<Button variant='solid' colorScheme='red' onClick={() => createBlock()}>
				Create Block
			</Button>
		</Box>
	)
}
