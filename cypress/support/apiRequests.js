export function getAuthToken() {
    return cy.request({
      method: 'POST',
      url: 'https://homologendpoint.nhgtech.com.br/api/token',
      form: true, // Indica que os dados serão enviados como um formulário
      body: {
        grant_type: 'password',
        username: '8720960000138',
        password: 'HYIntegration@Healthyou#2022'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body.access_token; // Retorna o token de acesso
    });
  }