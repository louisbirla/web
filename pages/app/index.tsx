import { Layout } from "../../components/Layout"
import { Center, Text } from "@chakra-ui/core"
import { Welcome } from "../../components/app/Welcome"
import { Suspense } from "react"

const AppPage = () => {
  return (
    <Layout title='App | Loop'>
      <Center>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Welcome />
        </Suspense>
      </Center>
    </Layout>
  )
}

export default AppPage
