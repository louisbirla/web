import apollo from '../apollo.config'
import babel from '../babel.config'
import jest from '../jest.config'

describe('config files', () => {
  test('apollo config', () => {
    // Should have link to API
    expect(JSON.stringify(apollo).includes('loop.page')).toBeTruthy()
  })
  test('babel config', () => {
    expect(JSON.stringify(babel)).toBeTruthy()
  })
  test('jest config', () => {
    // Should have sonarcloud upload
    expect(JSON.stringify(jest).includes('sonar')).toBeTruthy()
  })
})
