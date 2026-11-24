import React, { useState } from 'react';
import {
  Check,
  MessageCircle,
  Star,
  Facebook,
  Instagram,
  Phone,
  Mail,
  MapPin,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ListicalsSectionProps {
  onSelectPage?: (slug: string) => void;
}

const PACKAGES = [
  {
    number: '1.',
    name: 'Business Services',
    price: 'From R3,000',
    cta: 'Start at R3,000',
    features: [
      '10 page website including listicle page and blog page',
      'SEO, AEO and GEO optimised',
      'WhatsApp integration',
      '1 year full tech support',
    ],
    whatsappText:
      'Hi Service Websites, I want to start the Business Services 10-page website package (From R3,000) including the listicle and blog pages.',
  },
  {
    number: '2.',
    name: 'Blogs',
    price: 'From R4,000',
    cta: 'Start at R4,000',
    features: [
      'Login / Sign up authentication button',
      'Users self-management accounts',
      'Calendar and bookings',
      'Payment gateway: PayFast, PayU, PayPal',
      '1 year full tech support',
    ],
    whatsappText:
      'Hi Service Websites, I want to start the Blogs & Bookings package (From R4,000) with calendar, accounts and payment gateway.',
  },
  {
    number: '3.',
    name: 'E-commerce Website',
    price: 'From R5,000',
    cta: 'Start at R5,000',
    features: [
      'Online store brochures, product catalogues and product pages',
      'Shopping cart and checkout: Visa, Mastercard or credit card',
      'Users self-management accounts database',
      'Payment gateway system',
      '1 year full tech support',
    ],
    whatsappText:
      'Hi Service Websites, I want to start the E-commerce Website package (From R5,000) with product catalogues, cart and checkout.',
  },
];

const PACKAGE_RATIONALES = [
  {
    title: 'Business Services',
    priceLabel: 'from R3,000',
    lead: 'A 10 page website with a listicle page and a blog page, built to be found and to get you messaged.',
    bullets: [
      {
        heading: 'Get found on Google and AI search.',
        detail:
          'SEO, AEO and GEO optimisation puts you in front of people searching for your service in your town.',
      },
      {
        heading: 'Get more enquiries.',
        detail:
          'WhatsApp integration lets a customer message you in one tap, the way South Africans already prefer to buy.',
      },
      {
        heading: 'Look bigger than your competitors.',
        detail:
          'Ten pages, a listicle page and a blog build trust and give Google fresh content to rank.',
      },
      {
        heading: 'Pay once, stay covered.',
        detail: 'A full year of tech support is included.',
      },
    ],
    bestFor:
      'Best for plumbers, cleaners, electricians and contractors who need a professional online presence now.',
  },
  {
    title: 'Blogs',
    priceLabel: 'from R4,000',
    lead: 'A site where your customers log in, book and pay, so your diary and cash flow run without phone calls.',
    bullets: [
      {
        heading: 'Fill your diary while you work.',
        detail: 'Calendar and bookings let customers choose a slot at any hour.',
      },
      {
        heading: 'Get paid faster.',
        detail:
          'PayFast, PayU and PayPal take payment online, so you chase fewer invoices.',
      },
      {
        heading: 'Keep customers coming back.',
        detail:
          'Login, sign up and self-management accounts let them view and change their own details.',
      },
      {
        heading: 'Save admin time.',
        detail: 'Less back and forth means more hours on paid jobs.',
      },
    ],
    bestFor:
      'Best for businesses that take bookings or repeat clients and want to stop managing everything by phone.',
  },
  {
    title: 'E-commerce Website',
    priceLabel: 'from R5,000',
    lead: 'An online store that sells for you around the clock, with products, cart and checkout ready.',
    bullets: [
      {
        heading: 'Sell while you sleep.',
        detail:
          'Product catalogues and product pages let customers browse and buy at any time.',
      },
      {
        heading: 'Make buying easy.',
        detail:
          'A shopping cart and checkout accept Visa, Mastercard or credit card.',
      },
      {
        heading: 'Reach beyond your town.',
        detail:
          'Sell to customers across South Africa, not only walk-ins.',
      },
      {
        heading: 'Know your customers.',
        detail:
          'A users self-management accounts database and a payment gateway keep orders and accounts organised.',
      },
    ],
    bestFor:
      'Best for shops and product businesses ready to turn their brochure into a real online store.',
  },
];

const REVIEWS = [
  {
    name: 'Thabiso Molefe',
    service: 'Web design · plumbing business',
    quote:
      'Service Websites built our plumbing business a website in under a week. We started getting WhatsApp enquiries almost immediately. Absolutely worth every rand!',
  },
  {
    name: 'Nomsa Dlamini',
    service: 'Web design · cleaning company',
    quote:
      'Professional, fast, and the design is stunning. My cleaning company looks like a top-tier brand online now.',
  },
  {
    name: 'Kagiso Sithole',
    service: 'Local SEO · electrical contractor',
    quote:
      'Delivered our electrical contracting website faster than expected. We now rank on Google for local searches.',
  },
  {
    name: 'Sipho Nkosi',
    service: 'Small business client',
    quote:
      'Really understands small business needs in South Africa. Affordable pricing and a world-class result.',
  },
];

export const ListicalsSection: React.FC<ListicalsSectionProps> = ({ onSelectPage }) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [auditError, setAuditError] = useState<string | null>(null);
  const [auditReady, setAuditReady] = useState(false);

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const trimmedBiz = businessName.trim();
  const trimmedUrl = websiteUrl.trim();
  const trimmedPhone = whatsappNumber.trim();
  const canOpenAudit = Boolean(trimmedBiz && trimmedPhone);

  const auditMessage = `Hi Service Websites, I would like a Free Business Audit.\nBusiness name: ${
    trimmedBiz || 'Not provided'
  }\nWebsite URL: ${trimmedUrl || 'None yet'}\nWhatsApp number: ${trimmedPhone || 'Not provided'}`;

  const auditWhatsappUrl = `https://wa.me/27601375180?text=${encodeURIComponent(auditMessage)}`;

  const handleAuditLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canOpenAudit) {
      e.preventDefault();
      setAuditError('Please enter your business name and WhatsApp number so we can prepare your audit.');
      setAuditReady(false);
      return;
    }
    setAuditError(null);
    setAuditReady(true);
  };

  return (
    <div id="listicals-hub" className="space-y-12">
      {/* Sub-navigation Bar matching Service Websites · Top 5 / Offer / Reviews / Free audit */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-2xs'
            : 'bg-[#101623] border-slate-800 text-white'
        }`}
      >
        <span className="font-bold text-sm tracking-tight">Service Websites</span>
        <nav aria-label="Listicals Page Sections" className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          {onSelectPage ? (
            <button
              type="button"
              onClick={() => onSelectPage('5-things-small-service-business-needs-online-2027')}
              className="hover:text-blue-600 dark:hover:text-amber-400 hover:underline transition-colors cursor-pointer"
            >
              Top 5
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => scrollToAnchor('listicals-offer')}
            className="text-blue-600 dark:text-amber-400 hover:underline transition-colors cursor-pointer"
          >
            Offer
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('listicals-reviews')}
            className="hover:text-blue-600 dark:hover:text-amber-400 hover:underline transition-colors cursor-pointer"
          >
            Reviews
          </button>
          <button
            type="button"
            onClick={() => scrollToAnchor('listicals-free-audit')}
            className="hover:text-blue-600 dark:hover:text-amber-400 hover:underline transition-colors cursor-pointer"
          >
            Free audit
          </button>
        </nav>
      </div>

      {/* SECTION 1: Offer Packages — Want the whole list done for you? */}
      <section id="listicals-offer" className="space-y-6">
        <div className="space-y-2">
          <h2
            className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            Want the whole list done for you?
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Start with a free audit, then pick the plan that fits. Prices are in rand with no hidden
            fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-between gap-5 ${
                isLight
                  ? 'bg-slate-50/70 border-slate-200 shadow-2xs'
                  : 'bg-[#101623] border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3
                    className={`text-sm sm:text-base font-bold ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {pkg.number} {pkg.name}
                  </h3>
                  <p
                    className={`text-2xl sm:text-3xl font-black tracking-tight ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {pkg.price}
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {pkg.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`https://wa.me/27601375180?text=${encodeURIComponent(pkg.whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm text-center shadow-sm transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>{pkg.cta}</span>
              </a>
            </div>
          ))}
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          All 3 packages include 1 year full tech support. Add-ons: business software at R300 /
          month each or R999 / month for all three, social media posting at R100 / month per
          platform.
        </p>
      </section>

      {/* SECTION 2: Why customers choose each package */}
      <section
        className={`pt-8 border-t space-y-6 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div className="space-y-2">
          <h2
            className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            Why customers choose each package
          </h2>
          <p className={`text-sm sm:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Pick the one that matches where your business is today. Every package includes 1 year
            of full tech support, so you are never left alone after launch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {PACKAGE_RATIONALES.map((item) => (
            <div
              key={item.title}
              className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-between gap-5 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-[#101623] border-slate-800'
              }`}
            >
              <div className="space-y-4">
                <div>
                  <h3
                    className={`text-lg font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}
                  >
                    {item.title}
                  </h3>
                  <span className="text-sm font-bold text-blue-600 dark:text-amber-400">
                    {item.priceLabel}
                  </span>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {item.lead}
                </p>

                <ul className="space-y-3 text-xs sm:text-sm">
                  {item.bullets.map((bullet) => (
                    <li key={bullet.heading} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-blue-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
                        <strong className={isLight ? 'text-slate-950' : 'text-white'}>
                          {bullet.heading}{' '}
                        </strong>
                        {bullet.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p
                className={`pt-3 border-t text-xs leading-relaxed ${
                  isLight
                    ? 'border-slate-100 text-slate-500'
                    : 'border-slate-800 text-slate-400'
                }`}
              >
                {item.bestFor}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: What Rustenburg business owners say (5.0 / 47 reviews) */}
      <section
        id="listicals-reviews"
        className={`pt-8 border-t space-y-6 ${
          isLight ? 'border-slate-200' : 'border-slate-800'
        }`}
      >
        <div className="space-y-2">
          <h2
            className={`text-2xl sm:text-3xl font-serif font-black tracking-tight ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            What Rustenburg business owners say
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`text-3xl sm:text-4xl font-black tracking-tight ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              5.0
            </span>
            <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
          </div>
          <p className={`text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Rated 5.0 out of 5 from 47 reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className={`p-5 sm:p-6 rounded-2xl border space-y-3 ${
                isLight
                  ? 'bg-white border-slate-200 shadow-2xs'
                  : 'bg-[#101623] border-slate-800'
              }`}
            >
              <div className="flex items-center gap-1" aria-label="5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                {rev.quote}
              </p>
              <div className="pt-1">
                <p className={`text-sm font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                  {rev.name}
                </p>
                <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {rev.service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Free Business Audit WhatsApp Intake Banner */}
      <section
        id="listicals-free-audit"
        className="rounded-3xl bg-blue-600 text-white p-6 sm:p-8 shadow-xl space-y-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
              Free business audit
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Tell us who you are and we will open WhatsApp with your details ready to send.
            </p>
            <ul className="space-y-2 text-sm text-white">
              {[
                'Website performance score',
                'Search visibility analysis',
                'Competitor benchmarking, mobile and speed check',
                '5 actionable growth steps',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="audit-business-name" className="block text-xs font-bold text-white">
                Business name
              </label>
              <input
                id="audit-business-name"
                type="text"
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setAuditError(null);
                }}
                placeholder="e.g. Tlhabane Plumbing"
                className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="audit-website-url" className="block text-xs font-bold text-white">
                Website URL (if you have one)
              </label>
              <input
                id="audit-website-url"
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                placeholder="www.yourbusiness.co.za"
                className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="audit-whatsapp" className="block text-xs font-bold text-white">
                Your WhatsApp number
              </label>
              <input
                id="audit-whatsapp"
                type="tel"
                value={whatsappNumber}
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                  setAuditError(null);
                }}
                placeholder="060 000 0000"
                className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 placeholder-slate-400 text-sm outline-none focus:ring-2 focus:ring-amber-300"
              />
            </div>

            {auditError && (
              <div className="flex items-center gap-2 text-xs font-medium bg-blue-900/60 border border-blue-300/30 rounded-xl px-3 py-2 text-amber-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{auditError}</span>
              </div>
            )}

            {auditReady && (
              <div className="flex items-center gap-2 text-xs font-medium bg-emerald-600/80 border border-emerald-300/40 rounded-xl px-3 py-2 text-white">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>WhatsApp audit message prepared for {trimmedBiz}.</span>
              </div>
            )}

            <a
              href={auditWhatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={handleAuditLinkClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Request my free audit</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5: Dark Agency Summary & Follow Us Card */}
      <section className="rounded-3xl bg-slate-950 text-slate-200 border border-slate-800 p-6 sm:p-8 space-y-6">
        <p className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-3xl">
          Service Websites Agency is a premium web design and business software company in
          Rustenburg. We build fast, mobile-first websites, local SEO, booking systems and
          management tools for South African service businesses.
        </p>

        <div className="space-y-3">
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            FOLLOW US
          </span>
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="w-11 h-11 rounded-xl bg-white text-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="w-11 h-11 rounded-xl bg-white text-slate-950 font-black text-base flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              𝕏
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-xl bg-white text-rose-600 flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://reddit.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Reddit"
              className="w-11 h-11 rounded-xl bg-white text-[#FF4500] font-black text-sm flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              r/
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="w-11 h-11 rounded-xl bg-white text-slate-950 font-black text-sm flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              ♪
            </a>
          </div>
        </div>

        <div className="pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-5 text-xs">
          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              QUICK LINKS
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              {onSelectPage && (
                <li>
                  <button
                    type="button"
                    onClick={() => onSelectPage('5-things-small-service-business-needs-online-2027')}
                    className="hover:text-white hover:underline cursor-pointer"
                  >
                    Top 5
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('listicals-offer')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  Offer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('listicals-reviews')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  Reviews
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToAnchor('listicals-free-audit')}
                  className="hover:text-white hover:underline cursor-pointer"
                >
                  Free audit
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              SERVICES
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPage?.('website-design-rustenburg')}
                  className="hover:text-white hover:underline text-left cursor-pointer"
                >
                  Website design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPage?.('local-seo-rustenburg')}
                  className="hover:text-white hover:underline text-left cursor-pointer"
                >
                  Local SEO
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectPage?.('business-software-south-africa')}
                  className="hover:text-white hover:underline text-left cursor-pointer"
                >
                  Business software
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              CONTACT
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li>
                <a href="tel:0601375180" className="inline-flex items-center gap-1.5 hover:underline">
                  <Phone className="w-3 h-3 text-amber-400" />
                  <span>060 137 5180</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:servicewebsites6@gmail.com"
                  className="inline-flex items-center gap-1.5 hover:underline break-all"
                >
                  <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>servicewebsites6@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px]">
              FIND US
            </h4>
            <p className="text-slate-300 leading-relaxed flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>Moumo St, Tlhabane, Rustenburg 0309 · Mon–Fri</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
