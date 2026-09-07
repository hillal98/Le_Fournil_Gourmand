import { useState, useEffect, useRef } from 'react';

// Hook for scroll-triggered animations
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// Reveal wrapper component
function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Images & Videos - Real content inspired by @le.fournil.gourmand Instagram
const images = {
  // Hero: colorful vitrine with mirror glaze cakes matching their Instagram
  //hero: '/images/IMG_6255.jpg',
  // Display case with modern entremets
  vitrine: '/images/IMG_6255.jpg',
  // Mirror glaze yellow/white cakes
  mirrorGlaze: '/images/vitrine.jpeg',
  sandwich: '/images/sandwich.png',
  // Raspberry cakes
  raspberryCakes: '/images/framboise.png',
  // Pastries display
  pastriesDisplay: 'https://images.pexels.com/photos/19499004/pexels-photo-19499004.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Individual desserts
  individualCakes: 'https://images.pexels.com/photos/38431267/pexels-photo-38431267.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Bakery display case
  displayCase: '/images/patisserie.jpeg',
  // Traditional breads
  baguettes: '/images/tourte_de_meule .jpeg',
  breadBasket: 'https://images.pexels.com/photos/30846570/pexels-photo-30846570.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Viennoiseries
  croissants: '/images/croissant.jpeg',
  viennoiseries: 'https://images.pexels.com/photos/29380149/pexels-photo-29380149.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Chocolates
  chocolates: 'https://images.pexels.com/photos/1397292/pexels-photo-1397292.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Baker at work
  baker: '/images/IMG_6277.jpg',
  oven: '/images/pain.jpeg',
  dough: 'https://images.pexels.com/photos/38597841/pexels-photo-38597841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Tarts
  tarts: 'https://images.pexels.com/photos/15366687/pexels-photo-15366687.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Colorful cupcakes
  colorfulCakes: 'https://images.pexels.com/photos/11845549/pexels-photo-11845549.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Elegant desserts
  elegantDessert: 'https://images.pexels.com/photos/19712163/pexels-photo-19712163.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
  // Bread on linen
  breadLinen: '/images/i91973-pain-cereales.jpg',
  // Bakery French
  bakeryFrench: '/images/pain_bucheron.jpeg',
  mixt:'/images/viennoiserie.jpeg'
};

// Real videos of French bakery (UHD 4K from Pexels)
const videos = {
  // Bread baking process
  baking: '/videos/ssstik.io_@le_fournil_gourmand93_1788793844788.mp4',
  // Kneading dough
  kneading: '/videos/le_fournil_gourmand93_3.mp4',
  // Pastry chef at work
  pastry: '/videos/le_fournil_gourmand93_2.mp4',
  // Fresh bread display
  breadDisplay: 'https://videos.pexels.com/video-files/3119255/3119255-uhd_3840_2160_25fps.mp4',
  // Artisan bread
  artisanBread: '/videos/ssstik.io_@le_fournil_gourmand93_1788793844788.mp4',
  // Croissant with coffee
  croissant: 'https://videos.pexels.com/video-files/32212252/13738447_3840_2160_60fps.mp4',
  // Bakery flour preparation
  flour: 'https://videos.pexels.com/video-files/8189813/8189813-uhd_4096_2160_25fps.mp4',
  // Cakes in slow motion
  cakesSlow: '/videos/video_kamel.mp4',
  // Pastry decoration
  decoration: '/videos/Video2026-09-05.mp4',
  // Pain restaurant
  painRestaurant: 'https://videos.pexels.com/video-files/8430966/8430966-uhd_4096_2160_25fps.mp4',
};

