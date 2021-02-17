import { Box, Center, Stack, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { User, userAtom } from "../user/userAtom"
import { PageRender } from "../display/PageRender"
import { ChooseTypeContent } from "../panels/ChooseTypePanel"
import { createBlockAtom } from "../panels/CreateBlockPanel"

export const Dashboard: React.FC = () => {
	const [user] = useAtom(userAtom)

	if (user) {
		return <UserDashboard user={user} />
	}

	return (
		<Box>
			<Text>Welcome! Please log in or sign up to continue.</Text>
		</Box>
	)
}

const UserDashboard: React.FC<{ user: User }> = ({ user }) => {
	if (user.root == undefined) {
		return <CreateFirstBlock />
	}
	return <PageRender id={user.root?.id} withBreadcrumb />
}

const CreateFirstBlock = () => {
	const [, setCreating] = useAtom(createBlockAtom)
	return (
		<Center flexDirection='column' mt={20}>
			<ChooseTypeContent resolve={(name) => setCreating(name)} />
		</Center>
	)
}
