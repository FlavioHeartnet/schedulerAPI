import * as dotenv from 'dotenv'

dotenv.config()
type envConfig = {
  accessTokenLife?: string
  refreshTokenLife?: string
  accessTokenSecret?: string
  refreshtokenSecret?: string
  apiKey?: string
  authDomain?: string
  projectId?: string
  storageBucket?: string
  messagingSenderId?: string
  appId?: string
  databaseURL?: string
}

const config: envConfig = {
  accessTokenLife: process.env.ACCESS_TOKEN_LIFE,
  refreshTokenLife: process.env.REFRESH_TOKEN_LIFE,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshtokenSecret: process.env.REFRESH_TOKEN_SECRET,
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  databaseURL: process.env.DATABASEURL,
}
export default config
