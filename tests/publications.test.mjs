import assert from 'node:assert';
import { test, describe } from 'node:test';
import { Publications, publicationCategories } from '../src/collections/Publications.ts';
import { Media } from '../src/collections/Media.ts';

describe('Publications Collection Configuration', () => {
  test('collection has correct slug and metadata', () => {
    assert.strictEqual(Publications.slug, 'publications');
    assert.strictEqual(Publications.labels.singular, 'Publication');
    assert.strictEqual(Publications.labels.plural, 'Publications');
    assert.strictEqual(Publications.admin?.useAsTitle, 'title');
    assert.ok(Publications.versions?.drafts, 'Drafts must be enabled');
    assert.strictEqual(Publications.timestamps, true, 'Timestamps must be enabled');
  });

  test('contains all required fields with proper types and configurations', () => {
    const fieldMap = new Map(Publications.fields.map((f) => [f.name, f]));

    // title
    const title = fieldMap.get('title');
    assert.ok(title, 'title field exists');
    assert.strictEqual(title.type, 'text');
    assert.strictEqual(title.required, true);
    assert.strictEqual(title.index, true);

    // slug
    const slug = fieldMap.get('slug');
    assert.ok(slug, 'slug field exists');
    assert.strictEqual(slug.type, 'text');
    assert.strictEqual(slug.required, true);
    assert.strictEqual(slug.unique, true);
    assert.strictEqual(slug.index, true);

    // description
    const description = fieldMap.get('description');
    assert.ok(description, 'description field exists');
    assert.strictEqual(description.type, 'textarea');
    assert.strictEqual(description.required, true);

    // category
    const category = fieldMap.get('category');
    assert.ok(category, 'category field exists');
    assert.strictEqual(category.type, 'select');
    assert.strictEqual(category.required, true);
    assert.strictEqual(category.index, true);

    const categoryValues = category.options.map((opt) => opt.value);
    const expectedCategories = [
      'Research Reports',
      'Policy Briefs',
      'Articles',
      'Insights',
      'Blogs',
    ];
    assert.deepStrictEqual(categoryValues, expectedCategories);
    assert.deepStrictEqual([...publicationCategories], expectedCategories);

    // publicationDate
    const pubDate = fieldMap.get('publicationDate');
    assert.ok(pubDate, 'publicationDate field exists');
    assert.strictEqual(pubDate.type, 'date');

    // coverImage relationship
    const coverImage = fieldMap.get('coverImage');
    assert.ok(coverImage, 'coverImage field exists');
    assert.strictEqual(coverImage.type, 'relationship');
    assert.strictEqual(coverImage.relationTo, 'media');

    // document relationship
    const document = fieldMap.get('document');
    assert.ok(document, 'document field exists');
    assert.strictEqual(document.type, 'relationship');
    assert.strictEqual(document.relationTo, 'media');
  });
});

describe('Publications Access Controls', () => {
  const adminUser = { id: 1, role: 'admin', email: 'admin@stellar.com' };
  const editorUser = { id: 2, role: 'editor', email: 'editor@stellar.com' };

  test('read access: public visitors only see published documents', () => {
    const publicRead = Publications.access.read({ req: { user: null } });
    assert.deepStrictEqual(publicRead, {
      _status: {
        equals: 'published',
      },
    });
  });

  test('read access: authenticated staff can read all documents including drafts', () => {
    assert.strictEqual(Publications.access.read({ req: { user: adminUser } }), true);
    assert.strictEqual(Publications.access.read({ req: { user: editorUser } }), true);
  });

  test('create access: anonymous users are denied; authenticated users are allowed', () => {
    assert.strictEqual(Publications.access.create({ req: { user: null } }), false);
    assert.strictEqual(Publications.access.create({ req: { user: adminUser } }), true);
    assert.strictEqual(Publications.access.create({ req: { user: editorUser } }), true);
  });

  test('update access: anonymous users are denied; authenticated users are allowed', () => {
    assert.strictEqual(Publications.access.update({ req: { user: null } }), false);
    assert.strictEqual(Publications.access.update({ req: { user: adminUser } }), true);
    assert.strictEqual(Publications.access.update({ req: { user: editorUser } }), true);
  });

  test('delete access: only admin role is allowed to delete', () => {
    assert.strictEqual(Publications.access.delete({ req: { user: null } }), false);
    assert.strictEqual(Publications.access.delete({ req: { user: editorUser } }), false);
    assert.strictEqual(Publications.access.delete({ req: { user: adminUser } }), true);
  });
});

describe('Publications Lifecycle Hooks', () => {
  test('beforeValidate auto-generates URL-friendly slug from title', () => {
    const hook = Publications.hooks.beforeValidate[0];

    const result = hook({
      data: {
        title: 'Democratic Governance in Bangladesh: Trends and Prospects',
      },
      operation: 'create',
    });

    assert.strictEqual(
      result.slug,
      'democratic-governance-in-bangladesh-trends-and-prospects'
    );
    assert.ok(result.publicationDate, 'Sets default publication date on create');
  });

  test('beforeValidate normalizes user-provided slug', () => {
    const hook = Publications.hooks.beforeValidate[0];

    const result = hook({
      data: {
        title: 'Any Title',
        slug: '  Special & Formatted / Slug!  ',
      },
      operation: 'update',
    });

    assert.strictEqual(result.slug, 'special-formatted-slug');
  });

  test('afterRead hook sets doc.status matching doc._status', () => {
    const hook = Publications.hooks.afterRead[0];

    const docDraft = hook({ doc: { title: 'Test Draft', _status: 'draft' } });
    assert.strictEqual(docDraft.status, 'draft');

    const docPublished = hook({ doc: { title: 'Test Pub', _status: 'published' } });
    assert.strictEqual(docPublished.status, 'published');
  });
});

describe('Media Collection Configuration and Access', () => {
  test('collection has correct upload settings and metadata', () => {
    assert.strictEqual(Media.slug, 'media');
    assert.ok(Media.upload, 'Upload configuration must be active');
    assert.ok(Media.upload.staticDir, 'staticDir must be set');
    assert.ok(
      Media.upload.mimeTypes.includes('application/pdf'),
      'Must allow PDF uploads'
    );
  });

  test('access controls for media', () => {
    assert.strictEqual(Media.access.read(), true, 'Public can view media assets');
    assert.strictEqual(Media.access.create({ req: { user: null } }), false);
    assert.strictEqual(Media.access.create({ req: { user: { role: 'admin' } } }), true);
    assert.strictEqual(Media.access.delete({ req: { user: { role: 'editor' } } }), false);
    assert.strictEqual(Media.access.delete({ req: { user: { role: 'admin' } } }), true);
  });
});
