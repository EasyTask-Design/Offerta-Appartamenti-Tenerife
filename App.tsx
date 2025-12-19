
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Phone, 
  Mail,
  Zap,
  Search,
  Camera,
  ArrowDown,
  QrCode,
  CreditCard,
  StickyNote,
  Type,
  Download,
  Bot,
  Palette,
  TrendingUp,
  XCircle,
  RefreshCw,
  ShieldAlert,
  MapPin,
  FileText,
  Target
} from 'lucide-react';
import { SERVICES, RECURRING_COSTS_TABLE, TENERIFE_IMAGES, SERVICES_PRICE_LIST } from './constants';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * --- CONFIGURAZIONE TIPOGRAFICA E COLORI (Soft Contrast) ---
 * Riduzione font display come richiesto.
 */
const STYLE = {
  h1: "text-[26px] md:text-[42px] lg:text-[56px] font-black uppercase tracking-tighter leading-[1.05] not-italic",
  h2: "text-[20px] md:text-[28px] lg:text-[37px] font-black uppercase tracking-tight leading-tight not-italic",
  h3: "text-[16px] md:text-[20px] lg:text-[24px] font-bold uppercase tracking-tight not-italic",
  p: "text-[14px] md:text-[16px] lg:text-[18px] font-medium leading-[1.6] not-italic",
  
  // Soft Light Palette
  lightBg: "bg-[#F8FAFC]",
  lightTitle: "text-[#0F172A]",
  lightText: "text-[#334155]",
  lightAccent: "text-[#C2410C]",
  
  // Soft Dark Palette
  darkBg: "bg-[#0F172A]",
  darkTitle: "text-[#F1F5F9]",
  darkText: "text-[#94A3B8]",
  darkAccent: "text-[#F97316]",
};

const SLIDE_PADDING = "px-4 md:px-8 lg:px-16";

