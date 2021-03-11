import uuid from 'uuid'

import { connect, disconnect } from '../../repo/database'
import userRepo, { User } from '../../repo/user'

import { Admin } from '../authorize'
import { Controller } from '../controller'
import listing, { Listing } from './listing'

import hash from '../../tool/hash'

const rawpass = uuid()

let user: User = {
  type: 'user',
  name: uuid(),
  email: `${uuid()}@test.com`,
  password: hash(rawpass),
}

describe('service:user:listing', () => {
  beforeAll(async done => {
    await connect()
    const res = await userRepo.create(user)
    user = {
      ...user,
      ...res,
    }
    done()
  })

  afterAll(async done => {
    await disconnect()
    done()
  })

  test('listing should work return 200', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return undefined
          case 'X-Device':
            return 'desktop'
          case 'X-Locate':
            return 'en-US'
          default:
            return undefined
        }
      },
      query: {
        field: 'last_access',
      },
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await listing.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      payload: expect.anything(),
    })

    done()
  })

  test('listing should work return 400', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return undefined
          case 'X-Device':
            return 'desktop'
          case 'X-Locate':
            return 'en-US'
          default:
            return undefined
        }
      },
      query: {},
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await listing.handler.handle(req, res, jest.fn())

    expect(res.set).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('listing should work return 400', async done => {
    const req = {
      get: (key: string) => {
        switch (key) {
          case 'uuid':
            return undefined
          case 'X-Device':
            return 'desktop'
          case 'X-Locate':
            return 'en-US'
          default:
            return undefined
        }
      },
      query: {
        name: uuid(),
        email: uuid(),
      },
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await listing.handler.handle(req, res, jest.fn())

    expect(res.set).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('listing should work correctly', async done => {
    expect(listing).toBeTruthy()
    expect(listing).toBeInstanceOf(Controller)
    expect(listing.auth).toBeInstanceOf(Admin)
    expect(listing.handler).toBeInstanceOf(Listing)
    done()
  })

  test('listing format method should work correctly', async done => {
    const actual = await listing.handler.format('desktop', 'en-US', true, {})

    expect(actual).toEqual(
      expect.objectContaining({
        success: true,
        payload: {},
      })
    )
    done()
  })
})
