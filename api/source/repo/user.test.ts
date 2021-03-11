import uuid from 'uuid'

import database, { connect, disconnect } from './database'
import { User } from './user'

let userRepo: any

const user: User = {
  type: 'user',
  name: uuid(),
  email: uuid(),
  password: uuid(),
}

describe('repo:user', () => {
  beforeAll(async done => {
    await connect()
    userRepo = require('./user').default
    done()
  })

  afterAll(async done => {
    await disconnect()
    done()
  })

  test('create method should return user', async done => {
    const actual = await userRepo.create(user)
    user._id = actual._id
    expect(actual).toBeTruthy()
    done()
  })

  test('search method should return user', async done => {
    const actual = await userRepo.search(
      'email',
      user.email,
      { exact: true },
      'and true '
    )
    expect(actual).toBeTruthy()
    expect((actual as User).email).toEqual(user.email)
    done()
  })

  test('listing method should return user', async done => {
    const actual = await userRepo.listing('last_access', {
      order: 'desc',
      offset: 0,
      limit: 1,
    })
    expect((actual as [User]).length).toEqual(1)
    done()
  })

  test('authen method should return user', async done => {
    const actual = await userRepo.authen(user.email, user.password as string)
    expect(actual).toBeTruthy()
    expect((actual as User).uuid).toBeTruthy()
    expect((actual as User).email).toEqual(user.email)
    done()
  })

  test('expire method should return user', async done => {
    const actual = await userRepo.expire(user._id)
    expect(actual).toBeTruthy()
    expect(actual.uuid).toEqual(null)
    done()
  })

  test('refresh method should return user', async done => {
    const actual = await userRepo.refresh(user._id)
    expect(actual).toBeTruthy()
    expect(actual.uuid).not.toEqual(user.uuid)
    done()
  })
})
