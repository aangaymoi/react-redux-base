import uuid from 'uuid'

import { connect, disconnect } from '../repo/database'
import { User } from '../repo/user'

let userRepo: any

const admin: User = {
  type: 'admin',
  name: uuid(),
  email: uuid(),
  password: uuid(),
}

const user: User = {
  type: 'user',
  name: uuid(),
  email: uuid(),
  password: uuid(),
}

import { None, Admin, Logged } from './authorize'

describe('service:authorize', () => {
  beforeAll(async done => {
    await connect()
    userRepo = require('../repo/user').default
    await userRepo.create(admin)
    admin.uuid = ((await userRepo.authen(
      admin.email,
      admin.password
    )) as User).uuid
    await userRepo.create(user)
    user.uuid = ((await userRepo.authen(
      user.email,
      user.password
    )) as User).uuid
    done()
  })

  afterAll(async done => {
    await disconnect()
    done()
  })

  test('authorize:none should work correctly', async done => {
    const none = new None()
    const actual = await none.check()
    expect(actual).toBeTruthy()
    done()
  })

  test('authorize:admin should work correctly', async done => {
    const authorize = new Admin()
    const t1 = await authorize.check(admin.uuid)
    expect(t1).toBeTruthy()
    const t2 = await authorize.check(user.uuid)
    expect(t2).toBeFalsy()
    done()
  })

  test('authorize:logged should work correctly', async done => {
    const authorize = new Logged()
    const t1 = await authorize.check(user.uuid)
    expect(t1).toBeTruthy()
    const t2 = await authorize.check(uuid())
    expect(t2).toBeFalsy()
    done()
  })
})
