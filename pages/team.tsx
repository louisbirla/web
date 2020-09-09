import { Layout } from '../components/Layout'
import { Heading, Center, VStack, Text, Container, Wrap } from '@chakra-ui/core'
import { TeamMemberCard } from '../components/static/TeamMemberCard'

const TeamPage = () => {
  return (
    <Layout title='Team | Loop'>
      <Center textAlign='center'>
        <VStack>
          <Heading fontSize='2.5rem'>
            The{' '}
            <Text display='inline' color='#ffc93c'>
              Team
            </Text>
          </Heading>
          <Container>
            <Text>These are the people who are making Loop happen.</Text>
          </Container>
          <Wrap justify='center' spacing={10}>
            <TeamMemberCard
              img='/team/louis.jpeg'
              name='Louis Birla'
              role='Founder'
              about={`Louis is in charge of Loop's development and management. Along with creating all the concepts, Louis develops Loop's API and web app.`}
              githubName='nilaeus'
            />
            <TeamMemberCard
              img='/team/amit.jpeg'
              linkedIn='https://www.linkedin.com/in/maheshwa?trk=profile-badge'
              name='Amit Maheshwari'
              role='Advisor'
              about='Something or other will go right here as a description.'
            />
          </Wrap>
        </VStack>
      </Center>
    </Layout>
  )
}

export default TeamPage
