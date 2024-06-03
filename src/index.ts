import express, {Response} from 'express'
import { RequestWithQuery, JsonData } from './types'
import { queryValidator } from './validator'
import handleValidationErrors from './handleValidationErrors'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

const app = express()

const PORT = 5005

const filePath = path.join(__dirname, '../', 'data.json')

const sleep = async(ms: number)=> {
   await new Promise((resolve) => {
    setTimeout(() => {
        resolve(ms)
    }, ms)
   })
}

app.use(cors())

app.use('/', express.static(path.join(__dirname, '../', 'front', 'build')))

app.get('/api', queryValidator, handleValidationErrors,  async (req: RequestWithQuery, res: Response) => {
    const {email, phone} = req.query
    await sleep(5000)
    const dataJson = fs.readFileSync(filePath, {encoding: 'utf8'})
    const data = <JsonData[]>JSON.parse(dataJson)
    const filteredData = data.filter(elem => {
        if(phone) return elem.email === email && elem.number === Number(phone)
        return elem.email === email
    })
    return res.json(filteredData)
})

app.listen(PORT, () => {
    console.log('Server is started on port ' + PORT)
})