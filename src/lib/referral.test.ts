// Se corre con: node --test src/lib/referral.test.ts   (Node 22.18+, sin dependencias)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { currentRef, getRef, parseRef, saveRef } from './referral.ts';

const DAY = 24 * 60 * 60 * 1000;

function memoryStore() {
  const data = new Map<string, string>();
  return {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
  };
}

test('parseRef: normaliza y descarta lo que no es un código', () => {
  assert.equal(parseRef('  jani10 '), 'JANI10');
  assert.equal(parseRef('a-b_9'), 'A-B_9');
  for (const bad of [null, undefined, '', 'ab', 'a'.repeat(31), 'jani 10', '<script>']) {
    assert.equal(parseRef(bad), null, String(bad));
  }
});

test('saveRef/getRef: guarda el link y lo devuelve mientras esté vigente (60 días)', () => {
  const store = memoryStore();
  saveRef('?plan=pro&ref=jani10', store, 1_000);
  assert.equal(getRef(store, 1_000 + 59 * DAY), 'JANI10');
  assert.equal(getRef(store, 1_000 + 61 * DAY), null);
});

test('saveRef: un ?ref= inválido o ausente no pisa el guardado', () => {
  const store = memoryStore();
  saveRef('?ref=jani10', store, 1_000);
  saveRef('?ref=<x>', store, 2_000);
  saveRef('', store, 3_000);
  assert.equal(getRef(store, 4_000), 'JANI10');
});

test('getRef: datos corruptos o sin almacenamiento = null, nunca rompe la página', () => {
  const store = memoryStore();
  store.setItem('fx-ref', '{no es json');
  assert.equal(getRef(store), null);
  store.setItem('fx-ref', JSON.stringify({ code: 'OK1', at: 'hoy' }));
  assert.equal(getRef(store), null);
  assert.equal(getRef(null), null);
  assert.doesNotThrow(() => saveRef('?ref=jani10', null));
});

test('currentRef: manda el link actual y si no hay usa el guardado', () => {
  const store = memoryStore();
  saveRef('?ref=viejo1', store, 1_000);
  assert.equal(currentRef('?ref=nuevo2', store, 2_000), 'NUEVO2');
  assert.equal(currentRef('', store, 2_000), 'VIEJO1');
  assert.equal(currentRef('', memoryStore(), 2_000), null);
});
