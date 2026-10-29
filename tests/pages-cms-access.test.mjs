import assert from 'node:assert';
import { test, describe } from 'node:test';
import { Pages } from '../src/collections/Pages.ts';
import { ReusableSections } from '../src/collections/ReusableSections.ts';
import { Users } from '../src/collections/Users.ts';
import { CustomSectionBlock } from '../src/blocks/CustomSectionBlock.ts';
import { pageBuilderBlocks } from '../src/blocks/index.ts';

// Mock users matching the schema in Users.ts
const adminUser = { id: 1, role: 'admin', email: 'admin@stellar.com' };
const editorUser = { id: 2, role: 'editor', email: 'editor@stellar.com' };

describe('Pages Collection Schema & Configuration', () => {
  test('collection basic metadata and slug', () => {
    assert.strictEqual(Pages.slug, 'pages');
    assert.strictEqual(Pages.admin.useAsTitle, 'title');
    assert.strictEqual(Pages.admin.group, 'Content');
    assert.strictEqual(Pages.timestamps, true);
  });

  test('versions configuration disables autosave and scheduled publishing', () => {
    assert.ok(Pages.versions, 'Versions must be configured');
    assert.strictEqual(Pages.versions.maxPerDoc, 50);
    assert.strictEqual(typeof Pages.versions.drafts, 'object');
    assert.strictEqual(Pages.versions.drafts.autosave, false);
    assert.strictEqual(Pages.versions.drafts.schedulePublish, false);
  });

  test('all 6 page builder blocks are registered on layout field', () => {
    const layoutField = Pages.fields.find((f) => f.name === 'layout');
    assert.ok(layoutField, 'Layout field must exist');
    assert.strictEqual(layoutField.type, 'blocks');
    assert.strictEqual(layoutField.required, true);
    assert.strictEqual(layoutField.blocks.length, 6);
    assert.strictEqual(pageBuilderBlocks.length, 6);

    const blockSlugs = layoutField.blocks.map((b) => b.slug);
    assert.deepStrictEqual(blockSlugs, [
      'hero',
      'rich-text',
      'image-text',
      'card-grid',
      'cta',
      'custom-section',
    ]);
  });

  test('slug validator enforces lowercase URL-friendly slugs', () => {
    const slugField = Pages.fields.find((f) => f.name === 'slug');
    assert.ok(slugField, 'Slug field must exist');
    assert.strictEqual(slugField.required, true);
    assert.strictEqual(slugField.unique, true);
    assert.strictEqual(slugField.index, true);

    const validate = slugField.validate;
    // Valid slugs
    assert.strictEqual(validate('home'), true);
    assert.strictEqual(validate('about-us'), true);
    assert.strictEqual(validate('services-2026-q1'), true);

    // Invalid slugs
    assert.notStrictEqual(validate(''), true);
    assert.notStrictEqual(validate(null), true);
    assert.notStrictEqual(validate('About Us'), true);
    assert.notStrictEqual(validate('about_us'), true);
    assert.notStrictEqual(validate('-leading-hyphen'), true);
    assert.notStrictEqual(validate('trailing-hyphen-'), true);
    assert.notStrictEqual(validate('double--hyphen'), true);
    assert.notStrictEqual(validate('special@char'), true);
  });
});

describe('Pages Access Control Policy', () => {
  test('anonymous visitors can read published pages only', () => {
    const anonResult = Pages.access.read({ req: { user: null } });
    assert.deepStrictEqual(anonResult, {
      _status: {
        equals: 'published',
      },
    });
  });

  test('authenticated users (admin and editor) can read drafts and published pages', () => {
    assert.strictEqual(Pages.access.read({ req: { user: adminUser } }), true);
    assert.strictEqual(Pages.access.read({ req: { user: editorUser } }), true);
  });

  test('anonymous visitors CANNOT create pages', () => {
    assert.strictEqual(Pages.access.create({ req: { user: null } }), false);
  });

  test('authenticated staff (admin and editor) can create pages', () => {
    assert.strictEqual(Pages.access.create({ req: { user: adminUser } }), true);
    assert.strictEqual(Pages.access.create({ req: { user: editorUser } }), true);
  });

  test('anonymous visitors CANNOT update pages', () => {
    assert.strictEqual(Pages.access.update({ req: { user: null } }), false);
  });

  test('admins can update any page', () => {
    assert.strictEqual(Pages.access.update({ req: { user: adminUser } }), true);
  });

  test('editors can update only non-published (draft) pages via update query', () => {
    const editorUpdateResult = Pages.access.update({ req: { user: editorUser } });
    assert.deepStrictEqual(editorUpdateResult, {
      _status: {
        not_equals: 'published',
      },
    });
  });

  test('only administrators can delete pages', () => {
    assert.strictEqual(Pages.access.delete({ req: { user: null } }), false);
    assert.strictEqual(Pages.access.delete({ req: { user: editorUser } }), false);
    assert.strictEqual(Pages.access.delete({ req: { user: adminUser } }), true);
  });

  test('only authenticated users can read version history', () => {
    assert.strictEqual(Pages.access.readVersions({ req: { user: null } }), false);
    assert.strictEqual(Pages.access.readVersions({ req: { user: editorUser } }), true);
    assert.strictEqual(Pages.access.readVersions({ req: { user: adminUser } }), true);
  });
});

