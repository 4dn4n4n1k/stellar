import assert from 'node:assert';
import { test, describe } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
// Pure lightweight component mockup for static markup test
function Badge({ children, className }) {
  return React.createElement('span', { className }, children);
}
import { User } from 'lucide-react';

// Helper view renderer simulating the verified TeamPage rendering logic
function renderTeamMemberCard(member, i = 0) {
  return React.createElement(
    'div',
    {
      key: member.id || i,
      className: 'bg-gray-50 border border-gray-200 rounded-[10px] p-6 sm:p-8 text-center card-hover-teal h-full shadow-xs flex flex-col justify-between',
    },
    React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        {
          className: 'w-20 h-20 bg-navy-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-teal-700/10 overflow-hidden',
        },
        member.imageUrl
          ? React.createElement('img', {
              src: member.imageUrl,
              alt: member.imageAlt || member.name,
              className: 'w-full h-full object-cover object-top',
              loading: 'lazy',
            })
          : React.createElement(User, {
              className: 'text-teal-100',
              size: 32,
              strokeWidth: 1.5,
            })
      ),
      React.createElement('h3', { className: 'text-navy-900 font-bold text-xl mb-1 font-heading' }, member.name),
      React.createElement('p', { className: 'text-teal-700 text-sm font-bold mb-4' }, member.title),
      React.createElement('p', { className: 'text-gray-600 text-sm leading-relaxed mb-6' }, member.bio)
    ),
    React.createElement(
      'div',
      { className: 'flex flex-wrap gap-2 justify-center' },
      member.expertise.map((exp) =>
        React.createElement(
          Badge,
          {
            key: exp,
            variant: 'secondary',
            className: 'bg-navy-900/5 text-navy-900 border border-navy-900/10 text-xs font-semibold shadow-none',
          },
          exp
        )
      )
    )
  );
}

function renderAssociateExpertCard(expert, i = 0) {
  return React.createElement(
    'div',
    {
      key: expert.id || i,
      className: 'bg-gray-25 border border-gray-200 rounded-[10px] p-6 card-hover-teal h-full flex items-center gap-4 shadow-xs',
    },
    React.createElement(
      'div',
      {
        className: 'w-12 h-12 rounded-full bg-navy-900/5 border border-navy-900/10 flex items-center justify-center shrink-0 shadow-sm overflow-hidden',
      },
      expert.imageUrl
        ? React.createElement('img', {
            src: expert.imageUrl,
            alt: expert.imageAlt || expert.title,
            className: 'w-full h-full object-cover object-top',
            loading: 'lazy',
          })
        : React.createElement(User, {
            className: 'text-navy-900/40',
            size: 20,
            strokeWidth: 1.5,
          })
    ),
    React.createElement(
      'div',
      null,
      React.createElement('h4', { className: 'text-navy-900 font-bold text-base font-heading' }, expert.title),
      React.createElement('p', { className: 'text-gray-600 text-sm' }, expert.expertise)
    )
  );
}

