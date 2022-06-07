import {IResponseClass} from './interfaces';

// eslint-disable-next-line require-jsdoc
export default class ResponseClass implements IResponseClass {
  // eslint-disable-next-line require-jsdoc
  constructor(public id: string, public error: string) {}
}
