import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PublicLayout } from '../../components/layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Smartphone,
  Shield,
  Search,
  FileCheck,
  ArrowRight,
  Check,
  X,
  Wrench,
  Store,
  Building2,
  BarChart3,
  Ticket,
  Users,
  Play,
  ChevronRight,
  Zap,
  Lock,
  Clock,
} from 'lucide-react';

const HomePage = () => {
  const { t, isRTL } = useLanguage();

  const steps = [
    { icon: Search, ...t.howItWorks.step1 },
    { icon: BarChart3, ...t.howItWorks.step2 },
    { icon: FileCheck, ...t.howItWorks.step3 },
    { icon: Wrench, ...t.howItWorks.step4 },
  ];

  const features = [
    { icon: BarChart3, color: 'primary', ...t.features.analytics },
    { icon: Ticket, color: 'accent', ...t.features.pipeline },
    { icon: Shield, color: 'success', ...t.features.compliance },
    { icon: Users, color: 'warning', ...t.features.multiUser },
  ];

  const audiences = [
    { icon: Wrench, ...t.targetAudience.workshop },
    { icon: Store, ...t.targetAudience.reseller },
    { icon: Building2, ...t.targetAudience.enterprise },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero" data-testid="hero-section">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <Badge variant="accent" className="mb-6">
                <Zap className="w-3 h-3 mr-1" />
                {t.trust.professional}
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
                {t.hero.title}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link to="/register">
                  <Button size="xl" variant="hero" className="w-full sm:w-auto" data-testid="hero-cta-btn">
                    {t.hero.cta}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rtl-flip' : 'ml-2'}`} />
                  </Button>
                </Link>
                <Button size="xl" variant="heroOutline" className="w-full sm:w-auto" data-testid="hero-demo-btn">
                  <Play className="w-5 h-5 mr-2" />
                  {t.hero.demo}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Badge variant="secondary" className="px-3 py-1.5">
                  <Shield className="w-3.5 h-3.5 mr-1.5" />
                  {t.trust.gdpr}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5">
                  <Lock className="w-3.5 h-3.5 mr-1.5" />
                  {t.trust.secure}
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5">
                  <Clock className="w-3.5 h-3.5 mr-1.5" />
                  {t.trust.support}
                </Badge>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop"
                  alt="Dashboard Analytics"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-xl border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/15 flex items-center justify-center">
                    <Check className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">1,234</p>
                    <p className="text-xs text-muted-foreground">{t.dashboard.totalDevices}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-card rounded-xl p-4 shadow-xl border border-border animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Ticket className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">42</p>
                    <p className="text-xs text-muted-foreground">{t.dashboard.openTickets}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="info" className="mb-4">
              {t.howItWorks.title}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-primary group-hover:shadow-lg transition-all duration-300">
                        <Icon className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" style={{ width: 'calc(100% - 4rem)' }}>
                      <ChevronRight className={`absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground ${isRTL ? 'rtl-flip' : ''}`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t.features.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                primary: 'bg-primary/10 text-primary',
                accent: 'bg-accent/10 text-accent',
                success: 'bg-success/10 text-success',
                warning: 'bg-warning/10 text-warning',
              };
              return (
                <Card key={index} className="card-hover border-border/50 bg-card">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[feature.color]} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/features">
              <Button variant="outline" size="lg">
                {t.common.learnMore}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rtl-flip' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t.comparison.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Without */}
            <Card className="border-destructive/30 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <X className="w-5 h-5" />
                  {t.comparison.without}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.comparison.withoutItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <X className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* With */}
            <Card className="border-success/30 bg-success/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Check className="w-5 h-5" />
                  {t.comparison.with}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {t.comparison.withItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <Check className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              {t.targetAudience.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {audiences.map((audience, index) => {
              const Icon = audience.icon;
              return (
                <Card key={index} className="card-hover text-center border-border/50">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-primary">
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{audience.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{audience.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 gradient-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-primary-foreground mb-6">
            {t.hero.title}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="xl" className="bg-card text-foreground hover:bg-card/90 w-full sm:w-auto">
                {t.hero.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rtl-flip' : 'ml-2'}`} />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="xl" variant="heroOutline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 w-full sm:w-auto">
                {t.nav.pricing}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default HomePage;
