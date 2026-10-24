import assert from 'node:assert';
import { test, describe } from 'node:test';
import { JobOpenings, employmentTypes } from '../src/collections/JobOpenings.ts';

describe('JobOpenings Collection Configuration', () => {
  test('collection has correct slug, labels, and admin properties', () => {
    assert.strictEqual(JobOpenings.slug, 'job-openings');
    assert.strictEqual(JobOpenings.labels?.singular, 'Job Opening');
    assert.strictEqual(JobOpenings.labels?.plural, 'Job Openings');
    assert.strictEqual(JobOpenings.defaultSort, 'displayOrder');
    assert.strictEqual(JobOpenings.admin?.useAsTitle, 'title');
    assert.strictEqual(JobOpenings.admin?.group, 'Content');
    assert.ok(JobOpenings.versions?.drafts, 'Drafts must be enabled');
    assert.strictEqual(JobOpenings.timestamps, true, 'Timestamps must be enabled');
  });

  test('contains all required fields matching specification', () => {
    const fieldMap = new Map(JobOpenings.fields.map((f) => [f.name, f]));

    // title: required text
    const title = fieldMap.get('title');
    assert.ok(title, 'title field exists');
    assert.strictEqual(title.type, 'text');
    assert.strictEqual(title.required, true);
    assert.strictEqual(title.index, true);

    // description: required textarea
    const desc = fieldMap.get('description');
    assert.ok(desc, 'description field exists');
    assert.strictEqual(desc.type, 'textarea');
    assert.strictEqual(desc.required, true);

    // employmentType: required select with approved options
    const empType = fieldMap.get('employmentType');
    assert.ok(empType, 'employmentType field exists');
    assert.strictEqual(empType.type, 'select');
    assert.strictEqual(empType.required, true);
    assert.deepStrictEqual(
      empType.options.map((o) => o.value),
      [...employmentTypes]
    );

    // location: text
    const location = fieldMap.get('location');
    assert.ok(location, 'location field exists');
    assert.strictEqual(location.type, 'text');

    // applicationDeadline: date
    const deadline = fieldMap.get('applicationDeadline');
    assert.ok(deadline, 'applicationDeadline field exists');
    assert.strictEqual(deadline.type, 'date');

    // applicationInstructions: optional textarea
    const instructions = fieldMap.get('applicationInstructions');
    assert.ok(instructions, 'applicationInstructions field exists');
    assert.strictEqual(instructions.type, 'textarea');

    // displayOrder: optional number, indexed
    const displayOrder = fieldMap.get('displayOrder');
    assert.ok(displayOrder, 'displayOrder field exists');
    assert.strictEqual(displayOrder.type, 'number');
    assert.strictEqual(displayOrder.index, true);
  });

  test('enforces publication and draft visibility rules', () => {
    // Anonymous user read query
    const anonReq = { req: { user: null } };
    const anonAccess = JobOpenings.access?.read(anonReq);
    assert.deepStrictEqual(
      anonAccess,
      { _status: { equals: 'published' } },
      'Anonymous visitors must only see published job openings'
    );

    // Authenticated staff read query
    const staffReq = { req: { user: { id: 1, role: 'editor' } } };
    const staffAccess = JobOpenings.access?.read(staffReq);
    assert.strictEqual(staffAccess, true, 'Authenticated staff must be able to view drafts');
  });

  test('enforces role-based write permissions (CRUD)', () => {
    const anonReq = { req: { user: null } };
    const editorReq = { req: { user: { id: 1, role: 'editor' } } };
    const adminReq = { req: { user: { id: 2, role: 'admin' } } };

    // Create: authenticated only
    assert.strictEqual(JobOpenings.access?.create(anonReq), false, 'Anonymous cannot create');
    assert.strictEqual(JobOpenings.access?.create(editorReq), true, 'Editor can create');
    assert.strictEqual(JobOpenings.access?.create(adminReq), true, 'Admin can create');

    // Update: authenticated only
    assert.strictEqual(JobOpenings.access?.update(anonReq), false, 'Anonymous cannot update');
    assert.strictEqual(JobOpenings.access?.update(editorReq), true, 'Editor can update');
    assert.strictEqual(JobOpenings.access?.update(adminReq), true, 'Admin can update');

    // Delete: admins only
    assert.strictEqual(JobOpenings.access?.delete(anonReq), false, 'Anonymous cannot delete');
    assert.strictEqual(JobOpenings.access?.delete(editorReq), false, 'Editor cannot delete');
    assert.strictEqual(JobOpenings.access?.delete(adminReq), true, 'Only admin can delete');
  });
});