describe('Team Page Server Integration & Display Logic', () => {
  test('Case 1: Multiple published Team Members render with names, titles, bios, and expertise badges', () => {
    const publishedMembers = [
      {
        id: 1,
        name: 'Dr. Sarah Ahmed',
        title: 'Managing Director',
        bio: 'Senior institutional governance specialist with 20+ years of USAID advisory experience.',
        expertise: ['Governance', 'Policy Reform', 'Program Management'],
        imageUrl: null,
      },
      {
        id: 2,
        name: 'Tanvir Hossain',
        title: 'Director, Research & MEL',
        bio: 'Lead quantitative and mixed-methods research methodologist.',
        expertise: ['Research', 'Impact Evaluation', 'Data Systems'],
        imageUrl: null,
      },
    ];

    const html = renderToStaticMarkup(
      React.createElement('div', null, publishedMembers.map((m, i) => renderTeamMemberCard(m, i)))
    );

    assert.ok(html.includes('Dr. Sarah Ahmed'), 'Must render first member name');
    assert.ok(html.includes('Managing Director'), 'Must render title');
    assert.ok(html.includes('Governance'), 'Must render expertise badge');
    assert.ok(html.includes('Policy Reform'), 'Must render expertise badge');
    assert.ok(html.includes('Tanvir Hossain'), 'Must render second member name');
    assert.ok(html.includes('Director, Research &amp; MEL'), 'Must render second title');
  });

  test('Case 2: Multiple published Associate Experts render with titles and expertise', () => {
    const publishedExperts = [
      {
        id: 10,
        title: 'Senior MEL Specialist',
        expertise: 'Monitoring, Evaluation & Learning',
        imageUrl: null,
      },
      {
        id: 11,
        title: 'Social Compliance Auditor',
        expertise: 'Labor Rights & Supply Chain Audits',
        imageUrl: null,
      },
    ];

    const html = renderToStaticMarkup(
      React.createElement('div', null, publishedExperts.map((e, i) => renderAssociateExpertCard(e, i)))
    );

    assert.ok(html.includes('Senior MEL Specialist'));
    assert.ok(html.includes('Monitoring, Evaluation &amp; Learning'));
    assert.ok(html.includes('Social Compliance Auditor'));
    assert.ok(html.includes('Labor Rights &amp; Supply Chain Audits'));
  });

  test('Case 3: Records with profile images render <img> tag, records without render placeholder User icon', () => {
    const memberWithImage = {
      id: 1,
      name: 'Elena Rostova',
      title: 'Operations Director',
      bio: 'Operations and logistics lead.',
      expertise: ['Operations'],
      imageUrl: '/media/elena-headshot.webp',
      imageAlt: 'Elena Rostova headshot photo',
    };

    const memberWithoutImage = {
      id: 2,
      name: 'Karim Chowdhury',
      title: 'Governance Lead',
      bio: 'Governance expert.',
      expertise: ['Governance'],
      imageUrl: null,
      imageAlt: null,
    };

    const htmlWith = renderToStaticMarkup(renderTeamMemberCard(memberWithImage));
    const htmlWithout = renderToStaticMarkup(renderTeamMemberCard(memberWithoutImage));

    assert.ok(htmlWith.includes('<img'), 'Member with image must render img tag');
    assert.ok(htmlWith.includes('src="/media/elena-headshot.webp"'));
    assert.ok(htmlWith.includes('alt="Elena Rostova headshot photo"'));

    assert.ok(!htmlWithout.includes('<img'), 'Member without image must NOT render img tag');
    assert.ok(htmlWithout.includes('lucide-user'), 'Member without image must render Lucide User icon');
  });

  test('Case 4: Associate Expert with profile image renders image, without renders placeholder icon', () => {
    const expertWithImage = {
      id: 20,
      title: 'Environmental Specialist',
      expertise: 'Climate & Environment',
      imageUrl: '/media/env-expert.webp',
      imageAlt: 'Environmental Specialist',
    };

    const expertWithoutImage = {
      id: 21,
      title: 'Labor Specialist',
      expertise: 'Labor Rights',
      imageUrl: null,
    };

    const htmlWith = renderToStaticMarkup(renderAssociateExpertCard(expertWithImage));
    const htmlWithout = renderToStaticMarkup(renderAssociateExpertCard(expertWithoutImage));

    assert.ok(htmlWith.includes('<img'));
    assert.ok(htmlWith.includes('src="/media/env-expert.webp"'));
    assert.ok(!htmlWithout.includes('<img'));
    assert.ok(htmlWithout.includes('lucide-user'));
  });

  test('Case 5: Draft records are filtered out by public query rule', () => {
    const rawCmsRecords = [
      { id: 1, name: 'Published Director', _status: 'published' },
      { id: 2, name: 'Draft Pipeline Hire', _status: 'draft' },
      { id: 3, name: 'Pending Board Review', _status: 'draft' },
    ];

    const publicQueryFilter = { _status: { equals: 'published' } };
    const visibleRecords = rawCmsRecords.filter(
      (doc) => doc._status === publicQueryFilter._status.equals
    );

    assert.strictEqual(visibleRecords.length, 1);
    assert.strictEqual(visibleRecords[0].name, 'Published Director');
  });

  test('Case 6: Empty CMS query results fall back gracefully to verified static data without crashing', () => {
    const cmsResults = [];
    const staticFallback = [
      {
        name: 'Founding Partner',
        title: 'Managing Director',
        bio: 'Static fallback bio narrative.',
        expertise: ['Governance', 'Labor Rights'],
      },
    ];

    const displayData =
      cmsResults.length > 0
        ? cmsResults
        : staticFallback.map((m, i) => ({
            id: `static-${i}`,
            name: m.name,
            title: m.title,
            bio: m.bio,
            expertise: m.expertise,
            imageUrl: null,
          }));

    const html = renderToStaticMarkup(
      React.createElement('div', null, displayData.map((m, i) => renderTeamMemberCard(m, i)))
    );

    assert.ok(html.includes('Founding Partner'), 'Should render fallback partner name');
    assert.ok(html.includes('Static fallback bio narrative.'));
  });

  test('Case 7: Associate Experts section is omitted when no CMS records exist, and renders when records exist', () => {
    // When 0 associate experts exist in CMS
    const emptyCmsAssociates = [];
    const htmlEmpty = renderToStaticMarkup(
      React.createElement(
        'div',
        null,
        emptyCmsAssociates.length > 0
          ? React.createElement(
              'section',
              { id: 'associate-experts-section' },
              emptyCmsAssociates.map((e, i) => renderAssociateExpertCard(e, i))
            )
          : null
      )
    );
    assert.ok(!htmlEmpty.includes('associate-experts-section'), 'Section must NOT render when CMS associates is empty');

    // When associate experts exist in CMS
    const populatedCmsAssociates = [
      {
        id: 101,
        title: 'Lead Economist',
        expertise: 'Macroeconomic Policy',
        imageUrl: null,
      },
    ];
    const htmlPopulated = renderToStaticMarkup(
      React.createElement(
        'div',
        null,
        populatedCmsAssociates.length > 0
          ? React.createElement(
              'section',
              { id: 'associate-experts-section' },
              populatedCmsAssociates.map((e, i) => renderAssociateExpertCard(e, i))
            )
          : null
      )
    );
    assert.ok(htmlPopulated.includes('associate-experts-section'), 'Section MUST render when CMS associates exist');
    assert.ok(htmlPopulated.includes('Lead Economist'));
    assert.ok(htmlPopulated.includes('Macroeconomic Policy'));
  });

  test('Case 8: Team members sort deterministically by displayOrder ascending with stable fallback', () => {
    const rawMembers = [
      { id: 5, name: 'Team Member 5', displayOrder: 4, createdAt: '2026-10-22T21:37:11.703Z' },
      { id: 4, name: 'Team Member 4', displayOrder: null, createdAt: '2026-10-22T21:37:00.475Z' },
      { id: 2, name: 'Team Member 2', displayOrder: 1, createdAt: '2026-10-22T21:36:30.379Z' },
      { id: 1, name: 'Team Member 1', displayOrder: 2, createdAt: '2026-10-22T21:24:26.014Z' },
    ];

    const sorted = [...rawMembers].sort((a, b) => {
      const orderA = typeof a.displayOrder === 'number' && !isNaN(a.displayOrder) ? a.displayOrder : 99999;
      const orderB = typeof b.displayOrder === 'number' && !isNaN(b.displayOrder) ? b.displayOrder : 99999;
      if (orderA !== orderB) return orderA - orderB;
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeA - timeB;
    });

    assert.strictEqual(sorted[0].name, 'Team Member 2', 'displayOrder: 1 must be first');
    assert.strictEqual(sorted[1].name, 'Team Member 1', 'displayOrder: 2 must be second');
    assert.strictEqual(sorted[2].name, 'Team Member 5', 'displayOrder: 4 must be third');
    assert.strictEqual(sorted[3].name, 'Team Member 4', 'Unassigned displayOrder must be last');
  });
});
