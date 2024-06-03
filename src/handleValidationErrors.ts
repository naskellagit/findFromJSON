import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

export default (req: Request, res: Response, next: () => void) => {
  const errors = validationResult(req)
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(400).json({error: true, errorArray :errors.array()})
  }
  next()
}
