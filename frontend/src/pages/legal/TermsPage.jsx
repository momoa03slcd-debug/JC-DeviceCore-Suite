import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PublicLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { FileText, Server, AlertTriangle } from 'lucide-react';

const TermsPage = () => {
  const { t } = useLanguage();

  return (
    <PublicLayout>
      {/* Hero */}
      <section data-testid="terms-hero" className="py-20 lg:py-28 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge data-testid="terms-badge" variant="accent" className="mb-6">
            <FileText className="w-3 h-3 mr-1" />
            {t.nav.terms}
          </Badge>
          <h1 data-testid="terms-title" className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t.terms.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t.terms.intro}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-primary" />
                  </div>
                  {t.terms.services}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t.terms.servicesText}
                </p>
              </CardContent>
            </Card>

            <Alert variant="warning" className="border-warning/30 bg-warning/5">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <AlertTitle className="text-warning">{t.terms.legal}</AlertTitle>
              <AlertDescription className="text-muted-foreground">
                {t.terms.legalText}
              </AlertDescription>
            </Alert>

            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">Important Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  JC DeviceCore Suite does NOT provide:
                </p>
                <ul className="mt-4 space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    Illegal device unlocking services
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    Apple or carrier access bypass
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    Security mechanism circumvention
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    iCloud lock removal
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default TermsPage;
