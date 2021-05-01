export function isThisAnAuthPage() {
	return isPathNameAuthPage(location.pathname)
}

export function isPathNameAuthPage(pathName: string) {
	return pathName == "/login" || pathName == "/signup"
}
