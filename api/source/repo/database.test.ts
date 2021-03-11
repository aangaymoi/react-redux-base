import database, { connect, disconnect } from './database'

describe('repo:database', () => {
  afterAll(async done => {
    jest.resetAllMocks()
    await disconnect()
    done()
  })

  test('connect method should work correctly', async done => {
    await connect()
    expect(database).toBeTruthy()
    expect(database.open).toBeTruthy()
    await connect()
    expect(database.open).toBeTruthy()
    done()
  })

  test('disconnect method should work correctly', async done => {
    await disconnect()
    expect(database).toBeTruthy()
    expect(database.open).toBeFalsy()
    await disconnect()
    expect(database.open).toBeFalsy()
    done()
  })
})
