import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PublicLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Shield, Database, Lock } from 'lucide-react';

const PrivacyPage = () => {
  const { t } = useLanguage();

  return (
    <PublicLayout>
      {/* Hero */}
      <section data-testid="privacy-hero" className="py-20 lg:py-28 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge data-testid="privacy-badge" variant="accent" className="mb-6">
            <Lock className="w-3 h-3 mr-1" />
            {t.nav.privacy}
          </Badge>
          <h1 data-testid="privacy-title" className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t.privacy.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section data-testid="privacy-content" className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <Card data-testid="privacy-intro" className="border-border/50 mb-8">
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {t.privacy.intro}
                </p>
              </CardContent>
            </Card>

            <Card data-testid="privacy-data-processing" className="border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  {t.privacy.dataProcessing}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t.privacy.dataProcessingText}
                </p>
              </CardContent>
            </Card>

            <Card data-testid="privacy-gdpr" className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  {t.privacy.gdpr}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {t.privacy.gdprText}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PrivacyPage;
