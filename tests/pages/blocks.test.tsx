import { findFirstText } from '../testUtils'
import BlocksPage from '../../pages/blocks'
import { render } from '@testing-library/react'

describe('blocks page', () => {
  test('should render have loop name', async () => {
    render(<BlocksPage />)
    expect(await findFirstText('Loop')).toBeInTheDocument()
  })
})
