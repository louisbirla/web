import { api_url } from "../utils/endpoint"

describe("endpoint", () => {
	test("should be production URL", () => {
		expect(api_url).toBe("https://api-pr-206.onrender.com.")
	})
})
