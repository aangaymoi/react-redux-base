import 'core-js'

import debug from 'debug'
const log = debug('api:scripts:clean')

import fs from 'fs-extra'

log('Cleaning build folder .....')
fs.emptyDirSync('build')
log('Cleaning build folder done!')
