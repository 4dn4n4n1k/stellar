import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import PublicationsClient, {
  FormattedPublication,
} from '@/components/publications/PublicationsClient';
import { publications as staticFallback } from '@/lib/data';

// Revalidate page cache every 60 seconds (ISR)
export const revalidate = 60;

function formatPublicationDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  if (/^\d{4}$/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.getFullYear().toString();
    }
  } catch {
    // fallback
  }
  return dateStr;
}

export default async function PublicationsPage() {
  let publications: FormattedPublication[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const { docs } = await payload.find({
      collection: 'publications',
      where: {
        _status: {
          equals: 'published',
        },
      },
      depth: 1,
      sort: '-publicationDate',
      limit: 100,
    });

    publications = docs.map((doc) => {
      const docMedia =
        doc.document && typeof doc.document === 'object'
          ? (doc.document as { url?: string; filename?: string })
          : null;

      return {
        id: doc.id,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        date: formatPublicationDate(doc.publicationDate),
        documentUrl: docMedia?.url || null,
        documentFilename: docMedia?.filename || null,
      };
    });
  } catch (error) {
    // Graceful error logging on server; never leak database or secret details to client
    console.error('Failed to load published publications from Payload:', error);
  }

  // Explicit development fallback only if enabled via environment flag
  const isDevFallback =
    process.env.NODE_ENV === 'development' &&
    process.env.ENABLE_DEV_FALLBACK === 'true' &&
    publications.length === 0;

  const displayPublications: FormattedPublication[] = isDevFallback
    ? staticFallback.map((p, idx) => ({
        id: `static-${idx}`,
        title: p.title,
        description: p.description,
        category: p.category,
        date: p.date,
        documentUrl: null,
      }))
    : publications;

  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <section className="bg-navy-950 pt-24 pb-8 md:pt-28 md:pb-10 relative overflow-hidden">
        {/* Brand Pattern Background */}
        <svg
          className="absolute -top-20 -right-20 w-[40%] h-[60%] opacity-15 pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="400" cy="0" r="100" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="200" stroke="white" strokeWidth="1" />
          <circle cx="400" cy="0" r="300" stroke="white" strokeWidth="1" />
        </svg>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p
            className="text-teal-100 font-bold text-xs uppercase tracking-[0.15em] mb-3 animate-fade-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            Knowledge Hub
          </p>
          <h1
            className="heading-display text-4xl md:text-5xl lg:text-6xl text-white font-extrabold mb-6 font-heading animate-fade-slide-up"
            style={{ animationDelay: '250ms' }}
          >
            Publications
          </h1>
          <p
            className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto animate-fade-slide-up"
            style={{ animationDelay: '400ms' }}
          >
            Research reports, policy briefs, articles, and insights from our
            team of development experts.
          </p>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <PublicationsClient publications={displayPublications} />

          <div className="text-center mt-12 text-gray-600 text-sm italic">
            Publications library will be expanded as new research is completed.
          </div>
        </div>
      </section>
    </div>
  );
}
