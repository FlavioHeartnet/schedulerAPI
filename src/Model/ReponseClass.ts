import { IResponseClass } from "./interfaces"

export default class ResponseClass implements IResponseClass{
    
    constructor(public id: string, public error: string){}
}