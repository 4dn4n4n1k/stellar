/**
 * Pages collection — the primary CMS-driven page type for Stellar Associates.
 *
 * Access-control design summary
 * ─────────────────────────────
 * Roles are stored in the Users collection as `role: 'admin' | 'editor'`
 * and are saved to the JWT (saveToJWT: true), so `req.user.role` is available
 * in every access function and hook.
 *
 * Policy:
 *  • Unauthenticated visitors  → read published documents only.
 *  • Authenticated staff       → create; save / update drafts.
 *  • Administrators only       → publish (set _status to 'published');
 *                                edit or delete published documents;
 *                                read/write custom CSS.
 *
 * Publishing protection is implemented on THREE layers:
 *
 *  1. Collection-level `update` access — editors are blocked from updating a
 *     document whose current published status is 'published'.
 *
 *  2. `beforeChange` hook — server-side guard that rejects any operation that
 *     would write `_status: 'published'` when the requestor is not an admin.
 *     This covers REST, GraphQL, Local API, and admin UI autosave paths.
 *
 *  3. `readVersions` access — restricts the versions table to authenticated
 *     users only, so unauthenticated requests cannot read draft content via
 *     the versions API.
 *
 * Known limitation (documented, not claimed as resolved):
 *   Payload's autosave path writes a draft version.  When an editor triggers
 *   autosave, the `data._status` may be 'draft' even if the live document is
 *   published.  The `beforeChange` hook permits autosave drafts (`_status ===
 *   'draft'`) from editors, but an editor cannot flip `_status` to 'published'.
 *   An administrator must explicitly publish.  Full coverage of all status-
 *   transition paths requires integration tests against the Payload REST and
 *   Local API; absence of such tests is a known gap.
 */

import type { CollectionConfig } from 'payload';
import { pageBuilderBlocks } from '../blocks';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns true if the authenticated user has the 'admin' role. */
const isAdmin = (user: unknown): boolean =>
  Boolean(user && (user as { role?: string }).role === 'admin');

/** Returns true if the authenticated user is logged in (any role). */
const isAuthenticated = (user: unknown): boolean => Boolean(user);

// ---------------------------------------------------------------------------
// Collection definition
// ---------------------------------------------------------------------------