// Products data - Reflecting their modern French pastry shop style
const products = {
  pains: [
    { name: 'Tourte de Meule', desc: 'Médaillée d\'or Paris & Seine-Saint-Denis', img: images.baguettes },
    { name: 'Baguette traditionnelle ', desc: 'Meilleur Pain Bio d\'Île-de-France', img: images.breadBasket },
    { name: 'Pain Cereale', desc: 'Au levain naturel, farine T80', img: images.breadLinen },
    { name: 'Pain Bucherons', desc: 'Mélange de 6 céréales anciennes', img: images.bakeryFrench },
  ],
  viennoiseries: [
    { name: 'Croissant au Beurre', desc: 'Pur beurre AOP Charentes-Poitou', img: images.croissants },
    { name: 'Pain au Chocolat', desc: 'Deux barres de chocolat noir', img: images.viennoiseries },
    { name: 'Chocolatine', desc: 'La vraie recette du sud-ouest', img: images.chocolates },
    { name: 'Mixt', desc: 'Crème pâtissière maison', img: images.mixt },
  ],
  patisseries: [
    { name: 'Entremet Miroir', desc: 'Glaçage miroir, mousse, insert fruit', img: images.mirrorGlaze },
    { name: 'Tarte aux Framboises', desc: 'Crème d\'amande et framboises fraîches', img: images.raspberryCakes },
    { name: 'Éclair au Chocolat', desc: 'Pâte à choux, crème chocolat noir', img: images.chocolates },
    { name: 'Tarte aux Pommes Vertes', desc: 'Mousse de pomme Granny Smith', img: images.individualCakes },
  ],
  sandwich: [
    { name: 'Eclair au saumon', desc: 'Glaçage miroir, mousse, insert fruit', img: images.sandwich },
  ],
};

