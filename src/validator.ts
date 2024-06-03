import { query } from 'express-validator'

export const queryValidator = [
    query('email', 'Некорректный email').isEmail(),
    query('phone', 'Некоректный номер').isString().isLength({
        min: 6,
        max: 6
    }).optional()
]