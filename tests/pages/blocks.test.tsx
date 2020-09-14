import { render, findFirstText } from '../testUtils'
import BlocksPage from '../../pages/blocks'

describe('blocks page', () => {
  test('should render have loop name', async () => {
    render(<BlocksPage />)
    expect(await findFirstText('Loop')).toBeInTheDocument()
  })
})
