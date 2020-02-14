import * as m from './fetchData'
import 'babel-polyfill'

describe('Test checkForName func', () => {
  test('', async ()=> {
    m.fetchData = jest.fn()
    document.body.innerHTML = '<div><input type="text" id="search-trip-date" value="test"><input id="search-trip-location" type="text" value="test2"></div>'
    const result = m.onSubmit()
    expect(result).toBe(true)
  })
})
