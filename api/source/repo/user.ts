import debug from 'debug'
const log = debug('api:repo:user')

import uuid from 'uuid'

import database from './database'

export interface Options {
  exact?: boolean
  order?: string
  limit?: number
  offset?: number
}

export interface User {
  _id?: number
  type: string
  uuid?: string
  name: string
  email: string
  password?: string
  created_at?: string
  updated_at?: string
  last_access?: string
}

export class UserRepo {
  public database: any
  constructor(database: any) {
    this.database = database
  }

  public create = async (object: User): Promise<User | undefined> => {
    return new Promise(resolve => {
      const self = this
      this.database.run(
        `insert into user (type, name, email, password) values (?, ?, ?, ?);`,
        [object.type, object.name, object.email, object.password],
        function(this: any, error: any) {
          if (error) {
            return resolve(undefined)
          }
          self.database.all(
            `select _id, type, name, email, created_at, updated_at, last_access from user where _id = ?;`,
            [this.lastID],
            function(error: any, rows: [any]) {
              if (error || !rows || !rows.length) {
                return resolve(undefined)
              }
              return resolve(rows[0] as User)
            }
          )
        }
      )
    })
  }

  public search = async (
    key: string,
    value: any,
    options = {
      exact: true,
      order: 'desc',
      limit: 10,
      offset: 0,
    } as Options,
    extra?: string
  ): Promise<[User] | User | undefined> => {
    let sql = `select * from user where ${key} `
    if (options) {
      if (options.exact) {
        sql = sql + `= ? `
      } else {
        sql = sql + `like ? `
      }
      if (extra) {
        sql = sql + extra
      }
      if (options.order) {
        sql = sql + `order by ${key} ${options.order} `
      }
      if (options.limit !== undefined && options.limit >= 0) {
        sql = sql + `limit ${options.limit} `
      }
      if (options.offset !== undefined && options.offset >= 0) {
        sql = sql + `offset ${options.offset} `
      }
    }
    return new Promise(resolve => {
      this.database.all(sql, [options.exact ? value : `%${value}%`], function(
        error: any,
        rows: [any]
      ) {
        if (error || !rows || !rows.length) {
          return resolve(undefined)
        }
        if (options.exact) {
          return resolve(rows[0] as User)
        }
        return resolve(rows as [User])
      })
    })
  }

  public listing = async (
    key: string,
    options = {
      order: 'asc',
      limit: 10,
      offset: 0,
    } as Options
  ): Promise<[User] | undefined> => {
    const sql = `select * from user order by ${key} ${options.order} limit ${options.limit} offset ${options.offset};`
    return new Promise(resolve => {
      this.database.all(sql, [], function(error: any, rows: [any]) {
        if (error || !rows || !rows.length) {
          return resolve(undefined)
        }
        return resolve(rows as [User])
      })
    })
  }

  public authen = async (
    email: string,
    password: string
  ): Promise<User | undefined> => {
    const self = this
    return new Promise(resolve => {
      this.database.run(
        `update user set uuid = ?, last_access = current_timestamp where email = ? and password = ?;`,
        [uuid(), email, password],
        function(this: any, error: any) {
          if (error || !this.changes) {
            return resolve(undefined)
          }
          self.database.all(
            `select _id, type, uuid, name, email, created_at, updated_at, last_access from user where email = ? and password = ?;`,
            [email, password],
            function(error: any, rows: [any]) {
              if (error || !rows || !rows.length) {
                return resolve(undefined)
              }
              return resolve(rows[0] as User)
            }
          )
        }
      )
    })
  }

  public expire = async (_id: number): Promise<User | undefined> => {
    const self = this
    return new Promise(resolve => {
      this.database.run(
        `update user set uuid = null, last_access = current_timestamp where _id = ?;`,
        [_id],
        function(this: any, error: any) {
          if (error) {
            return resolve(undefined)
          }
          self.database.all(
            `select * from user where _id = ?;`,
            [_id],
            function(error: any, rows: [any]) {
              if (error || !rows || !rows.length) {
                return resolve(undefined)
              }
              return resolve(rows[0] as User)
            }
          )
        }
      )
    })
  }

  public refresh = async (_id: number): Promise<User | undefined> => {
    const self = this
    return new Promise(resolve => {
      this.database.run(
        `update user set uuid = ?, last_access = current_timestamp where _id = ?;`,
        [uuid(), _id],
        function(this: any, error: any) {
          if (error) {
            return resolve(undefined)
          }
          self.database.all(
            `select * from user where _id = ?;`,
            [_id],
            function(error: any, rows: [any]) {
              if (error || !rows || !rows.length) {
                return resolve(undefined)
              }
              return resolve(rows[0] as User)
            }
          )
        }
      )
    })
  }
}

const userRepo = new UserRepo(database)

export default userRepo
