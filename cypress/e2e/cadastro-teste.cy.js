import dayjs from 'dayjs';
import HomePage from '../support/pages/home-page';
import CadastroPage from '../support/pages/cadastro-page';

describe('Cadastro de atestado', () => {

  beforeEach(() => {
    HomePage.visit();
    cy.get(HomePage.selectors.botaoCadastarAfastamentoLegal).click();
  });

  it('Realizar o cadastro do afastamento do tipo Atestado Medico (Dias) preenchendo todos os campos', () => { 
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Atestado médico (dias)').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(CadastroPage.selectors.dataInicio).type(today);

    const tomorrow = new Date(Date.now() + 86400000);
    cy.get(CadastroPage.selectors.dataFim).type(tomorrow.toISOString().split('T')[0])

    const horaAtual = dayjs().format('HH:mm');
    cy.get(CadastroPage.selectors.horaInicio).type(horaAtual);

    cy.get(CadastroPage.selectors.campoCid).type("A00");
    cy.get(CadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(CadastroPage.selectors.campoCrm).type("123456");
    cy.get(CadastroPage.selectors.campoUf).select('SP');
    cy.get(CadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
   //cy.get(CadastroPage.selectors.botaoEnviar).click();

    //cy.get(CadastroPage.mensagens.mensagemSucesso).should('contain', 'Atestado Cadastrado com sucesso');
  });

  it('Realizar a validação dos campos obrigatórios em tipo Atestado Medico (Dias)', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Atestado médico (dias)').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
    cy.get(CadastroPage.selectors.botaoEnviar).click();

    cy.get(CadastroPage.mensagens.mensagemObrigatórioDataEmissao).should('contain', 'Campo obrigatório');
    cy.get(CadastroPage.mensagens.mensagemObrigatórioDataFim).should('contain', 'Campo obrigatório');
    cy.get(CadastroPage.mensagens.mensagemObrigatórioNomeMedico).should('contain', 'Campo obrigatório');
    cy.get(CadastroPage.mensagens.mensagemObrigatórioNumeroCRM).should('contain', 'Campo obrigatório');
    cy.get(CadastroPage.mensagens.mensagemObrigatórioUF).should('contain', 'UF é obrigatório');
  });

  it('Realizar a validação do compo data de emissão não permitir ser menor que o campo data fim', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Atestado médico (dias)').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(CadastroPage.selectors.dataInicio).type(today);

    const tomorrow = new Date(Date.now() - 86400000);
    cy.get(CadastroPage.selectors.dataFim).type(tomorrow.toISOString().split('T')[0])

    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
    cy.get(CadastroPage.selectors.botaoEnviar).click();

    cy.get(CadastroPage.mensagens.mensagemDataInicioNaoPodeSerMaiorQueDataFim).should('contain', 'A data de início não pode ser maior que a data fim');
  });

  it('Realizar a validação do campo data de emissão não poder ser maior que a data atual', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Atestado médico (dias)').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    const tomorrow = new Date(Date.now() + 86400000);
    cy.get(CadastroPage.selectors.dataInicio).type(tomorrow.toISOString().split('T')[0])

    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
    cy.get(CadastroPage.selectors.botaoEnviar).click();

    cy.get(CadastroPage.mensagens.mensagemDataInicioNaoPodeAceitarDataFutura).should('contain', 'Não é permitido selecionar datas futuras.');
  });

  it('Realizar a validação do tipo do fastamento e texto retornandos estão corretos em tipo Atestado Medico (Dias)', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Atestado médico (dias)').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    cy.get(CadastroPage.texto.tipoAfastamento).should('contain', 'Atestado médico (dias)');
    cy.get(CadastroPage.texto.mensagemDeInformacao).should('contain', 'Por favor, insira as informações do seu atestado médico, incluindo os dias de afastamento. Não se esqueça de anexar uma cópia legível do atestado.');
  });

  it.skip('Realizar o cadastro do afastamento do tipo Atestado Medico (Horas) preenchendo todos os campos', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Atestado médico (horas)').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(CadastroPage.selectors.dataInicio).type(today);

    const horaAtual = dayjs().format('HH:mm');
    cy.get(CadastroPage.selectors.horaInicio).type(horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    cy.get(CadastroPage.selectors.horaFim).type(horaMaisUma)

    cy.get(CadastroPage.selectors.campoCid).type("A00");
    cy.get(CadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(CadastroPage.selectors.campoCrm).type("123456");
    cy.get(CadastroPage.selectors.campoUf).select('SP');
    cy.get(CadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
    //cy.get(CadastroPage.selectors.botaoEnviar).click();

    //CadastroPage.verifyToastMessage('.Toastify__toast-body > :nth-child(2)', 'Atestado Cadastrado com sucesso');
    //CadastroPage.verifyToastMessage('.sc-hbtGpV', 'Atestado cadastrado com sucesso!');
  });

  it.skip('Realizar o cadastro do afastamento do tipo Licença paternidade preenchendo todos os campos', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Licença Paternidade').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(CadastroPage.selectors.dataInicio).type(today);

    const horaAtual = dayjs().format('HH:mm');
    cy.get(CadastroPage.selectors.horaInicio).type(horaAtual);

    cy.get(CadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
    //cy.get(CadastroPage.selectors.botaoEnviar).click();
  });

  it.skip('Realizar o cadastro do afastamento do tipo Licença maternidade preenchendo todos os campos', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Licença Maternidade').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(CadastroPage.selectors.dataInicio).type(today);

    const tomorrow = new Date(Date.now() + 86400000);
    cy.get(CadastroPage.selectors.dataFim).type(tomorrow.toISOString().split('T')[0])

    const horaAtual = dayjs().format('HH:mm');
    cy.get(CadastroPage.selectors.horaInicio).type(horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    cy.get(CadastroPage.selectors.horaFim).type(horaMaisUma)

    cy.get(CadastroPage.selectors.campoCid).type("A00");
    cy.get(CadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(CadastroPage.selectors.campoCrm).type("123456");
    cy.get(CadastroPage.selectors.campoUf).select('SP');
    cy.get(CadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
   //cy.get(CadastroPage.selectors.botaoEnviar).click();
  });

  it.skip('Realizar o cadastro do afastamento do tipo internação preenchendo todos os campos', () => {
    cy.get(CadastroPage.selectors.tipoAfastamento).contains('Internação').click();
    cy.get(CadastroPage.selectors.botaoProximo).click();

    const today = new Date().toISOString().split('T')[0]; 
    cy.get(CadastroPage.selectors.dataInicio).type(today);

    const horaAtual = dayjs().format('HH:mm');
    cy.get(CadastroPage.selectors.horaInicio).type(horaAtual);

    cy.get(CadastroPage.selectors.campoCid).type("A00");
    cy.get(CadastroPage.selectors.campoMedico).type("Dr. João da Silva");
    cy.get(CadastroPage.selectors.campoCrm).type("123456");
    cy.get(CadastroPage.selectors.campoUf).select('SP');

    cy.get(CadastroPage.selectors.campoObservacao).type("Texto para o campo de observação.");
    cy.get(CadastroPage.selectors.campoAnexo).selectFile('cypress/fixtures/teste.pdf', { force: true });

    cy.get(CadastroPage.selectors.linkTermo).click();
    cy.get(CadastroPage.selectors.aceitarTermo).click();
    //cy.get(CadastroPage.selectors.botaoEnviar).click();
  });

  it.skip('Validar o campo Data de inicio obrigatório no cadastro de um atestado', () => {
    CadastroPage.clickButton('.sc-egkSDF');
    CadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    CadastroPage.clickButton('[data-variant="primary"]');

    CadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    CadastroPage.clickButton('strong');
    CadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    CadastroPage.clickButton('[type="submit"]');

    CadastroPage.verificarMensagem('form > :nth-child(1) > :nth-child(1)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Data de término obrigatório no cadastro de um atestado', () => {
    CadastroPage.clickButton('.sc-egkSDF');
    CadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    CadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    CadastroPage.typeInField('#startDate', today);

    CadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    CadastroPage.clickButton('strong');
    CadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    CadastroPage.clickButton('[type="submit"]');

    CadastroPage.verificarMensagem('form > :nth-child(1) > :nth-child(2)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Hora de inicio obrigatório no cadastro de um atestado', () => {
    CadastroPage.clickButton('.sc-egkSDF');
    CadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    CadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    CadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    CadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    CadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    CadastroPage.clickButton('strong');
    CadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    CadastroPage.clickButton('[type="submit"]');

    CadastroPage.verificarMensagem('form > :nth-child(2) > :nth-child(1)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Hora de término obrigatório no cadastro de um atestado', () => {
    CadastroPage.clickButton('.sc-egkSDF');
    CadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    CadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    CadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    CadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    CadastroPage.typeInField('#startHour', horaAtual);

    CadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    CadastroPage.clickButton('strong');
    CadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    CadastroPage.clickButton('[type="submit"]');

    CadastroPage.verificarMensagem('form > :nth-child(2) > :nth-child(2)', 'Campo obrigatório')
  });

  it.skip('Validar o campo Médico obrigatório no cadastro de um atestado', () => {
    CadastroPage.clickButton('.sc-egkSDF');
    CadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    CadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    CadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    CadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    CadastroPage.typeInField('#startHour', horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    CadastroPage.typeInField('#endHour', horaMaisUma);

    CadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    CadastroPage.clickButton('strong');
    CadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    CadastroPage.clickButton('[type="submit"]');

    CadastroPage.verificarMensagem('form > :nth-child(4)', 'Campo obrigatório')
    //CadastroPage.verificarMensagem('form > :nth-child(5)', 'Campo obrigatório')
  });

  it.skip('Validar o campo CRM/CRO obrigatório no cadastro de um atestado', () => {
    CadastroPage.clickButton('.sc-egkSDF');
    CadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    CadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    CadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    CadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    CadastroPage.typeInField('#startHour', horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    CadastroPage.typeInField('#endHour', horaMaisUma);

    CadastroPage.typeInField('#medico', "Dr. João da Silva");

    CadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    CadastroPage.clickButton('strong');
    CadastroPage.clickButton('.contentButton > [data-variant="primary"]');
    CadastroPage.clickButton('[type="submit"]');

    CadastroPage.verificarMensagem('form > :nth-child(5)', 'Campo obrigatório')
  });

  it.skip('Validar a obrigatóriedade do documento no cadastro de um atestado', () => {
    CadastroPage.clickButton('.sc-egkSDF');
    CadastroPage.clickTipoAfastamento('.sc-fFoeYl', 'Atestado Médico (Dias)');
    CadastroPage.clickButton('[data-variant="primary"]');

    const today = new Date().toISOString().split('T')[0]; 
    CadastroPage.typeInField('#startDate', today);

    const tomorrow = new Date(Date.now() + 86400000);
    CadastroPage.typeInField('#endDate', tomorrow.toISOString().split('T')[0]);

    const horaAtual = dayjs().format('HH:mm');
    CadastroPage.typeInField('#startHour', horaAtual);

    const horaMaisUma = dayjs().add(1, 'hour').format('HH:mm');
    CadastroPage.typeInField('#endHour', horaMaisUma);

    CadastroPage.selectFile('input[type="file"]', 'cypress/fixtures/teste.pdf');

    CadastroPage.clickButton('strong');
    CadastroPage.clickButton('.contentButton > [data-variant="primary"]');

    CadastroPage.clickButton('.bruODN');

    CadastroPage.verificarMensagem('.sc-diYFot', 'É necessário anexar um arquivo imagem, PDF, etc.*')
  });
}) 