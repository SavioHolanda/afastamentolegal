import { getAuthToken } from '../apiRequests.js';

class CadastroPage {
  visit() {
    cy.visit('https://nhg-health-sso-hml.nhgtech.com.br/attestation/506719/60/99');
  }

  setLocalStorage() {
    getAuthToken().then((data) => {
      cy.window().then((win) => {
        win.localStorage.setItem("@data_user_nhg", '{"vida_primeiro_nome":"Sávio","vida_sobrenome":"Borges","vida_nome_completo":"Sávio Borges","vida_data_nascimento":"1996-09-10T00:00:00","vida_end":"Rua Luís Gonzaga dos Santos","vida_end_num":"555","vida_bairro":"","vida_cep":"61932600","vida_complemento":"","vida_celular":"85996390587","vida_email":"savio.borges@nhgtech.com.br","vida_cpf":"02971008312","vida_sexo":2,"vida_cidade":"Maracanaú","vida_uf":"CE","tipo_sanguineo":".,","vida_nome_mae":"fewfsd"}');
        win.localStorage.setItem("@token_nhg", JSON.stringify(data));
      });
    });
  }
//Ajustar o nome de todos os seletores amanhã.
  get selectors() {
    return {
      botaoCadastarAfastamentoLegal: '.sc-egkSDF',
      tipoAfastamento: '.sc-fFoeYl',
      botaoProximo: '[data-variant="primary"]',
      dataInicio: '#startDate',
      dataFim: '#endDate',
      horaInicio: '#startHour',
      horaFim: '#endHour',
      campoCid: '#cid',
      campoMedico: '#medico',
      campoCrm: '#crm',
      campoUf: '.sc-jIyAiq',
      campoObservacao: '#observacao',
      campoAnexo: 'input[type="file"]',
      linkTermo: 'strong',
      aceitarTermo: '.contentButton > [data-variant="primary"]',
      botaoEnviar: '[type="submit"]',
      mensagemSucesso: '.Toastify__toast-body > :nth-child(2)'
    };
  }

  // clickButton(selector) {
  //   cy.get(selector).click();
  // }

  // clickTipoAfastamento(selector, afastamento) {
  //   cy.get(selector).contains(afastamento).click();
  // }

  // typeInField(selector, text) {
  //   cy.get(selector).type(text);
  // }

  // selectFile(selector, filePath) {
  //   cy.get(selector).selectFile(filePath, { force: true });
  // }

  // verifyToastMessage(selector, message) {
  //   cy.get(selector).should('contain', message);
  // }

  // verificarMensagem(selector, texto) {
  //   cy.get(selector).contains(texto).should('be.visible');
  // }
}

export default new CadastroPage();