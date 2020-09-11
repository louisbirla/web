import { Layout } from '../components/Layout'
import { Heading, Center, VStack, Text, Container, Button } from '@chakra-ui/core'
import { LogoImage } from '../components/LogoImage'
import { Nav } from '../components/Nav'
import { Link } from '../components/basic/Link'

const IndexPage = () => {
  return (
    <Layout title='Loop' noLogo noNav>
      <Center dir='column' textAlign='center'>
        <VStack>
          <LogoImage width={100} mt={10} />
          <Heading as='h1' fontSize='5rem' fontWeight='800'>
            Loop
          </Heading>
          <Nav />
          <Text color='gray.500'>(Coming Soon)</Text>
          <VStack fontSize={20} as='section' spacing={10}>
            <Heading fontSize='2.5rem'>
              What is{' '}
              <Text display='inline' color='#6eb6ff'>
                Loop
              </Text>
              ?
            </Heading>
            <Container>
              <Text>
                Loop Revolution, known as Loop, is a company whose purpose is to create innovative platforms, in a
                manner that is ethical, transparent, extensible and forward-thinking.
              </Text>
            </Container>
            <Container>
              <Text>
                As a company with humble beginnings, Loop is more appealing than large corporations because nothing is
                behind the curtains. Because everything is readily available for anyone to inspect, users can use and
                extend Loop’s platforms with 100% trust.
              </Text>
            </Container>
            <Container>
              <Text>
                Loop’s platforms will primarily be about open-source and extensible software. Open-source software means
                that the source code is readily available to and can be improved upon by anyone. While anybody is free
                to use the code for personal use, commercial replication will not be allowed.
              </Text>
            </Container>
            <Container>
              <Text>
                Loop Credits (credits) is a global currency used by Loop users. Instead of using currencies such as USD,
                Euro or Bitcoin, Loop users can use their credits for actions within one or more of Loop’s platforms
                (e.g. Blocks). Actions that result in credits changing hands are better defined within a particular
                platform. In general however, new users start with a certain number of credits for free and can start
                earning more through usage, watching voluntary advertisements, purchasing advanced features or selling
                content to other users. Credits can also be purchased from Loop. Credits will initially be implemented
                in a straightforward secure manner using a combination of Loop data structures and commercial payment
                gateways. Later on, Loop may use Blockchain technology for additional scale, security and fidelity.
              </Text>
            </Container>
            <Container>
              <Text>
                Loop’s revenue comes from charging a % transaction fees when a user exchanges their credits for
                real-world money.
              </Text>
            </Container>
            <Link href='/blocks'>
              <Button variant='outline'>What are Blocks?</Button>
            </Link>
          </VStack>
        </VStack>
      </Center>
    </Layout>
  )
}

export default IndexPage
