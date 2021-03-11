import { connect, disconnect } from './repo/database'

import rest, { errorHandle } from './rest'

describe('rest', () => {
  beforeAll(async done => {
    await connect()
    done()
  })

  afterAll(async done => {
    await disconnect()
    done()
  })

  test('rest should work correctly', async done => {
    expect(rest).toBeTruthy()
    done()
  })

  test('error handle method should work correctly', async done => {
    const error = {} as Error

    const req = {}

    const res: any = {
      status: jest.fn().mockImplementation(() => res),
      json: jest.fn(),
    }

    await errorHandle(error, req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      payload: { error },
    })

    done()
  })
})
