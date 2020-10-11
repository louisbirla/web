import { Box, Text, Button, BoxProps } from '@chakra-ui/core'
import { Link } from '../basic/Link'

export const BlockNav: React.FC<BoxProps> = (props) => {
  return (
    <Box as='nav' {...props}>
      <Text color='gray.500'>
        <Link href='/blocks'>
          <Button size='sm' variant='link'>
            Block Platform
          </Button>
        </Link>{' '}
        •{' '}
        <Link href='/elevator-pitch'>
          <Button size='sm' variant='link'>
            Elevator Pitch
          </Button>
        </Link>{' '}
        •{' '}
        <Link href='/blocks/store'>
          <Button size='sm' variant='link'>
            Block Store
          </Button>
        </Link>{' '}
        •{' '}
        <Link href='/faq'>
          <Button size='sm' variant='link'>
            FAQ
          </Button>
        </Link>
      </Text>
    </Box>
  )
}
