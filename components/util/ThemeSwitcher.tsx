import { useColorMode, IconButton, Icon } from '@chakra-ui/core'
import { dark } from '../../utils/theme/dark'
import { Moon, Sun } from 'react-feather'

/**
 * A button to change the theme (dark/light)
 */
export const ThemeSwitcher: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const commonProps = {
    color: 'gray.500',
    onClick: () => {
      toggleColorMode()
    },
    margin: '1rem',
  }
  if (dark({ colorMode })) {
    return <IconButton icon={<Icon as={Sun} />} title='Turn on light mode' aria-label='Switch to light mode' {...commonProps} />
  } else {
    return <IconButton icon={<Icon as={Moon} />} title='Turn on dark mode' aria-label='Switch to dark mode' {...commonProps} />
  }
}
