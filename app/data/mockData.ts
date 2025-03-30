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