export const Pages: CollectionConfig = {
  slug: 'pages',

  labels: {
    singular: 'Page',
    plural: 'Pages',
  },

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'pageType', '_status', 'updatedAt'],
    description: 'CMS-managed pages built with the page-builder block system.',
  },

  // ── Versioning / drafts ──────────────────────────────────────────────────
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: false,
    },
    maxPerDoc: 50,
  },

  // ── Access control ───────────────────────────────────────────────────────
  access: {
    /**
     * Unauthenticated visitors may only read published documents.
     * Authenticated users (admin or editor) may read all documents.
     *
     * NOTE: Draft preview is NOT publicly accessible.  Previewing a draft
     * requires an authenticated session.  Do not add preview-token bypass
     * logic here without a thorough security review (Phase 3+ task).
     */
    read: ({ req: { user } }) => {
      if (isAuthenticated(user)) return true;
      return {
        _status: {
          equals: 'published',
        },
      };
    },

    /**
     * Both admins and editors may create new pages (always as drafts until
     * an admin explicitly publishes).
     */
    create: ({ req: { user } }) => isAuthenticated(user),

    /**
     * Admins may update any page.
     * Editors may update only draft pages — they cannot overwrite a published
     * document.  The `beforeChange` hook adds a second layer of protection
     * against REST/GraphQL operations that would attempt to publish via
     * `_status` or modify a published document.
     *
     * Implementation note: Payload evaluates the `update` access function
     * before executing the operation.  When the function returns a where
     * constraint, Payload applies it as a filter; documents that do not match
     * are treated as not found (404) or forbidden (403).  This is
     * acceptable behaviour: editors simply cannot locate published pages for
     * editing, which matches the intended workflow.
     */
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (isAdmin(user)) return true;
      // Editors may only update non-published (draft) documents.
      return {
        _status: {
          not_equals: 'published',
        },
      };
    },

    /** Only administrators may permanently delete pages. */
    delete: ({ req: { user } }) => isAdmin(user),

    /**
     * Only authenticated users may access the version history.
     * This prevents unauthenticated requests from reading draft content
     * through the `/api/pages/versions` endpoint.
     */
    readVersions: ({ req: { user } }) => isAuthenticated(user),
  },

  // ── Hooks ────────────────────────────────────────────────────────────────
  hooks: {
    /**
     * Server-side publishing and edit protection guard.
     *
     * Rejects:
     *   1. Any attempt by a non-admin to publish (set _status: 'published').
     *   2. Any attempt by a non-admin to modify an already published document.
     *   3. Any attempt by a non-admin to schedule publication.
     *
     * This covers:
     *   - REST PATCH /api/pages/:id  { _status: 'published' }
     *   - GraphQL mutations
     *   - Payload Local API calls
     *   - Admin UI "Publish" button
     *   - Version restore operations
     */
    beforeChange: [
      ({ data, req, originalDoc }) => {
        const user = req.user;
        if (!user) return data;

        if (!isAdmin(user)) {
          // Reject editing an already-published document
          if (originalDoc?._status === 'published') {
            throw new Error(
              'Access denied: only administrators can edit published pages. ' +
                'Please ask an administrator to make changes or unpublish the page first.',
            );
          }

          // Reject setting status to published
          const requestedStatus = (data as { _status?: string } | undefined)?._status;
          if (requestedStatus === 'published') {
            throw new Error(
              'Access denied: only administrators can publish pages. ' +
                'Save your work as a draft and ask an administrator to publish.',
            );
          }

          // Reject any attempt to schedule publication
          const anyData = data as Record<string, unknown> | undefined;
          if (
            anyData?._scheduledPublish ||
            anyData?._publishDate ||
            anyData?._schedulePublish
          ) {
            throw new Error(
              'Access denied: only administrators can schedule publication.',
            );
          }
        }

        return data;
      },
    ],
  },

  // ── Fields ───────────────────────────────────────────────────────────────
  fields: [
    // ── Title ──────────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 255,
      admin: {
        description: 'Page title used in the admin list and as the default meta title.',
      },
    },

    // ── Slug ───────────────────────────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'URL-friendly identifier (lowercase letters, numbers, hyphens only). ' +
          'Use "home" for the future CMS-driven homepage — it is not connected to "/" in this phase.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Slug is required.';
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return 'Slug must contain only lowercase letters, numbers, and hyphens (no leading, trailing, or consecutive hyphens).';
        }
        return true;
      },
    },

    // ── Page type ──────────────────────────────────────────────────────────
    {
      name: 'pageType',
      type: 'select',
      defaultValue: 'standard',
      required: true,
      options: [
        { label: 'Standard Page', value: 'standard' },
        { label: 'Landing Page', value: 'landing' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Landing pages suppress the shared navigation and footer.',
      },
    },

    // ── Layout (page builder blocks) ───────────────────────────────────────
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: pageBuilderBlocks,
      admin: {
        description: 'Ordered sequence of page-builder blocks that compose this page.',
        initCollapsed: false,
      },
    },

    // ── SEO group ──────────────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: {
        description: 'Search-engine optimisation settings for this page.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 70,
          admin: {
            description:
              'Override the browser tab / search result title (max 70 characters). Leave blank to use the page title.',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description:
              'Search-engine result description (max 160 characters). Leave blank to use the page title.',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description:
              'When checked, this page is excluded from search engine indexes (adds noindex meta tag). Default: false (indexable).',
          },
        },
      ],
    },

    // ── Custom CSS (admin-only, stored only — NOT rendered yet) ────────────
    {
      name: 'customCSS',
      type: 'code',
      maxLength: 10000,
      admin: {
        language: 'css',
        description:
          '⚠️ ADMINISTRATOR ONLY — Page-level custom CSS stored for future use.\n\n' +
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
      // Field-level access enforced server-side for REST, GraphQL, and Local API.
      access: {
        read: ({ req: { user } }) => isAdmin(user),
        create: ({ req: { user } }) => isAdmin(user),
        update: ({ req: { user } }) => isAdmin(user),
      },
    },
  ],

  timestamps: true,
};

