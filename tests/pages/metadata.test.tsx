import { Metadata } from '../../components/Metadata'
import { render } from '@testing-library/react'

describe('metadata', () => {
  test('should render', async () => {
    const rendered = render(<Metadata ga={false} />)
    expect(rendered).toBeTruthy()
  })
})
