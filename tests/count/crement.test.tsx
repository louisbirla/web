import { render, fireEvent, screen } from '../testUtils'
import { CountCrement } from '../../components/count/CountCrement'

describe('count buttons', () => {
  test('clicking should call update function', async () => {
    // Mock the update function
    const update = jest.fn()
    // Increment/decrement by
    const by = 5
    render(<CountCrement by={by} updateCount={update} />)
    // Click the button
    fireEvent.click(screen.getByRole('button'))
    expect(update).toHaveBeenCalledWith(by)
  })
})
