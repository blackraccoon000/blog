import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

type Success = {
  message: string
  data: ContactType
}

type Failed = {
  message: string
}

export type ContactType = {
  id?: string
  email: string
  name: string
  message: string
}

const dataCheck = (email: string, name: string, message: string) => {
  const emailValidate = !email || !email.includes('@')
  const nameValidate = !name || name.trim() === ''
  const messageValidate = !message || message.trim() === ''
  return emailValidate || nameValidate || messageValidate
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Success | Failed>) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body
    if (dataCheck(email, name, message)) {
      res.status(422).json({ message: 'Invalid input.' })
      return
    }
    const newMessage: ContactType = { email, name, message }

    const uri = process.env.DB ? process.env.DB : ''
    const connectOption: {
      useNewUrlParser: boolean
      useUnifiedTopology: boolean
    } = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    // Todo: uriが間違う✖ 空だとサーバーが止まる（っぽい）。 deploy後にまた確認する。
    const client = await MongoClient.connect(uri, connectOption)
      .then((client) => client)
      .catch((reason) => {
        console.log('error')
        res.status(500).json({ message: reason })
        return Promise.reject(reason)
      })
    const db = client.db()
    await db
      .collection('message')
      .insertOne(newMessage)
      .then((result) => {
        newMessage.id = result.insertedId
        res.status(201).json({ message: 'Successfully stored message!', data: newMessage })
        return result
      })
      .catch((reason) => {
        res.status(500).json({ message: reason })
        return Promise.reject(reason)
      })
    await client.close()
    return
  } else {
    res.status(400).json({ message: 'failed' })
  }
}

export default handler
