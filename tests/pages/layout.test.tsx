import { render } from "@testing-library/react"
import { Layout } from "../../components/Layout"
import { Text } from "@chakra-ui/core"
import { findFirstText } from "../__helpers"

describe("layout", () => {
  test("no title", async () => {
    render(
      <Layout>
        <Text>Content</Text>
      </Layout>,
    )
    expect(await findFirstText("Content")).toBeInTheDocument()
  })
})
