import { 
  OrganizationType, 
  Module,
  ModuleCategory,
  ConfigOptionType,
  DashboardType
} from '../types';

// Mock modules voor verschillende types assistenten
export const commonModules: Module[] = [
  {
    id: 'auth-module',
    name: 'Authentication',
    description: 'Handles user authentication and authorization',
    icon: 'shield-check',
    category: ModuleCategory.Authentication,
    configOptions: [
      {
        id: 'auth-provider',
        name: 'Authentication provider',
        description: 'Choose the authentication provider to use',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'oauth2',
        options: ['oauth2', 'saml', 'ldap', 'custom']
      },
      {
        id: 'multi-factor',
        name: 'Multi-factor authentication',
        description: 'Enable multi-factor authentication',
        type: ConfigOptionType.Toggle,
        required: false,
        defaultValue: true
      }
    ],
    isRequired: true,
    defaultEnabled: true
  },
  {
    id: 'anon-layer',
    name: 'Anonymization layer',
    description: 'Ensures user data privacy and compliance',
    icon: 'eye-slash',
    category: ModuleCategory.Security,
    configOptions: [
      {
        id: 'anon-level',
        name: 'Anonymization level',
        description: 'Set the level of data anonymization',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'high',
        options: ['low', 'medium', 'high', 'complete']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  },
  {
    id: 'llm-selection',
    name: 'LLM selection',
    description: 'Choose and configure the LLM to power your assistant',
    icon: 'cpu',
    category: ModuleCategory.Integration,
    configOptions: [
      {
        id: 'llm-provider',
        name: 'LLM provider',
        description: 'Select the LLM provider',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'openai',
        options: ['openai', 'anthropic', 'google', 'mistral', 'llama']
      },
      {
        id: 'model-version',
        name: 'Model version',
        description: 'Select the model version',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'gpt-4',
        options: ['gpt-4', 'gpt-3.5-turbo', 'claude-3', 'gemini-pro', 'mistral-large']
      }
    ],
    isRequired: true,
    defaultEnabled: true
  },
  {
    id: 'hosting-location',
    name: 'Hosting location',
    description: 'Configure where your solution will be hosted',
    icon: 'server',
    category: ModuleCategory.Security,
    configOptions: [
      {
        id: 'region',
        name: 'Region',
        description: 'Select the hosting region',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'eu-west',
        options: ['eu-west', 'eu-central', 'us-east', 'us-west', 'asia-east']
      },
      {
        id: 'provider',
        name: 'Cloud provider',
        description: 'Select the cloud provider',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'azure',
        options: ['azure', 'aws', 'gcp', 'on-premise']
      }
    ],
    isRequired: true,
    defaultEnabled: true
  },
  {
    id: 'chat-widget',
    name: 'Chat widget',
    description: 'Customizable chat interface for your users',
    icon: 'message-circle',
    category: ModuleCategory.Communication,
    configOptions: [
      {
        id: 'widget-style',
        name: 'Widget style',
        description: 'Select the chat widget style',
        type: ConfigOptionType.Select,
        required: false,
        defaultValue: 'modern',
        options: ['modern', 'classic', 'minimal', 'custom']
      },
      {
        id: 'widget-position',
        name: 'Widget position',
        description: 'Select the widget position on screen',
        type: ConfigOptionType.Select,
        required: false,
        defaultValue: 'bottom-right',
        options: ['bottom-right', 'bottom-left', 'top-right', 'top-left']
      },
      {
        id: 'brand-color',
        name: 'Brand color',
        description: 'Set the primary brand color (hex)',
        type: ConfigOptionType.Text,
        required: false,
        defaultValue: '#3B82F6'
      }
    ],
    isRequired: false,
    defaultEnabled: true
  },
  {
    id: 'knowledge-base',
    name: 'Knowledge base (RAG)',
    description: 'Import and manage your knowledge sources',
    icon: 'database',
    category: ModuleCategory.Knowledge,
    configOptions: [
      {
        id: 'knowledge-sources',
        name: 'Knowledge sources',
        description: 'Select knowledge source types',
        type: ConfigOptionType.MultiSelect,
        required: false,
        defaultValue: ['documents', 'website'],
        options: ['documents', 'website', 'database', 'api', 'sharepoint']
      },
      {
        id: 'vector-store',
        name: 'Vector database',
        description: 'Select vector database for embeddings',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'pinecone',
        options: ['pinecone', 'qdrant', 'weaviate', 'redis', 'postgres']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  },
  {
    id: 'reporting-dashboard',
    name: 'Reporting dashboard',
    description: 'Analytics and insights about your assistant usage',
    icon: 'bar-chart',
    category: ModuleCategory.Reporting,
    configOptions: [
      {
        id: 'dashboard-type',
        name: 'Dashboard types',
        description: 'Select which dashboards to enable',
        type: ConfigOptionType.MultiSelect,
        required: false,
        defaultValue: ['customer', 'management'],
        options: ['customer', 'management', 'technical']
      },
      {
        id: 'update-frequency',
        name: 'Data update frequency',
        description: 'How often should dashboard data update',
        type: ConfigOptionType.Select,
        required: false,
        defaultValue: 'real-time',
        options: ['real-time', 'hourly', 'daily', 'weekly']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  }
];

// Hotel-specifieke modules
const hotelModules: Module[] = [
  ...commonModules,
  {
    id: 'booking-integration',
    name: 'Booking system integration',
    description: 'Connect to your hotel booking system',
    icon: 'calendar',
    category: ModuleCategory.Integration,
    configOptions: [
      {
        id: 'booking-provider',
        name: 'Booking system provider',
        description: 'Select your booking system',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'opera',
        options: ['opera', 'cloudbeds', 'mews', 'booking.com', 'custom']
      },
      {
        id: 'sync-frequency',
        name: 'Sync frequency',
        description: 'How often to sync with booking system',
        type: ConfigOptionType.Select,
        required: false,
        defaultValue: 'real-time',
        options: ['real-time', 'hourly', 'daily']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  },
  {
    id: 'guest-services',
    name: 'Guest services module',
    description: 'Handle guest service requests and room service',
    icon: 'bell',
    category: ModuleCategory.Communication,
    configOptions: [
      {
        id: 'service-types',
        name: 'Service Types',
        description: 'Select which services to enable',
        type: ConfigOptionType.MultiSelect,
        required: false,
        defaultValue: ['room-service', 'housekeeping', 'concierge'],
        options: ['room-service', 'housekeeping', 'concierge', 'maintenance', 'spa', 'restaurant']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  }
];

// Verhuurbedrijf-specifieke modules
const rentalModules: Module[] = [
  ...commonModules,
  {
    id: 'rental-inventory',
    name: 'Inventory management',
    description: 'Track and manage your rental inventory',
    icon: 'package',
    category: ModuleCategory.Integration,
    configOptions: [
      {
        id: 'inventory-system',
        name: 'Inventory system provider',
        description: 'Select your inventory management system',
        type: ConfigOptionType.Select,
        required: true,
        defaultValue: 'rentalworks',
        options: ['rentalworks', 'current-rms', 'rentman', 'booqable', 'custom']
      },
      {
        id: 'sync-frequency',
        name: 'Sync frequency',
        description: 'How often to sync with inventory system',
        type: ConfigOptionType.Select,
        required: false,
        defaultValue: 'real-time',
        options: ['real-time', 'hourly', 'daily']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  },
  {
    id: 'maintenance-tracking',
    name: 'Maintenance tracking',
    description: 'Track maintenance for rental items',
    icon: 'tool',
    category: ModuleCategory.Integration,
    configOptions: [
      {
        id: 'maintenance-reminders',
        name: 'Maintenance reminder settings',
        description: 'Configure maintenance reminder rules',
        type: ConfigOptionType.MultiSelect,
        required: false,
        defaultValue: ['usage-based', 'scheduled'],
        options: ['usage-based', 'scheduled', 'condition-based']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  },
  {
    id: 'booking-calendar',
    name: 'Booking calendar',
    description: 'Manage reservations and availability',
    icon: 'calendar',
    category: ModuleCategory.Communication,
    configOptions: [
      {
        id: 'calendar-view',
        name: 'Calendar view type',
        description: 'Configure default calendar view',
        type: ConfigOptionType.Select,
        required: false,
        defaultValue: 'month',
        options: ['day', 'week', 'month', 'timeline']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  }
];

// Gemeente-specifieke modules
const municipalityModules: Module[] = [
  ...commonModules,
  {
    id: 'citizen-services',
    name: 'Citizen Services',
    description: 'Handle common citizen requests and procedures',
    icon: 'users',
    category: ModuleCategory.Communication,
    configOptions: [
      {
        id: 'service-types',
        name: 'Service Categories',
        description: 'Select which service types to enable',
        type: ConfigOptionType.MultiSelect,
        required: false,
        defaultValue: ['permits', 'registration', 'waste'],
        options: ['permits', 'registration', 'waste', 'taxes', 'complaints', 'appointments']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  },
  {
    id: 'language-support',
    name: 'Language Support',
    description: 'Configure supported languages for citizen communication',
    icon: 'globe',
    category: ModuleCategory.Communication,
    configOptions: [
      {
        id: 'languages',
        name: 'Supported languages',
        description: 'Select supported languages',
        type: ConfigOptionType.MultiSelect,
        required: true,
        defaultValue: ['dutch', 'english'],
        options: ['dutch', 'english', 'german', 'french', 'turkish', 'arabic', 'polish']
      }
    ],
    isRequired: false,
    defaultEnabled: true
  }
];

// Mock data voor organisatietypes
export const organizationTypes: OrganizationType[] = [
  {
    id: 'hotel',
    name: 'Hotel',
    description: 'AI solutions for hotels to enhance guest experience and streamline daily operations.',
    icon: 'Building',
    assistants: [
      {
        id: 'hotel-concierge',
        name: 'Reception Assistant',
        nameNL: 'Receptie Assistent',
        description: 'A 24/7 reception assistant that answers guest questions, handles requests, and improves guest satisfaction',
        descriptionNL: 'Een 24/7 receptie-assistent die vragen van gasten beantwoordt, verzoeken afhandelt en de gasttevredenheid verbetert',
        image: '/images/hotel-concierge.jpg',
        benefits: [
          'Available 24/7 to answer guest questions',
          'Integrates with your booking system',
          'Handles common requests automatically',
          'Provides personalized recommendations',
          'Reduces front desk workload by up to 40%'
        ],
        benefitsNL: [
          '24/7 beschikbaar om vragen van gasten te beantwoorden',
          'Integreert met uw boekingssysteem',
          'Handelt veelvoorkomende verzoeken automatisch af',
          'Biedt gepersonaliseerde aanbevelingen',
          'Vermindert werkdruk aan de receptie met tot 40%'
        ],
        organizationTypeId: 'hotel',
        modules: hotelModules
      },
      {
        id: 'hotel-booking',
        name: 'Reservation Assistant',
        nameNL: 'Reservering Assistent',
        description: 'Streamline the booking process, upsell rooms and services, and optimize occupancy rates',
        descriptionNL: 'Stroomlijn het boekingsproces, verkoop kamers en diensten, en optimaliseer bezettingsgraden',
        image: '/images/hotel-booking.jpg',
        benefits: [
          'Integrates with your existing booking system',
          'Handles booking inquiries and modifications',
          'Intelligently upsells rooms and packages',
          'Provides instant booking confirmations',
          'Increases direct bookings by up to 25%'
        ],
        benefitsNL: [
          'Integreert met uw bestaande boekingssysteem',
          'Verwerkt boekingsaanvragen en wijzigingen',
          'Verkoopt op intelligente wijze kamers en pakketten',
          'Biedt directe boekingsbevestigingen',
          'Verhoogt directe boekingen met tot 25%'
        ],
        organizationTypeId: 'hotel',
        modules: hotelModules
      },
      {
        id: 'hotel-upsell',
        name: 'Hotel Sales Assistant',
        nameNL: 'Hotel Verkoop Assistent',
        description: 'Intelligently recommend additional services and experiences to guests before and during their stay',
        descriptionNL: 'Beveel op slimme wijze aanvullende diensten en ervaringen aan gasten aan voor en tijdens hun verblijf',
        image: '/images/hotel-upsell.jpg',
        benefits: [
          'Personalizes recommendations based on guest profiles',
          'Increases revenue per guest',
          'Promotes in-house services and local experiences',
          'Integrates with your POS and booking systems',
          'Boosts ancillary revenue by up to 35%'
        ],
        benefitsNL: [
          'Personaliseert aanbevelingen op basis van gastprofielen',
          'Verhoogt de omzet per gast',
          'Promoot interne diensten en lokale ervaringen',
          'Integreert met uw kassa- en boekingssystemen',
          'Verhoogt aanvullende inkomsten met tot 35%'
        ],
        organizationTypeId: 'hotel',
        modules: hotelModules
      }
    ]
  },
  {
    id: 'accountant',
    name: 'Accounting Firm',
    icon: 'ReceiptText',
    description: 'AI assistants for accounting firms to streamline financial administration, improve compliance, and optimize client service.',
    assistantsAvailable: 3,
    assistants: [
      {
        id: 'financial-admin',
        name: 'Financial Administration Assistant',
        nameNL: 'Financiële Administratie Assistent',
        description: 'Streamlines financial document processing, bookkeeping, and compliance reporting',
        descriptionNL: 'Stroomlijnt verwerking van financiële documenten, boekhouding en compliance rapportage',
        image: '/images/assistants/financial-admin.jpg',
        organizationTypeId: 'accountant',
        benefits: [
          'Automated document processing and data extraction',
          'Streamlined bookkeeping and reconciliation',
          'Enhanced compliance reporting',
          'Reduced manual errors by up to 95%',
          'Saves up to 15 hours per week on administrative tasks'
        ],
        benefitsNL: [
          'Geautomatiseerde documentverwerking en data-extractie',
          'Gestroomlijnde boekhouding en reconciliatie',
          'Verbeterde compliance rapportage',
          'Tot 95% minder handmatige fouten',
          'Bespaart tot 15 uur per week aan administratieve taken'
        ],
        modules: commonModules
      },
      {
        id: 'tax-advisor',
        name: 'Tax Advisory Assistant',
        nameNL: 'Belastingadvies Assistent',
        description: 'Provides tax optimization strategies and keeps track of regulatory changes',
        descriptionNL: 'Biedt strategieën voor belastingoptimalisatie en houdt regulatorische wijzigingen bij',
        image: '/images/assistants/tax-advisor.jpg',
        organizationTypeId: 'accountant',
        benefits: [
          'Proactive tax planning and optimization',
          'Real-time regulatory compliance monitoring',
          'Custom tax advice for clients',
          'Up to 30% reduction in tax preparation time',
          'Enhanced accuracy in tax filings'
        ],
        benefitsNL: [
          'Proactieve belastingplanning en optimalisatie',
          'Real-time monitoring van regelgeving',
          'Gepersonaliseerd belastingadvies voor klanten',
          'Tot 30% tijdsbesparing bij belastingaangiftes',
          'Verbeterde nauwkeurigheid in belastingaangiftes'
        ],
        modules: commonModules
      },
      {
        id: 'financial-analyst',
        name: 'Financial Analysis Assistant',
        nameNL: 'Financiële Analyse Assistent',
        description: 'Analyzes financial data to provide insights and forecasts for client businesses',
        descriptionNL: 'Analyseert financiële gegevens om inzichten en prognoses te bieden voor klantbedrijven',
        image: '/images/assistants/financial-analyst.jpg',
        organizationTypeId: 'accountant',
        benefits: [
          'Automated financial reporting and analysis',
          'Predictive cash flow forecasting',
          'Business performance benchmarking',
          'Custom financial health dashboards',
          'Strategic growth recommendations'
        ],
        benefitsNL: [
          'Geautomatiseerde financiële rapportage en analyse',
          'Voorspellende cashflow-prognoses',
          'Benchmarking van bedrijfsprestaties',
          'Aangepaste dashboards voor financiële gezondheid',
          'Strategische groei-aanbevelingen'
        ],
        modules: commonModules
      }
    ],
    benefits: [
      'Automated accounting processes',
      'Improved accuracy in reporting',
      'Time savings on routine tasks',
      'Proactive client advisory',
      'Enhanced compliance and risk management'
    ],
    benefitsNL: [
      'Geautomatiseerde boekhoudprocessen',
      'Verbeterde nauwkeurigheid in rapportages',
      'Tijdsbesparing op routinetaken',
      'Proactief klantadvies',
      'Verhoogde compliance en risicobeheer'
    ],
    useCases: [
      'Automatic processing of financial documents',
      'Tax filing preparation and verification',
      'Financial reporting and analysis',
      'Client advisory based on real-time data',
      'Compliance monitoring and oversight'
    ],
    useCasesNL: [
      'Automatische verwerking van financiële documenten',
      'Belastingaangifte voorbereiding en controle',
      'Financiële rapportage en analyse',
      'Klantadvies op basis van actuele data',
      'Compliance monitoring en -bewaking'
    ]
  },
  {
    id: 'rental',
    name: 'Rental Company',
    description: 'AI solutions for rental companies to optimize inventory management, streamline reservations and enhance customer service.',
    icon: 'Package',
    assistants: [
      {
        id: 'rental-reservation',
        name: 'Reservation Assistant',
        nameNL: 'Reservering Assistent',
        description: 'Manage reservations, check availability, and streamline the booking process',
        descriptionNL: 'Beheer reserveringen, controleer beschikbaarheid en stroomlijn het boekingsproces',
        image: '/images/rental-reservation.jpg',
        benefits: [
          'Handles online reservations 24/7',
          'Checks real-time inventory availability',
          'Manages booking modifications and cancellations',
          'Sends automated confirmation and reminder notifications',
          'Increases booking efficiency by up to 35%'
        ],
        benefitsNL: [
          'Verwerkt online reserveringen 24/7',
          'Controleert real-time inventarisbeschikbaarheid',
          'Beheert wijzigingen en annuleringen van boekingen',
          'Verstuurt geautomatiseerde bevestigingen en herinneringen',
          'Verhoogt boekingsefficiëntie met tot 35%'
        ],
        organizationTypeId: 'rental',
        modules: rentalModules
      },
      {
        id: 'rental-inventory',
        name: 'Inventory Management Assistant',
        nameNL: 'Inventarisbeheer Assistent',
        description: 'Track inventory, manage maintenance schedules, and ensure equipment availability',
        descriptionNL: 'Volg inventaris, beheer onderhoudsschema\'s en waarborg beschikbaarheid van apparatuur',
        image: '/images/rental-inventory.jpg',
        benefits: [
          'Real-time inventory tracking across locations',
          'Automated maintenance scheduling based on usage',
          'Early warning system for stock shortages',
          'Detailed usage reports and analytics',
          'Reduces inventory downtime by up to 25%'
        ],
        benefitsNL: [
          'Real-time inventarisatie op verschillende locaties',
          'Geautomatiseerde onderhoudsplanning op basis van gebruik',
          'Vroegtijdig waarschuwingssysteem voor voorraadtekorten',
          'Gedetailleerde gebruiksrapporten en analyses',
          'Vermindert inventaris uitvaltijd met tot 25%'
        ],
        organizationTypeId: 'rental',
        modules: rentalModules
      },
      {
        id: 'rental-customer',
        name: 'Customer Service Assistant',
        nameNL: 'Klantenservice Assistent',
        description: 'Provide responsive customer support, handle inquiries, and offer usage guidance',
        descriptionNL: 'Bied responsieve klantenondersteuning, behandel vragen en geef gebruiksinstructies',
        image: '/images/rental-customer.jpg',
        benefits: [
          'Answers common customer questions 24/7',
          'Provides equipment usage instructions and troubleshooting',
          'Handles return procedures and extension requests',
          'Collects customer feedback and satisfaction ratings',
          'Improves customer satisfaction scores by up to 40%'
        ],
        benefitsNL: [
          'Beantwoordt veelgestelde klantvragen 24/7',
          'Biedt gebruiksinstructies en probleemoplossing voor apparatuur',
          'Behandelt retourprocedures en verlengingsverzoeken',
          'Verzamelt klantfeedback en tevredenheidsbeoordelingen',
          'Verbetert klanttevredenheidsscores met tot 40%'
        ],
        organizationTypeId: 'rental',
        modules: rentalModules
      }
    ],
    benefits: [
      'Increased operational efficiency with automated inventory management',
      'Enhanced customer experience through 24/7 service availability',
      'Reduced administrative workload for staff',
      'Improved equipment utilization and maintenance',
      'Real-time insights into business performance'
    ],
    benefitsNL: [
      'Verhoogde operationele efficiëntie met geautomatiseerd inventarisbeheer',
      'Verbeterde klantervaring door 24/7 servicebeschikbaarheid',
      'Verminderde administratieve werklast voor medewerkers',
      'Verbeterde apparatuurbenutting en -onderhoud',
      'Real-time inzicht in bedrijfsprestaties'
    ],
    useCases: [
      'Equipment reservation and availability management',
      'Automated maintenance scheduling and tracking',
      'Customer support and self-service options',
      'Inventory optimization and utilization analysis',
      'Streamlined check-out and return processes'
    ],
    useCasesNL: [
      'Apparatuurreservering en beschikbaarheidsbeheer',
      'Geautomatiseerde onderhoudsplanning en -tracking',
      'Klantenondersteuning en self-service opties',
      'Inventarisoptimalisatie en gebruiksanalyse',
      'Gestroomlijnde uitgifte- en retourprocessen'
    ]
  },
  {
    id: 'legal',
    name: 'Law Firm',
    description: 'AI assistants for law firms to automate document processing and enhance client service.',
    icon: 'Scale',
    assistants: [
      {
        id: 'legal-intake',
        name: 'Legal Intake Assistant',
        nameNL: 'Juridische Intake Assistent',
        description: 'Streamline the client intake process, gather relevant information, and schedule appointments',
        descriptionNL: 'Stroomlijn het klantintakeproces, verzamel relevante informatie en plan afspraken',
        image: '/images/legal-intake.jpg',
        benefits: [
          'Available 24/7 for initial client inquiries',
          'Gathers relevant case information securely',
          'Schedules appointments with appropriate attorneys',
          'Reduces administrative workload by up to 35%',
          'Improves client experience from first contact'
        ],
        benefitsNL: [
          '24/7 beschikbaar voor eerste klantvragen',
          'Verzamelt relevante zaakgegevens op veilige wijze',
          'Plant afspraken met geschikte advocaten',
          'Vermindert administratieve werklast met tot 35%',
          'Verbetert klantervaring vanaf het eerste contact'
        ],
        organizationTypeId: 'legal',
        modules: commonModules
      }
    ]
  },
  {
    id: 'healthcare',
    name: 'General Practice',
    description: 'AI assistants for general practitioners to enhance patient care and optimize administrative workflows.',
    icon: 'Stethoscope',
    assistants: [
      {
        id: 'clinical-support',
        name: 'Medical Support Assistant',
        nameNL: 'Medische Ondersteunings Assistent',
        description: 'Assists healthcare providers with clinical decision support, medical reference, and documentation',
        descriptionNL: 'Ondersteunt zorgverleners met klinische besluitvorming, medische referentie en documentatie',
        image: '/images/healthcare-clinical.jpg',
        organizationTypeId: 'healthcare',
        benefits: [
          'Access to evidence-based clinical guidelines',
          'Streamlined documentation and note-taking',
          'Quick medical reference and drug information',
          'Patient care plan suggestions',
          'Integration with electronic health records'
        ],
        benefitsNL: [
          'Toegang tot evidence-based klinische richtlijnen',
          'Gestroomlijnde documentatie en notities',
          'Snelle medische referentie en medicatie-informatie',
          'Suggesties voor patiëntenzorgplannen',
          'Integratie met elektronische patiëntendossiers'
        ],
        modules: [
          // Clinical Knowledge modules
          {
            id: 'medical-knowledge-base',
            name: 'Medical knowledge base',
            description: 'Comprehensive medical reference system with up-to-date clinical guidelines',
            icon: 'Database',
            category: 'Knowledge',
            isRequired: true,
            defaultEnabled: true,
            configOptions: []
          },
          {
            id: 'ehr-integration',
            name: 'EHR integration',
            description: 'Connect to your electronic health record system',
            icon: 'FileText',
            category: 'Integration',
            isRequired: false,
            defaultEnabled: true,
            configOptions: []
          },
          {
            id: 'voice-transcription',
            name: 'Voice transcription',
            description: 'Transcribe clinical notes and patient encounters',
            icon: 'Mic',
            category: 'Communication',
            isRequired: false,
            defaultEnabled: true,
            configOptions: []
          }
        ]
      },
      {
        id: 'patient-engagement',
        name: 'Patient Communication Assistant',
        nameNL: 'Patiënt Communicatie Assistent',
        description: 'Enhances patient communication, education, and follow-up to improve care outcomes',
        descriptionNL: 'Verbetert patiëntcommunicatie, voorlichting en follow-up om zorgresultaten te verbeteren',
        image: '/images/healthcare-patient.jpg',
        organizationTypeId: 'healthcare',
        benefits: [
          'Automated appointment reminders',
          'Personalized patient education materials',
          'Medication adherence monitoring',
          'Post-discharge follow-up',
          'Patient satisfaction surveys'
        ],
        benefitsNL: [
          'Geautomatiseerde afspraakherinneringen',
          'Gepersonaliseerde patiëntvoorlichtingsmaterialen',
          'Monitoring van medicatietrouw',
          'Follow-up na ontslag',
          'Patiënttevredenheidsonderzoeken'
        ],
        modules: [
          // Patient Communication modules
          {
            id: 'appointment-reminders',
            name: 'Appointment management',
            description: 'Send automated reminders and manage scheduling',
            icon: 'Calendar',
            category: 'Communication',
            isRequired: true,
            defaultEnabled: true,
            configOptions: []
          },
          {
            id: 'patient-education',
            name: 'Patient education',
            description: 'Deliver personalized health information to patients',
            icon: 'BookOpen',
            category: 'Knowledge',
            isRequired: false,
            defaultEnabled: true,
            configOptions: []
          },
          {
            id: 'satisfaction-surveys',
            name: 'Patient feedback',
            description: 'Collect and analyze patient experience data',
            icon: 'BarChart',
            category: 'Reporting',
            isRequired: false,
            defaultEnabled: true,
            configOptions: []
          }
        ]
      }
    ]
  },
  {
    id: 'municipality',
    name: 'Municipality',
    description: 'AI solutions for municipalities to improve citizen services and streamline administrative processes.',
    icon: 'Landmark',
    assistants: [
      {
        id: 'citizen-assistant',
        name: 'Citizen Information Assistant',
        nameNL: 'Burger Informatie Assistent',
        description: 'Help citizens navigate municipal services, answer questions, and guide through procedures',
        descriptionNL: 'Help burgers bij het navigeren door gemeentelijke diensten, beantwoord vragen en begeleid door procedures',
        image: '/images/citizen-assistant.jpg',
        benefits: [
          'Available 24/7 to answer citizen questions',
          'Guides citizens through common procedures',
          'Reduces call center volume by up to 45%',
          'Supports multiple languages',
          'Increases citizen satisfaction scores'
        ],
        benefitsNL: [
          '24/7 beschikbaar om vragen van burgers te beantwoorden',
          'Begeleidt burgers door veelvoorkomende procedures',
          'Vermindert callcentervolume met tot 45%',
          'Ondersteunt meerdere talen',
          'Verhoogt tevredenheidsscores van burgers'
        ],
        organizationTypeId: 'municipality',
        modules: municipalityModules
      },
      {
        id: 'permit-assistant',
        name: 'Permit Processing Assistant',
        nameNL: 'Vergunning Verwerkings Assistent',
        description: 'Guide citizens through permit applications, reducing errors and processing time',
        descriptionNL: 'Begeleid burgers bij vergunningsaanvragen, verminder fouten en verwerkingstijd',
        image: '/images/permit-assistant.jpg',
        benefits: [
          'Streamlines the permit application process',
          'Reduces application errors by up to 60%',
          'Shortens processing times',
          'Provides status updates automatically',
          'Improves transparency and compliance'
        ],
        benefitsNL: [
          'Stroomlijnt het vergunningsaanvraagproces',
          'Vermindert aanvraagfouten met tot 60%',
          'Verkort verwerkingstijden',
          'Biedt automatisch statusupdates',
          'Verbetert transparantie en naleving'
        ],
        organizationTypeId: 'municipality',
        modules: municipalityModules
      }
    ]
  }
];

// Mock dashboard data
export const dashboardData = {
  [DashboardType.Customer]: {
    metrics: [
      { id: 'total-interactions', name: 'Total interactions', value: 12453, unit: '', change: 8.5, trend: 'up' },
      { id: 'avg-satisfaction', name: 'Avg. satisfaction', value: 4.7, unit: '/5', change: 0.3, trend: 'up' },
      { id: 'resolution-rate', name: 'Resolution rate', value: 92, unit: '%', change: 3, trend: 'up' },
      { id: 'avg-response-time', name: 'Avg. response time', value: 8, unit: 'sec', change: -2, trend: 'down' }
    ]
  },
  [DashboardType.Management]: {
    metrics: [
      { id: 'cost-savings', name: 'Est. cost savings', value: 125000, unit: '€', change: 15, trend: 'up' },
      { id: 'labor-hours-saved', name: 'Labor hours saved', value: 1250, unit: 'hrs', change: 10, trend: 'up' },
      { id: 'conversion-rate', name: 'Conversion rate', value: 23, unit: '%', change: 4, trend: 'up' },
      { id: 'roi', name: 'ROI', value: 310, unit: '%', change: 25, trend: 'up' }
    ]
  },
  [DashboardType.Technical]: {
    metrics: [
      { id: 'uptime', name: 'Uptime', value: 99.98, unit: '%', change: 0.01, trend: 'up' },
      { id: 'avg-latency', name: 'Avg. latency', value: 120, unit: 'ms', change: -15, trend: 'down' },
      { id: 'error-rate', name: 'Error rate', value: 0.05, unit: '%', change: -0.02, trend: 'down' },
      { id: 'token-usage', name: 'Token usage', value: 24.5, unit: 'M', change: 2.3, trend: 'up' }
    ]
  }
}; 