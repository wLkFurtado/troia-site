import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Wine, Music, Link2, MapPin, Calendar,
  Sparkles, ChevronRight, Crown, Clock, Info, BadgeCheck, ChefHat
} from 'lucide-react';

const Instagram = (props) => <Link2 {...props} />;


gsap.registerPlugin(ScrollTrigger);

const cn = (...classes) => classes.filter(Boolean).join(' ');

const CheckCircle2 = ({ size = 18, className = '' }) => (
  <BadgeCheck size={size} className={className} />
);

// --- SPLIT TEXT ---
const SplitText = ({ text, className = '', wordClass = 'split-word' }) => (
  <span className={cn('inline-block', className)} aria-label={text}>
    {text.split(' ').map((word, i) => (
      <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
        <span className={cn('inline-block transform translate-y-full opacity-0', wordClass)}>
          {word}
        </span>
      </span>
    ))}
  </span>
);

// --- NAVBAR ---
const Navbar = () => {
  const navRef = useRef(null);
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -50',
        end: 99999,
        onEnter: () => gsap.to(el, { backgroundColor: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(20px)', duration: 0.4 }),
        onLeaveBack: () => gsap.to(el, { backgroundColor: 'rgba(9,9,11,0)', backdropFilter: 'blur(0px)', duration: 0.4 }),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-4 px-4">
      <div ref={navRef} className="flex items-center justify-between w-full max-w-5xl rounded-full border border-white/10 px-8 py-4">
        <span className="text-xl font-drama font-bold tracking-widest uppercase">Tróia</span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-zinc-300">
          <a href="#espacos" className="hover:text-amber-400 transition-colors">Espaços</a>
          <a href="#eventos" className="hover:text-amber-400 transition-colors">Eventos</a>
          <a href="#reservas" className="hover:text-amber-400 transition-colors">Reservas</a>
          <a href="https://lista.troiacabofrio.com.br" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">Lista VIP</a>
        </div>
        <a href="#reservas" className="rounded-full border border-amber-400/40 text-amber-400 px-6 py-2.5 text-sm font-medium hidden md:block hover:bg-amber-400 hover:text-zinc-950 transition-all duration-300">
          Reservas
        </a>
      </div>
    </nav>
  );
};

// --- HERO ---
const Hero = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-word', { y: 0, opacity: 1, duration: 1, stagger: 0.07, ease: 'power3.out', delay: 0.3 });
      gsap.fromTo('.hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power2.out' });
      gsap.fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 1.1, ease: 'power2.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero.jpeg"
          alt="Tróia Lounge Bar"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />
      </div>
      <div className="relative z-10 max-w-4xl">
        <h1 className="flex flex-col gap-3 mb-8">
          <SplitText
            text="A NOITE ELEVADA."
            className="text-2xl md:text-4xl font-sans font-bold text-amber-400 tracking-[0.3em]"
            wordClass="hero-word"
          />
          <SplitText
            text="Viva a experiência Tróia."
            className="text-5xl md:text-8xl font-drama italic leading-[0.9]"
            wordClass="hero-word"
          />
        </h1>
        <p className="hero-sub max-w-xl text-lg text-zinc-400 font-light mb-10 leading-relaxed opacity-0">
          Bar, Restaurante e o Rooftop mais exclusivo de Cabo Frio. Gastronomia, coquetelaria e energia em um só lugar.
        </p>
        <div className="hero-cta opacity-0">
          <a
            href="#espacos"
            className="inline-flex items-center gap-2 bg-amber-400 text-zinc-950 px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-white transition-all duration-300"
          >
            Descubra os Espaços <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

