import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import siteContent from '../site-content.json';
import { COMPANY_NAME } from '../constants';
import { usePageMeta } from '../lib/usePageMeta';
import CallButton from '../components/CallButton';

// Datadrevne ekstra-sider oprettet via admin-editoren (site-content.json →
// customPages). Nye sider kræver dermed ingen kodeændringer og kan ikke
// bryde routing eller build. URL: /info/<slug>.

interface CustomPageSection {
  heading?: string;
  text: string;
  imagePath?: string;
}

interface CustomPageData {
  slug: string;
  title: string;
  metaDescription?: string;
  sections: CustomPageSection[];
}

const CustomPage: React.FC = () => {
  const { slug } = useParams();
  const pages = ((siteContent as any).customPages || []) as CustomPageData[];
  const page = pages.find(p => p.slug === slug);

  usePageMeta({
    title: page ? `${page.title} | ${COMPANY_NAME}` : COMPANY_NAME,
    description: page?.metaDescription || page?.sections?.[0]?.text?.slice(0, 155) || '',
    canonicalPath: page ? `/info/${page.slug}` : '/'
  });

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pb-20">
      <section className="bg-slate-900 text-white py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter">
            {page.title}
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          {page.sections.map((section, i) => (
            <div key={i}>
              {section.heading && (
                <h2 className="text-2xl sm:text-3xl font-black text-blue-900 mb-4 uppercase italic tracking-tight">
                  {section.heading}
                </h2>
              )}
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {section.text}
              </p>
              {section.imagePath && (
                <img
                  src={section.imagePath}
                  alt={section.heading || page.title}
                  loading="lazy"
                  className="mt-6 rounded-2xl shadow-lg w-full max-h-[500px] object-cover"
                />
              )}
            </div>
          ))}

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <Link
              to="/kontakt"
              className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-xl shadow-orange-600/30"
            >
              Bestil besigtigelse <ArrowRight size={20} />
            </Link>
            <CallButton variant="secondary" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomPage;
