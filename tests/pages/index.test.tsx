import { findFirstText } from "../__helpers"
import IndexPage from "../../pages"
import { screen, render } from "@testing-library/react"

describe("index page", () => {
	test("should have loop name", async () => {
		render(<IndexPage />)
		expect(await findFirstText("Loop")).toBeInTheDocument()
	})
	test("should have nav and some extra links", async () => {
		render(<IndexPage />)
		// Some text in nav
		expect(await findFirstText("Team")).toBeInTheDocument()
		expect(await findFirstText("Block Technology")).toBeInTheDocument()
		expect(await findFirstText("Company")).toBeInTheDocument()
		expect(await findFirstText("FAQ")).toBeInTheDocument()
		// Nav buttons & extra links
		const navButtonCount = 3
		expect((await screen.findAllByRole("link")).length).toBeGreaterThan(navButtonCount)
	})
})
