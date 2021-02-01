import { Avatar, Box, Heading, Spinner, Text } from "@chakra-ui/core"
import { useQuery } from "urql"
import { User, UserQuery } from "./userAtom"

type UserQueryResult = { userByName?: User }
type UserQueryVars = { username: string }

export const UserPage: React.FC<{ username: string }> = ({ username }) => {
	const [res] = useQuery<UserQueryResult | undefined, UserQueryVars>({
		query: UserQuery,
		variables: { username },
	})

	if (res.data?.userByName) {
		let user = res.data.userByName
		let displayName = user.displayName || user.username
		return (
			<Box>
				<Heading display='flex' alignItems='center'>
					<Avatar name={displayName} mr={3} size='sm' />
					{displayName}
				</Heading>
				<Text>
					This is <b>@{user.username}</b>'s profile.
				</Text>
			</Box>
		)
	}

	if (res.fetching) {
		return <Spinner />
	}

	return (
		<Box>
			<Text>User not found.</Text>
		</Box>
	)
}
