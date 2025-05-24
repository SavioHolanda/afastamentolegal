import dayjs from 'dayjs';
import homePage from '../support/pages/homePage';
import cadastroPage from '../support/pages/cadastroPage';

describe('Cadastro de atestado', () => {

  beforeEach(() => {
    homePage.visit();
    cy.get(homePage.selectors.botaoCadastarAfastamentoLegal).click();
  });

  it.skip('Realizar o cadastro do afastamento do tipo Atestado Medico (Dias) preenchendo todos os campos', () => { 
    cy.get(cadastroPage.selectors.tipoAfastamento).contains('Atestado médico (dias)').click();
    cy.get(cadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(cadastroPage.selectors.dataInicio).type(today);

    const tomorrow = new Date(Date.now() + 86400000);
    cy.get(cadastroPage.selectors.dataFim).type(tomorrow.toISOString().split('T')[0])

    const horaAtual = dayjs().format('HH:mm');
    cy.get(cadastroPage.selectors.horaInicio).type(horaAtual);

    cy.get(cadastroPage.selectors.campoCid).type("A00");
    cy.get(cadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(cadastroPage.selectors.campoCrm).type("123456");
    cy.get(cadastroPage.selectors.campoUf).select('SP');
    cy.get(cadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(cadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(cadastroPage.selectors.linkTermo).click();
    cy.get(cadastroPage.selectors.aceitarTermo).click();
   //cy.get(cadastroPage.selectors.botaoEnviar).click();

    //cy.get(cadastroPage.selectors.mensagemSucesso).should('contain', 'Atestado Cadastrado com sucesso');
  });

  it.skip('Realizar a validação dos campos obrigatórios em tipo Atestado Medico (Dias)', () => {
    cy.get(cadastroPage.selectors.tipoAfastamento).contains('Atestado médico (dias)').click();
    cy.get(cadastroPage.selectors.botaoProximo).click();

    cy.get(cadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(cadastroPage.selectors.linkTermo).click();
    cy.get(cadastroPage.selectors.aceitarTermo).click();
    cy.get(cadastroPage.selectors.botaoEnviar).click();

    cy.get(cadastroPage.selectors.mensagemObrigatórioDataEmissao).should('contain', 'Campo obrigatório');
    cy.get(cadastroPage.selectors.mensagemObrigatórioDataFim).should('contain', 'Campo obrigatório');
    cy.get(cadastroPage.selectors.mensagemObrigatórioNomeMedico).should('contain', 'Campo obrigatório');
    cy.get(cadastroPage.selectors.mensagemObrigatórioNumeroCRM).should('contain', 'Campo obrigatório');
    cy.get(cadastroPage.selectors.mensagemObrigatórioUF).should('contain', 'UF é obrigatório');
  });

  it.skip('Realizar o cadastro do afastamento do tipo Atestado Medico (Horas) preenchendo todos os campos', () => {
    cy.get(cadastroPage.selectors.tipoAfastamento).contains('Atestado médico (horas)').click();
    cy.get(cadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(cadastroPage.selectors.dataInicio).type(today);

    const horaAtual = dayjs().format('HH:mm');
    cy.get(cadastroPage.selectors.horaInicio).type(horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    cy.get(cadastroPage.selectors.horaFim).type(horaMaisUma)

    cy.get(cadastroPage.selectors.campoCid).type("A00");
    cy.get(cadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(cadastroPage.selectors.campoCrm).type("123456");
    cy.get(cadastroPage.selectors.campoUf).select('SP');
    cy.get(cadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(cadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(cadastroPage.selectors.linkTermo).click();
    cy.get(cadastroPage.selectors.aceitarTermo).click();
    //cy.get(cadastroPage.selectors.botaoEnviar).click();

    //cadastroPage.verifyToastMessage('.Toastify__toast-body > :nth-child(2)', 'Atestado Cadastrado com sucesso');
    //cadastroPage.verifyToastMessage('.sc-hbtGpV', 'Atestado cadastrado com sucesso!');
  });

  it.skip('Realizar o cadastro do afastamento do tipo Licença paternidade preenchendo todos os campos', () => {
    cy.get(cadastroPage.selectors.tipoAfastamento).contains('Licença Paternidade').click();
    cy.get(cadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(cadastroPage.selectors.dataInicio).type(today);

    const horaAtual = dayjs().format('HH:mm');
    cy.get(cadastroPage.selectors.horaInicio).type(horaAtual);

    cy.get(cadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(cadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(cadastroPage.selectors.linkTermo).click();
    cy.get(cadastroPage.selectors.aceitarTermo).click();
    //cy.get(cadastroPage.selectors.botaoEnviar).click();
  });

  it.skip('Realizar o cadastro do afastamento do tipo Licença maternidade preenchendo todos os campos', () => {
    cy.get(cadastroPage.selectors.tipoAfastamento).contains('Licença Maternidade').click();
    cy.get(cadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(cadastroPage.selectors.dataInicio).type(today);

    const tomorrow = new Date(Date.now() + 86400000);
    cy.get(cadastroPage.selectors.dataFim).type(tomorrow.toISOString().split('T')[0])

    const horaAtual = dayjs().format('HH:mm');
    cy.get(cadastroPage.selectors.horaInicio).type(horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    cy.get(cadastroPage.selectors.horaFim).type(horaMaisUma)

    cy.get(cadastroPage.selectors.campoCid).type("A00");
    cy.get(cadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(cadastroPage.selectors.campoCrm).type("123456");
    cy.get(cadastroPage.selectors.campoUf).select('SP');
    cy.get(cadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(cadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(cadastroPage.selectors.linkTermo).click();
    cy.get(cadastroPage.selectors.aceitarTermo).click();
   //cy.get(cadastroPage.selectors.botaoEnviar).click();
  });

  it.skip('Realizar o cadastro do afastamento do tipo internação preenchendo todos os campos', () => {
    cy.get(cadastroPage.selectors.tipoAfastamento).contains('Internação').click();
    cy.get(cadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(cadastroPage.selectors.dataInicio).type(today);

    const horaAtual = dayjs().format('HH:mm');
    cy.get(cadastroPage.selectors.horaInicio).type(horaAtual);

    cy.get(cadastroPage.selectors.campoCid).type("A00");
    cy.get(cadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(cadastroPage.selectors.campoCrm).type("123456");
    cy.get(cadastroPage.selectors.campoUf).select('SP');

    cy.get(cadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(cadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(cadastroPage.selectors.linkTermo).click();
    cy.get(cadastroPage.selectors.aceitarTermo).click();
    //cy.get(cadastroPage.selectors.botaoEnviar).click();
  });

  it.skip('Validar o campo Data de inicio obrigatório no cadastro de um atestado', () => {
    cadastroPage.clickButton('.sc-egkSDF');
    cadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    cadastroPage.clickButton('[data-variant="primary"]');

    cadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    cadastroPage.clickButton('strong');
    cadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    cadastroPage.clickButton('[type="submit"]');

    cadastroPage.verificarMensagem('form > :nth-child(1) > :nth-child(1)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Data de término obrigatório no cadastro de um atestado', () => {
    cadastroPage.clickButton('.sc-egkSDF');
    cadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    cadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    cadastroPage.typeInField('#startDate', today);

    cadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    cadastroPage.clickButton('strong');
    cadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    cadastroPage.clickButton('[type="submit"]');

    cadastroPage.verificarMensagem('form > :nth-child(1) > :nth-child(2)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Hora de inicio obrigatório no cadastro de um atestado', () => {
    cadastroPage.clickButton('.sc-egkSDF');
    cadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    cadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    cadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    cadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    cadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    cadastroPage.clickButton('strong');
    cadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    cadastroPage.clickButton('[type="submit"]');

    cadastroPage.verificarMensagem('form > :nth-child(2) > :nth-child(1)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Hora de término obrigatório no cadastro de um atestado', () => {
    cadastroPage.clickButton('.sc-egkSDF');
    cadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    cadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    cadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    cadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    cadastroPage.typeInField('#startHour', horaAtual);

    cadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    cadastroPage.clickButton('strong');
    cadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    cadastroPage.clickButton('[type="submit"]');

    cadastroPage.verificarMensagem('form > :nth-child(2) > :nth-child(2)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Médico obrigatório no cadastro de um atestado', () => {
    cadastroPage.clickButton('.sc-egkSDF');
    cadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    cadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    cadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    cadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    cadastroPage.typeInField('#startHour', horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    cadastroPage.typeInField('#endHour', horaMaisUma);

    cadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    cadastroPage.clickButton('strong');
    cadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    cadastroPage.clickButton('[type="submit"]');

    cadastroPage.verificarMensagem('form > :nth-child(4)', 'Campo obrigatório')
    //cadastroPage.verificarMensagem('form > :nth-child(5)', 'Campo obrigatório')
  });

  it.skip('Validar o campo CRM/CRO obrigatório no cadastro de um atestado', () => {
    cadastroPage.clickButton('.sc-egkSDF');
    cadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    cadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    cadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    cadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    cadastroPage.typeInField('#startHour', horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    cadastroPage.typeInField('#endHour', horaMaisUma);

    cadastroPage.typeInField('#medico', "Dr. João da Silva");

    cadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    cadastroPage.clickButton('strong');
    cadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    cadastroPage.clickButton('[type="submit"]');

    cadastroPage.verificarMensagem('form > :nth-child(5)', 'Campo obrigatório')
  });

  it.skip('Validar a obrigatóriedade do documento no cadastro de um atestado', () => {
    cadastroPage.clickButton('.sc-egkSDF');
    cadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    cadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    cadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    cadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    cadastroPage.typeInField('#startHour', horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    cadastroPage.typeInField('#endHour', horaMaisUma);

    cadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    cadastroPage.clickButton('strong');
    cadastroPage.clickButton('.contentButton > [data-variant="primary"]');

    cadastroPage.clickButton('.bruODN');

    cadastroPage.verificarMensagem('.sc-diYFot', 'É necessário anexar um arquivo imagem, PDF, etc.*')
  });
})