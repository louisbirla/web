import { findFirstText } from '../__helpers'
import BlocksPage from '../../pages/blocks'
import { render } from '@testing-library/react'
import TeamPage from '../../pages/team'
import BlockStorePage from '../../pages/blocks/store'
import FAQPage from '../../pages/faq'
import PitchPage from '../../pages/elevator-pitch'

describe('blocks page', () => {
  test('should render have loop name', async () => {
    render(<BlocksPage />)
    expect(await findFirstText('Loop')).toBeInTheDocument()
  })
})

describe('team page', () => {
  test('should have member names', async () => {
    render(<TeamPage />)
    expect(await findFirstText('Louis', { exact: false })).toBeInTheDocument()
    expect(await findFirstText('Amit', { exact: false })).toBeInTheDocument()
  })
})

describe('block store page', () => {
  test('should have store name', async () => {
    render(<BlockStorePage />)
    expect(await findFirstText('Store', { exact: false })).toBeInTheDocument()
  })
})

describe('faq page', () => {
  test('should render have FAQ name', async () => {
    render(<FAQPage />)
    expect(await findFirstText('FAQ')).toBeInTheDocument()
  })
})

describe('elevator pitch page', () => {
  test('should have page name', async () => {
    render(<PitchPage />)
    expect(await findFirstText('Elevator Pitch')).toBeInTheDocument()
  })
})
