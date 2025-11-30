import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { PublicLayout } from '../../components/layout';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import {
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const PricingPage = () => {
  const { t, isRTL } = useLanguage();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      ...t.pricing.starter,
      popular: false,
      color: 'secondary',
    },
    {
      ...t.pricing.pro,
      popular: true,
      color: 'primary',
    },
    {
      ...t.pricing.enterprise,
      popular: false,
      color: 'accent',
    },
  ];

  const getPrice = (price) => {
    const numPrice = parseInt(price);
    if (isYearly) {
      return Math.round(numPrice * 10); // 2 months free
    }
    return numPrice;
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 lg:py-28 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="accent" className="mb-6">
            {t.nav.pricing}
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t.pricing.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            {t.pricing.subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <Label htmlFor="billing-toggle" className={!isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {t.pricing.monthly}
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={isYearly ? 'text-foreground font-medium' : 'text-muted-foreground'}>
              {t.pricing.yearly}
              <Badge variant="success" className="ml-2">-17%</Badge>
            </Label>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative flex flex-col ${
                  plan.popular
                    ? 'border-primary shadow-primary scale-105 z-10'
                    : 'border-border/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {t.pricing.popular}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-display font-bold text-foreground">
                        €{getPrice(plan.price)}
                      </span>
                      <span className="text-muted-foreground">
                        {isYearly ? '/ Jahr' : t.pricing.perMonth}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full ${
                          plan.popular ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'
                        } flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4">
                  <Link to="/register" className="w-full">
                    <Button
                      variant={plan.popular ? 'default' : 'outline'}
                      size="lg"
                      className="w-full"
                    >
                      {t.pricing.selectPlan}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rtl-flip' : 'ml-2'}`} />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Contact our sales team for custom enterprise solutions and volume discounts.
          </p>
          <Button variant="outline" size="lg">
            {t.footer.contact}
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PricingPage;