describe('Pages Publishing Protection & Server-side Hooks', () => {
  const beforeChangeHook = Pages.hooks.beforeChange[0];

  test('editor can save draft without throwing', () => {
    assert.doesNotThrow(() => {
      beforeChangeHook({
        data: { title: 'Draft Page', _status: 'draft' },
        req: { user: editorUser },
        originalDoc: { title: 'Old Draft', _status: 'draft' },
      });
    });
  });

  test('editor CANNOT publish (set _status: published)', () => {
    assert.throws(
      () => {
        beforeChangeHook({
          data: { title: 'Hacked Publish', _status: 'published' },
          req: { user: editorUser },
          originalDoc: { title: 'Draft', _status: 'draft' },
        });
      },
      /Access denied: only administrators can publish pages/,
      'Editor must not publish'
    );
  });

  test('admin CAN publish (set _status: published)', () => {
    assert.doesNotThrow(() => {
      beforeChangeHook({
        data: { title: 'Approved Page', _status: 'published' },
        req: { user: adminUser },
        originalDoc: { title: 'Draft', _status: 'draft' },
      });
    });
  });

  test('editor CANNOT edit an already-published page', () => {
    assert.throws(
      () => {
        beforeChangeHook({
          data: { title: 'Modified Live Page' },
          req: { user: editorUser },
          originalDoc: { title: 'Live Page', _status: 'published' },
        });
      },
      /Access denied: only administrators can edit published pages/,
      'Editor must not modify published page'
    );
  });

  test('admin CAN edit an already-published page', () => {
    assert.doesNotThrow(() => {
      beforeChangeHook({
        data: { title: 'Updated Live Page' },
        req: { user: adminUser },
        originalDoc: { title: 'Live Page', _status: 'published' },
      });
    });
  });

  test('editor CANNOT schedule publication', () => {
    assert.throws(
      () => {
        beforeChangeHook({
          data: { title: 'Scheduled Page', _scheduledPublish: true },
          req: { user: editorUser },
          originalDoc: { title: 'Draft', _status: 'draft' },
        });
      },
      /Access denied: only administrators can schedule publication/
    );

    assert.throws(
      () => {
        beforeChangeHook({
          data: { title: 'Scheduled Page', _publishDate: '2026-12-01' },
          req: { user: editorUser },
          originalDoc: { title: 'Draft', _status: 'draft' },
        });
      },
      /Access denied: only administrators can schedule publication/
    );
  });

  test('version restore semantics: editor cannot restore published version or restore onto live page', () => {
    // 1. Editor restoring a version that was published
    assert.throws(
      () => {
        beforeChangeHook({
          data: { title: 'Restored Version', _status: 'published' },
          req: { user: editorUser },
          originalDoc: { title: 'Current Draft', _status: 'draft' },
        });
      },
      /Access denied: only administrators can publish pages/
    );

    // 2. Editor restoring a draft version onto an already-published document
    assert.throws(
      () => {
        beforeChangeHook({
          data: { title: 'Restored Version', _status: 'draft' },
          req: { user: editorUser },
          originalDoc: { title: 'Currently Published Document', _status: 'published' },
        });
      },
      /Access denied: only administrators can edit published pages/
    );

    // 3. Editor restoring a draft version onto an existing draft document succeeds
    assert.doesNotThrow(() => {
      beforeChangeHook({
        data: { title: 'Restored Draft Version', _status: 'draft' },
        req: { user: editorUser },
        originalDoc: { title: 'Current Draft Document', _status: 'draft' },
      });
    });

    // 4. Admin restoring a published version onto an already-published document succeeds
    assert.doesNotThrow(() => {
      beforeChangeHook({
        data: { title: 'Restored Live Version', _status: 'published' },
        req: { user: adminUser },
        originalDoc: { title: 'Currently Published Document', _status: 'published' },
      });
    });
  });

  test('admin direct creation of published page succeeds', () => {
    assert.doesNotThrow(() => {
      beforeChangeHook({
        data: { title: 'Direct Published Page', _status: 'published' },
        req: { user: adminUser },
        originalDoc: undefined,
      });
    });
  });

  test('non-admin user with unrecognized role is blocked from publishing', () => {
    const unknownUser = { id: 99, role: 'viewer', email: 'guest@stellar.com' };
    assert.throws(
      () => {
        beforeChangeHook({
          data: { title: 'Unauthorized Page', _status: 'published' },
          req: { user: unknownUser },
          originalDoc: undefined,
        });
      },
      /Access denied: only administrators can publish pages/
    );
  });
});

