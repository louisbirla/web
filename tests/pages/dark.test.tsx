import { render, screen, fireEvent } from '@testing-library/react'
import { ChakraWrapper, findFirstText } from '../__helpers'
import { ThemeSwitcher } from '../../components/util/ThemeSwitcher'
import IndexPage from '../../pages'
import { useBlackOrWhite } from '../../utils/theme/useBlackOrWhite'
import BlockTechnologyPage from '../../pages/block-technology'

describe('dark mode', () => {
  test('theme switcher', async () => {
    render(
      <ChakraWrapper colorMode='dark'>
        <ThemeSwitcher />
      </ChakraWrapper>,
    )
    expect(await screen.findByTitle('light', { exact: false })).toBeInTheDocument()
    fireEvent.click(await screen.findByRole('button'))
  })
  test('home page', async () => {
    render(
      <ChakraWrapper colorMode='dark'>
        <IndexPage />
      </ChakraWrapper>,
    )
    expect(await findFirstText('Loop')).toBeInTheDocument()
  })
  test('block technology page', async () => {
    render(
      <ChakraWrapper colorMode='dark'>
        <BlockTechnologyPage />
      </ChakraWrapper>,
    )
    expect(await findFirstText('Loop')).toBeInTheDocument()
  })
  test('useBlackOrWhite hook', async () => {
    const HookUser = () => {
      const { color } = useBlackOrWhite()
      return <p>{color}</p>
    }
    render(
      <ChakraWrapper colorMode='light'>
        <HookUser />
      </ChakraWrapper>,
    )
    expect(await findFirstText('')).toBeInTheDocument()
  })
})
