import { makeOperation, Operation } from "urql"

export type AuthState = {
	token: string
} | null

export const getAuth = async ({ authState }: { authState: AuthState }) => {
	if (!authState && process.browser) {
		const token = localStorage.getItem("token")
		if (token) {
			return { token }
		}
		return null
	}
	return null
}

export const addAuthToOperation = ({ authState, operation }: { authState: AuthState; operation: Operation }) => {
	if (!authState || !authState.token) {
		return operation
	}
	const fetchOptions =
		typeof operation.context.fetchOptions === "function"
			? operation.context.fetchOptions()
			: operation.context.fetchOptions || {}
	return makeOperation(operation.kind, operation, {
		...operation.context,
		fetchOptions: {
			...fetchOptions,
			headers: {
				...fetchOptions.headers,
				Authorization: "Bearer " + authState.token,
			},
		},
	})
}

export const useLogout = () => {
	return [
		() => {
			localStorage.removeItem("token")
			location.reload()
		},
	]
}