describe('Custom CSS Security (Page and Section Level)', () => {
  const pageCssField = Pages.fields.find((f) => f.name === 'customCSS');
  const sectionCssField = CustomSectionBlock.fields.find((f) => f.name === 'customCSS');

  test('page customCSS field has strict character limit (10,000)', () => {
    assert.ok(pageCssField);
    assert.strictEqual(pageCssField.maxLength, 10000);
  });

  test('section customCSS field has strict character limit (10,000)', () => {
    assert.ok(sectionCssField);
    assert.strictEqual(sectionCssField.maxLength, 10000);
  });

  test('page customCSS access is strictly administrator-only (read, create, update)', () => {
    assert.strictEqual(pageCssField.access.read({ req: { user: null } }), false);
    assert.strictEqual(pageCssField.access.read({ req: { user: editorUser } }), false);
    assert.strictEqual(pageCssField.access.read({ req: { user: adminUser } }), true);

    assert.strictEqual(pageCssField.access.create({ req: { user: null } }), false);
    assert.strictEqual(pageCssField.access.create({ req: { user: editorUser } }), false);
    assert.strictEqual(pageCssField.access.create({ req: { user: adminUser } }), true);

    assert.strictEqual(pageCssField.access.update({ req: { user: null } }), false);
    assert.strictEqual(pageCssField.access.update({ req: { user: editorUser } }), false);
    assert.strictEqual(pageCssField.access.update({ req: { user: adminUser } }), true);
  });

  test('section customCSS access is strictly administrator-only (read, create, update)', () => {
    assert.strictEqual(sectionCssField.access.read({ req: { user: null } }), false);
    assert.strictEqual(sectionCssField.access.read({ req: { user: editorUser } }), false);
    assert.strictEqual(sectionCssField.access.read({ req: { user: adminUser } }), true);

    assert.strictEqual(sectionCssField.access.create({ req: { user: null } }), false);
    assert.strictEqual(sectionCssField.access.create({ req: { user: editorUser } }), false);
    assert.strictEqual(sectionCssField.access.create({ req: { user: adminUser } }), true);

    assert.strictEqual(sectionCssField.access.update({ req: { user: null } }), false);
    assert.strictEqual(sectionCssField.access.update({ req: { user: editorUser } }), false);
    assert.strictEqual(sectionCssField.access.update({ req: { user: adminUser } }), true);
  });

  test('customCSS validator accepts safe CSS syntax within length limit', () => {
    const validCss = '.custom-hero { background: #0c1a2e; padding: 2rem; }';
    assert.strictEqual(pageCssField.validate(validCss), true);
    assert.strictEqual(sectionCssField.validate(validCss), true);

    // Media query range syntax with < followed by numbers/whitespace must pass
    const mediaRangeCss = '@media (width < 600px) { .hero { flex-direction: column; } }';
    assert.strictEqual(pageCssField.validate(mediaRangeCss), true);
    assert.strictEqual(sectionCssField.validate(mediaRangeCss), true);
  });

  test('customCSS validator rejects HTML, scripts, and javascript: protocols across variations', () => {
    const dangerousPayloads = [
      '<script>alert(1)</script>',
      '<SCRIPT SRC="evil.js"></SCRIPT>',
      '<\nscript>alert(1)</script>',
      '<  script>alert(1)</script>',
      '</script>',
      '<iframe src="evil.html"></iframe>',
      '<object data="evil.swf"></object>',
      '<embed src="evil.swf">',
      '<svg onload=alert(1)>',
      'body { background: url(javascript:alert(1)); }',
      'body { background: url(java\nscript:alert(1)); }',
      'body { background: url(java\tscript:alert(1)); }',
      'body { background: url(vbscript:msgbox(1)); }',
      'body { background: url(data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg==); }',
      'div { -moz-binding: url("http://evil.com/xss.xml#test"); }',
      'div { -webkit-binding: url("http://evil.com/xss.xml#test"); }',
      'div { behavior: url("http://evil.com/xss.htc"); }',
      '<style>body{display:none;}</style>',
      '<img src=x onerror=alert(1)>',
      'a { onload = evil(); }',
      'div { onmouseover = alert(1); }',
      'button { onclick = alert(1); }',
    ];

    for (const payload of dangerousPayloads) {
      assert.notStrictEqual(
        pageCssField.validate(payload),
        true,
        `Page CSS should reject: ${payload}`
      );
      assert.notStrictEqual(
        sectionCssField.validate(payload),
        true,
        `Section CSS should reject: ${payload}`
      );
    }
  });

  test('customCSS validator rejects input exceeding 10,000 characters', () => {
    const oversizedCss = 'a { color: red; } '.repeat(1000); // ~18,000 chars
    assert.notStrictEqual(pageCssField.validate(oversizedCss), true);
    assert.notStrictEqual(sectionCssField.validate(oversizedCss), true);
  });
});

