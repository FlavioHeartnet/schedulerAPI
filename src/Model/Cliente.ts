import {Pessoa} from './interfaces';

// eslint-disable-next-line require-jsdoc
export default class Cliente implements Pessoa {
    public id: String = '';
    // eslint-disable-next-line require-jsdoc
    constructor(
        public nome: String ='',
        public cpf: String = '',
        public dataNascimento: Date) {}
}
