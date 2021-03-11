import debug from 'debug'
import { setInterval } from 'core-js'
const log = debug('api:repo:database')

const sqlite3 = require('sqlite3').verbose()

let database: any = new sqlite3.Database('database.sqlite')

const initial = (db: any, cb: Function) => {
  db.run(
    `create table if not exists user (_id integer primary key autoincrement, type text default 'user', uuid text, name text, email text unique, password text, last_access datetime default current_timestamp, created_at datetime default current_timestamp, updated_at datetime default current_timestamp);`
  )
  cb()
}

export const connect = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (database.open) {
      return resolve()
    }
    setInterval(() => {
      if (database.open) {
        initial(database, resolve)
      }
    }, 250)
  })
}

export const disconnect = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!database.open) {
      return resolve()
    }
    database.close(() => {
      return resolve()
    })
  })
}

export default database
