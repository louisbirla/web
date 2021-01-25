import { findFirstText } from "../__helpers"
import BlockTechnologyPage from "../../pages/block-technology"
import { render } from "@testing-library/react"
import TeamPage from "../../pages/team"
import FAQPage from "../../pages/faq"
import JourneysPage from "../../pages/user-journeys"
import CompanyPage from "../../pages/company"

describe("blocks page", () => {
	test("should render have loop name", async () => {
		render(<BlockTechnologyPage />)
		expect(await findFirstText("Loop")).toBeInTheDocument()
	})
})

describe("team page", () => {
	test("should have member names", async () => {
		render(<TeamPage />)
		expect(await findFirstText("Louis", { exact: false })).toBeInTheDocument()
		expect(await findFirstText("Amit", { exact: false })).toBeInTheDocument()
	})
})

describe("faq page", () => {
	test("should render have FAQ name", async () => {
		render(<FAQPage />)
		expect(await findFirstText("FAQ")).toBeInTheDocument()
	})
})

describe("company page", () => {
	test("should render have company name", async () => {
		render(<CompanyPage />)
		expect(await findFirstText("Loop Revolution")).toBeInTheDocument()
	})
})

describe("user journeys page", () => {
	test("should render", async () => {
		render(<JourneysPage />)
	})
})
