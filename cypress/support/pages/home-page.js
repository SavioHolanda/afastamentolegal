class HomePage {
    visit() {
      cy.visit('https://nhg-health-sso-hml.nhgtech.com.br/attestation/1719583/412/99');
    }

    get selectors() {
        return {
          botaoCadastarAfastamentoLegal: '.sc-dYOLZc',
          botaoImg: 'img',
          botaoPerfil: '.sc-hBDmJg',
          linkMeusAfastamentos: 'a'
        };
      }
}
export default new HomePage();