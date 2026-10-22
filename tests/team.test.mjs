import assert from 'node:assert';
import { test, describe } from 'node:test';
import { TeamMembers } from '../src/collections/TeamMembers.ts';
import { AssociateExperts } from '../src/collections/AssociateExperts.ts';

describe('TeamMembers Collection Configuration', () => {
  test('collection has correct slug, labels, and admin properties', () => {
    assert.strictEqual(TeamMembers.slug, 'team-members');
    assert.strictEqual(TeamMembers.labels?.singular, 'Team Member');
    assert.strictEqual(TeamMembers.labels?.plural, 'Team Members');
    assert.strictEqual(TeamMembers.defaultSort, 'displayOrder');
    assert.strictEqual(TeamMembers.admin?.useAsTitle, 'name');
    assert.strictEqual(TeamMembers.admin?.group, 'Content');
    assert.ok(TeamMembers.versions?.drafts, 'Drafts must be enabled');
    assert.strictEqual(TeamMembers.timestamps, true, 'Timestamps must be enabled');
  });

  test('contains all required fields matching specification', () => {
    const fieldMap = new Map(TeamMembers.fields.map((f) => [f.name, f]));

    // name: required text
    const name = fieldMap.get('name');
    assert.ok(name, 'name field exists');
    assert.strictEqual(name.type, 'text');
    assert.strictEqual(name.required, true);

    // title: required text
    const title = fieldMap.get('title');
    assert.ok(title, 'title field exists');
    assert.strictEqual(title.type, 'text');
    assert.strictEqual(title.required, true);

    // bio: required textarea
    const bio = fieldMap.get('bio');
    assert.ok(bio, 'bio field exists');
    assert.strictEqual(bio.type, 'textarea');
    assert.strictEqual(bio.required, true);

    // expertise: required array of text values
    const expertise = fieldMap.get('expertise');
    assert.ok(expertise, 'expertise field exists');
    assert.strictEqual(expertise.type, 'array');
    assert.strictEqual(expertise.required, true);
    assert.strictEqual(expertise.minRows, 1);
    assert.ok(expertise.fields && expertise.fields.length > 0, 'expertise array has subfields');
    assert.strictEqual(expertise.fields[0].name, 'value');
    assert.strictEqual(expertise.fields[0].type, 'text');
    assert.strictEqual(expertise.fields[0].required, true);

    // profileImage: optional relationship to media
    const profileImage = fieldMap.get('profileImage');
    assert.ok(profileImage, 'profileImage field exists');
    assert.strictEqual(profileImage.type, 'relationship');
    assert.strictEqual(profileImage.relationTo, 'media');
    assert.strictEqual(profileImage.required, undefined);
    assert.deepStrictEqual(profileImage.filterOptions, {
      mimeType: {
        contains: 'image/',
      },
    });

    // displayOrder: optional number
    const displayOrder = fieldMap.get('displayOrder');
    assert.ok(displayOrder, 'displayOrder field exists');
    assert.strictEqual(displayOrder.type, 'number');
    assert.strictEqual(displayOrder.index, true);
  });

  test('enforces publication and draft visibility rules', () => {
    // Anonymous user read query
    const anonReq = { req: { user: null } };
    const anonAccess = TeamMembers.access?.read(anonReq);
    assert.deepStrictEqual(
      anonAccess,
      { _status: { equals: 'published' } },
      'Anonymous visitors must only see published team members'
    );

    // Authenticated staff read query
    const staffReq = { req: { user: { id: 1, role: 'editor' } } };
    const staffAccess = TeamMembers.access?.read(staffReq);
    assert.strictEqual(staffAccess, true, 'Authenticated staff must be able to view drafts');
  });

  test('enforces role-based write permissions (CRUD)', () => {
    const anonReq = { req: { user: null } };
    const editorReq = { req: { user: { id: 1, role: 'editor' } } };
    const adminReq = { req: { user: { id: 2, role: 'admin' } } };

    // Create
    assert.strictEqual(TeamMembers.access?.create(anonReq), false, 'Anonymous cannot create');
    assert.strictEqual(TeamMembers.access?.create(editorReq), true, 'Editor can create');
    assert.strictEqual(TeamMembers.access?.create(adminReq), true, 'Admin can create');

    // Update
    assert.strictEqual(TeamMembers.access?.update(anonReq), false, 'Anonymous cannot update');
    assert.strictEqual(TeamMembers.access?.update(editorReq), true, 'Editor can update');
    assert.strictEqual(TeamMembers.access?.update(adminReq), true, 'Admin can update');

    // Delete
    assert.strictEqual(TeamMembers.access?.delete(anonReq), false, 'Anonymous cannot delete');
    assert.strictEqual(TeamMembers.access?.delete(editorReq), false, 'Editor cannot delete');
    assert.strictEqual(TeamMembers.access?.delete(adminReq), true, 'Only admin can delete');
  });
});

