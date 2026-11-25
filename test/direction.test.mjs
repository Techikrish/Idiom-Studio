import test from 'node:test';
import assert from 'node:assert/strict';
import {
  directionCard,
  formatMaterialList,
  loadMaterials,
  materialContrast,
  resolveDirection,
  validateMaterial,
} from '../src/direction.mjs';

const materials = loadMaterials();

test('ships six valid materials', () => {
  assert.equal(materials.length, 6);
  for (const material of materials) {
    assert.deepEqual(validateMaterial(material), [], material.id);
  }
});

test('every text role meets 4.5:1 in both appearances', () => {
  for (const material of materials) {
    const contrast = materialContrast(material);
    for (const theme of ['light', 'dark']) {
      assert.ok(contrast[theme].onSurface >= 4.5, `${material.id}/${theme} onSurface`);
      assert.ok(contrast[theme].muted >= 4.5, `${material.id}/${theme} muted`);
      assert.ok(contrast[theme].onAccent >= 4.5, `${material.id}/${theme} onAccent`);
      assert.ok(contrast[theme].accent >= 3, `${material.id}/${theme} accent`);
    }
  }
});

test('the same seed resolves to the same direction', () => {
  const input = {
    materials,
    name: 'Ledger',
    category: 'finance',
    adjectives: 'precise, dense, calm',
    seed: 'fixed-seed',
    ledger: [],
  };
  const first = resolveDirection(input);
  const second = resolveDirection(input);
  assert.equal(first.material.id, second.material.id);
});

test('keyword fit chooses a plausible material', () => {
  const direction = resolveDirection({
    materials,
    name: 'Trailhead',
    category: 'travel outdoors hiking',
    adjectives: 'open, photographic, local',
    seed: 'travel',
  });
  assert.equal(direction.material.id, 'field');
});

test('the ledger avoids the last three directions', () => {
  const ledger = [];
  const chosen = [];
  for (let index = 0; index < 10; index += 1) {
    const direction = resolveDirection({
      materials,
      name: 'Ledger',
      category: 'finance analytics',
      adjectives: 'precise, dense, calm',
      seed: `seed-${index}`,
      ledger,
    });
    const recent = ledger.slice(-3).map((entry) => entry.material);
    assert.ok(
      !recent.includes(direction.material.id),
      `run ${index} reused ${direction.material.id} from the last three`,
    );
    chosen.push(direction.material.id);
    ledger.push({
      material: direction.material.id,
      accent: direction.material.colors.light.accent,
      shape: direction.material.shape.family,
    });
  }
  assert.ok(new Set(chosen).size > 1);
});

test('the direction card prints measured contrast', () => {
  const direction = resolveDirection({
    materials,
    name: 'Ledger',
    category: 'finance',
    seed: 'card',
  });
  const card = directionCard(direction);
  assert.ok(card.includes('Direction:'));
  assert.ok(card.includes('LIGHT'));
  assert.ok(card.includes('DARK'));
  assert.ok(card.includes(':1'));
  assert.ok(card.includes('Signature'));
});

test('material list includes every material', () => {
  const list = formatMaterialList(materials);
  for (const material of materials) assert.ok(list.includes(material.id));
});
