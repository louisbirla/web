import { gql } from "urql"
import { atom } from "jotai"
import { client } from "../../pages/_app"

const WhoamiQuery = gql`
	query {
		whoami {
			id
			displayName
			username
			root {
				id
			}
		}
	}
`
type WhoamiResult = { whoami: User }

export type User = {
	id: number
	username: string
	displayName?: string
	root?: {
		id: number
	}
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
