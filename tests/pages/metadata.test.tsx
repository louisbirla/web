import { render } from '../testUtils'
import { Metadata } from '../../components/Metadata'

describe('metadata', () => {
  test('should render', async () => {
    const rendered = render(<Metadata ga={false} />)
    expect(rendered).toBeTruthy()
  })
})
