import { render, findFirstText } from '../testUtils'
import TeamPage from '../../pages/team'

describe('team page', () => {
  test('should have member names', async () => {
    render(<TeamPage />)
    expect(await findFirstText('Louis', { exact: false })).toBeInTheDocument()
    expect(await findFirstText('Amit', { exact: false })).toBeInTheDocument()
  })
})
