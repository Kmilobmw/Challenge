class CreateGuide {
  static withData(data) {
    return new CreateGuide(data);
  }

  constructor(data) {
    this.data = data;
  }

  async performAs(actor) {
    const { apiRequest } = actor.abilities;
    const response = await apiRequest.post('https://apiv2-test.coordinadora.com/guias/cm-guias-ms/guia', {
      data: this.data,
    });
    actor.lastResponse = response;
  }
}

module.exports = CreateGuide;