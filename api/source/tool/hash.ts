import crypto from 'crypto'

const hash = (text: string): string => {
  const secret = 'shop'
  return crypto
    .createHmac('sha256', secret)
    .update(text)
    .digest('hex')
}

export default hash
