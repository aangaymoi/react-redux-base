import hash from './hash'

describe('tool:hash', () => {
  test('hash should be deterministic', async done => {
    expect(hash('something')).toEqual(hash('something'))
    done()
  })

  test('hash should be collision resistance', async done => {
    expect(hash('somethinga')).not.toEqual(hash('somethingb'))
    done()
  })
})
