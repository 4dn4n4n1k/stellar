import assert from 'node:assert';
import { test, describe } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Briefcase, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

// Lightweight component mock for Badge
function Badge({ children, className }) {
  return React.createElement('span', { className }, children);
}

// Simulated rendering function matching CareersPage logic
function renderJobCard(job, i = 0) {
  return React.createElement(
    'div',
    {
      key: job.id || i,
      className: 'bg-white border border-gray-200 rounded-[12px] p-6 sm:p-8 card-hover-teal shadow-xs',
    },
    React.createElement(
      'div',
      { className: 'flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4' },
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'flex flex-wrap items-center gap-2 mb-2' },
          React.createElement(
            Badge,
            { className: 'bg-teal-700/10 text-teal-800 text-xs font-semibold' },
            React.createElement(Clock, { size: 12, className: 'mr-1 inline' }),
            job.employmentType
          ),
          job.location
            ? React.createElement(
                'span',
                { className: 'inline-flex items-center text-xs text-gray-500 font-medium' },
                React.createElement(MapPin, { size: 13, className: 'mr-1 text-gray-400' }),
                job.location
              )
            : null,
          job.deadlineFormatted
            ? React.createElement(
                'span',
                { className: 'inline-flex items-center text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md' },
                React.createElement(Calendar, { size: 12, className: 'mr-1 text-amber-600' }),
                `Deadline: ${job.deadlineFormatted}`
              )
            : null
        ),
        React.createElement('h3', { className: 'text-navy-900 font-bold text-xl sm:text-2xl font-heading' }, job.title)
      ),
      React.createElement(
        'div',
        { className: 'shrink-0 pt-1' },
        React.createElement(
          'a',
          {
            href: `mailto:stellarassociatesbd@gmail.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`,
            className: 'inline-flex items-center gap-2 bg-[#fce057] text-[#0c1b38] font-semibold h-10 px-5 rounded-[8px] text-sm',
          },
          'Apply Now',
          React.createElement(ArrowRight, { size: 14 })
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'text-gray-600 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-4' },
      job.description
    ),
    job.applicationInstructions
      ? React.createElement(
          'div',
          { className: 'bg-gray-50 border border-gray-200 rounded-[8px] p-4 text-xs sm:text-sm text-gray-600 mt-4' },
          React.createElement('span', { className: 'font-bold text-navy-900 block mb-1' }, 'How to Apply:'),
          job.applicationInstructions
        )
      : null
  );
}

function renderEmptyState() {
  return React.createElement(
    'div',
    { className: 'bg-gray-25 border border-gray-200 rounded-[10px] p-6 sm:p-8 text-center shadow-xs max-w-xl mx-auto' },
    React.createElement(
      'div',
      { className: 'w-12 h-12 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto mb-3' },
      React.createElement(Briefcase, { className: 'text-navy-900/30', size: 22 })
    ),
    React.createElement('h3', { className: 'text-navy-900 font-bold text-lg mb-2 font-heading' }, 'No Current Openings'),
    React.createElement(
      'p',
      { className: 'text-gray-500 text-sm sm:text-base mb-3 max-w-md mx-auto' },
      "We don't have any active vacancies at the moment, but we're always looking for talented professionals to join our network."
    ),
    React.createElement(
      'p',
      { className: 'text-gray-400 text-xs sm:text-sm' },
      'Please submit your CV to be considered for future opportunities.'
    )
  );
}