describe('ReusableSections Collection Security', () => {
  test('collection basic metadata and versions config', () => {
    assert.strictEqual(ReusableSections.slug, 'reusable-sections');
    assert.strictEqual(ReusableSections.admin.useAsTitle, 'title');
    assert.strictEqual(ReusableSections.timestamps, true);
    assert.strictEqual(ReusableSections.versions.maxPerDoc, 50);
    assert.strictEqual(ReusableSections.versions.drafts.autosave, false);
    assert.strictEqual(ReusableSections.versions.drafts.schedulePublish, false);
  });

  test('anonymous visitors can read published reusable sections only', () => {
    const anonResult = ReusableSections.access.read({ req: { user: null } });
    assert.deepStrictEqual(anonResult, {
      _status: {
        equals: 'published',
      },
    });
  });

  test('authenticated users can read drafts and published reusable sections', () => {
    assert.strictEqual(ReusableSections.access.read({ req: { user: editorUser } }), true);
    assert.strictEqual(ReusableSections.access.read({ req: { user: adminUser } }), true);
  });

  test('only administrators can delete reusable sections', () => {
    assert.strictEqual(ReusableSections.access.delete({ req: { user: null } }), false);
    assert.strictEqual(ReusableSections.access.delete({ req: { user: editorUser } }), false);
    assert.strictEqual(ReusableSections.access.delete({ req: { user: adminUser } }), true);
  });

  test('editors can update only draft reusable sections', () => {
    const editorUpdateResult = ReusableSections.access.update({ req: { user: editorUser } });
    assert.deepStrictEqual(editorUpdateResult, {
      _status: {
        not_equals: 'published',
      },
    });
    assert.strictEqual(ReusableSections.access.update({ req: { user: adminUser } }), true);
  });

  test('only authenticated users can read version history of reusable sections', () => {
    assert.strictEqual(ReusableSections.access.readVersions({ req: { user: null } }), false);
    assert.strictEqual(ReusableSections.access.readVersions({ req: { user: editorUser } }), true);
  });

  test('server-side publishing guard blocks editor from publishing reusable section', () => {
    const hook = ReusableSections.hooks.beforeChange[0];

    assert.throws(
      () => {
        hook({
          data: { title: 'Section', _status: 'published' },
          req: { user: editorUser },
          originalDoc: { title: 'Section', _status: 'draft' },
        });
      },
      /Access denied: only administrators can publish reusable sections/
    );

    assert.throws(
      () => {
        hook({
          data: { title: 'Modified Live Section' },
          req: { user: editorUser },
          originalDoc: { title: 'Live Section', _status: 'published' },
        });
      },
      /Access denied: only administrators can edit published reusable sections/
    );

    assert.doesNotThrow(() => {
      hook({
        data: { title: 'Approved Section', _status: 'published' },
        req: { user: adminUser },
        originalDoc: { title: 'Draft Section', _status: 'draft' },
      });
    });
  });
});

describe('Users Collection Role Model Audit', () => {
  test('role field defaults to admin and is saved to JWT', () => {
    const roleField = Users.fields.find((f) => f.name === 'role');
    assert.ok(roleField);
    assert.strictEqual(roleField.defaultValue, 'admin');
    assert.strictEqual(roleField.saveToJWT, true);
    assert.deepStrictEqual(roleField.options, [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
    ]);
  });

  test('only administrators can update user roles (privilege escalation prevention)', () => {
    const roleField = Users.fields.find((f) => f.name === 'role');
    assert.strictEqual(roleField.access.update({ req: { user: null } }), false);
    assert.strictEqual(roleField.access.update({ req: { user: editorUser } }), false);
    assert.strictEqual(roleField.access.update({ req: { user: adminUser } }), true);
  });

  test('only administrators can create or delete user records', () => {
    assert.strictEqual(Users.access.create({ req: { user: null } }), false);
    assert.strictEqual(Users.access.create({ req: { user: editorUser } }), false);
    assert.strictEqual(Users.access.create({ req: { user: adminUser } }), true);

    assert.strictEqual(Users.access.delete({ req: { user: null } }), false);
    assert.strictEqual(Users.access.delete({ req: { user: editorUser } }), false);
    assert.strictEqual(Users.access.delete({ req: { user: adminUser } }), true);
  });
});
