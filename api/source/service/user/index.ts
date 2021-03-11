import { Router } from 'express'

import signup from './signup'
import signin from './signin'
import logout from './logout'
import search from './search'
import listing from './listing'

const userRouter = Router()

userRouter.post('/user/signup', signup.handle)
userRouter.post('/user/signin', signin.handle)
userRouter.get('/user/logout', logout.handle)
userRouter.get('/user/search', search.handle)
userRouter.get('/user/listing', listing.handle)

export default userRouter
