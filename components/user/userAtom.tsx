import { gql } from "urql"
import { atom } from "jotai"
import { client } from "../../pages/_app"

const WhoamiQuery = gql`
	query {
		whoami {
			id
			displayName
			username
			credits
		}
	}
`
type WhoamiResult = { whoami: User }

export const UserQuery = gql`
	query($username: String!) {
		userByName(username: $username) {
			id
			displayName
			username
			credits
		}
	}
`

export type User = {
	id: number
	username: string
	displayName?: string
	credits: number
}

export const userAtom = atom(
	async (): Promise<User | null> => {
		let result = await client.query<WhoamiResult>(WhoamiQuery).toPromise()
		if (result.data?.whoami?.username) {
			return result.data?.whoami
		}
		return null
	},
)
