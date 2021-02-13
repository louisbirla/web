import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import { Metadata } from "../components/Metadata"
import { init } from "@sentry/react"
import { cacheExchange, createClient, dedupExchange, fetchExchange, Provider as UrqlProvider } from "urql"
import { Provider as JotaiProvider } from "jotai"
import { authExchange } from "@urql/exchange-auth"
import { errorExchange } from "@urql/core"
import { AuthState, getAuth, addAuthToOperation } from "../utils/auth"
import { CreateBlockPanel } from "../components/panels/CreateBlockPanel"
import { LoginPanel } from "../components/user/auth/LoginPanel"
import { SignupPanel } from "../components/user/auth/SignupPanel"
import { theme } from "../utils/theme/theme"
import { ChooseTypePanel } from "../components/panels/ChooseTypePanel"
import { api_url } from "../utils/endpoint"

const prod = process.env.NODE_ENV === "production"

if (prod) {
	init({
		dsn: "https://190272e39fa74484a58c821b9ed30555@o336780.ingest.sentry.io/5420493",
	})
}

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
	],
})

const MyApp = ({ Component, pageProps }: AppProps) => {
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
				</ChakraProvider>
			</JotaiProvider>
		</UrqlProvider>
	)
}

export default MyApp
