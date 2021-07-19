import { AppProps } from "next/dist/next-server/lib/router/router"
import { ChakraProvider, Box, Text, Flex, Button } from "@chakra-ui/react"
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
import { isMobile } from "react-device-detect"
import { useState } from "react"

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
					{isMobile && <MobileAlert />}
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

const MobileAlert: React.FC = () => {
	let [shown, setShown] = useState(true)
	if (shown) {
		return (
			<Box p={2} position='absolute' top={0} left={0} right={0} bg='yellow.300'>
				<Flex width='100%' justifyContent='space-between'>
					<Text fontWeight='bold' fontSize='2xl'>
						Notice
					</Text>
					<Button onClick={() => setShown(false)} size='sm' colorScheme='orange' variant='solid'>
						Close
					</Button>
				</Flex>
				<Text>
					The Loop website does not work well on phones. Please email <u>support@loop.page</u> to recieve instructions
					on how to install the app on your phone.
				</Text>
			</Box>
		)
	}
	return <></>
}

export default MyApp
