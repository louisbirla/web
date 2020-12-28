import { Layout } from '../components/Layout'
import { VStack, Text, Wrap } from '@chakra-ui/core'
import { TeamMemberCard } from '../components/static/TeamMemberCard'
import { SectionHeading } from '../components/static/SectionHeading'
import { colors } from '../utils/theme/colors'

const TeamPage = () => {
  return (
    <Layout title='Team | Loop'>
      <VStack>
        <SectionHeading>
          The{' '}
          <Text display='inline' color={colors.gold}>
            Team
          </Text>
        </SectionHeading>
        <Text textAlign='center' maxW='xs'>
          These are the people who are making Loop happen.
        </Text>
        <Wrap spacing={10} justify='center'>
          <TeamMemberCard
            img='/team/louis.jpeg'
            name='Louis Birla'
            role='Founder'
            about={`Louis is in charge of Loop's development and management. Along with creating all the concepts, Louis develops Loop's API and web app.`}
            websiteURL='https://birla.io'
          />
          <TeamMemberCard
            img='/team/amit.jpeg'
            linkedIn='https://www.linkedin.com/in/maheshwa?trk=profile-badge'
            name='Amit Maheshwari'
            role='Advisor'
            about={`Amit is helping jump start Loop using his startup experience and initial capital.`}
          />
        </Wrap>
      </VStack>
    </Layout>
  )
}

export default TeamPage
