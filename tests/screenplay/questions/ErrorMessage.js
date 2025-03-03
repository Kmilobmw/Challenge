const { expect } = require('@playwright/test');

class ErrorMessage {
  static shouldContain(expectedMessage) {
    return {
      answeredBy: async (actor) => {
        const response = await actor.lastResponse.json();
        
        // Verifica la estructura real de errores de tu API
        console.log("Respuesta de error completa:", JSON.stringify(response, null, 2));
        
        // Valida según la documentación
        expect(response).toHaveProperty('isError', true);
        expect(response.message || response.cause).toContain(expectedMessage);
      },
    };
  }
}

module.exports = ErrorMessage;