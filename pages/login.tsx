import { useAtom } from "jotai"
import { useEffect } from "react"
import { AuthAtom, AuthScreen } from "../components/user/auth/AuthScreen"

const LoginPage = () => {
	const [, setAuth] = useAtom(AuthAtom)
	useEffect(() => {
		setAuth("login")
	}, [])
	return <AuthScreen />
}

export default LoginPage
