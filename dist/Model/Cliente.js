"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente = /** @class */ (function () {
    function Cliente(Nome, CPF, DataNascimento) {
        if (Nome === void 0) { Nome = ""; }
        if (CPF === void 0) { CPF = ""; }
        this.Nome = Nome;
        this.CPF = CPF;
        this.DataNascimento = DataNascimento;
        this.id = "";
    }
    return Cliente;
}());
exports.default = Cliente;
