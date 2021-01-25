import { Metadata } from "../../components/Metadata"
import { render } from "@testing-library/react"
import { jukeError } from "../__helpers"

describe("metadata", () => {
	test("should render", async () => {
		const rendered = render(<Metadata ga={false} />)
		expect(rendered).toBeTruthy()
	})
	test("should error for fake ga", async () => {
		jukeError(() => {
			expect(() => render(<Metadata />)).toThrow()
		})
	})
})
