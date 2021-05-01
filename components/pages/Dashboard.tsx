import { Box, Button, Center, Heading, Link, Text } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { User, userAtom } from "../user/userAtom"
import { PageRender } from "../display/PageRender"
import { ChooseTypeContent } from "../panels/ChooseTypePanel"
import { useCreateBlock } from "../panels/CreateBlockPanel"
import { AuthAtom } from "../user/auth/AuthScreen"

export const Dashboard: React.FC = () => {
	const [user] = useAtom(userAtom)
	const [, setAuth] = useAtom(AuthAtom)

	if (user) {
		return <UserDashboard user={user} />
	}

	return (
		<Box>
			<Heading mb={4} size='2xl'>
				Welcome to Loop!
			</Heading>
			<Heading size='md'>You are not logged in.</Heading>
			<Text>
				Please{" "}
				<Button variant='link' colorScheme='blue' onClick={() => setAuth("login")}>
					Log in
				</Button>{" "}
				or{" "}
				<Button variant='link' colorScheme='red' onClick={() => setAuth("signup")}>
					Sign up
				</Button>{" "}
				to access your dashboard. (Some pages may still be viewable as a guest)
			</Text>
			<Text mt={4}>
				For more information on Loop, visit the{" "}
				<Link color='blue.500' href='https://loop.page'>
					homepage
				</Link>
			</Text>
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
	const createBlock = useCreateBlock()
	return (
		<Center flexDirection='column' mt={20}>
			<ChooseTypeContent
				resolve={(name) =>
					createBlock(name).then((id) => {
						location.href = `/b/${id}`
					})
				}
			/>
		</Center>
	)
}
