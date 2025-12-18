
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
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
  Newspaper,
  TrendingUp,
  AlertTriangle,
  XCircle,
  RefreshCw,
  ShieldAlert,
  MapPin,
  FileText
} from 'lucide-react';
import { SERVICES, RECURRING_COSTS_TABLE, TENERIFE_IMAGES, SERVICES_PRICE_LIST } from './constants';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import AINamingTool from './components/AINamingTool';

const Slide: React.FC<{ children: React.ReactNode, bgImage?: string, darkOverlay?: boolean, id: string, customBg?: string }> = ({ children, bgImage, darkOverlay, id, customBg }) => (
  <section id={id} className={`relative h-[100dvh] w-full flex items-center justify-center snap-start overflow-hidden border-b border-slate-200 ${customBg ? customBg : ''}`}>
    {bgImage && (
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="Sfondo" className="w-full h-full object-cover" />
        <div className={`absolute inset-0 ${darkOverlay ? 'bg-white/85' : 'bg-gradient-to-b from-transparent via-white/40 to-white'}`}></div>
      </div>
    )}
    <div className="container mx-auto px-4 md:px-12 relative z-10 h-full flex items-center justify-center">
      <div className="w-full flex flex-col items-center max-h-full overflow-hidden py-6 md:py-0">
        {children}
      </div>
    </div>
  </section>
);

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedItems, setSelectedItems] = useState<string[]>(['web_base']);
  const totalSlides = 11;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const index = Math.round(container.scrollTop / window.innerHeight);
      setCurrentSlide(index);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const goToSlide = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const totalPrice = SERVICES_PRICE_LIST
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const exportToPDF = async () => {
    const element = document.getElementById('configuratore-offerta');
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Offerta_Tenerife_Michele_Caddeo.pdf');
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-slate-50 text-slate-950 font-inter">
      
      {/* Header */}
      <nav className="fixed top-0 left-0 w-full h-[60px] z-[60] px-4 md:px-12 flex justify-between items-center bg-white border-b border-slate-200 no-print">
        <div className="flex items-center gap-3">
          <div className="h-4 w-1 bg-accent rounded-[12px]"></div>
          <span className="text-slate-950 font-bold text-[10px] md:text-xs tracking-[0.15em] uppercase truncate">
            MICHELE CADDEO <span className="text-accent mx-1">|</span> DESIGN
          </span>
        </div>
        <div className="bg-slate-100 px-3 py-1 rounded-[12px] border border-slate-200 text-[10px] md:text-xs font-black text-slate-950">
          {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </div>
      </nav>

      {/* Slide Container */}
      <div ref={containerRef} className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide">
        
        {/* Slide 1: Hero */}
        <Slide id="hero" customBg="bg-white">
          <div className="max-w-5xl text-center mx-auto fade-in-element px-4">
            <div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 text-accent rounded-[12px] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-6">
              STRATEGIA DIGITALE 2025
            </div>
            <h1 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tighter text-slate-950 uppercase">
              Valorizziamo la vostra <br className="hidden md:block"/>
              <span className="text-accent">presenza a Tenerife.</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-800 mb-8 max-w-2xl mx-auto leading-relaxed font-bold">
              Un ecosistema digitale studiato per posizionare i vostri appartamenti come scelta d'élite.
            </p>
            <div className="flex flex-col items-center gap-4 opacity-40 no-print animate-bounce">
               <ArrowDown className="text-accent" size={24} />
            </div>
          </div>
        </Slide>

        {/* Slide 2: Identità */}
        <Slide id="branding" bgImage={TENERIFE_IMAGES.nature} darkOverlay>
           <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full max-w-6xl overflow-y-auto md:overflow-hidden scrollbar-hide py-10 md:py-0">
              <div className="space-y-6">
                 <div className="p-3 bg-accent/20 rounded-[12px] w-fit shadow-md">
                    <Palette className="text-accent" size={32} />
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-slate-950">Brand <br/><span className="text-accent">Identity</span>.</h2>
                 <p className="text-lg md:text-xl text-slate-900 leading-relaxed font-bold">
                    Logo e immagine coordinata per trasmettere qualità immediata.
                 </p>
                 <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-[12px] border border-slate-200 shadow-sm">
                       <CheckCircle2 className="text-accent flex-shrink-0" size={20} />
                       <span className="text-lg font-bold text-slate-900">Naming e Logo Professionale</span>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white rounded-[12px] border border-slate-200 shadow-sm">
                       <CheckCircle2 className="text-accent flex-shrink-0" size={20} />
                       <span className="text-lg font-bold text-slate-900">Coordinato Cartaceo & Digitale</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                 {[
                   { icon: QrCode, label: "QR Code", desc: "Flyer e Camere" },
                   { icon: CreditCard, label: "Contatti", desc: "Biglietti visita" },
                   { icon: StickyNote, label: "Stickers", desc: "Presenza fisica" },
                   { icon: Type, label: "Immagine", desc: "Stile Coerente" }
                 ].map((box, i) => (
                   <div key={i} className="aspect-square bg-white rounded-[12px] border border-slate-200 flex flex-col items-center justify-center gap-1.5 text-center p-3 shadow-md">
                      <box.icon className="text-accent mb-1" size={32} />
                      <span className="text-sm font-black uppercase text-slate-950">{box.label}</span>
                      <span className="text-[10px] text-slate-700 font-bold uppercase">{box.desc}</span>
                   </div>
                 ))}
              </div>
           </div>
        </Slide>

        {/* Slide 3: AI Branding Tool */}
        <Slide id="ai-tool" customBg="bg-slate-900">
           <div className="w-full max-w-4xl px-4">
              <AINamingTool />
           </div>
        </Slide>

        {/* Slide 4: Il Sito Web */}
        <Slide id="web-pro" customBg="bg-white">
           <div className="max-w-6xl w-full py-10 overflow-y-auto scrollbar-hide px-4">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-slate-950 text-center">Struttura <span className="text-accent">Sito Web</span>.</h2>
              <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3">
                 {SERVICES[0].benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-5 bg-slate-50 border border-slate-200 rounded-[12px] shadow-sm hover:border-accent transition-all group">
                       <CheckCircle2 size={24} className="text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                       <span className="text-base md:text-xl font-bold text-slate-900 leading-snug">{benefit}</span>
                    </div>
                 ))}
              </div>
              <div className="mt-8 p-6 bg-accent/5 rounded-[12px] border border-accent/10 text-center">
                 <p className="text-slate-700 font-bold text-base md:text-lg italic">
                    Un unico portale professionale che valorizza entrambi gli appartamenti, riducendo le commissioni di Booking e Airbnb.
                 </p>
              </div>
           </div>
        </Slide>

        {/* Slide 5: Calendario & Sync */}
        <Slide id="calendar-sync" bgImage={TENERIFE_IMAGES.nature} darkOverlay>
           <div className="max-w-6xl w-full py-10 px-4 overflow-y-auto scrollbar-hide">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                 <div className="md:w-1/2 space-y-6">
                    <div className="p-3 bg-red-100 rounded-[12px] w-fit">
                       <ShieldAlert className="text-red-600" size={32} />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-slate-950">Il Pericolo <br/><span className="text-red-600">Overbooking</span>.</h2>
                    <p className="text-lg md:text-xl text-slate-900 font-bold leading-relaxed">
                       La gestione manuale dei calendari tra Booking.com, Airbnb e il sito proprietario è un rischio elevatissimo per il vostro brand.
                    </p>
                    <div className="p-6 bg-red-50 border-l-8 border-red-500 rounded-r-[12px]">
                       <h4 className="font-black text-red-900 uppercase text-sm mb-2">AUTOGOL D'IMMAGINE</h4>
                       <p className="text-red-800 text-sm font-bold">Cancellare una vacanza a un cliente perché il calendario non era aggiornato distrugge la fiducia e causa recensioni negative permanenti.</p>
                    </div>
                 </div>
                 <div className="md:w-1/2 space-y-4">
                    <div className="bg-white p-6 rounded-[12px] border border-slate-300 shadow-xl">
                       <div className="flex items-center gap-3 mb-4">
                          <RefreshCw className="text-accent animate-spin-slow" size={24} />
                          <h3 className="text-xl font-black text-slate-950 uppercase">Sincronizzazione reale</h3>
                       </div>
                       <p className="text-slate-800 text-base font-bold mb-4">
                          Consiglio un sistema automatizzato (Channel Manager) per evitare errori umani e risparmiare ore di lavoro manuale ogni settimana.
                       </p>
                       <ul className="space-y-3">
                          <li className="flex items-start gap-2 text-sm font-bold text-slate-900">
                             <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-1" />
                             <span>Sincronizzazione istantanea 24/7.</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm font-bold text-slate-900">
                             <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-1" />
                             <span>Nessun rischio di prenotazioni doppie.</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm font-bold text-slate-900">
                             <CheckCircle2 size={16} className="text-accent flex-shrink-0 mt-1" />
                             <span>Privacy garantita: date bloccate giustificabili come "manutenzione" o "uso familiare".</span>
                          </li>
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        </Slide>

        {/* Slide 6: SEO & AI Evolution */}
        <Slide id="seo-ai" customBg="bg-white">
           <div className="max-w-6xl w-full py-10 px-4 overflow-y-auto scrollbar-hide">
              <div className="text-center mb-10">
                 <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase text-slate-950">SEO <span className="text-accent">& AI Strategy</span>.</h2>
                 <p className="text-lg md:text-2xl text-slate-700 font-bold">Non solo Google: posizioniamoci dove le persone "domandano".</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-slate-50 p-8 rounded-[12px] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4"><Search className="text-accent" size={32} /><h3 className="text-2xl font-black uppercase">Visibilità 360°</h3></div>
                    <p className="text-slate-800 text-lg font-bold mb-4">Ottimizzazione per Google Search + Motori AI (ChatGPT, Perplexity, Gemini).</p>
                    <ul className="space-y-4">
                       {['Indicizzazione query tipo "Appartamento Tenerife mare"', 'Blog strategico per rispondere a dubbi turisti', 'Copywriting ottimizzato per algoritmi AI'].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-lg font-bold text-slate-700"><CheckCircle2 size={20} className="text-accent mt-1 flex-shrink-0" />{item}</li>
                       ))}
                    </ul>
                 </div>
                 <div className="bg-slate-50 p-8 rounded-[12px] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4"><QrCode className="text-accent" size={32} /><h3 className="text-2xl font-black uppercase">Review Booster</h3></div>
                    <p className="text-slate-800 text-lg font-bold mb-4">Aumentiamo l'autorità del brand con un flusso costante di recensioni positive.</p>
                    <ul className="space-y-4">
                       {['QR Code fisico in ogni stanza per recensione immediata', 'Invio WhatsApp automatico post-checkout', 'Scalata dei ranking su Google My Business'].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-lg font-bold text-slate-700"><CheckCircle2 size={20} className="text-accent mt-1 flex-shrink-0" />{item}</li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </Slide>

        {/* Slide 7: Investimento vs Spesa */}
        <Slide id="investimento" customBg="bg-slate-950">
           <div className="max-w-6xl w-full text-center px-4 overflow-y-auto scrollbar-hide py-10">
              <h2 className="text-3xl md:text-6xl font-black mb-8 tracking-tighter uppercase text-white">Investimento <span className="text-accent">vs</span> Spesa.</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                 <div className="bg-white p-10 rounded-[12px] border-l-8 border-accent shadow-2xl">
                    <div className="flex items-center gap-4 mb-6"><TrendingUp className="text-accent" size={40} /><h3 className="text-3xl font-black uppercase text-slate-950">La Nostra Strategia</h3></div>
                    <p className="text-xl text-slate-800 font-bold leading-relaxed mb-8">Un sito professionale è un asset che lavora h24 per generare contatti e proteggere il brand.</p>
                    <ul className="space-y-4 font-black text-xl text-slate-950 uppercase">
                       <li className="flex items-center gap-3"><CheckCircle2 size={24} className="text-accent flex-shrink-0" /> Analisi target Tenerife</li>
                       <li className="flex items-center gap-3"><CheckCircle2 size={24} className="text-accent flex-shrink-0" /> Design per la conversione</li>
                       <li className="flex items-center gap-3"><CheckCircle2 size={24} className="text-accent flex-shrink-0" /> Posizionamento AI/SEO</li>
                       <li className="flex items-center gap-3"><CheckCircle2 size={24} className="text-accent flex-shrink-0" /> Strategia di Branding</li>
                    </ul>
                 </div>
                 <div className="bg-slate-900 p-10 rounded-[12px] border-l-8 border-slate-700 opacity-60">
                    <div className="flex items-center gap-4 mb-6"><XCircle className="text-slate-500" size={40} /><h3 className="text-3xl font-black uppercase text-slate-300">Sito "Vetrina"</h3></div>
                    <p className="text-xl text-slate-400 font-bold leading-relaxed mb-8 italic">Un sito fatto da non esperti serve solo ad esistere, ma rischia di allontanare i clienti se non strategico.</p>
                    <ul className="space-y-4 font-bold text-xl text-slate-500 uppercase">
                       <li className="flex items-center gap-3"><XCircle size={24} className="text-slate-700 flex-shrink-0" /> Nessuna analisi target</li>
                       <li className="flex items-center gap-3"><XCircle size={24} className="text-slate-700 flex-shrink-0" /> Design generico/datato</li>
                       <li className="flex items-center gap-3"><XCircle size={24} className="text-slate-700 flex-shrink-0" /> Invisibile su Google</li>
                       <li className="flex items-center gap-3"><XCircle size={24} className="text-slate-700 flex-shrink-0" /> Danno d'immagine</li>
                    </ul>
                 </div>
              </div>
           </div>
        </Slide>

        {/* Slide 8: Extra */}
        <Slide id="extra" customBg="bg-white">
           <div className="text-center mb-10 px-4">
              <h2 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter uppercase text-slate-950">Servizi <span className="text-accent">Extra</span>.</h2>
              <p className="text-lg md:text-2xl text-slate-800 font-bold">Tecnologia e Branding per un impatto d'élite.</p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-7xl mx-auto px-4 w-full overflow-y-auto scrollbar-hide pb-10">
              {[
                 { icon: MapPin, title: "GMB Booster", desc: "Setup Google Business e sistema Review QR." },
                 { icon: FileText, title: "Grafiche Stampa", desc: "Design Volantini e Stickers personalizzati." },
                 { icon: Camera, title: "Ritocco Foto", desc: "Post-produzione premium per le vostre immagini." },
                 { icon: Zap, title: "Video Hero AI", desc: "Video cinematico AI ad alto impatto per il sito." },
                 { icon: Bot, title: "Assistente AI", desc: "Risposte H24 su WhatsApp ai potenziali clienti." }
              ].map((item, i) => (
                 <div key={i} className="p-5 bg-slate-50 border border-slate-200 rounded-[12px] text-center shadow-sm flex flex-col items-center justify-center">
                    <item.icon className="mb-3 text-accent" size={36} />
                    <h4 className="text-sm md:text-base font-black mb-1.5 text-slate-950 uppercase">{item.title}</h4>
                    <p className="text-[10px] md:text-xs text-slate-700 font-bold leading-snug">{item.desc}</p>
                 </div>
              ))}
           </div>
        </Slide>

        {/* Slide 9: Costi Fissi */}
        <Slide id="costs" customBg="bg-white">
           <div className="max-w-5xl mx-auto w-full text-center px-4 overflow-y-auto scrollbar-hide py-10">
              <h2 className="text-4xl md:text-7xl font-black mb-6 text-accent uppercase">Costi Fissi.</h2>
              <div className="bg-white border border-slate-300 rounded-[12px] overflow-x-auto shadow-2xl">
                 <table className="w-full text-left border-collapse min-w-[600px] md:min-w-0">
                    <thead className="bg-slate-100 border-b border-slate-300">
                       <tr>
                          <th className="p-4 md:p-6 text-slate-600 uppercase tracking-widest text-[10px] md:text-xs font-black">Servizio Ricorrente</th>
                          <th className="p-4 md:p-6 text-slate-600 uppercase tracking-widest text-[10px] md:text-xs font-black text-center">1° Anno</th>
                          <th className="p-4 md:p-6 text-slate-600 uppercase tracking-widest text-[10px] md:text-xs font-black text-right">Dall'anno 2</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                       {RECURRING_COSTS_TABLE.map((cost, i) => (
                          <tr key={i} className={`hover:bg-slate-50 transition-colors ${cost.isAlternative ? 'bg-orange-50/30' : ''}`}>
                             <td className="p-4 md:p-6 text-slate-950 font-black text-sm md:text-lg">
                                {cost.item}
                                {cost.isAlternative && <span className="block text-[10px] text-accent mt-0.5 uppercase">(Alternativo: sceglierne solo uno)</span>}
                             </td>
                             <td className="p-4 md:p-6 text-slate-950 font-black text-lg md:text-2xl tracking-tighter text-center">{cost.firstYear}</td>
                             <td className="p-4 md:p-6 text-slate-950 font-black text-lg md:text-2xl tracking-tighter text-right whitespace-nowrap">
                                {cost.afterFirstYear}
                                {cost.note && <span className="block text-[10px] text-slate-500 font-medium uppercase mt-1">{cost.note}</span>}
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <p className="mt-6 text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-widest italic">
                 NB: WPML può essere disdetto dopo il primo anno se non sono previste nuove traduzioni costanti.
              </p>
           </div>
        </Slide>

        {/* Slide 10: Preventivo */}
        <Slide id="config-slide" customBg="bg-slate-50">
          <div id="configuratore-offerta" className="w-full max-w-6xl bg-white p-6 md:p-10 rounded-[12px] border border-slate-300 shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh]">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
               <div className="md:max-w-md text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-black mb-1 tracking-tighter text-slate-950 uppercase">Preventivo.</h2>
                  <p className="text-sm md:text-lg text-slate-700 font-bold">Personalizza la proposta in tempo reale.</p>
               </div>
               <div className="bg-accent text-white px-6 py-4 rounded-[12px] flex items-center gap-6 shadow-lg min-w-fit">
                  <div className="text-center md:text-left">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] block mb-0.5 opacity-80">VALORE TOTALE</span>
                    <div className="text-3xl md:text-5xl font-black tracking-tighter italic leading-none">€{totalPrice}</div>
                  </div>
                  <div className="h-10 w-px bg-white/20 hidden md:block"></div>
                  <button onClick={exportToPDF} className="flex items-center gap-2 bg-slate-950 text-white px-4 py-3 rounded-[10px] font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all no-print shadow-md">
                    <Download size={14} /> PDF
                  </button>
               </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-y-auto scrollbar-hide pr-2">
               {SERVICES_PRICE_LIST.map((item) => (
                  <label key={item.id} className={`flex items-center gap-4 p-4 rounded-[12px] border-2 transition-all cursor-pointer ${selectedItems.includes(item.id) ? 'bg-accent/5 border-accent shadow-sm' : 'bg-slate-50 border-transparent hover:bg-slate-200'}`}>
                     <input type="checkbox" className="hidden" checked={selectedItems.includes(item.id)} onChange={() => toggleItem(item.id)} />
                     <div className={`h-10 w-10 rounded-[10px] flex items-center justify-center transition-colors shadow-sm flex-shrink-0 ${selectedItems.includes(item.id) ? 'bg-accent text-white' : 'bg-white text-slate-400 border border-slate-300'}`}>
                        <CheckCircle2 size={20} />
                     </div>
                     <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                           <h4 className="text-base md:text-lg font-black text-slate-950 truncate uppercase">{item.name}</h4>
                           <span className="text-accent font-black text-base md:text-lg ml-2">€{item.price}</span>
                        </div>
                        <p className="text-slate-700 text-[10px] md:text-xs font-bold leading-tight line-clamp-2">{item.desc}</p>
                     </div>
                  </label>
               ))}
            </div>
          </div>
        </Slide>

        {/* Slide 11: Chiusura */}
        <Slide id="cta" bgImage={TENERIFE_IMAGES.nature} darkOverlay>
           <div className="text-center w-full px-4 overflow-y-auto scrollbar-hide py-10">
              <h2 className="text-5xl md:text-8xl font-black text-slate-950 mb-6 tracking-tighter uppercase leading-tight">
                 Il vostro <br className="md:hidden" /> <span className="text-accent">Successo.</span>
              </h2>
              <p className="text-lg md:text-3xl text-slate-950 mb-10 md:mb-16 max-w-3xl mx-auto font-bold leading-relaxed">
                 Diamo ai vostri appartamenti il posizionamento d'élite che meritano.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 no-print w-full">
                 <div className="w-full sm:w-auto px-10 py-5 bg-accent text-white rounded-[12px] font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    <Phone size={20} /> Chiamami
                 </div>
                 <div className="w-full sm:w-auto px-10 py-5 bg-slate-950 text-white rounded-[12px] font-black text-lg flex items-center justify-center gap-3 shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    <Mail size={20} /> Scrivimi
                 </div>
              </div>
              <div className="max-w-2xl mx-auto pt-10 border-t border-slate-300 text-slate-800 text-center">
                <div className="text-xl md:text-2xl font-black text-slate-950 mb-1 uppercase tracking-[0.2em]">Michele Caddeo</div>
                <div className="text-base md:text-lg font-bold">
                  <p>Marketing & Design Strategico</p>
                  <p className="text-accent text-sm md:text-lg">+39 3381903063 | michele.caddeo@outlook.it</p>
                </div>
              </div>
           </div>
        </Slide>
      </div>

      {/* Navigazione */}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-row gap-2 bg-white/95 backdrop-blur-md p-2 rounded-[12px] border border-slate-300 shadow-xl no-print">
        <button onClick={() => goToSlide(Math.max(0, currentSlide - 1))} className="p-3 bg-slate-100 rounded-[12px] text-slate-950 hover:bg-accent hover:text-white transition-all disabled:opacity-20 shadow-sm" disabled={currentSlide === 0}>
          <ChevronUp size={24} />
        </button>
        <button onClick={() => goToSlide(Math.min(totalSlides - 1, currentSlide + 1))} className="p-3 bg-slate-100 rounded-[12px] text-slate-950 hover:bg-accent hover:text-white transition-all disabled:opacity-20 shadow-sm" disabled={currentSlide === totalSlides - 1}>
          <ChevronDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;
