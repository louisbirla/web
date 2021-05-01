import { useAtom } from "jotai"
import { useEffect } from "react"
import { AuthAtom, AuthScreen } from "../components/user/auth/AuthScreen"

const SignupPage = () => {
	const [, setAuth] = useAtom(AuthAtom)
	useEffect(() => {
		setAuth("signup")
	}, [])
	return <AuthScreen />
}

export default SignupPage
