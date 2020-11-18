"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("../Database/Base"));
var Cliente_1 = __importDefault(require("../Model/Cliente"));
var ClienteController = /** @class */ (function (_super) {
    __extends(ClienteController, _super);
    function ClienteController() {
        return _super.call(this) || this;
    }
    ClienteController.prototype.insert = function (nome, cpf, DataNascimento) {
        var cliente = new Cliente_1.default(nome, cpf, DataNascimento);
        return this.store(cliente, ClienteController.Collection, this.clientConverter()).then(function (d) { return d; });
    };
    ClienteController.prototype.update = function (id, nome, cpf, DataNascimento) {
        var cliente = new Cliente_1.default(nome, cpf, DataNascimento);
        return this.edit(cliente, ClienteController.Collection, id, this.clientConverter());
    };
    ClienteController.prototype.getAll = function () {
        var resp = this.getAllbyCollection("Cliente");
        var result = [];
        var Client;
        resp.then(function (data) {
            data.forEach(function (d) {
                var values = d.data();
                Client = new Cliente_1.default(values.nome, values.cpf, values.DataNascimento);
                Client.id = d.id;
                result.push(Client);
            });
        });
        return result;
    };
    ClienteController.prototype.clientConverter = function () {
        return {
            toFirestore: function (cliente) {
                return {
                    nome: cliente.Nome,
                    cpf: cliente.CPF,
                    DataNascimento: cliente.DataNascimento
                };
            },
            fromFirestore: function (snapshot, options) {
                var data = snapshot.data(options);
                return new Cliente_1.default(data.nome, data.cpf, data.DataNascimento);
            }
        };
    };
    ClienteController.Collection = "Cliente";
    return ClienteController;
}(Base_1.default));
exports.default = ClienteController;
