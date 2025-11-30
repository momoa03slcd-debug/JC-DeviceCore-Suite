import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Smartphone, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-primary">
            <Smartphone className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-foreground text-xl leading-tight">
              JC DeviceCore
            </span>
            <span className="text-xs text-muted-foreground -mt-0.5">Suite</span>
          </div>
        </Link>

        {/* 404 Display */}
        <div className="relative mb-8">
          <h1 className="text-[150px] font-display font-bold text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Page Not Found
              </h2>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              {t.nav.home}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rtl-flip' : 'mr-2'}`} />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
