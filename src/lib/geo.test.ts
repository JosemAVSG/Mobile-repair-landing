// Se corre con: node --test src/lib/geo.test.ts   (Node 22.18+, sin dependencias)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectCurrency, guessCountry, signupHref } from './geo.ts';

test('guessCountry: zonas de Latinoamérica, EE. UU. y España', () => {
  assert.equal(guessCountry('America/Bogota'), 'CO');
  assert.equal(guessCountry('America/Lima'), 'PE');
  assert.equal(guessCountry('America/Caracas'), 'VE');
  assert.equal(guessCountry('America/Sao_Paulo'), 'BR');
  assert.equal(guessCountry('America/Argentina/Buenos_Aires'), 'AR');
  assert.equal(guessCountry('America/Mexico_City'), 'MX');
  assert.equal(guessCountry('America/New_York'), 'US');
  assert.equal(guessCountry('America/Indiana/Indianapolis'), 'US');
  assert.equal(guessCountry('Europe/Madrid'), 'ES');
});

test('guessCountry: zona desconocida o ausente = null (no se inventa un país)', () => {
  assert.equal(guessCountry('Asia/Tokyo'), null);
  assert.equal(guessCountry(''), null);
  assert.equal(guessCountry(undefined), null);
  assert.equal(guessCountry(null), null);
});

test('detectCurrency: Colombia o desconocida = COP; cualquier otra zona = USD', () => {
  assert.equal(detectCurrency('America/Bogota'), 'cop');
  assert.equal(detectCurrency(undefined), 'cop');
  assert.equal(detectCurrency('UTC'), 'cop', 'zona genérica = no se sabe');
  assert.equal(detectCurrency('Etc/GMT'), 'cop');
  assert.equal(detectCurrency(''), 'cop');
  assert.equal(detectCurrency('America/Lima'), 'usd');
  assert.equal(detectCurrency('Asia/Tokyo'), 'usd');
});

test('detectCurrency: la elección guardada manda sobre la zona horaria', () => {
  assert.equal(detectCurrency('America/Lima', 'cop'), 'cop');
  assert.equal(detectCurrency('America/Bogota', 'usd'), 'usd');
  assert.equal(detectCurrency('America/Lima', 'basura'), 'usd');
});

test('signupHref: agrega el plan y el país solo si se conoce', () => {
  assert.equal(
    signupHref('https://repair.jglabs.tech/registro', 'pro', 'PE'),
    'https://repair.jglabs.tech/registro?plan=pro&pais=PE',
  );
  assert.equal(
    signupHref('https://repair.jglabs.tech/registro', 'basico', null),
    'https://repair.jglabs.tech/registro?plan=basico',
  );
});
