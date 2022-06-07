import ReponseClass from '../Model/ReponseClass'
import Base from '../Database/Base'
import { db } from '../firebase'
import Cliente from '../Model/Cliente'

export default class ClienteController extends Base {
  public static Collection: string = 'Cliente'

  constructor() {
    super()
  }

  public insert(nome: String, cpf: String, DataNascimento: Date) {
    const cliente = new Cliente(nome, cpf, DataNascimento)
    const cpfVerify = db
      .collection(ClienteController.Collection)
      .where('CPF', '==', cpf)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return this.store(
            cliente,
            ClienteController.Collection,
            this.clientConverter()
          )
            .then((d) => new ReponseClass(d, ''))
            .catch(() => new ReponseClass('', 'Erro ao buscar documentos'))
        } else {
          return new ReponseClass('', 'CPF já cadastrado')
        }
      })
      .catch(() => {
        return new ReponseClass('', 'Erro ao buscar documentos')
      })

    return cpfVerify
  }

  public update(id: string, nome: String, cpf: String, DataNascimento: Date) {
    const cliente = new Cliente(nome, cpf, DataNascimento)
    const cpfVerify = db
      .collection(ClienteController.Collection)
      .where('CPF', '==', cpf)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return this.edit(
            cliente,
            ClienteController.Collection,
            id,
            this.clientConverter()
          ).then((a) => {
            switch (a) {
              case true:
                return new ReponseClass(id, '')

              case false:
                return new ReponseClass(
                  '',
                  'Não foi possivel atualizar no momento! tente novamente mais tarde ou contate o admin'
                )
            }
          })
        }
        const resp: ReponseClass = new ReponseClass('', '')
        snapshot.docs.map((a) => {
          if (a.id == id) {
            resp.error = 'CPF inserido é o mesmo já cadastrado'
          } else {
            resp.error = 'CPF já cadastrado em outro cliente'
          }
        })

        return resp
      })
      .catch(() => {
        return new ReponseClass(
          '',
          'Não foi possivel validar os dados inseridos! tente novamente mais tarde ou contate o admin'
        )
      })

    return cpfVerify
  }

  public async getAll(): Promise<Cliente[]> {
    const resp = this.getAllbyCollection(ClienteController.Collection)

    const data = await resp
    const result: Cliente[] = []
    data.forEach((d) => {
      const values = d.data()
      const _client: Cliente = new Cliente(
        values.nome,
        values.cpf,
        values.DataNascimento
      )
      _client.id = d.id
      result.push(_client)
    })
    return result
  }

  public async getById(id: string): Promise<Cliente> {
    const values = await (
      await this.getDocbyId(ClienteController.Collection, id)
    ).data()
    const _client: Cliente = new Cliente(
      values!.nome,
      values!.cpf,
      values!.DataNascimento
    )
    _client.id = values!.id

    return _client
  }

  private clientConverter() {
    return {
      toFirestore: function (cliente: Cliente) {
        return {
          NOME: cliente.nome,
          CPF: cliente.cpf,
          DATANASCIMENTO: cliente.dataNascimento,
        }
      },
      fromFirestore: function (snapshot, options) {
        const data = snapshot.data(options)
        return new Cliente(data.nome, data.cpf, data.DataNascimento)
      },
    }
  }
}
