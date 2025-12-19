
import { ServiceItem } from './types';

export const TENERIFE_IMAGES = {
  coast: "https://images.unsplash.com/photo-1585257000411-9686419741e5?auto=format&fit=crop&q=80&w=2000",
  apartment: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000",
  nature: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000",
  sunset: "https://images.unsplash.com/photo-1543857508-3642337f766e?auto=format&fit=crop&q=80&w=2000",
  aerial: "https://images.unsplash.com/photo-1512753360424-7ef826978168?auto=format&fit=crop&q=80&w=2000"
};

export const SERVICES_PRICE_LIST = [
  { id: 'web_advanced', name: 'Sito Web Moderno (Avanzato)', price: 1600, desc: 'Sito ad alto impatto, completamente personalizzato, con animazioni fluide e architettura avanzata.' },
  { id: 'web_template', name: 'Sito Web Template Base', price: 1200, desc: 'Soluzione essenziale basata su template professionale, veloce ed efficace.' },
  { id: 'multilang', name: 'Sistema Multilingua (IT, EN, ES)', price: 300, desc: 'Gestione professionale delle traduzioni (tramite sistema multilingua WPML).' },
  { id: 'branding', name: 'Identità di Marca Completa', price: 600, desc: 'Logo, stile visivo, palette colori e grafiche coordinate.' },
  { id: 'seo_ai', name: 'Posizionamento (SEO AI)', price: 400, desc: 'Farsi trovare su Google e sui motori basati su Intelligenza Artificiale.' },
  { id: 'gmb_booster', name: 'GMB & Review Booster', price: 350, desc: 'Setup Google My Business e sistema QR/WhatsApp per scalare i ranking con le recensioni.' },
  { id: 'print_design', name: 'Grafiche Volantini & Stickers', price: 350, desc: 'Design professionale per flyer plastificati e adesivi per camere e territorio.' },
  { id: 'support_2yr', name: 'Supporto Sito (2 Anni)', price: 600, desc: 'Aggiornamenti sicurezza, plugin e assistenza per modifiche testi/foto (300€/anno).' },
  { id: 'photo_edit', name: 'Ritocco Foto e Grafiche', price: 200, desc: 'Miglioramento colori e testi informativi sovrimpressi sulle vostre immagini.' },
  { id: 'video_ai', name: 'Video Emozionale AI', price: 200, desc: 'Video cinematico creato con intelligenza artificiale per l\'accoglienza nel sito.' },
  { id: 'whatsapp_ai', name: 'Assistente WhatsApp (AI)', price: 450, desc: 'Un risponditore intelligente che conosce ogni dettaglio dei vostri appartamenti.' },
  { id: 'marketing_ads', name: 'Campagne Pubblicitarie Google Ads', price: 400, desc: 'Pubblicità mirata su Google e YouTube per iniziare subito a ricevere contatti.' }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Sito Web Professionale',
    description: 'Sito web di alto livello, fluido e adattabile (funziona perfettamente su smartphone) e tradotto in 3 lingue.',
    price: '€1.600',
    category: 'core',
    icon: 'Globe',
    benefits: [
      'Gestione di 2 appartamenti distinti in un unico ecosistema',
      'Trilinguismo professionale (Italiano, Inglese, Spagnolo)',
      'FAQ: Distanza mare, supermarket, trasporti e servizi',
      'Regole casa chiare: cucina, fumo, animali domestici',
      'Interfaccia focalizzata su WhatsApp/Email (Zero Commissioni)',
      'Design Responsive (ottimizzato al 100% per cellulari)',
      'Copywriting persuasivo multilingua ad alto impatto',
      'Integrazione mappe interattive e punti di interesse',
      'Sistema di prenotazione diretta senza intermediari'
    ]
  }
];

export const RECURRING_COSTS_TABLE = [
  { item: 'Piano Hosting Premium (24 Mesi)', firstYear: '€74,16', afterFirstYear: '€9,99/mese', isAlternative: false },
  { item: 'Registrazione Dominio .com (2 Anni)', firstYear: '€16,99', afterFirstYear: '€16,99/anno', isAlternative: false },
  { item: 'Licenza WPML (Traduzioni)', firstYear: '€99,00', afterFirstYear: 'Una Tantum*', isAlternative: false },
  { item: 'Channel Manager (Opzionale)', firstYear: '€120,00', afterFirstYear: '€120,00/anno', isAlternative: false }
];