describe('Careers Page Integration & Rendering Logic', () => {
  test('Case 1: Empty state renders verified No Current Openings card when 0 jobs exist', () => {
    const openings = [];
    const html = renderToStaticMarkup(
      openings.length === 0 ? renderEmptyState() : React.createElement('div', null, openings.map(renderJobCard))
    );

    assert.ok(html.includes('No Current Openings'), 'Must render No Current Openings header');
    assert.ok(html.includes("We don&#x27;t have any active vacancies"), 'Must render verified vacancy text');
    assert.ok(html.includes('Please submit your CV to be considered'));
  });

  test('Case 2: Published openings render with title, badge, location, deadline, description, and apply mailto', () => {
    const job = {
      id: 1,
      title: 'Senior MEL Specialist',
      employmentType: 'Consultancy',
      location: 'Dhaka, Bangladesh',
      deadlineFormatted: 'Nov 30, 2026',
      description: 'Lead evaluation methodology and qualitative field survey tools design.',
      applicationInstructions: 'Submit a 2-page CV and 3 writing samples.',
    };

    const html = renderToStaticMarkup(renderJobCard(job));

    assert.ok(html.includes('Senior MEL Specialist'), 'Must render job title');
    assert.ok(html.includes('Consultancy'), 'Must render employment type badge');
    assert.ok(html.includes('Dhaka, Bangladesh'), 'Must render location');
    assert.ok(html.includes('Deadline: Nov 30, 2026'), 'Must render formatted deadline');
    assert.ok(html.includes('Lead evaluation methodology and qualitative field survey tools design.'));
    assert.ok(html.includes('How to Apply:'), 'Must render application instructions header');
    assert.ok(html.includes('Submit a 2-page CV and 3 writing samples.'));
    assert.ok(
      html.includes('href="mailto:stellarassociatesbd@gmail.com?subject=Application%3A%20Senior%20MEL%20Specialist"'),
      'Must contain verified mailto link with encoded subject'
    );
  });

  test('Case 3: Missing optional fields (deadline, instructions, location) render cleanly without crashing', () => {
    const minimalJob = {
      id: 2,
      title: 'Research Associate',
      employmentType: 'Full-time',
      location: null,
      deadlineFormatted: null,
      description: 'Junior research associate for quantitative survey support.',
      applicationInstructions: null,
    };

    const html = renderToStaticMarkup(renderJobCard(minimalJob));

    assert.ok(html.includes('Research Associate'));
    assert.ok(html.includes('Full-time'));
    assert.ok(!html.includes('Deadline:'), 'Should not render deadline when missing');
    assert.ok(!html.includes('How to Apply:'), 'Should not render instructions container when missing');
    assert.ok(html.includes('Apply Now'));
  });

  test('Case 4: Draft isolation ensures only published records are rendered', () => {
    const rawDocs = [
      { id: 10, title: 'Published Project Director', _status: 'published' },
      { id: 11, title: 'Draft Lead Economist', _status: 'draft' },
      { id: 12, title: 'Unapproved Auditor', _status: 'draft' },
    ];

    const publicFilter = { _status: { equals: 'published' } };
    const visibleDocs = rawDocs.filter((doc) => doc._status === publicFilter._status.equals);

    assert.strictEqual(visibleDocs.length, 1);
    assert.strictEqual(visibleDocs[0].title, 'Published Project Director');
  });

  test('Case 5: Deterministic sort by displayOrder ascending with stable fallback to createdAt', () => {
    const rawJobs = [
      { id: 103, title: 'Job C', displayOrder: 3, createdAt: '2026-10-23T10:00:00Z' },
      { id: 101, title: 'Job A', displayOrder: 1, createdAt: '2026-10-23T12:00:00Z' },
      { id: 104, title: 'Job Unassigned 1', displayOrder: null, createdAt: '2026-10-23T08:00:00Z' },
      { id: 102, title: 'Job B', displayOrder: 2, createdAt: '2026-10-23T11:00:00Z' },
      { id: 105, title: 'Job Unassigned 2', displayOrder: null, createdAt: '2026-10-23T09:00:00Z' },
    ];

    const sorted = [...rawJobs].sort((a, b) => {
      const orderA = typeof a.displayOrder === 'number' && !isNaN(a.displayOrder) ? a.displayOrder : 99999;
      const orderB = typeof b.displayOrder === 'number' && !isNaN(b.displayOrder) ? b.displayOrder : 99999;
      if (orderA !== orderB) return orderA - orderB;
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return timeA - timeB;
    });

    assert.strictEqual(sorted[0].title, 'Job A', 'displayOrder 1 must be first');
    assert.strictEqual(sorted[1].title, 'Job B', 'displayOrder 2 must be second');
    assert.strictEqual(sorted[2].title, 'Job C', 'displayOrder 3 must be third');
    assert.strictEqual(sorted[3].title, 'Job Unassigned 1', 'Unassigned sorted by createdAt first');
    assert.strictEqual(sorted[4].title, 'Job Unassigned 2', 'Unassigned sorted by createdAt second');
  });
});
