import { FirestoreError } from 'firebase/firestore'

export function localizeErrorsMap(e: FirestoreError): String {
  if (firestoreErrors.hasOwnProperty(e.code)) {
    return firestoreErrors[e.code]
  } else {
    return ''
  }
}

const firestoreErrors = {
  cancelled: 'A operação foi cancelada',
  unknown: 'Erro desconhecido ou um erro de um domínio de erro diferente.',
  'invalid-argument':
    "argumento inválido': O cliente especificou um argumento inválido. Observe que isso difere de 'pré-condição com falha",
  'deadline-exceeded':
    'O prazo expirou antes que a operação pudesse ser concluída. Para operações que alteram o estado do sistema, esse erro pode ser retornado mesmo que a operação tenha sido concluída com êxito',
  'not-found': 'Documento não encontrado',
  'already-exists': 'Documento já existe',
  'permission-denied':
    ' O Caller não tem permissão para executar a operação especificada.',
  'resource-exhausted':
    'Algum recurso foi esgotado, talvez uma cota por usuário, ou talvez todo o sistema de arquivos esteja sem espaço.',
  'failed-precondition':
    'A operação foi rejeitada porque o sistema não está em um estado necessário para a execução da operação.',
  aborted:
    'A operação foi abortada, normalmente devido a um problema de simultaneidade.',
  'out-of-range': 'A operação foi tentada além do intervalo válido.',
  unimplemented: 'Operação não implementada ou não suportada/ativada.',
  internal:
    'Erros internos. Significa que alguns invariantes esperados pelo sistema subjacente foram quebrados.',
  unavailable: 'O serviço está indisponível no momento.',
  'data-loss': 'Perda ou corrupção de dados irrecuperáveis.',
  unauthenticated:
    'A solicitação não possui credenciais de autenticação válidas para a operação.',
}
