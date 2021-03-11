import debug from 'debug'
const log = debug('api:service:authorize')

import uuid from 'uuid'

import userRepo, { User } from '../repo/user'

export type Check = {
  (token?: string): Promise<string | undefined>
}

export interface IAuth {
  check: Check
}

export class None implements IAuth {
  public check: Check = async (token?: string): Promise<string | undefined> => {
    return uuid()
  }
}

export class Admin implements IAuth {
  public check: Check = async (token?: string): Promise<string | undefined> => {
    const user = await userRepo.search(
      'uuid',
      token,
      { exact: true },
      `and ((current_timestamp - datetime(strftime(last_access))) / 3600000) < 2 `
    )
    if (user && (user as User).type === 'admin') {
      const obj = await userRepo.refresh((user as User)._id as number)
      return (obj as User).uuid
    }
    return undefined
  }
}

export class Logged implements IAuth {
  public check: Check = async (token?: string): Promise<string | undefined> => {
    const user = await userRepo.search(
      'uuid',
      token,
      { exact: true },
      `and ((current_timestamp - datetime(strftime(last_access))) / 3600000) < 2 `
    )
    if (user && (user as User).type === 'user') {
      const obj = await userRepo.refresh((user as User)._id as number)
      return (obj as User).uuid
    }
    return undefined
  }
}
