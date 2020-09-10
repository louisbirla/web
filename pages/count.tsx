import { Layout } from '../components/Layout'
import { Center } from '@chakra-ui/core'
import { CountManager } from '../components/count/CountManager'

const IndexPage = () => {
  return (
    <Layout title='Count | Loop'>
      <Center>
        <CountManager />
      </Center>
    </Layout>
  )
}

export default IndexPage
