/**
 * ReusableSections collection — named, versioned block compositions that can
 * be referenced by Pages in a later phase.
 *
 * Access-control policy:
 *  • Public (unauthenticated) → read published documents only.
 *  • Authenticated staff      → create; read all; update drafts.
 *  • Administrators only      → delete; read/write version history.
 *
 * Future-phase reference guidance:
 *   When Pages need to embed a ReusableSection, add a `relationship` field on
 *   the Pages collection that points to `reusable-sections`.  The frontend
 *   renderer must fetch the referenced section's `sections` blocks array and
 *   render them using the same block-registry map used for page layouts.
 *
 *   Do NOT implement recursive composition (a ReusableSection referencing
 *   another ReusableSection) — that creates circular-query risks.  If nesting
 *   is required in a future phase, enforce a depth limit server-side.
 */

import type { CollectionConfig } from 'payload';
import { pageBuilderBlocks } from '../blocks';

// ---------------------------------------------------------------------------
// Helpers (mirror the pattern from Pages.ts for maintainability)
// ---------------------------------------------------------------------------

const isAdmin = (user: unknown): boolean =>
  Boolean(user && (user as { role?: string }).role === 'admin');

const isAuthenticated = (user: unknown): boolean => Boolean(user);

// ---------------------------------------------------------------------------
// Collection definition
// ---------------------------------------------------------------------------

export const ReusableSections: CollectionConfig = {
  slug: 'reusable-sections',

  labels: {
    singular: 'Reusable Section',
    plural: 'Reusable Sections',
  },

  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', '_status', 'updatedAt'],
    description:
      'Named block compositions that can be referenced by Pages in a future phase.',
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
     * Public visitors may only read published reusable sections.
     * Authenticated users may read all (including drafts) so editors can
     * preview their work in the admin panel.
     */
    read: ({ req: { user } }) => {
      if (isAuthenticated(user)) return true;
      return {
        _status: {
          equals: 'published',
        },
      };
    },

    /** Both admins and editors may create new reusable sections. */
    create: ({ req: { user } }) => isAuthenticated(user),

    /**
     * Admins may update any reusable section.
     * Editors may only update draft sections.
     *
     * The `beforeChange` hook adds a second layer that prevents editors from
     * setting `_status: 'published'` or editing published sections via any API path.
     */
    update: ({ req: { user } }) => {
      if (!user) return false;
      if (isAdmin(user)) return true;
      return {
        _status: {
          not_equals: 'published',
        },
      };
    },

    /**
     * Only administrators may permanently delete reusable sections.
     * This prevents editors from accidentally removing a section that may be
     * referenced by multiple pages.
     */
    delete: ({ req: { user } }) => isAdmin(user),

    /**
     * Only authenticated users may read the version history.
     * Prevents unauthenticated access to draft content via /api/reusable-sections/versions.
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
     */
    beforeChange: [
      ({ data, req, originalDoc }) => {
        const user = req.user;
        if (!user) return data;

        if (!isAdmin(user)) {
          // Reject editing an already-published document
          if (originalDoc?._status === 'published') {
            throw new Error(
              'Access denied: only administrators can edit published reusable sections. ' +
                'Please ask an administrator to make changes or unpublish the section first.',
            );
          }

          // Reject setting status to published
          const requestedStatus = (data as { _status?: string } | undefined)?._status;
          if (requestedStatus === 'published') {
            throw new Error(
              'Access denied: only administrators can publish reusable sections. ' +
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
      maxLength: 200,
      admin: {
        description:
          'Descriptive internal name for this reusable section (visible only in the admin panel).',
      },
    },

    // ── Sections (page-builder blocks) ─────────────────────────────────────
    {
      name: 'sections',
      type: 'blocks',
      required: true,
      blocks: pageBuilderBlocks,
      admin: {
        description:
          'Ordered sequence of page-builder blocks that make up this reusable section.',
        initCollapsed: false,
      },
    },

    // ── Internal notes ─────────────────────────────────────────────────────
    {
      name: 'notes',
      type: 'textarea',
      maxLength: 2000,
      admin: {
        description:
          'Internal notes visible only to the content team. Not rendered on the public website.',
      },
    },
  ],

  timestamps: true,
};

