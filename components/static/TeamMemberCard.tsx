import { Heading, Text, Button, Icon, Avatar, Box } from '@chakra-ui/core'
import { Linkedin, GitHub, Compass } from 'react-feather'
import { Card } from '../styling/Card'
import { useBlackOrWhite } from '../../utils/theme/useBlackOrWhite'

export const TeamMemberCard: React.FC<{
  linkedIn?: string
  githubName?: string
  name: string
  role: string
  img?: string
  about?: string
  websiteURL?: string
}> = ({ linkedIn, name, role, img, about, githubName, websiteURL }) => {
  const { color, opposite } = useBlackOrWhite()
  return (
    <Card maxWidth='20rem' textAlign='center'>
      <Avatar size='2xl' name={name} src={img} />
      <Heading>{name}</Heading>
      <Text color='gray.500' size='1.5rem'>
        {role}
      </Text>
      {about && <Text>{about}</Text>}
      <Box mt={4}>
        {websiteURL && (
          <a href={websiteURL}>
            <Button
              _hover={{
                backgroundColor: color,
                color: opposite,
                opacity: 0.7,
              }}
              variant='solid'
              backgroundColor={color}
              color={opposite}
              leftIcon={<Icon marginBottom='1.5px' as={Compass} />}
            >
              Website
            </Button>
          </a>
        )}
        {linkedIn && (
          <a href={linkedIn}>
            <Button variant='solid' colorScheme='blue' leftIcon={<Icon marginBottom='1.5px' as={Linkedin} />}>
              LinkedIn
            </Button>
          </a>
        )}
        {githubName && (
          <a href={`https://github.com/${githubName}`}>
            <Button
              _hover={{
                backgroundColor: color,
                color: opposite,
                opacity: 0.7,
              }}
              variant='solid'
              backgroundColor={color}
              color={opposite}
              leftIcon={<Icon as={GitHub} />}
            >
              GitHub
            </Button>
          </a>
        )}
      </Box>
    </Card>
  )
}
