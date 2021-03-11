import { mockProcessExit, mockConsoleLog } from 'jest-mock-process'

import { connect, disconnect } from './repo/database'
jest.mock('./repo/database')

import server, { PORT, startup, cleanup, graceful } from './server'

const mockExit = mockProcessExit()
const mockLog = mockConsoleLog()

describe('server', () => {
  afterAll(async done => {
    mockExit.mockRestore()
    mockLog.mockRestore()
    jest.resetAllMocks()
    done()
  })

  test('server should startup correctly', async done => {
    server.listen = jest.fn()
    await startup()
    expect(connect).toHaveBeenCalled()
    expect(server.listen).toHaveBeenCalled()
    done()
  })

  test('server should cleanup correctly with code 0', async done => {
    server.close = jest.fn()
    const error = undefined
    await cleanup(error)
    expect(disconnect).toHaveBeenCalled()
    expect(server.close).toHaveBeenCalled()
    expect(mockExit).toBeTruthy()
    done()
  })

  test('server should cleanup correctly with code 1', async done => {
    server.close = jest.fn()
    const error = new Error()
    await cleanup(error)
    expect(disconnect).toHaveBeenCalled()
    expect(server.close).toHaveBeenCalled()
    expect(mockExit).toBeTruthy()
    done()
  })

  test('server should graceful correctly', async done => {
    const callback = async (error?: any): Promise<void> => {}
    process.on = jest.fn().mockImplementation(process.on)
    await graceful(callback)
    expect(process.on).toHaveBeenCalledTimes(3)
    expect(process.on).toHaveBeenCalledWith('rejectionHandled', callback)
    expect(process.on).toHaveBeenCalledWith('uncaughtException', callback)
    expect(process.on).toHaveBeenCalledWith('SIGINT', callback)
    done()
  })
})
