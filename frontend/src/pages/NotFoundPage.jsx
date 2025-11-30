import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Smartphone, Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div data-testid="notfound-page" className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <Link to="/" data-testid="notfound-logo" className="inline-flex items-center gap-2 mb-8">
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
          <h1 data-testid="notfound-code" className="text-[150px] font-display font-bold text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 data-testid="notfound-title" className="text-3xl font-display font-bold text-foreground mb-2">
                {t.notfound?.title || 'Seite nicht gefunden'}
              </h2>
              <p data-testid="notfound-description" className="text-muted-foreground">
                {t.notfound?.description || 'Die gesuchte Seite existiert nicht oder wurde verschoben.'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button data-testid="notfound-home-btn" size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              {t.nav.home}
            </Button>
          </Link>
          <Button
            data-testid="notfound-back-btn"
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2 rtl-flip' : 'mr-2'}`} />
            {t.notfound?.goBack || 'Zurück'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
