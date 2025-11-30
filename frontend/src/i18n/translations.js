// JC DeviceCore Suite - Internationalization
// Supported languages: German (DE), English (EN), Arabic (AR)

export const translations = {
  de: {
    // Navigation
    nav: {
      home: 'Startseite',
      features: 'Features',
      useCases: 'Use Cases',
      pricing: 'Preise',
      login: 'Anmelden',
      register: 'Registrieren',
      dashboard: 'Dashboard',
      about: 'Über uns',
      privacy: 'Datenschutz',
      terms: 'Nutzungsbedingungen',
      tryFree: 'Kostenlos testen',
      watchDemo: 'Demo ansehen',
    },
    // Hero Section
    hero: {
      title: 'Transparente Geräteanalyse und Service-Workflows für Profis',
      subtitle: 'JC DeviceCore Suite analysiert Ihre Geräte und gibt rechtlich konforme Handlungsempfehlungen. Für Werkstätten, Händler und IT-Teams.',
      cta: 'Kostenlos starten',
      demo: 'Demo ansehen',
      trustedBy: 'Vertraut von führenden Unternehmen',
    },
    // Trust Badges
    trust: {
      gdpr: 'DSGVO-konform',
      secure: 'Sichere Datenverarbeitung',
      professional: 'Für Profis',
      support: '24/7 Support',
    },
    // How it works
    howItWorks: {
      title: 'Wie es funktioniert',
      subtitle: 'In vier einfachen Schritten zur vollständigen Geräteanalyse',
      step1: {
        title: 'Gerätedaten eingeben',
        description: 'IMEI, Seriennummer oder Modell eingeben',
      },
      step2: {
        title: 'Automatisierte Analyse',
        description: 'Status, Sperren und Garantien prüfen',
      },
      step3: {
        title: 'Handlungsempfehlungen',
        description: 'Rechtlich konforme Empfehlungen erhalten',
      },
      step4: {
        title: 'Service-Workflow',
        description: 'Nahtlose Übergabe in den Reparaturprozess',
      },
    },
    // Features
    features: {
      title: 'Leistungsstarke Features',
      subtitle: 'Alles was Sie für professionelles Device Management brauchen',
      analytics: {
        title: 'Device Analytics',
        description: 'Umfassende Gerätestatusanalyse mit Echtzeit-Daten',
      },
      pipeline: {
        title: 'Repair Pipeline',
        description: 'Effiziente Verwaltung von Reparaturaufträgen',
      },
      compliance: {
        title: 'Compliance-Hinweise',
        description: 'Rechtskonforme Empfehlungen und Dokumentation',
      },
      multiUser: {
        title: 'Multi-User Dashboards',
        description: 'Teamarbeit mit Rollen und Berechtigungen',
      },
    },
    // Comparison
    comparison: {
      title: 'Der Unterschied',
      without: 'Ohne JC DeviceCore Suite',
      with: 'Mit JC DeviceCore Suite',
      withoutItems: [
        'Manuelle Statusprüfungen',
        'Unklare rechtliche Situation',
        'Zeitaufwändige Dokumentation',
        'Kein Überblick über Geräte',
      ],
      withItems: [
        'Automatisierte Analyse in Sekunden',
        'Rechtskonforme Handlungsempfehlungen',
        'Vollständige Dokumentation',
        'Zentrales Device Management',
      ],
    },
    // Target audience
    targetAudience: {
      title: 'Für wen ist das?',
      workshop: {
        title: 'Werkstätten',
        description: 'Optimieren Sie Ihre Reparaturprozesse',
      },
      reseller: {
        title: 'Händler & Reseller',
        description: 'Transparente Geräteprüfung vor dem Ankauf',
      },
      enterprise: {
        title: 'Unternehmen',
        description: 'IT-Asset Management für Ihren Gerätepark',
      },
    },
    // Pricing
    pricing: {
      title: 'Transparente Preise',
      subtitle: 'Wählen Sie den Plan, der zu Ihnen passt',
      monthly: 'Monatlich',
      yearly: 'Jährlich',
      perMonth: '/ Monat',
      selectPlan: 'Plan wählen',
      popular: 'Beliebt',
      starter: {
        name: 'Starter',
        description: 'Für kleine Shops',
        price: '29',
        features: [
          'Bis zu 100 Geräte/Monat',
          '1 Benutzer',
          'Basis-Analyse',
          'E-Mail Support',
        ],
      },
      pro: {
        name: 'Pro',
        description: 'Für mittlere Unternehmen',
        price: '79',
        features: [
          'Bis zu 500 Geräte/Monat',
          '5 Benutzer',
          'Erweiterte Analyse',
          'Prioritäts-Support',
          'API Zugang',
        ],
      },
      enterprise: {
        name: 'Enterprise',
        description: 'Für große Organisationen',
        price: '199',
        features: [
          'Unbegrenzte Geräte',
          'Unbegrenzte Benutzer',
          'Vollständige Analyse',
          '24/7 Support',
          'API Zugang',
          'Dedizierter Account Manager',
        ],
      },
    },
    // Auth
    auth: {
      login: 'Anmelden',
      register: 'Registrieren',
      email: 'E-Mail',
      password: 'Passwort',
      confirmPassword: 'Passwort bestätigen',
      name: 'Name',
      company: 'Firma',
      forgotPassword: 'Passwort vergessen?',
      noAccount: 'Noch kein Konto?',
      hasAccount: 'Bereits registriert?',
      acceptTerms: 'Ich akzeptiere die AGB und Datenschutzbestimmungen',
      loginWith: 'Oder anmelden mit',
      welcomeBack: 'Willkommen zurück',
      createAccount: 'Konto erstellen',
      loginSubtitle: 'Melden Sie sich bei Ihrem Konto an',
      registerSubtitle: 'Erstellen Sie Ihr JC DeviceCore Konto',
    },
    // Dashboard
    dashboard: {
      overview: 'Übersicht',
      devices: 'Geräte',
      tickets: 'Tickets / Jobs',
      customers: 'Kunden',
      reports: 'Berichte',
      settings: 'Einstellungen',
      welcome: 'Willkommen zurück',
      totalDevices: 'Geräte gesamt',
      openTickets: 'Offene Tickets',
      todayJobs: 'Heutige Jobs',
      completedThisMonth: 'Abgeschlossen diesen Monat',
      recentActivity: 'Letzte Aktivitäten',
      quickActions: 'Schnellaktionen',
      addDevice: 'Gerät hinzufügen',
      createTicket: 'Ticket erstellen',
      newCustomer: 'Neuer Kunde',
      runAnalysis: 'Analyse starten',
    },
    // Admin
    admin: {
      userManagement: 'Benutzerverwaltung',
      workspaces: 'Arbeitsbereiche',
      systemLogs: 'System-Logs',
      billing: 'Abrechnung',
      rolesPermissions: 'Rollen & Berechtigungen',
      roles: {
        admin: 'Administrator',
        technician: 'Techniker',
        viewer: 'Betrachter',
        superAdmin: 'Super-Admin',
        owner: 'Inhaber',
      },
    },
    // Footer
    footer: {
      description: 'Professionelle Device-Lifecycle- & Service-Management-Plattform',
      product: 'Produkt',
      company: 'Unternehmen',
      legal: 'Rechtliches',
      contact: 'Kontakt',
      allRights: 'Alle Rechte vorbehalten',
    },
    // Common
    common: {
      search: 'Suchen',
      filter: 'Filtern',
      export: 'Exportieren',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      view: 'Ansehen',
      status: 'Status',
      actions: 'Aktionen',
      loading: 'Lädt...',
      success: 'Erfolg',
      error: 'Fehler',
      learnMore: 'Mehr erfahren',
    },
    // Use Cases
    useCases: {
      title: 'Use Cases',
      subtitle: 'Entdecken Sie, wie JC DeviceCore Suite Ihrem Unternehmen hilft',
      repairShops: {
        title: 'Repair Shops',
        problem: 'Werkstätten kämpfen oft mit unklaren Gerätestatusprüfungen und zeitaufwändiger Dokumentation.',
        solution: 'JC DeviceCore Suite automatisiert die Statusprüfung und gibt sofortige, rechtskonforme Empfehlungen.',
        benefits: ['50% Zeitersparnis bei Diagnosen', 'Lückenlose Dokumentation', 'Rechtliche Absicherung'],
      },
      refurbisher: {
        title: 'Refurbisher & Reseller',
        problem: 'Beim Ankauf gebrauchter Geräte ist Transparenz über den Gerätestatus entscheidend.',
        solution: 'Sofortige Analyse von Aktivierungssperren, SIM-Locks und Garantiestatus.',
        benefits: ['Risikominimierung beim Ankauf', 'Transparente Preisfindung', 'Schnellere Abwicklung'],
      },
      corporate: {
        title: 'Corporate IT / MDM',
        problem: 'IT-Abteilungen benötigen einen Überblick über alle Unternehmensgeräte.',
        solution: 'Zentrales Dashboard für das gesamte Device-Portfolio mit Statusüberwachung.',
        benefits: ['Vollständige Asset-Übersicht', 'Compliance-Dokumentation', 'Automatisierte Berichte'],
      },
    },
    // Features Page
    featuresPage: {
      title: 'Features',
      subtitle: 'Entdecken Sie alle Module von JC DeviceCore Suite',
      deviceCheck: {
        title: 'Device Check & Diagnostics',
        description: 'Umfassende Geräteanalyse mit wenigen Klicks',
        features: [
          'IMEI/Seriennummer-Validierung',
          'Aktivierungssperre-Erkennung',
          'SIM-Lock & Carrier-Status',
          'Garantie-Prüfung',
        ],
      },
      serviceWorkflows: {
        title: 'Service Workflows & Tickets',
        description: 'Effizientes Ticket-Management für Reparaturen',
        features: [
          'Automatische Ticket-Erstellung',
          'Status-Tracking in Echtzeit',
          'Kundenkommunikation',
          'Workflow-Automatisierung',
        ],
      },
      customerManagement: {
        title: 'Kunden- & Geräteverwaltung',
        description: 'Zentrale Verwaltung aller Kundenbeziehungen',
        features: [
          'Kundenprofile mit Historie',
          'Geräte-Zuordnung',
          'Kommunikations-Log',
          'Dokument-Verwaltung',
        ],
      },
      compliance: {
        title: 'Compliance & Dokumentation',
        description: 'Rechtssichere Dokumentation aller Vorgänge',
        features: [
          'Audit-Trail',
          'Export-Funktionen',
          'DSGVO-konform',
          'Revisionssichere Archivierung',
        ],
      },
    },
    // Legal Pages
    about: {
      title: 'Über JC DeviceCore Suite',
      vision: 'Unsere Vision',
      visionText: 'Wir glauben an transparente und rechtskonforme Prozesse im Device Management. JC DeviceCore Suite wurde entwickelt, um Werkstätten, Händlern und Unternehmen die Werkzeuge zu geben, die sie für professionelles Gerätemanagement benötigen.',
      mission: 'Unsere Mission',
      missionText: 'Transparenz und Rechtssicherheit in den Device-Lifecycle zu bringen. Wir bieten keine illegalen Entsperrungen an, sondern analysieren, dokumentieren und empfehlen rechtskonforme Lösungswege.',
      focus: 'Unser Fokus',
      focusText: 'Wir konzentrieren uns auf Analyse, Dokumentation und rechtskonforme Empfehlungen. Keine dubiosen Dienste, keine falschen Versprechen – nur professionelle Tools für professionelle Anwender.',
    },
    privacy: {
      title: 'Datenschutz',
      intro: 'Wir nehmen den Schutz Ihrer Daten ernst. Diese Datenschutzerklärung informiert Sie über die Verarbeitung personenbezogener Daten bei der Nutzung von JC DeviceCore Suite.',
      dataProcessing: 'Datenverarbeitung',
      dataProcessingText: 'Wir verarbeiten nur die Daten, die für die Bereitstellung unserer Dienste erforderlich sind. Gerätedaten werden ausschließlich zur Analyse und Dokumentation verwendet.',
      gdpr: 'DSGVO-Konformität',
      gdprText: 'JC DeviceCore Suite ist vollständig DSGVO-konform. Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten.',
    },
    terms: {
      title: 'Nutzungsbedingungen',
      intro: 'Diese Nutzungsbedingungen regeln die Verwendung von JC DeviceCore Suite.',
      services: 'Unsere Dienste',
      servicesText: 'JC DeviceCore Suite bietet ausschließlich Analyse-, Dokumentations- und Empfehlungsdienste. Wir bieten KEINE illegalen Entsperrungen, keine Apple- oder Carrier-Zugänge und keine Umgehung von Sicherheitsmechanismen.',
      legal: 'Rechtliche Hinweise',
      legalText: 'Die Nutzung unserer Plattform ist ausschließlich für legale Zwecke gestattet. Bei Verdacht auf gestohlene Geräte empfehlen wir die Kontaktaufnahme mit den zuständigen Behörden.',
    },
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      features: 'Features',
      useCases: 'Use Cases',
      pricing: 'Pricing',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      about: 'About',
      privacy: 'Privacy',
      terms: 'Terms',
      tryFree: 'Try Free',
      watchDemo: 'Watch Demo',
    },
    // Hero Section
    hero: {
      title: 'Transparent Device Analysis and Service Workflows for Professionals',
      subtitle: 'JC DeviceCore Suite analyzes your devices and provides legally compliant recommendations. For workshops, dealers, and IT teams.',
      cta: 'Start Free',
      demo: 'Watch Demo',
      trustedBy: 'Trusted by leading companies',
    },
    // Trust Badges
    trust: {
      gdpr: 'GDPR Compliant',
      secure: 'Secure Data Processing',
      professional: 'For Professionals',
      support: '24/7 Support',
    },
    // How it works
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Complete device analysis in four simple steps',
      step1: {
        title: 'Enter Device Data',
        description: 'Enter IMEI, serial number, or model',
      },
      step2: {
        title: 'Automated Analysis',
        description: 'Check status, locks, and warranties',
      },
      step3: {
        title: 'Recommendations',
        description: 'Receive legally compliant guidance',
      },
      step4: {
        title: 'Service Workflow',
        description: 'Seamless handover to repair process',
      },
    },
    // Features
    features: {
      title: 'Powerful Features',
      subtitle: 'Everything you need for professional device management',
      analytics: {
        title: 'Device Analytics',
        description: 'Comprehensive device status analysis with real-time data',
      },
      pipeline: {
        title: 'Repair Pipeline',
        description: 'Efficient management of repair orders',
      },
      compliance: {
        title: 'Compliance Notes',
        description: 'Legal recommendations and documentation',
      },
      multiUser: {
        title: 'Multi-User Dashboards',
        description: 'Team collaboration with roles and permissions',
      },
    },
    // Comparison
    comparison: {
      title: 'The Difference',
      without: 'Without JC DeviceCore Suite',
      with: 'With JC DeviceCore Suite',
      withoutItems: [
        'Manual status checks',
        'Unclear legal situation',
        'Time-consuming documentation',
        'No device overview',
      ],
      withItems: [
        'Automated analysis in seconds',
        'Legally compliant recommendations',
        'Complete documentation',
        'Central device management',
      ],
    },
    // Target audience
    targetAudience: {
      title: 'Who Is It For?',
      workshop: {
        title: 'Workshops',
        description: 'Optimize your repair processes',
      },
      reseller: {
        title: 'Dealers & Resellers',
        description: 'Transparent device checks before purchase',
      },
      enterprise: {
        title: 'Enterprises',
        description: 'IT asset management for your device fleet',
      },
    },
    // Pricing
    pricing: {
      title: 'Transparent Pricing',
      subtitle: 'Choose the plan that fits your needs',
      monthly: 'Monthly',
      yearly: 'Yearly',
      perMonth: '/ month',
      selectPlan: 'Select Plan',
      popular: 'Popular',
      starter: {
        name: 'Starter',
        description: 'For small shops',
        price: '29',
        features: [
          'Up to 100 devices/month',
          '1 user',
          'Basic analysis',
          'Email support',
        ],
      },
      pro: {
        name: 'Pro',
        description: 'For medium businesses',
        price: '79',
        features: [
          'Up to 500 devices/month',
          '5 users',
          'Advanced analysis',
          'Priority support',
          'API access',
        ],
      },
      enterprise: {
        name: 'Enterprise',
        description: 'For large organizations',
        price: '199',
        features: [
          'Unlimited devices',
          'Unlimited users',
          'Complete analysis',
          '24/7 support',
          'API access',
          'Dedicated account manager',
        ],
      },
    },
    // Auth
    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Name',
      company: 'Company',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      hasAccount: 'Already registered?',
      acceptTerms: 'I accept the Terms and Privacy Policy',
      loginWith: 'Or login with',
      welcomeBack: 'Welcome Back',
      createAccount: 'Create Account',
      loginSubtitle: 'Sign in to your account',
      registerSubtitle: 'Create your JC DeviceCore account',
    },
    // Dashboard
    dashboard: {
      overview: 'Overview',
      devices: 'Devices',
      tickets: 'Tickets / Jobs',
      customers: 'Customers',
      reports: 'Reports',
      settings: 'Settings',
      welcome: 'Welcome back',
      totalDevices: 'Total Devices',
      openTickets: 'Open Tickets',
      todayJobs: 'Today\'s Jobs',
      completedThisMonth: 'Completed This Month',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      addDevice: 'Add Device',
      createTicket: 'Create Ticket',
      newCustomer: 'New Customer',
      runAnalysis: 'Run Analysis',
    },
    // Admin
    admin: {
      userManagement: 'User Management',
      workspaces: 'Workspaces',
      systemLogs: 'System Logs',
      billing: 'Billing',
      rolesPermissions: 'Roles & Permissions',
      roles: {
        admin: 'Administrator',
        technician: 'Technician',
        viewer: 'Viewer',
        superAdmin: 'Super Admin',
        owner: 'Owner',
      },
    },
    // Footer
    footer: {
      description: 'Professional Device Lifecycle & Service Management Platform',
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      contact: 'Contact',
      allRights: 'All rights reserved',
    },
    // Common
    common: {
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      status: 'Status',
      actions: 'Actions',
      loading: 'Loading...',
      success: 'Success',
      error: 'Error',
      learnMore: 'Learn More',
    },
    // Use Cases
    useCases: {
      title: 'Use Cases',
      subtitle: 'Discover how JC DeviceCore Suite helps your business',
      repairShops: {
        title: 'Repair Shops',
        problem: 'Workshops often struggle with unclear device status checks and time-consuming documentation.',
        solution: 'JC DeviceCore Suite automates status checking and provides instant, legally compliant recommendations.',
        benefits: ['50% time savings on diagnostics', 'Complete documentation', 'Legal protection'],
      },
      refurbisher: {
        title: 'Refurbisher & Reseller',
        problem: 'When buying used devices, transparency about device status is crucial.',
        solution: 'Instant analysis of activation locks, SIM locks, and warranty status.',
        benefits: ['Risk minimization on purchases', 'Transparent pricing', 'Faster processing'],
      },
      corporate: {
        title: 'Corporate IT / MDM',
        problem: 'IT departments need an overview of all company devices.',
        solution: 'Central dashboard for the entire device portfolio with status monitoring.',
        benefits: ['Complete asset overview', 'Compliance documentation', 'Automated reports'],
      },
    },
    // Features Page
    featuresPage: {
      title: 'Features',
      subtitle: 'Discover all modules of JC DeviceCore Suite',
      deviceCheck: {
        title: 'Device Check & Diagnostics',
        description: 'Comprehensive device analysis with just a few clicks',
        features: [
          'IMEI/Serial number validation',
          'Activation lock detection',
          'SIM lock & carrier status',
          'Warranty check',
        ],
      },
      serviceWorkflows: {
        title: 'Service Workflows & Tickets',
        description: 'Efficient ticket management for repairs',
        features: [
          'Automatic ticket creation',
          'Real-time status tracking',
          'Customer communication',
          'Workflow automation',
        ],
      },
      customerManagement: {
        title: 'Customer & Device Management',
        description: 'Central management of all customer relationships',
        features: [
          'Customer profiles with history',
          'Device assignment',
          'Communication log',
          'Document management',
        ],
      },
      compliance: {
        title: 'Compliance & Documentation',
        description: 'Legally secure documentation of all processes',
        features: [
          'Audit trail',
          'Export functions',
          'GDPR compliant',
          'Revision-proof archiving',
        ],
      },
    },
    // Legal Pages
    about: {
      title: 'About JC DeviceCore Suite',
      vision: 'Our Vision',
      visionText: 'We believe in transparent and legally compliant processes in device management. JC DeviceCore Suite was developed to give workshops, dealers, and enterprises the tools they need for professional device management.',
      mission: 'Our Mission',
      missionText: 'Bringing transparency and legal security to the device lifecycle. We do not offer illegal unlocking services, but analyze, document, and recommend legally compliant solutions.',
      focus: 'Our Focus',
      focusText: 'We focus on analysis, documentation, and legally compliant recommendations. No dubious services, no false promises – just professional tools for professional users.',
    },
    privacy: {
      title: 'Privacy Policy',
      intro: 'We take the protection of your data seriously. This privacy policy informs you about the processing of personal data when using JC DeviceCore Suite.',
      dataProcessing: 'Data Processing',
      dataProcessingText: 'We only process data that is necessary for providing our services. Device data is used exclusively for analysis and documentation.',
      gdpr: 'GDPR Compliance',
      gdprText: 'JC DeviceCore Suite is fully GDPR compliant. You have the right to information, correction, and deletion of your data at any time.',
    },
    terms: {
      title: 'Terms of Service',
      intro: 'These terms of service govern the use of JC DeviceCore Suite.',
      services: 'Our Services',
      servicesText: 'JC DeviceCore Suite exclusively offers analysis, documentation, and recommendation services. We do NOT offer illegal unlocking, Apple or carrier access, or circumvention of security mechanisms.',
      legal: 'Legal Notice',
      legalText: 'Use of our platform is permitted only for legal purposes. In case of suspected stolen devices, we recommend contacting the relevant authorities.',
    },
  },
  
  ar: {
    // Navigation
    nav: {
      home: 'الرئيسية',
      features: 'المميزات',
      useCases: 'حالات الاستخدام',
      pricing: 'الأسعار',
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      dashboard: 'لوحة التحكم',
      about: 'من نحن',
      privacy: 'الخصوصية',
      terms: 'الشروط',
      tryFree: 'جرب مجاناً',
      watchDemo: 'شاهد العرض',
    },
    // Hero Section
    hero: {
      title: 'تحليل شفاف للأجهزة وسير عمل خدمات للمحترفين',
      subtitle: 'تقوم JC DeviceCore Suite بتحليل أجهزتك وتقديم توصيات متوافقة قانونياً. لورش العمل والتجار وفرق تقنية المعلومات.',
      cta: 'ابدأ مجاناً',
      demo: 'شاهد العرض',
      trustedBy: 'موثوق به من قبل الشركات الرائدة',
    },
    // Trust Badges
    trust: {
      gdpr: 'متوافق مع GDPR',
      secure: 'معالجة بيانات آمنة',
      professional: 'للمحترفين',
      support: 'دعم 24/7',
    },
    // How it works
    howItWorks: {
      title: 'كيف يعمل',
      subtitle: 'تحليل كامل للجهاز في أربع خطوات بسيطة',
      step1: {
        title: 'إدخال بيانات الجهاز',
        description: 'أدخل IMEI أو الرقم التسلسلي أو الطراز',
      },
      step2: {
        title: 'تحليل آلي',
        description: 'فحص الحالة والأقفال والضمانات',
      },
      step3: {
        title: 'التوصيات',
        description: 'احصل على إرشادات متوافقة قانونياً',
      },
      step4: {
        title: 'سير عمل الخدمة',
        description: 'تسليم سلس لعملية الإصلاح',
      },
    },
    // Features
    features: {
      title: 'مميزات قوية',
      subtitle: 'كل ما تحتاجه لإدارة الأجهزة الاحترافية',
      analytics: {
        title: 'تحليلات الأجهزة',
        description: 'تحليل شامل لحالة الجهاز مع بيانات في الوقت الفعلي',
      },
      pipeline: {
        title: 'خط أنابيب الإصلاح',
        description: 'إدارة فعالة لأوامر الإصلاح',
      },
      compliance: {
        title: 'ملاحظات الامتثال',
        description: 'توصيات قانونية وتوثيق',
      },
      multiUser: {
        title: 'لوحات تحكم متعددة المستخدمين',
        description: 'تعاون الفريق مع الأدوار والصلاحيات',
      },
    },
    // Comparison
    comparison: {
      title: 'الفرق',
      without: 'بدون JC DeviceCore Suite',
      with: 'مع JC DeviceCore Suite',
      withoutItems: [
        'فحوصات الحالة اليدوية',
        'وضع قانوني غير واضح',
        'توثيق يستغرق وقتاً طويلاً',
        'لا نظرة عامة على الأجهزة',
      ],
      withItems: [
        'تحليل آلي في ثوانٍ',
        'توصيات متوافقة قانونياً',
        'توثيق كامل',
        'إدارة مركزية للأجهزة',
      ],
    },
    // Target audience
    targetAudience: {
      title: 'لمن هذا؟',
      workshop: {
        title: 'ورش العمل',
        description: 'حسّن عمليات الإصلاح الخاصة بك',
      },
      reseller: {
        title: 'التجار والموزعون',
        description: 'فحص شفاف للأجهزة قبل الشراء',
      },
      enterprise: {
        title: 'المؤسسات',
        description: 'إدارة أصول تقنية المعلومات لأسطول أجهزتك',
      },
    },
    // Pricing
    pricing: {
      title: 'أسعار شفافة',
      subtitle: 'اختر الخطة التي تناسب احتياجاتك',
      monthly: 'شهري',
      yearly: 'سنوي',
      perMonth: '/ شهر',
      selectPlan: 'اختر الخطة',
      popular: 'شائع',
      starter: {
        name: 'المبتدئ',
        description: 'للمتاجر الصغيرة',
        price: '29',
        features: [
          'حتى 100 جهاز/شهر',
          'مستخدم واحد',
          'تحليل أساسي',
          'دعم بالبريد الإلكتروني',
        ],
      },
      pro: {
        name: 'برو',
        description: 'للشركات المتوسطة',
        price: '79',
        features: [
          'حتى 500 جهاز/شهر',
          '5 مستخدمين',
          'تحليل متقدم',
          'دعم ذو أولوية',
          'وصول API',
        ],
      },
      enterprise: {
        name: 'المؤسسات',
        description: 'للمنظمات الكبيرة',
        price: '199',
        features: [
          'أجهزة غير محدودة',
          'مستخدمون غير محدودين',
          'تحليل كامل',
          'دعم 24/7',
          'وصول API',
          'مدير حساب مخصص',
        ],
      },
    },
    // Auth
    auth: {
      login: 'تسجيل الدخول',
      register: 'التسجيل',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      name: 'الاسم',
      company: 'الشركة',
      forgotPassword: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟',
      hasAccount: 'لديك حساب بالفعل؟',
      acceptTerms: 'أوافق على الشروط وسياسة الخصوصية',
      loginWith: 'أو سجل الدخول باستخدام',
      welcomeBack: 'مرحباً بعودتك',
      createAccount: 'إنشاء حساب',
      loginSubtitle: 'سجل الدخول إلى حسابك',
      registerSubtitle: 'أنشئ حساب JC DeviceCore الخاص بك',
    },
    // Dashboard
    dashboard: {
      overview: 'نظرة عامة',
      devices: 'الأجهزة',
      tickets: 'التذاكر / المهام',
      customers: 'العملاء',
      reports: 'التقارير',
      settings: 'الإعدادات',
      welcome: 'مرحباً بعودتك',
      totalDevices: 'إجمالي الأجهزة',
      openTickets: 'التذاكر المفتوحة',
      todayJobs: 'مهام اليوم',
      completedThisMonth: 'المكتملة هذا الشهر',
      recentActivity: 'النشاط الأخير',
      quickActions: 'إجراءات سريعة',
      addDevice: 'إضافة جهاز',
      createTicket: 'إنشاء تذكرة',
      newCustomer: 'عميل جديد',
      runAnalysis: 'تشغيل التحليل',
    },
    // Admin
    admin: {
      userManagement: 'إدارة المستخدمين',
      workspaces: 'مساحات العمل',
      systemLogs: 'سجلات النظام',
      billing: 'الفوترة',
      rolesPermissions: 'الأدوار والصلاحيات',
      roles: {
        admin: 'مسؤول',
        technician: 'فني',
        viewer: 'مشاهد',
        superAdmin: 'المسؤول الأعلى',
        owner: 'المالك',
      },
    },
    // Footer
    footer: {
      description: 'منصة احترافية لإدارة دورة حياة الأجهزة والخدمات',
      product: 'المنتج',
      company: 'الشركة',
      legal: 'القانونية',
      contact: 'اتصل بنا',
      allRights: 'جميع الحقوق محفوظة',
    },
    // Common
    common: {
      search: 'بحث',
      filter: 'تصفية',
      export: 'تصدير',
      save: 'حفظ',
      cancel: 'إلغاء',
      delete: 'حذف',
      edit: 'تعديل',
      view: 'عرض',
      status: 'الحالة',
      actions: 'الإجراءات',
      loading: 'جاري التحميل...',
      success: 'نجاح',
      error: 'خطأ',
      learnMore: 'اعرف المزيد',
    },
    // Use Cases
    useCases: {
      title: 'حالات الاستخدام',
      subtitle: 'اكتشف كيف تساعد JC DeviceCore Suite عملك',
      repairShops: {
        title: 'ورش الإصلاح',
        problem: 'غالباً ما تعاني ورش العمل من فحوصات حالة الأجهزة غير الواضحة والتوثيق الذي يستغرق وقتاً طويلاً.',
        solution: 'تقوم JC DeviceCore Suite بأتمتة فحص الحالة وتوفر توصيات فورية ومتوافقة قانونياً.',
        benefits: ['توفير 50% من الوقت في التشخيص', 'توثيق كامل', 'حماية قانونية'],
      },
      refurbisher: {
        title: 'المجددون والموزعون',
        problem: 'عند شراء الأجهزة المستعملة، تعتبر الشفافية حول حالة الجهاز أمراً حاسماً.',
        solution: 'تحليل فوري لأقفال التنشيط وأقفال SIM وحالة الضمان.',
        benefits: ['تقليل المخاطر في عمليات الشراء', 'تسعير شفاف', 'معالجة أسرع'],
      },
      corporate: {
        title: 'تقنية المعلومات للشركات / MDM',
        problem: 'تحتاج أقسام تقنية المعلومات إلى نظرة عامة على جميع أجهزة الشركة.',
        solution: 'لوحة تحكم مركزية لمحفظة الأجهزة بالكامل مع مراقبة الحالة.',
        benefits: ['نظرة شاملة على الأصول', 'توثيق الامتثال', 'تقارير آلية'],
      },
    },
    // Features Page
    featuresPage: {
      title: 'المميزات',
      subtitle: 'اكتشف جميع وحدات JC DeviceCore Suite',
      deviceCheck: {
        title: 'فحص وتشخيص الأجهزة',
        description: 'تحليل شامل للأجهزة بنقرات قليلة',
        features: [
          'التحقق من IMEI/الرقم التسلسلي',
          'كشف قفل التنشيط',
          'حالة قفل SIM والشبكة',
          'فحص الضمان',
        ],
      },
      serviceWorkflows: {
        title: 'سير عمل الخدمة والتذاكر',
        description: 'إدارة تذاكر فعالة للإصلاحات',
        features: [
          'إنشاء تذاكر تلقائي',
          'تتبع الحالة في الوقت الفعلي',
          'التواصل مع العملاء',
          'أتمتة سير العمل',
        ],
      },
      customerManagement: {
        title: 'إدارة العملاء والأجهزة',
        description: 'إدارة مركزية لجميع علاقات العملاء',
        features: [
          'ملفات العملاء مع السجل',
          'تعيين الأجهزة',
          'سجل الاتصالات',
          'إدارة المستندات',
        ],
      },
      compliance: {
        title: 'الامتثال والتوثيق',
        description: 'توثيق آمن قانونياً لجميع العمليات',
        features: [
          'مسار التدقيق',
          'وظائف التصدير',
          'متوافق مع GDPR',
          'أرشفة مقاومة للمراجعة',
        ],
      },
    },
    // Legal Pages
    about: {
      title: 'عن JC DeviceCore Suite',
      vision: 'رؤيتنا',
      visionText: 'نؤمن بالعمليات الشفافة والمتوافقة قانونياً في إدارة الأجهزة. تم تطوير JC DeviceCore Suite لمنح ورش العمل والتجار والمؤسسات الأدوات التي يحتاجونها لإدارة الأجهزة الاحترافية.',
      mission: 'مهمتنا',
      missionText: 'جلب الشفافية والأمان القانوني لدورة حياة الأجهزة. نحن لا نقدم خدمات فتح غير قانونية، بل نحلل ونوثق ونوصي بحلول متوافقة قانونياً.',
      focus: 'تركيزنا',
      focusText: 'نركز على التحليل والتوثيق والتوصيات المتوافقة قانونياً. لا خدمات مشبوهة، لا وعود كاذبة – فقط أدوات احترافية للمستخدمين المحترفين.',
    },
    privacy: {
      title: 'سياسة الخصوصية',
      intro: 'نأخذ حماية بياناتك على محمل الجد. تُعلمك سياسة الخصوصية هذه عن معالجة البيانات الشخصية عند استخدام JC DeviceCore Suite.',
      dataProcessing: 'معالجة البيانات',
      dataProcessingText: 'نعالج فقط البيانات الضرورية لتقديم خدماتنا. تُستخدم بيانات الأجهزة حصرياً للتحليل والتوثيق.',
      gdpr: 'الامتثال لـ GDPR',
      gdprText: 'JC DeviceCore Suite متوافقة تماماً مع GDPR. لديك الحق في الحصول على المعلومات وتصحيحها وحذفها في أي وقت.',
    },
    terms: {
      title: 'شروط الخدمة',
      intro: 'تحكم شروط الخدمة هذه استخدام JC DeviceCore Suite.',
      services: 'خدماتنا',
      servicesText: 'تقدم JC DeviceCore Suite حصرياً خدمات التحليل والتوثيق والتوصيات. نحن لا نقدم فتحاً غير قانوني أو وصولاً إلى Apple أو شركات الاتصالات أو التحايل على آليات الأمان.',
      legal: 'إشعار قانوني',
      legalText: 'يُسمح باستخدام منصتنا فقط للأغراض القانونية. في حالة الاشتباه في أجهزة مسروقة، نوصي بالاتصال بالسلطات المختصة.',
    },
  },
};
