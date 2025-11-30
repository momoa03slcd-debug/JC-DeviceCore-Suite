import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Smartphone, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t.footer.product,
      links: [
        { label: t.nav.features, path: '/features' },
        { label: t.nav.useCases, path: '/use-cases' },
        { label: t.nav.pricing, path: '/pricing' },
      ],
    },
    {
      title: t.footer.company,
      links: [
        { label: t.nav.about, path: '/about' },
        { label: t.footer.contact, path: '/contact' },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { label: t.nav.privacy, path: '/privacy' },
        { label: t.nav.terms, path: '/terms' },
      ],
    },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-primary">
                <Smartphone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-foreground text-lg leading-tight">
                  JC DeviceCore
                </span>
                <span className="text-[10px] text-muted-foreground -mt-0.5">Suite</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              {t.footer.description}
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <a href="mailto:info@jc-devicecore.com" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="w-4 h-4" />
                info@jc-devicecore.com
              </a>
              <a href="tel:+4930123456789" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="w-4 h-4" />
                +49 30 123 456 789
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Berlin, Germany
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} JC DeviceCore Suite. {t.footer.allRights}.
          </p>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
              {t.trust.gdpr}
            </span>
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {t.trust.secure}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