// --- FEATURES ---
const Features = () => {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState('');

  const cards = [
    { title: 'Bar & Restaurante', desc: 'Música ao Vivo Seg-Sáb às 20h, Dom às 19h.', icon: <Wine className="text-amber-400" /> },
    { title: 'Alta Coquetelaria', desc: 'Drinks assinatura e clássicos perfeitos.', icon: <Sparkles className="text-amber-400" /> },
    { title: 'Gastronomia', desc: 'Menu pensado para harmonizar com a noite.', icon: <Clock className="text-amber-400" /> },
  ];

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % cards.length), 3000);
    return () => clearInterval(t);
  }, [cards.length]);

  const feed = ' > ROOFTOP VIP ACESSO...\n > MULHERES VIP | HOMENS R$ 30...\n > PROGRAMAÇÃO NOS STORIES...\n > SISTEMA OPERACIONAL...\n';
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(feed.slice(0, i));
      if (i >= feed.length) i = 0; else i++;
    }, 80);
    return () => clearInterval(t);
  }, [feed]);

  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const today = new Date().getDay();

  return (
    <section id="espacos" className="py-32 px-6 md:px-12 lg:px-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Card 1: Shuffler */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-8 h-[420px] flex flex-col">
          <h3 className="text-2xl font-bold mb-1">Térreo</h3>
          <p className="text-zinc-500 text-sm mb-8">Bar & Restaurante</p>
          <div className="relative flex-grow">
            {cards.map((card, i) => {
              const offset = (i - active + cards.length) % cards.length;
              return (
                <div
                  key={card.title}
                  className="absolute w-full bg-zinc-800 rounded-2xl p-5 flex items-start gap-4 border border-zinc-700/50 transition-all duration-700"
                  style={{
                    top: `${offset * 22}px`,
                    opacity: offset === 0 ? 1 : offset === 1 ? 0.6 : 0.3,
                    transform: `scale(${1 - offset * 0.05})`,
                    zIndex: 3 - offset,
                  }}
                >
                  <div className="p-3 bg-zinc-950/60 rounded-xl">{card.icon}</div>
                  <div>
                    <h4 className="font-bold">{card.title}</h4>
                    <p className="text-sm text-zinc-400 mt-1">{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 2: Typewriter */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-8 h-[420px] flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Lounge Rooftop</h3>
              <p className="flex items-center gap-2 text-sm text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Feed
              </p>
            </div>
            <Crown className="text-zinc-600" />
          </div>
          <div className="flex-grow bg-zinc-950 rounded-2xl p-5 border border-zinc-800 overflow-hidden">
            <pre className="font-mono text-sm text-amber-400 whitespace-pre-wrap leading-relaxed">
              {typed}<span className="animate-pulse">_</span>
            </pre>
          </div>
        </div>

        {/* Card 3: Scheduler */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-8 h-[420px] flex flex-col">
          <h3 className="text-2xl font-bold mb-1">Programação</h3>
          <p className="text-zinc-500 text-sm mb-8">Eventos & Promos Semanais</p>
          <div className="grid grid-cols-7 gap-2 mb-8">
            {days.map((d, i) => (
              <div
                key={i}
                className={cn(
                  'aspect-square rounded-xl flex items-center justify-center text-xs font-mono',
                  i === today ? 'bg-amber-400 text-zinc-950 font-bold' : 'bg-zinc-800/60 text-zinc-500'
                )}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
              <div className="flex items-center gap-3">
                <Calendar size={16} className="text-amber-400" />
                <span className="text-sm font-medium">Quarta (Rodízio)</span>
              </div>
              <span className="text-xs font-mono text-zinc-400">R$ 119</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
              <div className="flex items-center gap-3">
                <Music size={16} className="text-amber-400" />
                <span className="text-sm font-medium">Domingo (Samba)</span>
              </div>
              <span className="text-xs font-mono text-zinc-400">R$ 30</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- HAPPY HOUR ---
const HappyHour = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        onEnter: () => gsap.to('.hh-reveal', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden relative border-t border-zinc-900">
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16 relative z-10">
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-3 mb-6 hh-reveal transform translate-y-10 opacity-0">
            <Wine className="text-amber-400" size={24} />
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Segunda a Sexta</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-drama italic text-white mb-6 leading-none hh-reveal transform translate-y-10 opacity-0">
            Golden <span className="text-amber-400">Hour.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed hh-reveal transform translate-y-10 opacity-0">
            O entardecer mais exclusivo de Cabo Frio. Celebre o fim do dia com nossa alta coquetelaria e gastronomia e as melhores condições para dar o start perfeito na sua noite.
          </p>
          <div className="bg-zinc-900/50 border border-amber-400/20 rounded-2xl p-6 mb-8 hh-reveal transform translate-y-10 opacity-0">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-zinc-500 text-sm mb-1">Horário</p>
                <p className="text-xl font-bold text-white">16h às 20h</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm mb-1">Dias</p>
                <p className="text-xl font-bold text-white">Seg. a Sex.</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <p className="text-zinc-300 font-medium text-lg mb-2">50% de desconto em todas as bebidas alcoólicas.</p>
              <p className="text-sm text-zinc-500 leading-relaxed font-mono">
                *Exceto combos, garrafas de whisky Blue Label, garrafas de Royal Salute e carta de vinhos.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 hh-reveal transform translate-y-10 opacity-0">
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl">
            <img 
              src="/happy-hour.png" 
              alt="Happy Hour Tróia" 
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute top-6 right-6">
              <span className="bg-zinc-950/80 backdrop-blur-md text-amber-400 border border-amber-400/30 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest inline-block">
                Térreo Lounge
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PROMO OF THE WEEK ---
const PromoOfTheWeek = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        onEnter: () => gsap.to('.promo-reveal', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="w-full lg:w-1/2 promo-reveal transform translate-y-10 opacity-0">
          <div className="relative aspect-square md:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl">
            <img 
              src="/parmegiana-baratissimo.JPG" 
              alt="Prato Especial da Semana" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-amber-400 text-zinc-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 inline-block">
                Baratíssimo da Semana
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-3 mb-6 promo-reveal transform translate-y-10 opacity-0">
            <ChefHat className="text-amber-400" size={24} />
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Especial do Chef</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-drama italic text-white mb-6 leading-none promo-reveal transform translate-y-10 opacity-0">
            O Baratíssimo da Semana
          </h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed promo-reveal transform translate-y-10 opacity-0">
            Toda semana selecionamos um prato impecável do nosso cardápio com um preço exclusivíssimo. A oportunidade perfeita para vivenciar a alta gastronomia do Tróia em uma condição inesquecível.
          </p>
          <div className="bg-zinc-900/50 border border-amber-400/20 rounded-2xl p-6 mb-8 promo-reveal transform translate-y-10 opacity-0 flex items-center justify-between">
            <div>
              <p className="text-zinc-500 text-sm mb-1">Qual é a surpresa desta semana?</p>
              <p className="text-xl md:text-2xl font-bold text-amber-400">Descubra no nosso Instagram</p>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-zinc-400 text-sm mb-1">Promoção válida:</p>
              <p className="text-white font-medium">Segunda a Sexta</p>
            </div>
          </div>
          <div className="promo-reveal transform translate-y-10 opacity-0">
            <a href="https://instagram.com/troiacabofrio" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-amber-400 text-zinc-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300">
              <Instagram size={20} />
              Acompanhar no Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PHILOSOPHY ---
const Philosophy = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        onEnter: () => gsap.to('.phil-word', { y: 0, opacity: 1, duration: 0.7, stagger: 0.03, ease: 'power3.out' }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-40 px-6 overflow-hidden border-y border-zinc-900">
      <div className="absolute inset-0 opacity-[0.15]">
        <img
          src="/ambiente.jpeg"
          className="w-full h-full object-cover"
          alt="bar texture"
        />
        <div className="absolute inset-0 bg-zinc-950/90" />
      </div>
      <div ref={ref} className="max-w-5xl mx-auto text-center relative z-10">
        <p className="text-xl text-zinc-500 font-light mb-10 max-w-2xl mx-auto">
          <SplitText text="A maioria das noites foca em: apenas entretenimento momentâneo." wordClass="phil-word" />
        </p>
        <p className="text-4xl md:text-6xl lg:text-7xl leading-tight">
          <SplitText text="Nós focamos em:" className="font-sans font-bold block mb-4" wordClass="phil-word" />
          <SplitText text="uma experiência sensorial completa." className="font-drama italic text-amber-400" wordClass="phil-word" />
        </p>
      </div>
    </section>
  );
};

// --- PROTOCOL ---
const Protocol = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.proto-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: 'top 8%',
          end: 'bottom top',
          scrub: true,
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            gsap.set(card, {
              scale: 1 - self.progress * 0.08,
              opacity: 1 - self.progress * 0.5,
              filter: `blur(${self.progress * 12}px)`,
            });
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const steps = [
    { n: '01', title: 'Chegada', desc: 'Recepção VIP. Reservas até as 19h com 15 min de tolerância. Aniversariantes ganham Welcome Drink.', icon: <Clock size={36} /> },
    { n: '02', title: 'Imersão', desc: 'Happy Hour de dom a dom (16h–20h). Gastronomia e alta coquetelaria no Térreo.', icon: <Wine size={36} /> },
    { n: '03', title: 'Ápice', desc: 'O Rooftop abre. Energia total. Sexta e Sábado: a noite mais vibrante de Cabo Frio.', icon: <Sparkles size={36} /> },
  ];

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-drama italic text-amber-400 mb-3">A Jornada</h2>
          <p className="text-zinc-500 tracking-widest font-mono text-sm">O PROTOCOLO TRÓIA</p>
        </div>
        {steps.map((s) => (
          <div
            key={s.n}
            className="proto-card w-full min-h-[55vh] bg-zinc-900 border border-zinc-800 rounded-[3rem] p-12 mb-8 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400/5 rounded-bl-full blur-3xl pointer-events-none" />
            <div className="flex-shrink-0 w-28 h-28 rounded-full border border-zinc-700/60 flex items-center justify-center bg-zinc-950/60 text-amber-400 relative">
              {s.icon}
              <span className="absolute -top-3 -left-3 text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800">
                PASSO_{s.n}
              </span>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-4">{s.title}</h3>
              <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- BOATE ROOFTOP ---
const BoateRooftop = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 75%',
        onEnter: () => gsap.to('.roof-reveal', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }),
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-950 overflow-hidden relative border-t border-zinc-900">
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        <div className="w-full lg:w-1/2 roof-reveal transform translate-y-10 opacity-0">
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full rounded-[2.5rem] overflow-hidden border border-zinc-800 shadow-2xl">
            <img 
              src="/rooftop.jpeg" 
              alt="Troia Rooftop Boate" 
              className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="bg-zinc-950/80 backdrop-blur-md text-amber-400 border border-amber-400/30 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest inline-block">
                O Ápice da Noite
              </span>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-3 mb-6 roof-reveal transform translate-y-10 opacity-0">
            <Sparkles className="text-amber-400" size={24} />
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Boate & Lounge</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-drama italic text-white mb-6 leading-none roof-reveal transform translate-y-10 opacity-0">
            Rooftop <span className="text-amber-400">Tróia.</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed roof-reveal transform translate-y-10 opacity-0">
            Muito mais que um bar. O nosso Rooftop é o destino final para quem busca a melhor energia de Cabo Frio. Música vibrante, gente bonita e uma atmosfera incomparável onde a noite ganha vida de verdade.
          </p>
          <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-2xl p-6 mb-8 roof-reveal transform translate-y-10 opacity-0">
             <h4 className="font-bold text-white mb-4">Vantagens Exclusivas</h4>
            <ul className="space-y-4 text-zinc-300">
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" /> Acesso VIP ou com condições especiais para listas.</li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" /> Programação semanal com os melhores DJs.</li>
              <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" /> Estrutura premium para comemorações e camarotes.</li>
            </ul>
          </div>
          <div className="roof-reveal transform translate-y-10 opacity-0">
            <a href="https://lista.troiacabofrio.com.br" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-amber-400 text-zinc-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300 w-full sm:w-auto">
              Colocar Nome na Lista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PRICING ---
const Pricing = () => (
  <section id="reservas" className="py-32 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-drama italic text-amber-400 mb-3">Aniversários & Reservas</h2>
        <p className="text-zinc-500">Viva o momento no lugar certo.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-10">
          <h3 className="text-2xl font-bold mb-2">Reserva de Mesa</h3>
          <p className="text-zinc-400 text-sm mb-6 pb-6 border-b border-zinc-800">Garantia de conforto no Térreo</p>
          <ul className="space-y-4 mb-8 text-sm text-zinc-300">
            <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" /> Válido até as 19h</li>
            <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" /> Tolerância de 15 min</li>
            <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" /> Acesso ao Happy Hour</li>
          </ul>
          <a href="https://reservas.troiacabofrio.com.br" target="_blank" rel="noreferrer" className="block text-center w-full py-4 rounded-full border border-zinc-700 font-medium hover:border-amber-400 hover:text-amber-400 transition-all duration-300">
            Reservar Agora
          </a>
        </div>

        <div className="bg-zinc-900 border border-amber-400 rounded-[3rem] p-12 md:-translate-y-4 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          <span className="inline-block bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Aniversariante ✦
          </span>
          <h3 className="text-3xl font-bold mb-2">Comemore no Tróia</h3>
          <p className="text-zinc-400 text-sm mb-6 pb-6 border-b border-zinc-800">Seu dia merece ser inesquecível</p>
          <ul className="space-y-4 mb-10 text-zinc-200">
            <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" /> Mesa Reservada</li>
            <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" /> VIP a noite toda no Rooftop</li>
            <li className="flex gap-3 items-start"><CheckCircle2 size={18} className="text-amber-400 flex-shrink-0 mt-0.5" /> Welcome Drink no Térreo</li>
            <li className="flex gap-3 items-start">
              <Crown size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <span>Com 20 convidados: Garrafa de Vodka Smirnoff ou Espumante</span>
            </li>
          </ul>
          <a href="https://reservas.troiacabofrio.com.br" target="_blank" rel="noreferrer" className="block text-center w-full bg-amber-400 text-zinc-950 py-4 rounded-full font-bold text-lg hover:bg-white transition-all duration-300">
            Fazer Reserva VIP
          </a>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-10">
          <h3 className="text-2xl font-bold mb-2">Lounge Rooftop</h3>
          <p className="text-zinc-400 text-sm mb-6 pb-6 border-b border-zinc-800">Acesso à nossa Boate</p>
          <ul className="space-y-4 mb-8 text-sm text-zinc-300">
            <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" /> Mulheres VIP</li>
            <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" /> Homens R$ 30 (consumo)</li>
            <li className="flex gap-3 items-center"><CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" /> Programação semanal exclusiva</li>
          </ul>
          <a href="https://reservas.troiacabofrio.com.br" target="_blank" rel="noreferrer" className="block text-center w-full py-4 rounded-full border border-zinc-700 font-medium hover:border-amber-400 hover:text-amber-400 transition-all duration-300">
            Ver Lista
          </a>
        </div>

      </div>
    </div>
  </section>
);

// --- FOOTER ---
const Footer = () => (
  <footer className="bg-[#050505] pt-20 pb-10 px-6 rounded-t-[4rem] border-t border-zinc-900">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-zinc-900">
      <div className="md:col-span-2">
        <h2 className="text-3xl font-drama tracking-widest uppercase mb-4">Tróia</h2>
        <p className="text-zinc-500 mb-3">Bar · Lounge · Rooftop</p>
        <p className="text-zinc-600 text-sm max-w-sm mb-8">A experiência definitiva em Cabo Frio. Onde a gastronomia encontra a energia da noite.</p>
        <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-zinc-400">SISTEMA_OPERACIONAL</span>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-white mb-6">Informações</h4>
        <ul className="space-y-4 text-sm text-zinc-400">
          <li className="flex items-start gap-3">
            <MapPin size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            Av. Assunção, 721, São Bento, Cabo Frio - RJ
          </li>
          <li className="flex items-start gap-3">
            <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            Menores +16 com pai, mãe ou tutor legal
          </li>
          <li className="flex items-start gap-3">
            <Wine size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            Taxa de Rolha (Vinho): R$ 60/garrafa
          </li>
          <li className="flex items-start gap-3">
            <Instagram size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <a href="https://instagram.com/troiacabofrio" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors">@troiacabofrio</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between text-xs text-zinc-600 font-mono">
      <p>© {new Date().getFullYear()} TRÓIA EXPERIÊNCIA.</p>
      <p>Desenvolvido para encantar.</p>
    </div>
  </footer>
);

// --- APP ---
export default function App() {
  return (
    <div className="bg-zinc-950 min-h-screen text-white font-sans">
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Features />
      <HappyHour />
      <PromoOfTheWeek />
      <Philosophy />
      <Protocol />
      <BoateRooftop />
      <Pricing />
      <Footer />
    </div>
  );
}