const Slide: React.FC<{ children: React.ReactNode, bgImage?: string, darkOverlay?: boolean, id: string, customBg?: string, fullWidth?: boolean, hasBeenSeen?: boolean }> = ({ children, bgImage, darkOverlay, id, customBg, fullWidth, hasBeenSeen }) => (
  <section id={id} className={`relative min-h-[100dvh] md:h-[100dvh] w-full flex items-center justify-center md:snap-start overflow-hidden border-b border-slate-200 py-16 md:pt-28 md:pb-12 ${customBg ? customBg : STYLE.lightBg} ${hasBeenSeen ? 'slide-active' : ''}`}>
    {bgImage && (
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Sfondo" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${darkOverlay ? 'bg-[#0F172A]/95' : 'bg-gradient-to-b from-transparent via-white/80 to-[#F8FAFC]'}`}></div>
      </div>
    )}
    <div className={`container mx-auto ${fullWidth ? 'max-w-none' : 'max-w-[1400px]'} ${SLIDE_PADDING} relative z-10 h-full flex flex-col justify-center`}>
      <div className="w-full stagger-container">
        {children}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visitedSlides, setVisitedSlides] = useState<Set<number>>(new Set([0]));
  const [selectedItems, setSelectedItems] = useState<string[]>(['web_advanced', 'multilang', 'branding', 'seo_ai']);
  const totalSlides = 10;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      if (index !== currentSlide) {
        setCurrentSlide(index);
        setVisitedSlides(prev => new Set(prev).add(index));
      }
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [currentSlide]);

  const toggleItem = (id: string) => {
    setSelectedItems(prev => {
      let next = [...prev];
      if (next.includes(id)) {
        next = next.filter(i => i !== id);
      } else {
        if (id === 'web_advanced') {
          next = next.filter(i => i !== 'web_template');
        } else if (id === 'web_template') {
          next = next.filter(i => i !== 'web_advanced');
        }
        next.push(id);
      }
      return next;
    });
  };

  const totalPrice = SERVICES_PRICE_LIST
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const exportToPDF = async () => {
    const element = document.getElementById('configuratore-offerta');
    if (!element) return;
    const originalStyle = element.getAttribute('style') || '';
    const scrollArea = element.querySelector('.overflow-y-auto') as HTMLElement;
    const originalScrollStyle = scrollArea ? scrollArea.getAttribute('style') || '' : '';
    element.style.maxHeight = 'none';
    element.style.height = 'auto';
    element.style.overflow = 'visible';
    if (scrollArea) {
      scrollArea.style.maxHeight = 'none';
      scrollArea.style.height = 'auto';
      scrollArea.style.overflow = 'visible';
    }
    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Preventivo_MicheleCaddeo.pdf');
    } finally {
      element.setAttribute('style', originalStyle);
      if (scrollArea) scrollArea.setAttribute('style', originalScrollStyle);
    }
  };

  const handleCall = () => { window.location.href = "tel:+393381903063"; };
  const handleEmail = () => { window.location.href = "mailto:michele.caddeo@outlook.it"; };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#F8FAFC] font-inter">
      
      {/* Header Fixed */}
      <nav className="fixed top-0 left-0 w-full h-[70px] z-[60] px-4 md:px-8 lg:px-12 flex justify-between items-center bg-white/95 backdrop-blur-md border-b border-slate-200 no-print shadow-sm">
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-2">
            <div className="h-4 w-1 bg-[#C2410C] rounded-full"></div>
            <span className={`${STYLE.lightTitle} font-black text-[14px] md:text-[16px] uppercase tracking-tight`}>
              MICHELE CADDEO
            </span>
          </div>
          <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-3.5">
            DESIGNER & MARKETING
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 px-3 py-1 rounded-[12px] border border-slate-200 text-[11px] font-black text-[#334155]">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>
      </nav>

      <div ref={containerRef} className="h-full w-full overflow-y-scroll md:snap-y md:snap-mandatory scrollbar-hide">
        
        {/* 1. HERO */}
        <Slide id="hero" customBg="bg-white" hasBeenSeen={visitedSlides.has(0)}>
          <div className="text-center max-w-5xl mx-auto">
            <div className="reveal-item inline-block px-5 py-2 bg-[#C2410C]/10 border border-[#C2410C]/20 text-[#C2410C] rounded-[12px] text-[11px] md:text-[13px] font-black uppercase tracking-[0.4em] mb-6">
              STRATEGIA DIGITALE 2025
            </div>
            <h1 className={`${STYLE.h1} ${STYLE.lightTitle} reveal-item`}>
              VALORIZZIAMO LA VOSTRA <br />
              <span className={STYLE.lightAccent}>PRESENZA A TENERIFE.</span>
            </h1>
            <p className={`${STYLE.p} ${STYLE.lightText} mt-8 max-w-3xl mx-auto reveal-item`}>
              Un sito web studiato per posizionare i vostri appartamenti come scelta principale sul mercato di Tenerife. Aumenteremo il numero di prenotazioni, applicando strategia, design e comunicazione d'impatto.
            </p>
            <div className="mt-12 opacity-30 animate-bounce no-print reveal-item">
               <ArrowDown className="text-[#C2410C] mx-auto" size={48} />
            </div>
          </div>
        </Slide>

        {/* 2. INVESTIMENTO VS SPESA - Colonne più larghe e margini corretti */}
        <Slide id="investimento" customBg={STYLE.darkBg} hasBeenSeen={visitedSlides.has(1)}>
           <div className="flex flex-col h-full justify-center">
              <div className="text-center mb-10 md:mb-16 reveal-item">
                <h2 className={STYLE.h2}>
                  <span className={STYLE.darkAccent}>INVESTIMENTO</span> <span className={STYLE.darkTitle}>VS SPESA.</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-[1400px] mx-auto w-full px-4">
                 <div className="reveal-item bg-[#F8FAFC] p-8 md:p-12 rounded-[12px] border-l-[12px] border-[#C2410C] shadow-2xl">
                    <div className="flex items-center gap-6 mb-8">
                      <TrendingUp className={STYLE.lightAccent} size={56} />
                      <h3 className={`${STYLE.h2} ${STYLE.lightTitle} !text-[24px] md:!text-[32px]`}>Strategia <br/>Professionale</h3>
                    </div>
                    <p className={`${STYLE.p} ${STYLE.lightText} mb-8 opacity-80`}>Un asset digitale che genera valore costante e protegge il brand nel tempo.</p>
                    <ul className="space-y-4">
                       {['ANALISI TARGET TENERIFE', 'DESIGN AD ALTA CONVERSIONE', 'POSIZIONAMENTO AI/SEO', 'STRATEGIA DI BRANDING'].map((li, i) => (
                         <li key={i} className="flex items-center gap-4">
                           <CheckCircle2 size={28} className={STYLE.lightAccent} />
                           <span className={`${STYLE.h3} ${STYLE.lightTitle} !text-[16px] md:!text-[20px]`}>{li}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="reveal-item bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-[12px] border-l-[12px] border-slate-700 shadow-xl">
                    <div className="flex items-center gap-6 mb-8">
                      <XCircle className="text-slate-500" size={56} />
                      <h3 className={`${STYLE.h2} ${STYLE.darkTitle} !text-[24px] md:!text-[32px]`}>Sito Vetrina <br/>Amatoriale</h3>
                    </div>
                    <p className={`${STYLE.p} ${STYLE.darkText} mb-8 opacity-60`}>Una soluzione economica che rischia di allontanare i clienti migliori.</p>
                    <ul className="space-y-4">
                       {['NESSUNA ANALISI STRATEGICA', 'DESIGN GENERICO E DATATO', 'INVISIBILE SU GOOGLE', 'GESTIONE MANUALE DIFFICOLTOSA'].map((li, i) => (
                         <li key={i} className="flex items-center gap-4">
                           <XCircle size={28} className="text-slate-500" />
                           <span className={`${STYLE.h3} ${STYLE.darkText} !text-[16px] md:!text-[20px]`}>{li}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </Slide>

        {/* 3. BRAND IDENTITY - Testi neri su bianco sporco */}
        <Slide id="branding" customBg="bg-[#F8FAFC]" hasBeenSeen={visitedSlides.has(2)}>
           <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-8">
                 <div className="reveal-item p-4 bg-[#C2410C]/10 rounded-[12px] w-fit">
                    <Palette className={STYLE.lightAccent} size={48} />
                 </div>
                 <h2 className={`${STYLE.h1} ${STYLE.lightTitle} reveal-item`}>BRAND <br/><span className={STYLE.lightAccent}>IDENTITY</span>.</h2>
                 <p className={`${STYLE.p} ${STYLE.lightText} reveal-item max-w-lg`}>Progettiamo un'identità visiva che parla di esclusività, relax e professionalità.</p>
                 
                 <div className="grid grid-cols-2 gap-4 mt-8 reveal-item">
                    {[
                      { icon: QrCode, label: "Naming & Logo", desc: "Studio marchio." },
                      { icon: Type, label: "Style Guide", desc: "Font e colori." },
                      { icon: CreditCard, label: "Business Card", desc: "Biglietti eleganti." },
                      { icon: StickyNote, label: "Welcome Pack", desc: "Grafiche ospitalità." }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-[12px] p-6 hover:border-[#C2410C] transition-all group shadow-sm">
                        <item.icon className={STYLE.lightAccent} size={32} />
                        <h4 className={`${STYLE.lightTitle} font-bold text-sm lg:text-base uppercase mt-3 mb-1`}>{item.label}</h4>
                        <p className={`${STYLE.lightText} text-xs lg:text-sm`}>{item.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="reveal-item">
                <div className="bg-white p-10 md:p-12 rounded-[12px] shadow-2xl space-y-8 relative overflow-hidden border border-slate-100">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2410C]/5 rounded-bl-full"></div>
                  <h3 className={`${STYLE.h2} ${STYLE.lightTitle}`}>Valore Percepito</h3>
                  <div className="space-y-6">
                    {[
                      { t: 'Valore Premium', d: 'Giustificare tariffe più alte rispetto ai concorrenti.' },
                      { t: 'Fidelizzazione', d: 'Creare un ricordo memorabile nel tempo.' },
                      { t: 'Differenziazione', d: 'Distinguersi istantaneamente sui portali.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-5">
                        <CheckCircle2 className={STYLE.lightAccent} size={28} />
                        <div>
                          <span className={`${STYLE.lightTitle} font-black uppercase block text-base mb-1`}>{item.t}</span>
                          <span className={`${STYLE.p} text-sm opacity-80 ${STYLE.lightText}`}>{item.d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
           </div>
        </Slide>

        {/* 4. STRUTTURA SITO - 9 Punti */}
        <Slide id="struttura-sito" customBg="bg-white" hasBeenSeen={visitedSlides.has(3)}>
           <div className="max-w-[1400px] mx-auto w-full">
              <h2 className={`${STYLE.h1} ${STYLE.lightTitle} text-center mb-12 reveal-item`}>STRUTTURA <span className={STYLE.lightAccent}>SITO WEB.</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {SERVICES[0].benefits.map((benefit, i) => (
                    <div key={i} className="reveal-item flex items-start gap-4 p-6 bg-[#F8FAFC] border border-slate-100 rounded-[12px] hover:border-[#C2410C] hover:shadow-lg transition-all group">
                       <CheckCircle2 size={28} className={`${STYLE.lightAccent} flex-shrink-0 group-hover:scale-110 transition-transform`} />
                       <span className={`${STYLE.p} text-sm md:text-base !leading-snug`}>{benefit}</span>
                    </div>
                 ))}
              </div>
           </div>
        </Slide>

        {/* 5. CALENDARIO SYNC - Overlay scuro e fix overflow */}
        <Slide id="calendario-sync" bgImage={TENERIFE_IMAGES.apartment} darkOverlay hasBeenSeen={visitedSlides.has(4)}>
           <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div className="space-y-10">
                 <div className="reveal-item p-4 bg-red-600/20 rounded-[12px] w-fit">
                    <ShieldAlert className="text-red-600" size={56} />
                 </div>
                 <h2 className={`${STYLE.h1} ${STYLE.darkTitle} reveal-item`}>RISCHIO <br/><span className="text-red-600">OVERBOOKING.</span></h2>
                 <p className={`${STYLE.p} ${STYLE.darkText} reveal-item max-w-lg`}>Gestire Airbnb e Booking manualmente è pericoloso. Le cancellazioni forzate causano penalità e recensioni negative indelebili.</p>
              </div>
              <div className="reveal-item bg-[#F8FAFC] p-8 md:p-12 rounded-[12px] shadow-2xl overflow-hidden max-w-full">
                 <div className="flex items-center gap-5 mb-8">
                    <RefreshCw className={STYLE.lightAccent} size={48} />
                    <h3 className={`${STYLE.h2} ${STYLE.lightTitle} !text-[20px] md:!text-[28px]`}>Sincronizzazione Automatica</h3>
                 </div>
                 <ul className="space-y-6">
                    {[
                      'Sincronizzazione istantanea calendari 24/7',
                      'Gestione centralizzata Airbnb/Booking',
                      'Blocco date manuale in 1 click dal telefono'
                    ].map((item, i) => (
                       <li key={i} className="flex items-start gap-4">
                          <CheckCircle2 size={24} className={STYLE.lightAccent} />
                          <span className={`${STYLE.p} text-sm md:text-base`}>{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </div>
        </Slide>

        {/* 6. SEO & AI STRATEGY */}
        <Slide id="seo-strategy" customBg="bg-white" hasBeenSeen={visitedSlides.has(5)}>
           <div className="text-center mb-16 reveal-item">
              <h2 className={STYLE.h1}>SEO <span className={STYLE.lightAccent}>& AI STRATEGY.</span></h2>
           </div>
           <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="reveal-item bg-[#F8FAFC] p-10 rounded-[12px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                 <Search className={STYLE.lightAccent} size={56} />
                 <h3 className={`${STYLE.h3} mt-6 mb-4`}>Visibilità 360°</h3>
                 <p className={`${STYLE.p} opacity-80 text-sm md:text-base`}>Ottimizziamo il sito non solo per Google, ma anche per le nuove ricerche effettuate tramite Intelligenza Artificiale (ChatGPT, Claude, Perplexity).</p>
              </div>
              <div className="reveal-item bg-[#F8FAFC] p-10 rounded-[12px] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                 <Bot className={STYLE.lightAccent} size={56} />
                 <h3 className={`${STYLE.h3} mt-6 mb-4`}>Automazione</h3>
                 <p className={`${STYLE.p} opacity-80 text-sm md:text-base`}>Assistenti intelligenti che rispondono alle domande frequenti degli ospiti su WhatsApp, riducendo drasticamente il vostro carico di lavoro manuale.</p>
              </div>
           </div>
        </Slide>

        {/* 7. SERVIZI EXTRA */}
        <Slide id="extra" customBg="bg-white" hasBeenSeen={visitedSlides.has(6)}>
           <div className="text-center mb-12 reveal-item">
              <h2 className={STYLE.h1}>SERVIZI <span className={STYLE.lightAccent}>EXTRA</span>.</h2>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {[
                 { icon: MapPin, title: "GMB Booster", desc: SERVICES_PRICE_LIST.find(i=>i.id==='gmb_booster')?.desc },
                 { icon: FileText, title: "Grafiche & Print", desc: SERVICES_PRICE_LIST.find(i=>i.id==='print_design')?.desc },
                 { icon: Camera, title: "Ritocco Foto", desc: SERVICES_PRICE_LIST.find(i=>i.id==='photo_edit')?.desc },
                 { icon: Zap, title: "Video Hero AI", desc: SERVICES_PRICE_LIST.find(i=>i.id==='video_ai')?.desc },
                 { icon: Bot, title: "Assistente AI", desc: SERVICES_PRICE_LIST.find(i=>i.id==='whatsapp_ai')?.desc },
                 { icon: Target, title: "Google Ads", desc: SERVICES_PRICE_LIST.find(i=>i.id==='marketing_ads')?.desc }
              ].map((item, i) => (
                 <div key={i} className="reveal-item p-6 md:p-10 bg-[#F8FAFC] border border-slate-100 rounded-[12px] text-center flex flex-col items-center justify-center space-y-4 border-b-[8px] border-[#C2410C]/5 hover:border-[#C2410C]/20 transition-all">
                    <item.icon className={STYLE.lightAccent} size={40} />
                    <h4 className={`${STYLE.h3} !text-[16px] md:!text-[20px]`}>{item.title}</h4>
                    <p className={`${STYLE.p} !text-[12px] md:!text-[14px] !leading-snug opacity-80`}>{item.desc}</p>
                 </div>
              ))}
           </div>
        </Slide>

        {/* 8. COSTI FISSI - Container più largo */}
        <Slide id="costi-fissi" hasBeenSeen={visitedSlides.has(7)}>
           <div className="text-center mb-10 reveal-item">
              <h2 className={STYLE.h1}>COSTI <span className={STYLE.lightAccent}>FISSI.</span></h2>
           </div>
           <div className="reveal-item bg-white border border-slate-200 rounded-[12px] overflow-hidden shadow-2xl max-w-[1300px] mx-auto w-full overflow-x-auto">
              <table className="w-full text-left min-w-[600px] md:min-w-0">
                 <thead className="bg-[#F8FAFC]">
                    <tr>
                       <th className="p-6 md:p-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400">Voce di Spesa</th>
                       <th className="p-6 md:p-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-center">Costo Immediato</th>
                       <th className="p-6 md:p-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400 text-right">Rinnovo Futuro</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    {RECURRING_COSTS_TABLE.map((cost, i) => (
                       <tr key={i} className={cost.isAlternative ? 'bg-orange-50/40' : ''}>
                          <td className="p-6 md:p-8 font-bold text-base md:text-xl">{cost.item}</td>
                          <td className="p-6 md:p-8 text-center text-lg md:text-2xl font-black">{cost.firstYear}</td>
                          <td className="p-6 md:p-8 text-right text-lg md:text-2xl font-black text-[#C2410C]">{cost.afterFirstYear}</td>
                       </tr>
                    ))}
                    <tr className="bg-[#0F172A] text-white">
                       <td className="p-8 md:p-10 font-black text-lg md:text-2xl uppercase italic tracking-tighter">TOTALE INDICATIVO</td>
                       <td className="p-8 md:p-10 text-center text-xl md:text-3xl font-black italic">€310,15</td>
                       <td className="p-8 md:p-10 text-right text-xl md:text-3xl font-black text-[#F97316] italic">€256,87/anno*</td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </Slide>

        {/* 9. PREVENTIVO - Titoli ridotti e bottoni smaller */}
        <Slide id="config-slide" fullWidth hasBeenSeen={visitedSlides.has(8)}>
          <div id="configuratore-offerta" className="reveal-item w-full bg-white p-6 md:p-10 lg:p-12 rounded-[12px] border border-slate-200 shadow-2xl flex flex-col h-[85vh] overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-[5px] mb-8 gap-6 w-full">
               <div className="flex flex-col justify-center">
                  <h2 className={`${STYLE.h2} ${STYLE.lightTitle}`}>PREVENTIVO.</h2>
                  <p className={`${STYLE.p} !text-[13px] md:!text-[16px] opacity-70`}>Personalizza la strategia per i vostri appartamenti.</p>
               </div>
               <div className="flex items-center gap-4 bg-[#C2410C] px-6 md:px-8 py-3 rounded-[12px] text-white shadow-xl w-full sm:w-auto overflow-hidden">
                  <div className="flex flex-col justify-center flex-shrink-0">
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] block opacity-80">INVESTIMENTO</span>
                    <div className="text-[20px] md:text-[32px] font-black italic leading-none">€{totalPrice}</div>
                  </div>
                  <div className="h-10 w-px bg-white/30 block mx-1"></div>
                  <button onClick={exportToPDF} className="bg-[#0F172A] ml-auto sm:ml-0 text-white px-4 md:px-6 py-2 md:py-3 rounded-[12px] flex items-center gap-2 font-black text-[10px] md:text-[12px] uppercase tracking-widest hover:scale-105 transition-all no-print shadow-lg">
                    <Download size={18} /> PDF
                  </button>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto pr-2 pb-12 custom-scrollbar">
               {SERVICES_PRICE_LIST.map((item) => (
                  <label key={item.id} className={`flex items-start gap-4 p-5 md:p-8 rounded-[12px] border-2 transition-all cursor-pointer ${selectedItems.includes(item.id) ? 'bg-[#C2410C]/5 border-[#C2410C] shadow-md' : 'bg-[#F8FAFC] border-transparent hover:bg-slate-100'}`}>
                     <input type="checkbox" className="hidden" checked={selectedItems.includes(item.id)} onChange={() => toggleItem(item.id)} />
                     <div className={`h-8 w-8 md:h-10 md:w-10 rounded-[12px] flex items-center justify-center flex-shrink-0 mt-1 shadow-sm transition-colors ${selectedItems.includes(item.id) ? 'bg-[#C2410C] text-white' : 'bg-white text-slate-300 border border-slate-200'}`}>
                        <CheckCircle2 size={20} md:size={24} />
                     </div>
                     <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start mb-2 gap-3">
                           <h4 className={`${STYLE.h3} !text-[14px] md:!text-[18px] lg:!text-[22px] leading-tight`}>{item.name}</h4>
                           <span className={`${STYLE.lightAccent} font-black text-[14px] md:text-[18px] lg:text-[22px]`}>€{item.price}</span>
                        </div>
                        <p className={`${STYLE.p} !text-[11px] md:!text-[13px] !leading-relaxed opacity-80`}>{item.desc}</p>
                     </div>
                  </label>
               ))}
            </div>
          </div>
        </Slide>

        {/* 10. CHIUSURA - Font ridotto, no BG image */}
        <Slide id="cta" customBg="bg-[#0F172A]" hasBeenSeen={visitedSlides.has(9)}>
           <div className="text-center">
              <h2 className={`${STYLE.h1} !text-[36px] md:!text-[60px] lg:!text-[80px] ${STYLE.darkTitle} mb-10 reveal-item`}>
                 IL VOSTRO <br /> <span className={STYLE.darkAccent}>SUCCESSO.</span>
              </h2>
              <p className={`${STYLE.p} ${STYLE.darkTitle} text-base md:text-xl lg:text-2xl mb-12 md:mb-16 max-w-2xl mx-auto reveal-item opacity-80`}>
                Siamo pronti a trasformare la vostra visione in un asset digitale di valore. Costruiamo insieme il futuro della vostra attività a Tenerife.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center mb-16 md:mb-20 no-print reveal-item">
                 <button onClick={handleCall} className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 bg-[#C2410C] text-white rounded-[12px] font-black text-lg md:text-xl flex items-center justify-center gap-4 shadow-2xl hover:scale-105 transition-all">
                    <Phone size={32} /> CHIAMAMI
                 </button>
                 <button onClick={handleEmail} className="w-full sm:w-auto px-10 py-5 md:px-12 md:py-6 bg-[#F1F5F9] text-[#0F172A] rounded-[12px] font-black text-lg md:text-xl flex items-center justify-center gap-4 shadow-2xl hover:scale-105 transition-all">
                    <Mail size={32} /> SCRIVIMI
                 </button>
              </div>
              <div className="max-w-4xl mx-auto pt-12 border-t border-white/10 reveal-item">
                <div className={`${STYLE.h2} ${STYLE.darkTitle} mb-3 tracking-[0.2em] text-xl md:text-3xl uppercase`}>MICHELE CADDEO</div>
                <div className={`${STYLE.p} text-sm md:text-lg ${STYLE.darkText}`}>
                  <p className="uppercase tracking-[0.3em] text-[10px] md:text-[12px] font-black mb-2 opacity-60">Designer & Marketing Manager</p>
                  <p className={`${STYLE.darkAccent} font-black text-lg md:text-2xl`}>+39 338 1903063 | michele.caddeo@outlook.it</p>
                </div>
              </div>
           </div>
        </Slide>
      </div>
    </div>
  );
};

export default App;
