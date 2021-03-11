import uuid from 'uuid'

import { Controller } from './controller'

describe('service:controller', () => {
  test('controller should work correctly when authorize is valid', async done => {
    const auth = {
      check: jest.fn().mockImplementation(() => uuid()),
    }

    const handler = {
      handle: jest.fn().mockImplementation(() => {
        handler.format()
      }),
      format: jest.fn(),
    }

    const controller = new Controller(auth, handler)

    const req = {
      get: () => uuid(),
    }

    const res = {
      set: () => res,
      status: () => res,
      send: () => {},
    }

    await controller.handle(req, res, jest.fn())

    expect(auth.check).toHaveBeenCalled()
    expect(handler.handle).toHaveBeenCalled()
    expect(handler.format).toHaveBeenCalled()

    done()
  })

  test('controller should work correctly when authorize is invalid', async done => {
    const auth = {
      check: jest.fn().mockImplementation(() => undefined),
    }

    const handler = {
      handle: jest.fn().mockImplementation(() => {
        handler.format()
      }),
      format: jest.fn(),
    }

    const controller = new Controller(auth, handler)

    const req = {
      get: () => uuid(),
    }

    const res = {
      set: () => res,
      status: () => res,
      send: () => {},
    }

    await controller.handle(req, res, jest.fn())

    expect(auth.check).toHaveBeenCalled()
    expect(handler.handle).not.toHaveBeenCalled()
    expect(handler.format).toHaveBeenCalled()

    done()
  })
})
