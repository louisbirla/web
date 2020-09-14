import { render } from '@testing-library/react'
import CountPage from '../../pages/count'
import { MockedProvider } from '@apollo/client/testing'

describe('count page', () => {
  test('should render', async () => {
    const rendered = render(
      <MockedProvider>
        <CountPage />
      </MockedProvider>,
    )
    expect(rendered).toBeTruthy()
  })
})
