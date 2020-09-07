import Head from 'next/head'
import { Box, Icon, IconButton, Center, VStack, Text } from '@chakra-ui/core'
import { GitHub } from 'react-feather'
import { Link } from './basic/Link'
import { ThemeSwitcher } from './util/ThemeSwitcher'

type Props = {
  title?: string
}

export const Layout: React.FC<Props> = ({ children, title = 'Loop' }) => (
  <Box>
    <Head>
      <title>{title}</title>
    </Head>
    {children}
    <Box as='footer' mt={10}>
      <Center color='gray.500'>
        <VStack>
          <Box>
            <Link href='https://github.com/loop-revolution'>
              <IconButton icon={<Icon as={GitHub} color='gray.500' />} aria-label='GitHub Repository' />
            </Link>
            <ThemeSwitcher />
          </Box>
          <Text>© Loop Revolution • 2020</Text>
        </VStack>
      </Center>
    </Box>
  </Box>
)
