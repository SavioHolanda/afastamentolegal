class CadastroPage {
//Ajustar o nome de todos os seletores amanhã.
  get selectors() {
    return {
      tipoAfastamento: '.sc-iLBnws',
      botaoProximo: '[data-variant="primary"]',
      dataInicio: '#startDate',
      dataFim: '#endDate',
      horaInicio: '#startHour',
      horaFim: '#endHour',
      campoCid: '#CID',
      campoMedico: '#medico',
      campoCrm: '#CRMCRO',
      campoUf: '.sc-UqUTu',
      campoObservacao: '#OBS',
      campoAnexo: 'input[type="file"]',
      linkTermo: 'strong',
      aceitarTermo: '.contentButton > [data-variant="primary"]',
      botaoEnviar: '[type="submit"]',
      mensagemSucesso: '.Toastify__toast-body > :nth-child(2)',
      mensagemObrigatórioDataEmissao: ':nth-child(1) > .sc-byRegH',
      mensagemObrigatórioDataFim: ':nth-child(2) > .sc-byRegH',
      mensagemObrigatórioNomeMedico: ':nth-child(5) > .sc-kNmFTk',
      mensagemObrigatórioNumeroCRM: ':nth-child(6) > .sc-kNmFTk',
      mensagemObrigatórioUF: '.sc-fdduAw'
    };
  }
}

export default new CadastroPage();