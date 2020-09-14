import { render, findFirstText, screen } from '../testUtils'
import IndexPage from '../../pages'

describe('index page', () => {
  test('should have loop name', async () => {
    render(<IndexPage />)
    expect(await findFirstText('Loop')).toBeInTheDocument()
  })
  test('should have nav and some extra links', async () => {
    render(<IndexPage />)
    // Some text in nav
    expect(await findFirstText('Team')).toBeInTheDocument()
    expect(await findFirstText('Blocks')).toBeInTheDocument()
    // 3 nav buttons & extra links
    const navButtonCount = 3
    expect((await screen.findAllByRole('link')).length).toBeGreaterThan(navButtonCount)
  })
})
