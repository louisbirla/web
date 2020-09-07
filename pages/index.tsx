import { Layout } from '../components/Layout'
import { Heading, Center, VStack, Text, Box } from '@chakra-ui/core'

const IndexPage = () => (
  <Layout title='Coming Soon | Loop'>
    <Center dir='column' textAlign='center'>
      <VStack>
        <Heading as='h1' fontSize='5rem' fontWeight='800'>
          Coming{' '}
          <Text display='inline' color='#6eb6ff'>
            Soon
          </Text>
        </Heading>
        <Box>
          <Text color='inherit'>
            More information about <b>Loop</b> will be here soon.
          </Text>
        </Box>
        <Box>
          <Text fontWeight='bold' color='#ffb400' fontSize='1.5rem'>
            Come back in a few days!
          </Text>
        </Box>
      </VStack>
    </Center>
  </Layout>
)

export default IndexPage
