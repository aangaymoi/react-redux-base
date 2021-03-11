import uuid from 'uuid'

import { connect, disconnect } from '../../repo/database'
import userRepo, { User } from '../../repo/user'

import { Admin } from '../authorize'
import { Controller } from '../controller'
import search, { Search } from './search'

import hash from '../../tool/hash'

const rawpass = uuid()

let user: User = {
  type: 'user',
  name: uuid(),
  email: `${uuid()}@test.com`,
  password: hash(rawpass),
}

describe('service:user:search', () => {
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

  test('search should work correctly', async done => {
    expect(search).toBeTruthy()
    expect(search).toBeInstanceOf(Controller)
    expect(search.auth).toBeInstanceOf(Admin)
    expect(search.handler).toBeInstanceOf(Search)
    done()
  })

  test('search should work return 200', async done => {
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
        name: user.name,
      },
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await search.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      payload: {
        users: expect.arrayContaining([
          expect.objectContaining({
            name: req.query.name,
          }),
        ]),
      },
    })

    done()
  })

  test('search should work return 200', async done => {
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
        email: user.email,
      },
    }

    const res: any = {
      set: jest.fn(() => res),
      status: jest.fn(() => res),
      send: jest.fn(),
    }

    await search.handler.handle(req, res, jest.fn())

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      success: true,
      payload: {
        users: expect.arrayContaining([
          expect.objectContaining({
            email: req.query.email,
          }),
        ]),
      },
    })

    done()
  })

  test('search should work return 400', async done => {
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

    await search.handler.handle(req, res, jest.fn())

    expect(res.set).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('search should work return 400', async done => {
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

    await search.handler.handle(req, res, jest.fn())

    expect(res.set).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      success: false,
      payload: expect.anything(),
    })

    done()
  })

  test('search format method should work correctly', async done => {
    const actual = await search.handler.format('desktop', 'en-US', true, {})

    expect(actual).toEqual(
      expect.objectContaining({
        success: true,
        payload: {},
      })
    )
    done()
  })
})
