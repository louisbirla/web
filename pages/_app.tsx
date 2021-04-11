import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import { Metadata } from "../components/Metadata"
import { init } from "@sentry/react"
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider as UrqlProvider } from "urql"
import { Provider as JotaiProvider, useAtom } from "jotai"
import { authExchange } from "@urql/exchange-auth"
import { errorExchange, subscriptionExchange } from "@urql/core"
import { AuthState, getAuth, addAuthToOperation } from "../utils/auth"
import { CreateBlockPanel } from "../components/panels/CreateBlockPanel"
import { theme } from "../utils/theme/theme"
import { ChooseTypePanel } from "../components/panels/ChooseTypePanel"
import { api_url } from "../utils/endpoint"
import { SubscriptionClient } from "subscriptions-transport-ws"
import * as ws from "ws"
import { ChangeUsernameModal } from "../components/user/ChangeUsername"
import { useRouter } from "next/router"
import { ChangePasswordModal } from "../components/user/ChangePassword"
import { ChangeEmailModal } from "../components/user/changeEmail"
import { TempAuthScreen, AuthAtom } from "../components/user/auth/TempAuthScreen"

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
	const email = router.query.email as string
	return (
		<UrqlProvider value={client}>
			<JotaiProvider>
				<ChakraProvider resetCSS theme={theme}>
					<Metadata ga={prod} />
					<WithAuth>
						<Component {...pageProps} />
					</WithAuth>
					<CreateBlockPanel />
					<ChooseTypePanel />
					<ChangeUsernameModal username={username} />
					<ChangePasswordModal />
					<ChangeEmailModal email={email} />
				</ChakraProvider>
			</JotaiProvider>
		</UrqlProvider>
	)
}

const WithAuth: React.FC = ({ children }) => {
	const [authShown] = useAtom(AuthAtom)
	if (authShown) {
		return <TempAuthScreen />
	} else {
		return <>{children}</>
	}
}

export default MyApp
