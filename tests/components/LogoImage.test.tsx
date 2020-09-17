import {
  render,
} from '@testing-library/react'
import { LogoImage } from '../../components/LogoImage'
import '@testing-library/jest-dom'
import { jukeError } from '../__helpers'

describe('logo image', () => {
  test('image loading', async () => {
    jukeError(() => {
      const image = render(<><LogoImage skipLoading /></>)
      expect(image).toBeTruthy()
    })
  })
})
