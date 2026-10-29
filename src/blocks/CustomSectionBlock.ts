import type { Block } from 'payload';

/**
 * Custom Styled Section Block — a layout wrapper that lets administrators
 * apply preset layout, background, and spacing values and (admin-only) raw
 * CSS to any section.
 *
 * IMPORTANT — Custom CSS policy (Phase 2 storage only):
 *   - The `customCSS` field is stored but NOT rendered by the frontend yet.
 *   - Only administrators may read or write this field (enforced server-side
 *     via field-level access control).
 *   - CSS is stored as plain text. It is NOT sanitised or validated in this
 *     phase.  Before enabling rendering:
 *       1. Enforce strict character-length limits.
 *       2. Apply scoped selectors (wrap in a generated per-section class).
 *       3. Add server-side syntax validation and a content-security policy.
 *       4. Run visual regression tests after each CSS change.
 *       5. Note: CSS validation is a guardrail, not a security sandbox —
 *          global selectors can still affect the whole page.
 *   - JavaScript, HTML tags, and event handlers are forbidden as content
 *     policy.  Enforcement is not currently automated; rendering must not
 *     inject this field into <style>, inline CSS, or dangerouslySetInnerHTML.
 */
export const CustomSectionBlock: Block = {
  slug: 'custom-section',
  labels: {
    singular: 'Custom Styled Section',
    plural: 'Custom Styled Sections',
  },
  admin: {
    group: 'Page Builder',
  },
  fields: [
    // ── Internal label ────────────────────────────────────────────────────────
    {
      name: 'internalLabel',
      type: 'text',
      maxLength: 100,
      admin: {
        description:
          'Optional label visible only in the admin panel. Useful to identify this section when a page has many blocks.',
      },
    },
    // ── Layout preset ─────────────────────────────────────────────────────────
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'contained',
      required: true,
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Full Width', value: 'full-width' },
        { label: 'Split', value: 'split' },
      ],
      admin: {
        description: 'Layout preset that controls maximum width and inner padding.',
      },
    },
    // ── Background preset ─────────────────────────────────────────────────────
    {
      name: 'background',
      type: 'select',
      defaultValue: 'default',
      required: true,
      options: [
        { label: 'Default (white)', value: 'default' },
        { label: 'Light grey', value: 'light' },
        { label: 'Navy', value: 'navy' },
        { label: 'Teal', value: 'teal' },
      ],
      admin: {
        description: 'Background colour preset for this section.',
      },
    },
    // ── Spacing preset ────────────────────────────────────────────────────────
    {
      name: 'spacing',
      type: 'select',
      defaultValue: 'normal',
      required: true,
      options: [
        { label: 'Compact', value: 'compact' },
        { label: 'Normal', value: 'normal' },
        { label: 'Relaxed', value: 'relaxed' },
      ],
      admin: {
        description: 'Vertical padding preset for this section.',
      },
    },
    // ── Custom CSS (admin-only, stored only — not rendered yet) ───────────────
    {
      name: 'customCSS',
      type: 'code',
      maxLength: 10000,
      admin: {
        language: 'css',
        description:
          '⚠️ ADMINISTRATOR ONLY — Custom CSS stored for future use.\n\n' +
          'This field is NOT rendered by the frontend in this phase.\n\n' +
          'Before enabling rendering:\n' +
          '  • Enforce scoped selectors to prevent global style leakage.\n' +
          '  • Add server-side syntax validation.\n' +
          '  • Enforce a strict character limit.\n' +
          '  • Run visual regression tests after each change.\n' +
          '  • Never allow JavaScript, HTML, or event handlers through this field.\n\n' +
          'CSS validation is a guardrail, not a security sandbox.',
      },
      // Server-side validator blocking script tags, event handlers, executable pseudo-protocols, and HTML wrappers.
      // NOTE: This validator is an input-hygiene guardrail against common injection vectors; it is NOT
      // a complete security sandbox. The CSS field remains unrendered by the frontend in this phase.
      validate: (value: string | null | undefined) => {
        if (!value) return true;
        if (value.length > 10000) {
          return 'Custom CSS must not exceed 10,000 characters.';
        }

        // 1. Block HTML tags, closing tags, doctypes, and comments (< followed by letters, !, or /)
        if (/<\s*\/?\s*[a-z!/]/i.test(value)) {
          return 'Custom CSS cannot contain HTML tags, scripts, or embedded elements.';
        }

        // 2. Block HTML event handlers (e.g. onload=, onerror=, onclick=) with any spacing
        if (/\bon[a-z]{3,}\s*=/i.test(value)) {
          return 'Custom CSS cannot contain inline event handlers.';
        }

        // 3. Block legacy CSS expressions and behavioral bindings
        if (/\bexpression\s*\(/i.test(value) || /-moz-binding\s*:|\bbehavior\s*:|-webkit-binding\s*:/i.test(value)) {
          return 'Custom CSS cannot contain dynamic expressions or behavioral bindings.';
        }

        // 4. Block javascript:, vbscript:, and data:text/html URI schemes even with internal whitespace
        const strippedWhitespace = value.replace(/[\s\r\n\t\0]/g, '').toLowerCase();
        if (
          strippedWhitespace.includes('javascript:') ||
          strippedWhitespace.includes('vbscript:') ||
          strippedWhitespace.includes('data:text/html')
        ) {
          return 'Custom CSS cannot contain script-based URI protocols.';
        }

        return true;
      },
      // Field-level access: only administrators may read or write this field.
      // This is enforced server-side by Payload for REST, GraphQL, and Local API.
      access: {
        read: ({ req: { user } }) =>
          Boolean(user && (user as { role?: string }).role === 'admin'),
        create: ({ req: { user } }) =>
          Boolean(user && (user as { role?: string }).role === 'admin'),
        update: ({ req: { user } }) =>
          Boolean(user && (user as { role?: string }).role === 'admin'),
      },
    },
  ],
};

