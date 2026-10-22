import assert from 'node:assert';
import { test, describe } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import PublicationsClientRaw from '../src/components/publications/PublicationsClient.tsx';

const PublicationsClient = PublicationsClientRaw.default || PublicationsClientRaw;

describe('Publications Page Integration & Display Logic', () => {
  test('Case 1: No published publications displays empty state gracefully', () => {
    const html = renderToStaticMarkup(
      React.createElement(PublicationsClient, { publications: [] })
    );

    assert.ok(html.includes('No Publications Found'), 'Should display empty state header');
    assert.ok(
      html.includes('There are currently no published publications available'),
      'Should display friendly empty state message'
    );
    assert.ok(!html.includes('pub-card'), 'Should not render any publication cards');
  });

  test('Case 2: One published publication displays all metadata correctly', () => {
    const singlePub = [
      {
        id: 1,
        title: 'Democratic Governance in Bangladesh: Trends and Prospects',
        description: 'Comprehensive analysis of democratic governance trends.',
        category: 'Research Reports',
        date: '2026',
        documentUrl: null,
      },
    ];

    const html = renderToStaticMarkup(
      React.createElement(PublicationsClient, { publications: singlePub })
    );

    assert.ok(html.includes('Democratic Governance in Bangladesh: Trends and Prospects'));
    assert.ok(html.includes('Comprehensive analysis of democratic governance trends.'));
    assert.ok(html.includes('Research Reports'));
    assert.ok(html.includes('2026'));
    assert.ok(html.includes('pub-card'));
    assert.ok(!html.includes('No Publications Found'));
  });

  test('Case 3: Multiple categories are represented in filter tabs and cards', () => {
    const multiPubs = [
      {
        id: 1,
        title: 'Report on Governance',
        description: 'Governance description',
        category: 'Research Reports',
        date: '2026',
      },
      {
        id: 2,
        title: 'Brief on Labor Rights',
        description: 'Labor description',
        category: 'Policy Briefs',
        date: '2026',
      },
      {
        id: 3,
        title: 'Article on Civic Tech',
        description: 'Civic tech description',
        category: 'Articles',
        date: '2025',
      },
    ];

    const html = renderToStaticMarkup(
      React.createElement(PublicationsClient, { publications: multiPubs })
    );

    assert.ok(html.includes('All'), 'Should render All tab');
    assert.ok(html.includes('Research Reports'), 'Should render Research Reports tab');
    assert.ok(html.includes('Policy Briefs'), 'Should render Policy Briefs tab');
    assert.ok(html.includes('Articles'), 'Should render Articles tab');
    assert.ok(html.includes('Report on Governance'));
    assert.ok(html.includes('Brief on Labor Rights'));
    assert.ok(html.includes('Article on Civic Tech'));
  });

  test('Case 4: A publication with a PDF displays the download action', () => {
    const pubWithPdf = [
      {
        id: 10,
        title: 'Published Report with PDF',
        description: 'Report summary',
        category: 'Research Reports',
        date: '2026',
        documentUrl: '/media/stellar-report-2026.pdf',
        documentFilename: 'stellar-report-2026.pdf',
      },
    ];

    const html = renderToStaticMarkup(
      React.createElement(PublicationsClient, { publications: pubWithPdf })
    );

    assert.ok(html.includes('href="/media/stellar-report-2026.pdf"'), 'Should link to downloadable PDF');
    assert.ok(html.includes('download='), 'Should have download attribute');
    assert.ok(html.includes('title="Download Published Report with PDF"'), 'Should have accessible title');
  });

  test('Case 5: A publication without a PDF omits the download action', () => {
    const pubWithoutPdf = [
      {
        id: 11,
        title: 'Online Article Without PDF',
        description: 'Article summary',
        category: 'Articles',
        date: '2026',
        documentUrl: null,
      },
    ];

    const html = renderToStaticMarkup(
      React.createElement(PublicationsClient, { publications: pubWithoutPdf })
    );

    assert.ok(html.includes('Online Article Without PDF'));
    assert.ok(!html.includes('title="Download Online Article Without PDF"'), 'Download link must not be rendered');
    assert.ok(!html.includes('download='), 'No download attribute should be present');
  });

  test('Case 6: Draft publications are excluded by the public query filter', () => {
    // Simulate the server-side Payload query filter
    const mixedDatabaseRecords = [
      { id: 1, title: 'Live Report', _status: 'published', category: 'Research Reports' },
      { id: 2, title: 'Confidential Internal Draft', _status: 'draft', category: 'Policy Briefs' },
      { id: 3, title: 'Unpublished Revision', _status: 'draft', category: 'Articles' },
    ];

    const publicWhereFilter = { _status: { equals: 'published' } };

    const publicVisibleDocs = mixedDatabaseRecords.filter(
      (doc) => doc._status === publicWhereFilter._status.equals
    );

    assert.strictEqual(publicVisibleDocs.length, 1);
    assert.strictEqual(publicVisibleDocs[0].title, 'Live Report');

    const html = renderToStaticMarkup(
      React.createElement(PublicationsClient, {
        publications: publicVisibleDocs.map((doc) => ({
          id: doc.id,
          title: doc.title,
          description: 'Description',
          category: doc.category,
          date: '2026',
        })),
      })
    );

    assert.ok(html.includes('Live Report'), 'Published report is visible');
    assert.ok(!html.includes('Confidential Internal Draft'), 'Draft record must remain completely invisible');
    assert.ok(!html.includes('Unpublished Revision'), 'Draft record must remain completely invisible');
  });
});
