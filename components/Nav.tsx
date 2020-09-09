import { Box, Text, Button, BoxProps } from '@chakra-ui/core'
import { Link } from './basic/Link'

export const Nav: React.FC<BoxProps> = (props) => {
  return (
    <Box as='nav' {...props}>
      <Text color='gray.500'>
        <Link href='/'>
          <Button size='sm' variant='link'>
            Loop
          </Button>
        </Link>{' '}
        •{' '}
        <Link href='/blocks'>
          <Button size='sm' variant='link'>
            Blocks
          </Button>
        </Link>{' '}
        •{' '}
        <Link href='/team'>
          <Button size='sm' variant='link'>
            Team
          </Button>
        </Link>
      </Text>
    </Box>
  )
}
