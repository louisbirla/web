import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider as UrqlProvider } from "urql"
import { authExchange } from "@urql/exchange-auth"
import { errorExchange, subscriptionExchange } from "@urql/core"
import { AuthState, getAuth, addAuthToOperation } from "../utils/auth"
import { api_url } from "../utils/endpoint"
import { SubscriptionClient } from "subscriptions-transport-ws"
import * as ws from "ws"
import { devtoolsExchange } from "@urql/devtools"

const prod = process.env.NODE_ENV === "production"

const impl = process.browser ? undefined : ws
const subscriptionClient = new SubscriptionClient("wss://api.loop.page", { reconnect: true }, impl)

let exchanges = [
	dedupExchange,
	cacheExchange,
	errorExchange({
		onError: (error) => {
			const isAuthError = error.graphQLErrors.some((e) => e.message.includes("[uar]"))

			if (isAuthError && process.browser) {
				localStorage.removeItem("token")
			}
		},
	}),
	authExchange<AuthState>({
		addAuthToOperation,
		getAuth,
	}),
	fetchExchange,
	subscriptionExchange({
		forwardSubscription(operation) {
			return subscriptionClient.request(operation)
		},
	}),
]

if (!prod) {
	exchanges.unshift(devtoolsExchange)
}

export const client = createClient({
	url: api_url,
	exchanges,
})

export const WithUrql: React.FC = ({ children }) => {
	return <UrqlProvider value={client}>{children}</UrqlProvider>
}
