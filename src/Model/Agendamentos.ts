import {IAgendamentos} from './interfaces';

// eslint-disable-next-line require-jsdoc
export default class Agendamentos implements IAgendamentos {
    public id: String = '';
    // eslint-disable-next-line require-jsdoc
    constructor(
        public data:Date,
        public observacao: String,
        public servRealizado: boolean,
        public dataTermino?:Date) {}
    }