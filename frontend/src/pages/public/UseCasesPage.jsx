import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PublicLayout } from '../../components/layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Wrench,
  RefreshCw,
  Building2,
  ArrowRight,
  Check,
  TrendingUp,
} from 'lucide-react';

const UseCasesPage = () => {
  const { t, isRTL } = useLanguage();

  const useCases = [
    {
      icon: Wrench,
      color: 'primary',
      ...t.useCases.repairShops,
    },
    {
      icon: RefreshCw,
      color: 'accent',
      ...t.useCases.refurbisher,
    },
    {
      icon: Building2,
      color: 'success',
      ...t.useCases.corporate,
    },
  ];

  const colorClasses = {
    primary: {
      bg: 'bg-primary/10',
      text: 'text-primary',
      border: 'border-primary/20',
      gradient: 'from-primary/5 to-primary/10',
    },
    accent: {
      bg: 'bg-accent/10',
      text: 'text-accent',
      border: 'border-accent/20',
      gradient: 'from-accent/5 to-accent/10',
    },
    success: {
      bg: 'bg-success/10',
      text: 'text-success',
      border: 'border-success/20',
      gradient: 'from-success/5 to-success/10',
    },
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="accent" className="mb-6">
            {t.useCases.title}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t.useCases.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.useCases.subtitle}
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const colors = colorClasses[useCase.color];
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-3xl -z-10`} />
                  
                  <div className={`grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-12 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={!isEven ? 'lg:order-2' : ''}>
                      <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6`}>
                        <Icon className={`w-8 h-8 ${colors.text}`} />
                      </div>
                      
                      <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                        {useCase.title}
                      </h2>
                      
                      {/* Problem */}
                      <div className="mb-6">
                        <Badge variant="destructive" className="mb-2">Problem</Badge>
                        <p className="text-muted-foreground">{useCase.problem}</p>
                      </div>
                      
                      {/* Solution */}
                      <div className="mb-6">
                        <Badge variant="success" className="mb-2">Solution</Badge>
                        <p className="text-foreground">{useCase.solution}</p>
                      </div>
                      
                      {/* Benefits/KPIs */}
                      <div>
                        <Badge variant="info" className="mb-3">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          KPIs
                        </Badge>
                        <ul className="space-y-2">
                          {useCase.benefits.map((benefit, bIndex) => (
                            <li key={bIndex} className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                                <Check className={`w-3 h-3 ${colors.text}`} />
                              </div>
                              <span className="text-foreground font-medium">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className={!isEven ? 'lg:order-1' : ''}>
                      <Card className="overflow-hidden border-border/50 shadow-xl">
                        <div className="aspect-video bg-muted relative">
                          <img
                            src={index === 0 ? 'https://images.unsplash.com/photo-1588515603068-adb330f26e92?w=800&h=500&fit=crop' : 
                                 index === 1 ? 'https://images.unsplash.com/photo-1576613109753-27804de2cba8?w=800&h=500&fit=crop' :
                                 'https://images.unsplash.com/photo-1580795479225-c50ab8c3348d?w=800&h=500&fit=crop'}
                            alt={useCase.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-40`} />
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
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
              <Button size="xl" className="bg-card text-foreground hover:bg-card/90">
                {t.hero.cta}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rtl-flip' : 'ml-2'}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default UseCasesPage;
