import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PublicLayout } from '../../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Eye, Target, Crosshair, Shield, FileCheck, Scale } from 'lucide-react';

const AboutPage = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Eye,
      title: t.about.vision,
      content: t.about.visionText,
      color: 'primary',
    },
    {
      icon: Target,
      title: t.about.mission,
      content: t.about.missionText,
      color: 'accent',
    },
    {
      icon: Crosshair,
      title: t.about.focus,
      content: t.about.focusText,
      color: 'success',
    },
  ];

  const values = [
    { icon: Shield, label: 'Transparency' },
    { icon: FileCheck, label: 'Compliance' },
    { icon: Scale, label: 'Legal Security' },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    accent: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success',
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section data-testid="about-hero" className="py-20 lg:py-28 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge data-testid="about-badge" variant="accent" className="mb-6">
            {t.nav.about}
          </Badge>
          <h1 data-testid="about-title" className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t.about.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index} className="border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colorClasses[section.color]} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Values */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">Our Core Values</h2>
            <div className="flex justify-center gap-8 flex-wrap">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-primary">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{value.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
