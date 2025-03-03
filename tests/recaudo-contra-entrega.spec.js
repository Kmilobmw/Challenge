const { test } = require('@playwright/test');
const Actor = require('./screenplay/actors/Actor'); // <-- Quita las llaves {}
const ApiRequest = require('./screenplay/abilities/ApiRequest');
const CreateGuide = require('./screenplay/tasks/CreateGuide');
const ResponseStatus = require('./screenplay/questions/ResponseStatus');
const ErrorMessage = require('./screenplay/questions/ErrorMessage');
const GuideRequest = require('./screenplay/models/GuideRequest');

test.describe('Recaudo Contra Entrega', () => {
  test('Creación exitosa con datos válidos', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid(), valorRecaudar: "38500", referenciaRecaudo: "ref recaudo prueba" };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(200));
  });

  test('Rechazo por valor a recaudar por debajo del mínimo', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid(), valorRecaudar: "0" };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(400));
    await actor.ask(ErrorMessage.shouldContain('Los valores de entrada no son correctos'));
  });

  test('Rechazo por valor a recaudar por encima del máximo', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid(), valorRecaudar: "17000000" };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(400));
    await actor.ask(ErrorMessage.shouldContain('Los valores de entrada no son correctos'));
  });

  test('Rechazo por referencia de recaudo vacía', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid(), referenciaRecaudo: "" };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(400));
    await actor.ask(ErrorMessage.shouldContain('Los valores de entrada no son correctos'));
  });

  test('Rechazo por omisión del valor a recaudar', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid() };
    delete data.valorRecaudar;
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(400));
    await actor.ask(ErrorMessage.shouldContain('Los valores de entrada no son correctos'));
  });

  test('Aceptación del valor límite inferior para recaudo', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid(), valorRecaudar: "1" };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(200));
  });

  test('Aceptación del valor límite superior para recaudo', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid(), valorRecaudar: "16000000" };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(200));
  });

  test('Aceptación de referencia de recaudo con caracteres especiales', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const data = { ...GuideRequest.valid(), referenciaRecaudo: "REF-@#$%&*()_+!" };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(200));
  });

  test('Creación exitosa con datos mínimos requeridos', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const minimalData = GuideRequest.valid();
    await actor.attemptsTo(
      CreateGuide.withData(minimalData)
    );
    
    await actor.ask(ResponseStatus.shouldBe(200));
  });

  test('Rechazo por longitud excesiva en referencia de recaudo', async ({ request }) => {
    const actor = new Actor('Usuario');
    actor.can(ApiRequest(request));
    
    const longRef = 'a'.repeat(32);
    const data = { ...GuideRequest.valid(), referenciaRecaudo: longRef };
    
    await actor.attemptsTo(
      CreateGuide.withData(data)
    );
    
    await actor.ask(ResponseStatus.shouldBe(400));
    await actor.ask(ErrorMessage.shouldContain('Los valores de entrada no son correctos'));
  });
});