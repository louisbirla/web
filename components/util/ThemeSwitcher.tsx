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
  }
  return (
    <button onClick={toggleColorMode} style={{ margin: '1rem' }}>
      {dark({ colorMode }) ? (
        <IconButton icon={<Icon as={Sun} />} aria-label='Switch to light mode' {...commonProps} />
      ) : (
        <IconButton icon={<Icon as={Moon} />} aria-label='Switch to dark mode' {...commonProps} />
      )}
    </button>
  )
}
