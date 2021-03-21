import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import { Metadata } from "../components/Metadata"
import { init } from "@sentry/react"
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider as UrqlProvider } from "urql"
import { Provider as JotaiProvider } from "jotai"
import { authExchange } from "@urql/exchange-auth"
import { errorExchange, subscriptionExchange } from "@urql/core"
import { AuthState, getAuth, addAuthToOperation } from "../utils/auth"
import { CreateBlockPanel } from "../components/panels/CreateBlockPanel"
import { LoginPanel } from "../components/user/auth/LoginPanel"
import { SignupPanel } from "../components/user/auth/SignupPanel"
import { theme } from "../utils/theme/theme"
import { ChooseTypePanel } from "../components/panels/ChooseTypePanel"
import { api_url } from "../utils/endpoint"
import { SubscriptionClient } from "subscriptions-transport-ws"
import * as ws from "ws"
import { ChangeUsernameModal } from "../components/user/ChangeUsername"
import { useRouter } from "next/router"
import { ChangePasswordModal } from "../components/user/ChangePassword"

const prod = process.env.NODE_ENV === "production"

if (prod) {
	init({
		dsn: "https://190272e39fa74484a58c821b9ed30555@o336780.ingest.sentry.io/5420493",
	})
}

const impl = process.browser ? undefined : ws

const subscriptionClient = new SubscriptionClient("wss://api.loop.page", { reconnect: true }, impl)

export const client = createClient({
	url: api_url,
	exchanges: [
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
	],
})

const MyApp = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()
	const username = router.query.username as string
	return (
		<UrqlProvider value={client}>
			<JotaiProvider>
				<ChakraProvider resetCSS theme={theme}>
					<Metadata ga={prod} />
					<Component {...pageProps} />
					<LoginPanel />
					<SignupPanel />
					<CreateBlockPanel />
					<ChooseTypePanel />
					<ChangeUsernameModal username={username} />
					<ChangePasswordModal />
				</ChakraProvider>
			</JotaiProvider>
		</UrqlProvider>
	)
}

export default MyApp
