const { expect } = require('@playwright/test');

class ResponseStatus {
  static shouldBe(expectedStatus) {
    return {
      answeredBy: async (actor) => {
        const response = actor.lastResponse;
        expect(response.status()).toBe(expectedStatus);
      },
    };
  }
}

module.exports = ResponseStatus;