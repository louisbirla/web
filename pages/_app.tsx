import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider } from "@chakra-ui/react"
import { Metadata } from "../components/Metadata"
import { init } from "@sentry/react"
import { Provider as JotaiProvider, useAtom } from "jotai"
import { theme } from "../utils/theme/theme"
import { ChooseTypePanel } from "../components/panels/ChooseTypePanel"
import { ChangeUsernameModal } from "../components/user/ChangeUsername"
import { useRouter } from "next/router"
import { ChangePasswordModal } from "../components/user/ChangePassword"
import { ChangeEmailModal } from "../components/user/changeEmail"
import { AuthScreen, AuthAtom } from "../components/user/auth/AuthScreen"
import { WithUrql } from "../utils/urql"
import "../utils/theme/masonry.css"

const prod = process.env.NODE_ENV === "production"

if (prod) {
	init({
		dsn: "https://190272e39fa74484a58c821b9ed30555@o336780.ingest.sentry.io/5420493",
	})
}

const MyApp = ({ Component, pageProps }: AppProps) => {
	const router = useRouter()
	const username = router.query.username as string
	const email = router.query.email as string
	return (
		<WithUrql>
			<JotaiProvider>
				<ChakraProvider resetCSS theme={theme}>
					<Metadata ga={prod} />
					<WithAuth>
						<Component {...pageProps} />
					</WithAuth>
					<ChooseTypePanel />
					<ChangeUsernameModal username={username} />
					<ChangePasswordModal />
					<ChangeEmailModal email={email} />
				</ChakraProvider>
			</JotaiProvider>
		</WithUrql>
	)
}

const WithAuth: React.FC = ({ children }) => {
	const [authShown] = useAtom(AuthAtom)
	if (authShown) {
		return <AuthScreen />
	} else {
		return <>{children}</>
	}
}

export default MyApp
