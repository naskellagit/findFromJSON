import { Request } from "express"

export interface RequestWithQuery extends Request {
    query: {
        email: string
        phone?: string
    }
}

export interface JsonData {
    email: string
    number: number
}