describe('AssociateExperts Collection Configuration', () => {
  test('collection has correct slug, labels, and admin properties', () => {
    assert.strictEqual(AssociateExperts.slug, 'associate-experts');
    assert.strictEqual(AssociateExperts.labels?.singular, 'Associate Expert');
    assert.strictEqual(AssociateExperts.labels?.plural, 'Associate Experts');
    assert.strictEqual(AssociateExperts.defaultSort, 'displayOrder');
    assert.strictEqual(AssociateExperts.admin?.useAsTitle, 'title');
    assert.strictEqual(AssociateExperts.admin?.group, 'Content');
    assert.ok(AssociateExperts.versions?.drafts, 'Drafts must be enabled');
    assert.strictEqual(AssociateExperts.timestamps, true, 'Timestamps must be enabled');
  });

  test('contains all required fields and no unauthorized fields', () => {
    const fieldMap = new Map(AssociateExperts.fields.map((f) => [f.name, f]));

    // title: required text
    const title = fieldMap.get('title');
    assert.ok(title, 'title field exists');
    assert.strictEqual(title.type, 'text');
    assert.strictEqual(title.required, true);

    // expertise: required text
    const expertise = fieldMap.get('expertise');
    assert.ok(expertise, 'expertise field exists');
    assert.strictEqual(expertise.type, 'text');
    assert.strictEqual(expertise.required, true);

    // profileImage: optional relationship to media
    const profileImage = fieldMap.get('profileImage');
    assert.ok(profileImage, 'profileImage field exists');
    assert.strictEqual(profileImage.type, 'relationship');
    assert.strictEqual(profileImage.relationTo, 'media');

    // displayOrder: optional number
    const displayOrder = fieldMap.get('displayOrder');
    assert.ok(displayOrder, 'displayOrder field exists');
    assert.strictEqual(displayOrder.type, 'number');
    assert.strictEqual(displayOrder.index, true);

    // Verify forbidden fields are not added
    assert.strictEqual(fieldMap.get('bio'), undefined, 'Bio must NOT be present on AssociateExperts');
    assert.strictEqual(fieldMap.get('cv'), undefined, 'CV must NOT be present on AssociateExperts');
    assert.strictEqual(fieldMap.get('email'), undefined, 'Email must NOT be present on AssociateExperts');
    assert.strictEqual(fieldMap.get('socialLinks'), undefined, 'Social links must NOT be present');
  });

  test('enforces publication and draft visibility rules', () => {
    // Anonymous user read query
    const anonReq = { req: { user: null } };
    const anonAccess = AssociateExperts.access?.read(anonReq);
    assert.deepStrictEqual(
      anonAccess,
      { _status: { equals: 'published' } },
      'Anonymous visitors must only see published associate experts'
    );

    // Authenticated staff read query
    const staffReq = { req: { user: { id: 1, role: 'editor' } } };
    const staffAccess = AssociateExperts.access?.read(staffReq);
    assert.strictEqual(staffAccess, true, 'Authenticated staff must be able to view drafts');
  });

  test('enforces role-based write permissions (CRUD)', () => {
    const anonReq = { req: { user: null } };
    const editorReq = { req: { user: { id: 1, role: 'editor' } } };
    const adminReq = { req: { user: { id: 2, role: 'admin' } } };

    // Create
    assert.strictEqual(AssociateExperts.access?.create(anonReq), false, 'Anonymous cannot create');
    assert.strictEqual(AssociateExperts.access?.create(editorReq), true, 'Editor can create');
    assert.strictEqual(AssociateExperts.access?.create(adminReq), true, 'Admin can create');

    // Update
    assert.strictEqual(AssociateExperts.access?.update(anonReq), false, 'Anonymous cannot update');
    assert.strictEqual(AssociateExperts.access?.update(editorReq), true, 'Editor can update');
    assert.strictEqual(AssociateExperts.access?.update(adminReq), true, 'Admin can update');

    // Delete
    assert.strictEqual(AssociateExperts.access?.delete(anonReq), false, 'Anonymous cannot delete');
    assert.strictEqual(AssociateExperts.access?.delete(editorReq), false, 'Editor cannot delete');
    assert.strictEqual(AssociateExperts.access?.delete(adminReq), true, 'Only admin can delete');
  });
});
