import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PublicLayout } from '../../components/layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Search,
  FileCheck,
  Users,
  Shield,
  ArrowRight,
  Check,
  Ticket,
  BarChart3,
  Settings,
  Database,
  Lock,
  Globe,
  Zap,
  Clock,
} from 'lucide-react';

const FeaturesPage = () => {
  const { t, isRTL } = useLanguage();

  const modules = [
    {
      icon: Search,
      color: 'primary',
      ...t.featuresPage.deviceCheck,
    },
    {
      icon: Ticket,
      color: 'accent',
      ...t.featuresPage.serviceWorkflows,
    },
    {
      icon: Users,
      color: 'warning',
      ...t.featuresPage.customerManagement,
    },
    {
      icon: Shield,
      color: 'success',
      ...t.featuresPage.compliance,
    },
  ];

  const additionalFeatures = [
    { icon: Database, label: 'Cloud-Based Storage' },
    { icon: Lock, label: 'End-to-End Encryption' },
    { icon: Globe, label: 'Multi-Language Support' },
    { icon: Zap, label: 'Real-Time Updates' },
    { icon: Clock, label: '24/7 Availability' },
    { icon: BarChart3, label: 'Advanced Analytics' },
  ];

  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="accent" className="mb-6">
            {t.featuresPage.title}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t.featuresPage.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.featuresPage.subtitle}
          </p>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colorClasses[module.color]} mb-6`}>
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{module.title}</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                      {module.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {module.description}
                    </p>
                    <ul className="space-y-3">
                      {module.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full ${colorClasses[module.color]} flex items-center justify-center flex-shrink-0`}>
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={!isEven ? 'lg:order-1' : ''}>
                    <Card className="overflow-hidden border-border/50">
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={index === 0 ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop' : 
                               index === 1 ? 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?w=800&h=500&fit=crop' :
                               index === 2 ? 'https://images.unsplash.com/photo-1576613109753-27804de2cba8?w=800&h=500&fit=crop' :
                               'https://images.unsplash.com/photo-1613347761493-4060c969cd28?w=800&h=500&fit=crop'}
                          alt={module.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Grid */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              {t.features.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-6 border-border/50 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{feature.label}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
            {t.hero.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="xl" variant="hero">
                {t.hero.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rtl-flip' : 'ml-2'}`} />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="xl" variant="outline">
                {t.nav.pricing}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default FeaturesPage;