// Gallery - mix of images and videos for dynamic feel
const galleryItems = [
  { type: 'video', src: videos.baking, alt: 'Cuisson au four' },
  { type: 'image', src: images.vitrine, alt: 'Vitrine pâtisserie' },
  { type: 'image', src: images.mirrorGlaze, alt: 'Entremets miroir' },
  { type: 'video', src: videos.kneading, alt: 'Pétrissage à la main' },
  { type: 'image', src: images.baker, alt: 'Boulanger au travail' },
  { type: 'image', src: images.colorfulCakes, alt: 'Gâteaux colorés' },
  { type: 'video', src: videos.croissant, thumb: 'https://images.pexels.com/videos/32212252/pexels-photo-32212252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200', alt: 'Croissant doré' },
  { type: 'image', src: images.raspberryCakes, alt: 'Gâteaux aux framboises' },
  { type: 'image', src: images.individualCakes, alt: 'Pâtisseries individuelles' },
  { type: 'video', src: videos.decoration, thumb: 'https://images.pexels.com/videos/5318753/pexels-photo-5318753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200', alt: 'Décoration pâtisserie' },
  { type: 'image', src: images.chocolates, alt: 'Pâtisseries au chocolat' },
  { type: 'image', src: images.oven, alt: 'Four traditionnel' },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'Notre Histoire', href: '#histoire' },
    { label: 'Nos Produits', href: '#produits' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-flour/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#accueil" className="flex items-center gap-2 group">
          <span className="text-2xl">🥖</span>
          <div className="flex flex-col leading-none">
            <span className={`font-serif text-xl font-bold ${scrolled ? 'text-crust-dark' : 'text-white'}`}>
              Le Fournil Gourmand
            </span>
            <span className={`font-script text-xs ${scrolled ? 'text-wheat' : 'text-butter'}`}>
              Boulangerie Artisanale
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium tracking-wide transition-colors hover:text-wheat ${
                scrolled ? 'text-crust-dark' : 'text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`text-sm font-semibold px-5 py-2.5 rounded-full transition-all ${
              scrolled
                ? 'bg-crust text-white hover:bg-crust-dark'
                : 'bg-white/15 text-white border border-white/40 hover:bg-white hover:text-crust-dark backdrop-blur-sm'
            }`}
          >
            Nous trouver
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${scrolled ? 'text-crust-dark' : 'text-white'}`}
          aria-label="Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-flour border-t border-cream mt-3 shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-crust-dark font-medium py-1"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background - real French bakery footage */}
      <div className="absolute inset-0">
        <video
          src={videos.breadDisplay}
          //poster={images.hero}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-crust-dark/75 via-crust-dark/50 to-crust-dark/85" />
        {/* Subtle animated grain */}
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="text-white/90 text-sm font-medium tracking-wide">
            Meilleur Pain Bio & Meilleure Baguette Tradition
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6">
          Le Fournil<br />
          <span className="font-script text-butter font-normal italic text-6xl md:text-7xl lg:text-8xl">
            Gourmand
          </span>
        </h1>

        <p className="text-white/85 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Boulangerie & pâtisserie artisanale à Noisy-le-Grand.
          Du pain bio primé aux entremets contemporains,
          tout est fait maison chaque jour avec passion.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#produits"
            className="bg-butter text-crust-dark px-8 py-4 rounded-full font-semibold hover:bg-white transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            Découvrir nos produits
          </a>
          <a
            href="#histoire"
            className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-crust-dark transition-all backdrop-blur-sm"
          >
            Notre histoire
          </a>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-14 text-white/90">
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold text-butter">7K+</div>
            <div className="text-xs uppercase tracking-widest mt-1 text-white/70">Abonnés Instagram</div>
          </div>
          <div className="w-px h-10 bg-white/30 hidden sm:block" />
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold text-butter">2</div>
            <div className="text-xs uppercase tracking-widest mt-1 text-white/70">Prix d'excellence</div>
          </div>
          <div className="w-px h-10 bg-white/30 hidden sm:block" />
          <div className="text-center">
            <div className="font-serif text-3xl md:text-4xl font-bold text-butter">100%</div>
            <div className="text-xs uppercase tracking-widest mt-1 text-white/70">Fait maison</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function Awards() {
  const awards = [
    {
      icon: '🥇',
      title: 'Meilleur Pain Bio',
      subtitle: 'Paris — Île-de-France',
    },
    {
      icon: '',
      title: 'Meilleure Baguette Tradition',
      subtitle: 'Paris & Seine-Saint-Denis',
    },
  ];

  return (
    <section className="relative -mt-16 z-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {awards.map((a, i) => (
          <Reveal key={i} delay={i * 150}>
            <div
              className="bg-white rounded-2xl shadow-xl shadow-crust/10 px-8 py-7 flex items-center gap-5 border border-cream/50"
            >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-butter to-wheat flex items-center justify-center text-3xl shadow-inner">
              {a.icon}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-wheat font-semibold mb-1">
                Récompense
              </div>
              <h3 className="font-serif text-xl font-bold text-crust-dark leading-tight">
                {a.title}
              </h3>
              <p className="text-crust-light text-sm mt-0.5">{a.subtitle}</p>
            </div>
          </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-flour to-cream/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-script text-3xl text-wheat mb-2">À toute heure</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-crust-dark mb-4">
            Nos Horaires
          </h2>
          <p className="text-crust/70 max-w-xl mx-auto">
            Nous vous accueillons presque tous les jours pour vous offrir
            le meilleur de la boulangerie artisanale.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-crust/20">
          {/* Background: pastry display video from their style */}
          <div className="absolute inset-0">
            <video
              src={videos.cakesSlow}
              poster={images.vitrine}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-crust-dark/75 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            {/* Clock icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 21a9 9 0 100-18 9 9 0 000 18z" />
                </svg>
              </div>
            </div>

            <div className="text-center text-white">
              {/* Main schedule */}
              <div className="mb-8">
                <div className="font-serif text-3xl md:text-4xl font-bold text-butter mb-2">
                  Du jeudi au mardi
                </div>
                <div className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight">
                  06h30 – 20h00
                </div>
              </div>

              {/* Closed day */}
              <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-10 py-6">
                <div className="font-serif text-2xl font-bold text-white">Mercredi</div>
                <div className="text-butter font-script text-3xl mt-1">Fermé</div>
              </div>
            </div>

            {/* Bottom info */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-center text-white/80 text-xs md:text-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">🥖</span>
                <span>Pain frais dès 6h30</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">🥐</span>
                <span>Viennoiseries chaudes le matin</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">🍰</span>
                <span>Pâtisseries toute la journée</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="histoire" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={images.baker}
              alt="Boulanger au travail"
              className="rounded-2xl shadow-lg shadow-crust/20 w-full h-72 object-cover object-top"
            />
            <img
              src={images.dough}
              alt="Pétrissage de la pâte"
              className="rounded-2xl shadow-lg shadow-crust/20 w-full h-72 object-cover mt-10"
            />
            <img
              src={images.oven}
              alt="Four traditionnel"
              className="rounded-2xl shadow-lg shadow-crust/20 w-full h-56 object-cover -mt-4"
            />
            <img
              src={images.displayCase}
              alt="Vitrine de la boulangerie"
              className="rounded-2xl shadow-lg shadow-crust/20 w-full h-56 object-cover mt-6"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-crust-dark text-white rounded-2xl p-6 shadow-xl max-w-[200px] hidden md:block">
            <div className="font-script text-4xl text-butter leading-none">Depuis</div>
            <div className="font-serif text-5xl font-bold mt-2">2018</div>
            <div className="text-white/70 text-xs uppercase tracking-widest mt-1">À Noisy-le-Grand</div>
          </div>
        </div>

        <div>
          <div className="font-script text-3xl text-wheat mb-2">Notre passion</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-crust-dark leading-tight mb-6">
            Entre tradition<br />
            <span className="italic text-crust-light">et créativité,</span><br />
            le goût avant tout.
          </h2>
          <div className="space-y-4 text-crust/80 leading-relaxed">
            <p>
              Nichée au cœur de Noisy-le-Grand, <strong>Le Fournil Gourmand</strong> est une
              boulangerie-pâtisserie artisanale où le temps est notre allié. Nous travaillons
              des farines biologiques, du levain naturel, et laissons la pâte fermenter
              lentement pour développer tous ses arômes.
            </p>
            <p>
              Récompensés deux fois pour la qualité de notre travail — notre baguette
              tradition et notre pain bio sont élaborés chaque jour avec la même exigence.
              Pas d'ajouts inutiles, pas de raccourcis : du bon pain, tout simplement.
            </p>
            <p>
              Côté vitrine, notre chef pâtissier crée chaque semaine de nouveaux
              entremets colorés, gâteaux miroir et pâtisseries de saison. Un mariage
              parfait entre la tradition boulangère et la créativité pâtissière moderne.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { n: '100%', l: 'Farines bio' },
              { n: 'Levain', l: 'Naturel maison' },
              { n: 'Four', l: 'À bois traditionnel' },
            ].map((x, i) => (
              <div key={i} className="border-l-2 border-butter pl-4">
                <div className="font-serif text-2xl font-bold text-crust-dark">{x.n}</div>
                <div className="text-xs text-crust-light mt-1">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Specialties() {
  const specialties = [
    {
      name: 'Entremets Miroir',
      desc: 'Glaçage miroir éclatant, mousse aérienne, insert fruit frais. Chaque pièce est une œuvre d\'art.',
      img: images.mirrorGlaze,
      tag: 'Best-seller',
    },
    {
      name: 'Tarte aux fruits',
      desc: 'Sablé breton, crème d\'amande, framboises fraîches cueillies au marché.',
      img: images.raspberryCakes,
      tag: 'De saison',
    },
    {
      name: 'Pâtisseries Individuelles',
      desc: 'Format miniature pour découvrir plusieurs saveurs. Mousse de pomme verte, noix de coco, noisette.',
      img: images.individualCakes,
      tag: 'Nouveau',
    },
  ];

  return (
    <section className="py-20 px-6 bg-flour">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-script text-3xl text-wheat mb-2">Signature</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-crust-dark mb-4">
            Nos créations contemporaines
          </h2>
          <p className="text-crust/70 max-w-2xl mx-auto">
            Notre vitrine regorge de couleurs et de saveurs. Entremets, gâteaux miroir et pâtisseries
            individuelles — une carte renouvelée chaque semaine.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {specialties.map((s, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl shadow-crust/5 transition-all duration-500"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-crust-dark text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  {s.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-crust-dark mb-2">
                  {s.name}
                </h3>
                <p className="text-crust/70 leading-relaxed text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Products() {
  // Correction : 'sandwich' au lieu de 'sandwicth'
  const [active, setActive] = useState<'pains' | 'viennoiseries' | 'patisseries' | 'sandwich'>('pains');
  
  const tabs = [
    { id: 'pains', label: '🥖 Pains' },
    { id: 'viennoiseries', label: '🥐 Viennoiseries' },
    { id: 'patisseries', label: '🍰 Pâtisseries' },
    { id: 'sandwich', label: '🥪 Sandwichs' }, // Ajout de l'emoji et correction
  ] as const;

  return (
    <section id="produits" className="py-24 px-6 bg-gradient-to-b from-cream/40 to-flour">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-script text-3xl text-wheat mb-2">Nos créations</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-crust-dark mb-4">
            Ce que nous vous proposons
          </h2>
          <p className="text-crust/70 max-w-2xl mx-auto">
            Chaque jour, nous pétrissons, façonnons et cuisons sur place pour vous offrir
            le meilleur de la boulangerie française traditionnelle.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-md shadow-crust/5 border border-cream/50">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`px-6 md:px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  active === t.id
                    ? 'bg-crust text-white shadow-md'
                    : 'text-crust-light hover:text-crust-dark'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products[active].map((p, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl shadow-crust/5 hover:shadow-crust/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-crust-dark mb-1.5">
                  {p.name}
                </h3>
                <p className="text-sm text-crust/70 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Banner() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0">
        <video
          src={videos.flour}
          poster={images.vitrine}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-crust-dark/80" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <div className="font-script text-4xl text-butter mb-3">« Fait maison avec amour »</div>
        <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight mb-6">
          Chaque matin,<br />
          nous nous levons à 4h<br />
          <span className="text-butter italic">pour vous.</span>
        </h2>
        <p className="text-white/80 leading-relaxed text-lg max-w-xl mx-auto">
          Parce que le bon pain ne peut pas attendre, nos équipes sont à l'ouvrage
          dès les premières lueurs du jour pour que tout soit frais et chaud à
          l'heure de votre petit-déjeuner.
        </p>
      </div>
    </section>
  );
}

// function Gallery() {
//   return (
//     <section id="galerie" className="py-24 px-6">
//       <div className="max-w-7xl mx-auto">
//         <Reveal>
//           <div className="text-center mb-14">
//             <div className="font-script text-3xl text-wheat mb-2">Galerie</div>
//             <h2 className="font-serif text-4xl md:text-5xl font-bold text-crust-dark mb-4">
//               L'atelier en images & vidéos
//             </h2>
//             <p className="text-crust/70 max-w-xl mx-auto">
//               Survolez les vidéos pour les voir en action — suivez-nous aussi sur Instagram.
//             </p>
//           </div>
//         </Reveal>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
//           {galleryItems.map((g, i) => (
//             <Reveal key={i} delay={(i % 4) * 100}>
//               <div
//                 className={`relative overflow-hidden rounded-xl group cursor-pointer ${
//                   i === 0 || i === 5 ? 'md:row-span-2 md:col-span-1' : ''
//                 }`}
//               >
//                 {g.type === 'video' ? (
//                   <video
//                     src={g.src}
//                     poster={g.thumb}
//                     muted
//                     loop
//                     playsInline
//                     preload="metadata"
//                     className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
//                       i === 0 || i === 5 ? 'h-full min-h-[260px] md:min-h-[400px]' : 'h-44 md:h-52'
//                     }`}
//                     onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.pause();
//                       e.currentTarget.currentTime = 0;
//                     }}
//                   />
//                 ) : (
//                   <img
//                     src={g.src}
//                     alt={g.alt}
//                     className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
//                       i === 0 || i === 5 ? 'h-full min-h-[260px] md:min-h-[400px]' : 'h-44 md:h-52'
//                     }`}
//                   />
//                 )}

//                 {/* Video indicator */}
//                 {g.type === 'video' && (
//                   <div className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                     <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
//                     VIDEO
//                   </div>
//                 )}

//                 <div className="absolute inset-0 bg-crust-dark/0 group-hover:bg-crust-dark/30 transition-colors flex items-center justify-center">
//                   <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
//                     {g.type === 'video' ? (
//                       <svg className="w-5 h-5 text-crust-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     ) : (
//                       <svg className="w-5 h-5 text-crust-dark" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                       </svg>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Reveal>
//           ))}
//         </div>

//         <div className="text-center mt-10">
//           <a
//             href="https://www.instagram.com/le.fournil.gourmand/"
//             target="_blank"
//             rel="noreferrer"
//             className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold px-7 py-3.5 rounded-full hover:shadow-xl transition-shadow"
//           >
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//             </svg>
//             @le.fournil.gourmand
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }
function Gallery() {
  return (
    <section id="galerie" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <div className="font-script text-3xl text-wheat mb-2">Galerie</div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-crust-dark mb-4">
              L'atelier en images & vidéos
            </h2>
            <p className="text-crust/70 max-w-xl mx-auto">
              Survolez les vidéos pour les voir en action — suivez-nous aussi sur Instagram.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryItems.map((g, i) => (
            <Reveal key={i} delay={(i % 4) * 100}>
              {/* 
                CORRECTION ICI : 
                On met les événements sur la div parente. 
                Ainsi, peu importe si on survole la vidéo ou le calque, ça fonctionne.
              */}
              <div
                className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                  i === 0 || i === 5 ? 'md:row-span-2 md:col-span-1' : ''
                }`}
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) video.play().catch(() => {});
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector('video');
                  if (video) {
                    video.pause();
                    video.currentTime = 0;
                  }
                }}
              >
                {g.type === 'video' ? (
                  <video
                    src={g.src}
                    poster={g.thumb}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      i === 0 || i === 5 ? 'h-full min-h-[260px] md:min-h-[400px]' : 'h-44 md:h-52'
                    }`}
                  />
                ) : (
                  <img
                    src={g.src}
                    alt={g.alt}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                      i === 0 || i === 5 ? 'h-full min-h-[260px] md:min-h-[400px]' : 'h-44 md:h-52'
                    }`}
                  />
                )}

                {/* Video indicator : ajout de pointer-events-none */}
                {g.type === 'video' && (
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    VIDEO
                  </div>
                )}

                {/* Overlay au survol : ajout de pointer-events-none */}
                <div className="absolute inset-0 bg-crust-dark/0 group-hover:bg-crust-dark/30 transition-colors flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                    {g.type === 'video' ? (
                      <svg className="w-5 h-5 text-crust-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-crust-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/le.fournil.gourmand/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-semibold px-7 py-3.5 rounded-full hover:shadow-xl transition-shadow"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @le.fournil.gourmand
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-crust-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-wheat/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-butter/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-script text-3xl text-butter mb-2">Nous rendre visite</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Passez nous voir !
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Nous serons ravis de vous accueillir et de vous conseiller.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {[
            {
              icon: '📍',
              title: 'Adresse',
              lines: ['181 Rue Pierre Brossolette', '93160 Noisy-le-Grand'],
            },
            {
              icon: '🕐',
              title: 'Horaires',
              lines: [
                'Du jeudi au mardi',
                '06h30 – 20h00',
                '',
                'Mercredi : Fermé',
              ],
            },
            {
              icon: '📞',
              title: 'Contact',
              lines: ['01 45 67 89 10', 'contact@fournilgourmand.fr'],
            },
          ].map((b, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 text-center"
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3 className="font-serif text-xl font-bold text-butter mb-3">{b.title}</h3>
              <div className="space-y-1 text-white/80 text-sm leading-relaxed">
                {b.lines.map((l, j) => (
                  <div key={j}>{l}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fake map placeholder with an image */}
        <div className="rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
          <div className="aspect-video relative bg-crust">
            <img
              src={images.pastriesDisplay}
              alt="Notre vitrine"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-crust-dark/40 flex items-center justify-center">
              <div className="bg-white rounded-xl p-6 text-center shadow-2xl max-w-sm mx-4">
                <div className="text-3xl mb-2">🥖</div>
                <div className="font-serif text-crust-dark font-bold text-lg">
                  Le Fournil Gourmand
                </div>
                <div className="text-crust text-sm mt-1">
                  181 Rue Pierre Brossolette<br />93160 Noisy-le-Grand
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoGallery = [
    {
      src: videos.kneading,
     // thumb: 'https://images.pexels.com/videos/7405931/pexels-photo-7405931.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
      title: 'Le Pétrissage',
      desc: 'Notre pâte à pain pétrie à la main',
      duration: '0:22',
    },
    {
      src: videos.pastry,
      //thumb: 'https://images.pexels.com/videos/7405933/pexels-photo-7405933.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
      title: 'Le Façonnage',
      desc: 'Chaque viennoiserie façonnée avec soin',
      duration: '0:18',
    },
    {
      src: videos.baking,
      thumb: '/images/arriere_plan.jpeg',
      title: 'La Cuisson',
      desc: 'Sortie du four à bois, 240°C',
      duration: '0:09',
    },
    {
      src: videos.croissant,
      thumb: 'https://images.pexels.com/videos/32212252/pexels-photo-32212252.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
      title: 'Le Croissant',
      desc: 'Pur beurre AOP, feuilleté maison',
      duration: '0:12',
    },
    {
      src: videos.decoration,
      thumb: 'https://images.pexels.com/videos/5318753/pexels-photo-5318753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
      title: 'La Décoration',
      desc: 'Finitions de nos pâtisseries',
      duration: '0:38',
    },
    {
      src: videos.cakesSlow,
      //thumb: 'https://images.pexels.com/videos/28350374/cakes-in-slow-motion-28350374.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
      title: 'Les Entremets',
      desc: 'En slow motion, toute la magie',
      duration: '0:27',
    },
  ];

  return (
    <section className="py-24 px-6 bg-flour relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-butter/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-wheat/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="font-script text-3xl text-wheat mb-2">En mouvement</div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-crust-dark mb-4">
            Le Fournil en action
          </h2>
          <p className="text-crust/70 max-w-2xl mx-auto">
            Découvrez l'artisanat en vidéo. De la pâte au produit fini,
            chaque geste compte.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videoGallery.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveVideo(v.src)}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden text-left hover-lift"
            >
              <video
                src={v.src}
                poster={v.thumb}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                onMouseLeave={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-crust-dark via-crust-dark/20 to-transparent" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-crust-dark ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-full font-mono">
                {v.duration}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="font-serif text-xl font-bold mb-1">{v.title}</div>
                <div className="text-white/80 text-sm">{v.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Video modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className="relative w-full max-w-5xl modal-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                src={activeVideo}
                controls
                autoPlay
                className="w-full rounded-2xl shadow-2xl aspect-video bg-black"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function InstagramFeed() {
  // Duplicate for seamless loop
  const feedItems = [...galleryItems, ...galleryItems];

  return (
    <section className="py-16 overflow-hidden bg-cream/30">
      <div className="text-center mb-8 px-6">
        <div className="font-script text-3xl text-wheat mb-2">@le.fournil.gourmand</div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-crust-dark">
          Notre Instagram en direct
        </h2>
      </div>

      {/* Scrolling container - marquee effect */}
      <div className="relative">
        <div className="flex animate-[scroll_60s_linear_infinite] gap-4 w-max">
          {feedItems.map((item, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-64 h-64 md:w-72 md:h-72 rounded-xl overflow-hidden group cursor-pointer"
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  poster={item.thumb}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onMouseEnter={(e) => e.currentTarget.play().catch(() => {})}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-crust-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white text-sm">
                  <div className="font-serif font-bold">{item.alt}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
function FloatingSocials() {
  const socials = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/le.fournil.gourmand/',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400',
      label: 'Instagram',
    },
    {
      name: 'TikTok',
      href: 'https://www.tiktok.com/@le_fournil_gourmand93?is_from_webapp=1&sender_device=pc', // Remplace par ton vrai lien
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
        </svg>
      ),
      color: 'bg-black',
      label: 'TikTok',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/33625533970',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: 'bg-green-500',
      label: 'WhatsApp',
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      {socials.map((social, index) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="group relative"
          aria-label={social.label}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Tooltip */}
          <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-crust-dark text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            {social.label}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 bg-crust-dark rotate-45" />
          </div>
          
          {/* Button */}
          <div className="relative">
            <div className={`absolute inset-0 ${social.color} rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-soft`} />
            <div className={`relative w-12 h-12 rounded-full ${social.color} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform text-white`}>
              {social.icon}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-crust-dark/95 text-white/70 py-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥖</span>
          <div>
            <div className="font-serif text-white font-bold">Le Fournil Gourmand</div>
            <div className="font-script text-xs text-butter">Boulangerie Artisanale</div>
          </div>
        </div>

        <div className="text-sm text-center md:text-right">
          <div>© {new Date().getFullYear()} Le Fournil Gourmand — Tous droits réservés.</div>
          <div className="text-xs text-white/50 mt-1">
            🥇 Meilleur Pain Bio & Meilleure Baguette Tradition — Île-de-France
          </div>
        </div>
      </div>
    </footer>
  );
}

// function FloatingInstagram() {
//   return (
//     <a
//       href="https://www.instagram.com/le.fournil.gourmand/"
//       target="_blank"
//       rel="noreferrer"
//       className="fixed bottom-6 right-6 z-40 group"
//       aria-label="Suivez-nous sur Instagram"
//     >
//       <div className="relative">
//         <div className="absolute inset-0 instagram-gradient rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity animate-pulse-soft" />
//         <div className="relative w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
//           <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//           </svg>
//         </div>
//       </div>
//     </a>
//   );
// }

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-flour flex items-center justify-center z-[200]">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🥖</div>
          <div className="font-serif text-2xl text-crust-dark font-bold">Le Fournil Gourmand</div>
          <div className="font-script text-wheat text-lg mt-1">Chargement...</div>
          <div className="mt-4 flex justify-center gap-1">
            <span className="w-2 h-2 bg-crust rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-crust rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-crust rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-flour font-sans">
      <Nav />
      <FloatingSocials />
      <Hero />
      <Awards />
      <Schedule />
      <About />
      <Specialties />
      <Products />
      <Banner />
      <VideoSection />
      <Gallery />
      <InstagramFeed />
      <Contact />
      <Footer />
    </div>
  );
}
