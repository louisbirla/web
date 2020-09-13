import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import { render, screen, fireEvent, findFirstText } from '../testUtils'
import { CountManager, COUNT, UPDATE_COUNT } from '../../components/count/CountManager'

/** For keeping track of the count (starts at 1) */
let count = 1

/** Mock the querying of count */
const countMock: MockedResponse = {
  request: {
    query: COUNT,
  },
  result: () => ({
    data: {
      count,
    },
  }),
}
/** Mock the updating of the count */
const updateCountMock = (by: number): MockedResponse => ({
  request: {
    query: UPDATE_COUNT,
    variables: {
      by,
    },
  },
  result: () => {
    count += by
    return {
      data: {
        updateCount: count,
      },
    }
  },
})

describe('counter', () => {
  test('should increment/decrement on click', async () => {
    render(
      <MockedProvider
        // This needs a bunch of instances of mocks to supply.
        // Ordered in order they are called
        mocks={[countMock, updateCountMock(1), countMock, updateCountMock(-1), countMock]}
        addTypename={false}
      >
        <CountManager
          // No polling because that would need the countMock too much.
          pollInterval={0}
        />
      </MockedProvider>,
    )
    // Should start at 1 (first fetch)
    expect(await findFirstText('1')).toBeInTheDocument()
    // Click the +1 button
    fireEvent.click(screen.getAllByRole('button')[0])
    // Should have increased to 2
    expect(await findFirstText('2')).toBeInTheDocument()
    // Click the -1 button
    fireEvent.click(screen.getAllByRole('button')[1])
    // Should have decreased to 1
    expect(await findFirstText('1')).toBeInTheDocument()
  })
})
