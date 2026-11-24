import React, { useState } from 'react';
import {
  Check,
  CheckCircle2,
  MessageCircle,
  Star,
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FiveThingsBookings2027SectionProps {
  onSelectPage?: (slug: string) => void;
}

const AUDIT_CHECKS = [
  {
    id: 'mobile-whatsapp',
    label: 'Fast, mobile-first website with an instant WhatsApp lead form',
    cost: 'From R3,000',
  },
  {
    id: 'local-seo',
    label: 'Local SEO, .co.za domain & Google Business Profile optimisation',
    cost: 'Included in Business builds',
  },
  {
    id: 'business-software',
    label: 'CRM, Clients Portal & Project Management tracking in one place',
    cost: 'R300/mo each or R999/mo bundle',
  },
  {
    id: 'booking-system',
    label: 'Online booking calendar with customer login & CRM sync',
    cost: 'Included in Blogs package (from R4,000)',
  },
  {
    id: 'social-posting',
    label: 'Consistent 4 posts/month across social platforms',
    cost: 'R100/month per platform',
  },
];

export const FiveThingsBookings2027Section: React.FC<FiveThingsBookings2027SectionProps> = ({
  onSelectPage,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [checkedItems, setCheckedItems] = useState<string[]>([
    'mobile-whatsapp',
    'local-seo',
  ]);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const missingLabels = AUDIT_CHECKS.filter((item) => !checkedItems.includes(item.id)).map(
    (item) => item.label
  );

  const auditWhatsAppMessage =
    missingLabels.length > 0
      ? `Hi Service Websites, I completed the 2027 Bookings Checklist (${checkedItems.length}/5 ready). I would like a free audit and quote for: ${missingLabels.join('; ')}.`
      : 'Hi Service Websites, I would like a free 2027 online bookings audit for my service business.';

  return (
    <div id="top-5-bookings-2027" className="space-y-8">
      {/* Sub-navigation Strip matching Top 5 / Offer / Reviews / Free audit */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
            : 'bg-[#101623] border-slate-800 text-white'
        }`}
      >
        <span className="font-bold text-sm tracking-tight">Service Websites</span>
        <nav aria-label="2027 Guide Sections" className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <button
            type="button"
            onClick={() => scrollToAnchor('top-5-items')}
            className="hover:text-blue-600 dark:hover:text-amber-400 hover:underline transition-colors cursor-pointer"
          >
            Top 5
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('top-5-offer')}
            className="hover:text-blue-600 dark:hover:text-amber-400 hover:underline transition-colors cursor-pointer"
          >
            Offer
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('top-5-reviews')}
            className="hover:text-blue-600 dark:hover:text-amber-400 hover:underline transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('top-5-free-audit')}
            className="text-blue-600 dark:text-amber-400 hover:underline transition-colors cursor-pointer"
          >
            Free audit
          </button>
        </nav>
      </div>

      {/* High-Contrast Stats Grid */}
      <div
        id="top-5-offer"
        className="rounded-3xl bg-slate-950 text-white border border-slate-800 p-6 sm:p-8 shadow-xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black tracking-tight block">7 days</span>
            <span className="text-xs sm:text-sm text-slate-400 block">typical delivery</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-amber-400 block">
              R3,000
            </span>
            <span className="text-xs sm:text-sm text-slate-400 block">websites from</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black tracking-tight block">50+</span>
            <span className="text-xs sm:text-sm text-slate-400 block">businesses served</span>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-400 block">
              5.0 / 5
            </span>
            <span className="text-xs sm:text-sm text-slate-400 block">from 47 reviews</span>
          </div>
        </div>
      </div>

      {/* Intro Editorial Context */}
      <p
        className={`text-sm sm:text-base leading-relaxed pb-4 border-b ${
          isLight ? 'text-slate-700 border-slate-200' : 'text-slate-300 border-slate-800'
        }`}
      >
        Plumbers, cleaners, electricians and contractors lose jobs every week to a competitor who is
        easier to find and easier to contact. These five items decide who gets the call. Each one
        shows what it does for your phone and what it costs in rand.
      </p>

      {/* The 5 Essential Items */}
      <div id="top-5-items" className="space-y-10">
        {/* ITEM 1 */}
        <section
          className={`pb-10 border-b space-y-5 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-amber-400 leading-none pt-0.5 shrink-0">
              1
            </span>
            <div className="space-y-4 flex-1">
              <h2
                className={`text-xl sm:text-2xl font-serif font-black tracking-tight leading-snug ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                A fast, mobile-first website that sends you WhatsApp enquiries
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Most South African customers search on a phone and message on WhatsApp. A site that
                loads fast and puts one WhatsApp form in front of them turns a search into a lead.
              </p>

              <ul className="space-y-2.5 text-sm">
                {[
                  'Custom premium design, never a generic template',
                  'Mobile responsive with a WhatsApp lead form',
                  'SSL certificate and 1 year full tech support included',
                  'Live in as little as 7 days',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-1" />
                    <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 space-y-3">
                <p className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  From R3,000
                </p>
                <a
                  href={`https://wa.me/27601375180?text=${encodeURIComponent(
                    'Hi Service Websites, I want a fast mobile-first website with WhatsApp enquiry form (from R3,000).'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get this on WhatsApp</span>
                </a>
              </div>

              {/* Google Review 1 */}
              <div
                id="top-5-reviews"
                className={`p-5 rounded-2xl border space-y-3 ${
                  isLight
                    ? 'bg-blue-50/70 border-blue-100 text-slate-800'
                    : 'bg-[#101726] border-slate-800 text-slate-200'
                }`}
              >
                <p className="text-sm leading-relaxed">
                  Service Websites built our plumbing business a website in under a week. We started
                  getting WhatsApp enquiries almost immediately. Absolutely worth every rand!
                </p>
                <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Thabiso Molefe, Google review
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ITEM 2 */}
        <section
          className={`pb-10 border-b space-y-5 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-amber-400 leading-none pt-0.5 shrink-0">
              2
            </span>
            <div className="space-y-4 flex-1">
              <h2
                className={`text-xl sm:text-2xl font-serif font-black tracking-tight leading-snug ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Local SEO so you show up when customers search nearby
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                A good-looking site nobody finds earns nothing. Local SEO tunes your site and your
                Google Business Profile for searches like &ldquo;electrician Rustenburg&rdquo;.
              </p>

              <ul className="space-y-2.5 text-sm">
                {[
                  'Your own yourname.co.za domain',
                  'SEO, AEO and GEO optimisation built into every page',
                  'Google Business Profile setup and optimisation',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-1" />
                    <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 space-y-3">
                <p className={`text-sm sm:text-base ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <strong className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    Included
                  </strong>{' '}
                  in every Business Services build
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/27601375180?text=${encodeURIComponent(
                      'Hi Service Websites, please rank my service business locally with Local SEO and Google Business Profile optimisation.'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                  >
                    <span>Rank me locally</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  {onSelectPage && (
                    <button
                      type="button"
                      onClick={() => onSelectPage('google-chatgpt-business-profiles')}
                      className="text-xs font-semibold text-blue-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      Explore Google &amp; ChatGPT Profiles Pillar →
                    </button>
                  )}
                </div>
              </div>

              {/* Google Review 2 */}
              <div
                className={`p-5 rounded-2xl border space-y-3 ${
                  isLight
                    ? 'bg-blue-50/70 border-blue-100 text-slate-800'
                    : 'bg-[#101726] border-slate-800 text-slate-200'
                }`}
              >
                <p className="text-sm leading-relaxed">
                  Delivered our electrical contracting website faster than expected. We now rank on
                  Google for local searches.
                </p>
                <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Kagiso Sithole, Google review
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ITEM 3 */}
        <section
          className={`pb-10 border-b space-y-5 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-amber-400 leading-none pt-0.5 shrink-0">
              3
            </span>
            <div className="space-y-4 flex-1">
              <h2
                className={`text-xl sm:text-2xl font-serif font-black tracking-tight leading-snug ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Business software that keeps every lead and client in one place
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Spreadsheets and WhatsApp scrolling lose jobs. Three tools, built by us, track
                enquiries, share documents with clients and keep projects on time.
              </p>

              <ul className="space-y-2.5 text-sm">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>
                    <strong>CRM:</strong> customer database, lead tracking, follow-up reminders,
                    WhatsApp contact log
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>
                    <strong>Clients Portal:</strong> secure client login, invoices and documents,
                    project status
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-1" />
                  <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>
                    <strong>Project Management:</strong> task boards, deadlines, milestone alerts,
                    client updates
                  </span>
                </li>
              </ul>

              <div className="pt-2 space-y-3">
                <p className={`text-sm sm:text-base ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <strong className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    R300
                  </strong>{' '}
                  / month each, or all 3 for R999 / month
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/27601375180?text=${encodeURIComponent(
                      'Hi Service Websites, I would like to ask about the CRM, Clients Portal & Project Management software bundle (R300/mo each or all 3 for R999/mo).'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                  >
                    <span>Ask about the bundle</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  {onSelectPage && (
                    <button
                      type="button"
                      onClick={() => onSelectPage('business-software-south-africa')}
                      className="text-xs font-semibold text-blue-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      View Business Software Pillar →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ITEM 4 */}
        <section
          className={`pb-10 border-b space-y-5 ${
            isLight ? 'border-slate-200' : 'border-slate-800'
          }`}
        >
          <div className="flex items-start gap-4">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-amber-400 leading-none pt-0.5 shrink-0">
              4
            </span>
            <div className="space-y-4 flex-1">
              <h2
                className={`text-xl sm:text-2xl font-serif font-black tracking-tight leading-snug ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                An online booking system so customers book without phoning
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Let customers pick a slot at any hour instead of waiting for you to answer. Fewer
                missed calls, fewer no-shows, a diary that fills itself.
              </p>

              <ul className="space-y-2.5 text-sm">
                {[
                  'Calendar and bookings with login and sign-up for your customers',
                  'Works on the website we build for you',
                  'Pairs with the CRM so every booking becomes a client record',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-1" />
                    <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 space-y-3">
                <p className={`text-sm sm:text-base ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <strong className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    Included
                  </strong>{' '}
                  in the Blogs package from R4,000
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/27601375180?text=${encodeURIComponent(
                      'Hi Service Websites, please send me a quote for the Blogs & Online Booking System package (from R4,000).'
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>Get a booking quote</span>
                  </a>
                  {onSelectPage && (
                    <button
                      type="button"
                      onClick={() => onSelectPage('booking-calendar-websites-south-africa')}
                      className="text-xs font-semibold text-blue-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      Calendar &amp; Booking Systems Guide →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ITEM 5 */}
        <section className="space-y-5">
          <div className="flex items-start gap-4">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-amber-400 leading-none pt-0.5 shrink-0">
              5
            </span>
            <div className="space-y-4 flex-1">
              <h2
                className={`text-xl sm:text-2xl font-serif font-black tracking-tight leading-snug ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Steady social media posting so customers see you are active
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                A quiet page looks like a closed business. Four professional posts a month per
                platform keep your brand in front of people who already know your area.
              </p>

              <ul className="space-y-2.5 text-sm">
                {[
                  'Facebook, X, Instagram, LinkedIn, Reddit and TikTok',
                  '4 posts per month on each platform you choose',
                  'Add it to any website package',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-1" />
                    <span className={isLight ? 'text-slate-800' : 'text-slate-200'}>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 space-y-3">
                <p className={`text-sm sm:text-base ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <strong className={`text-lg font-black ${isLight ? 'text-slate-950' : 'text-white'}`}>
                    R100
                  </strong>{' '}
                  / month per platform
                </p>
                <a
                  href={`https://wa.me/27601375180?text=${encodeURIComponent(
                    'Hi Service Websites, I want to start steady social media posting (R100/month per platform, 4 posts/month).'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
                >
                  <span>Start posting</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Free 2027 Bookings Readiness Audit */}
      <section
        id="top-5-free-audit"
        className={`p-6 sm:p-8 rounded-3xl border space-y-5 ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-[#101623] border-slate-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-amber-400 block">
              Free 2027 Booking Readiness Audit
            </span>
            <h3
              className={`text-lg sm:text-xl font-serif font-bold ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              Check What Your Service Business Already Has Online ({checkedItems.length}/5)
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Free audit via WhatsApp</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {AUDIT_CHECKS.map((item) => {
            const isChecked = checkedItems.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                  isChecked
                    ? isLight
                      ? 'bg-emerald-50/80 border-emerald-200 text-slate-900'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-white'
                    : isLight
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      isChecked ? 'text-emerald-500' : 'text-slate-400'
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0 hidden sm:inline">
                  {item.cost}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {missingLabels.length > 0
              ? `${missingLabels.length} item${missingLabels.length > 1 ? 's' : ''} missing — tap below for a free 2027 audit & exact ZAR quote.`
              : 'All 5 essentials ticked — request a complimentary speed & conversion check.'}
          </p>
          <a
            href={`https://wa.me/27601375180?text=${encodeURIComponent(auditWhatsAppMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request My Free Audit on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
