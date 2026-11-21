import React, { useEffect, useRef, useState } from 'react';
import { brand, nav } from './data';

/* ---------- أيقونات (SVG داخلي بدون مكتبات) ---------- */
const P = {
  whatsapp: 'M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5ZM9 8.5c.3 2.5 2.7 5 5.5 6l1.2-1.2-1.8-1-.8.7c-.9-.4-1.8-1.3-2.2-2.2l.7-.8-1-1.8Z',
  phone: 'M5 4h4l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z',
  plane: 'M2 13l8-2-3-7h2l6 6 6-2c1.5-.4 2.5 1 1 2l-6 3 1 8h-2l-3-6-6 1 1-3Z',
  hotel: 'M3 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M14 10h6a1 1 0 0 1 1 1v10M3 21h18M7 8h3M7 12h3M7 16h3M17 14h1M17 18h1',
  bus: 'M5 4h14a1 1 0 0 1 1 1v12H4V5a1 1 0 0 1 1-1ZM4 11h16M7 21v-4M17 21v-4M8 14.5h.01M16 14.5h.01',
  id: 'M5 3h14v18H5zM12 9a2 2 0 1 0 0 .01M8.5 15.5c.6-1.6 1.9-2.5 3.5-2.5s2.9.9 3.5 2.5',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z',
  kaaba: 'M4 8l8-4 8 4v10l-8 3-8-3ZM4 8l8 3 8-3M12 11v10M4 13l8 3 8-3',
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.500 18.500 12 21c-2.500-2.500-3.500-5.500-3.500-9S9.500 5.500 12 3Z',
  palm: 'M12 21V10M12 10c-1-3-4-4-7-3 2 .5 4 1.500 5 3M12 10c1-3 4-4 7-3-2 .5-4 1.500-5 3M12 10c0-3 1-5 3-6-1 2-1 4-2 6M12 10c0-3-1-5-3-6 1 2 1 4 2 6M8 21h8',
  arrow: 'M19 12H5M11 6l-6 6 6 6',
  arrowUp: 'M7 17 17 7M8 7h9v9',
  menu: 'M4 7h16M4 12h16M4 17h10',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'm5 12.500 4.500 4.500L19 7.500',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  pin: 'M12 21s7-6.500 7-12a7 7 0 1 0-14 0c0 5.500 7 12 7 12ZM12 11.500a2.500 2.500 0 1 0 0-5 2.500 2.500 0 0 0 0 5Z',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2',
  shield: 'M12 3l8 3v6c0 4.500-3.200 8-8 9-4.800-1-8-4.500-8-9V6Z M9 12l2 2 4-4',
  users: 'M9 11a3.500 3.500 0 1 0 0-7 3.500 3.500 0 0 0 0 7ZM2.500 20c.5-3.500 3-5.500 6.500-5.500s6 2 6.500 5.500M16 4.500a3.500 3.500 0 0 1 0 6.500M18 14.700c2 .6 3.200 2.300 3.500 5.300',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  star: 'm12 3 2.700 5.600 6.100.8-4.500 4.200 1.100 6.100L12 16.800 6.600 19.700l1.100-6.100L3.200 9.400l6.100-.8Z',
  up: 'M12 19V5M6 11l6-6 6 6',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  facebook: 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.500c0-.3.200-.5.500-.5Z',
  play: 'M7 4.500v15l13-7.500Z',
  pause: 'M7 5h3v14H7zM14 5h3v14h-3z',
  train: 'M7 3h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2ZM5 11h14M8 21l2-3M16 21l-2-3M9 15h.01M15 15h.01',
  car: 'M4 16v-4l2-5h12l2 5v4M3 16h18M3 16v2h3v-2M18 16v2h3v-2M7 13h.01M17 13h.01M6 11h12',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM15.500 8.500l-2 5-5 2 2-5Z',
};
export function Icon({ name, size = 20, className = '', fill = false }) {
  return (
    <svg className={'ic ' + className} width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.600" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[name] || P.compass} />
    </svg>
  );
}

/* ---------- القوس (الهوية البصرية): نافذة المحراب ---------- */
export function ArchDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="path-grad" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#EFC87D" /><stop offset="1" stopColor="#F09410" /></linearGradient>
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d="M0,0 H1 V1 C0.74,0.99 0.38,0.95 0,0.86 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
export function Path({ className = '' }) {
  return (
    <div className={'path-wrap ' + className} aria-hidden="true">
      <svg viewBox="0 0 640 260" preserveAspectRatio="none"><path d="M640,118 C510,150 410,240 280,196 C180,160 130,60 40,50 L40,66 C122,74 160,170 270,214 C410,262 520,196 640,172 Z" /></svg>
      <i className="path-dot" />
    </div>
  );
}
export function Arch({ src, alt = '', ratio = '3 / 4.4', className = '', children, line = true, position = 'center', style }) {
  return (
    <div className={'arch ' + className} style={{ aspectRatio: ratio, ...style }}>
      {line && <i className="arch-dot" aria-hidden="true" />}
      <div className="arch-clip">
        {src && <img src={src} alt={alt} loading="lazy" style={{ objectPosition: position }} />}
        {children}
      </div>
    </div>
  );
}

/* ---------- هوكس ---------- */
export function useRoute() {
  const get = () => decodeURIComponent((location.hash || '#/').slice(1).split('?')[0] || '/');
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const f = () => { setRoute(get()); window.scrollTo({ top: 0, behavior: 'instant' }); };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return route;
}
export function useInView(opts = { threshold: 0.35 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, opts);
    io.observe(el); return () => io.disconnect();
  }, []);
  return [ref, seen];
}
export function Counter({ to, suffix = '' }) {
  const [ref, seen] = useInView();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return; }
    let raf, t0;
    const step = (t) => { t0 ??= t; const p = Math.min((t - t0) / 1600, 1); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref} className="num">{v.toLocaleString('en-US')}{suffix}</span>;
}

export const waLink = (text) => `${brand.wa}?text=${encodeURIComponent(text)}`;


/* ---------- الشريط العلوي: تاريخ هجري + وقت مكة ---------- */
function TopBar() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 30000); return () => clearInterval(id); }, []);
  let hijri = '', time = '';
  try {
    hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(now);
    time = new Intl.DateTimeFormat('ar-EG', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Riyadh' }).format(now);
  } catch {}
  const days = Math.ceil((new Date('2027-02-08T00:00:00') - now) / 864e5);
  return (
    <div className="topbar">
      <div className="wrap topbar-in">
        <span><Icon name="calendar" size={15} /> {hijri}</span>
        <span><Icon name="clock" size={15} /> الآن في مكة المكرمة {time}</span>
        {days > 0 && days < 400 && <a href="#/tools" className="hide-m">رمضان بعد نحو {days.toLocaleString('ar-EG')} يومًا</a>}
        <a href={"tel:" + brand.hotline} className="topbar-hot"><Icon name="phone" size={15} /> الخط الساخن <bdi dir="ltr">{brand.hotline}</bdi></a>
        <a href="tel:+201555559795" className="topbar-tel"><Icon name="phone" size={15} /> <bdi dir="ltr">01555559795</bdi></a>
      </div>
    </div>
  );
}

/* ---------- الهيدر ---------- */
export function Header({ route }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  return (
    <header className={'header' + (solid || open ? ' solid' : '')}>
      <TopBar />
      <div className="wrap header-in">
        <a href="#/" className="brand" aria-label="الدهمة للسياحة - الرئيسية">
          <span className="brand-mark"><img src="logo.svg" alt="" /></span>
          <span className="brand-text"><b>{brand.name}</b><small className="en">AL DAHMA TOURS</small></span>
        </a>
        <nav className={'nav' + (open ? ' open' : '')} aria-label="القائمة الرئيسية">
          {nav.map(([n, u]) => (
            <a key={u} href={'#' + u} className={route === u ? 'on' : ''}>{n}</a>
          ))}
          <a className="nav-cta-m" href="#/contact">تواصل معنا</a>
        </nav>
        <div className="header-act">
          <a className="btn btn-gold sm hide-m" href={waLink('السلام عليكم، أرغب في الاستفسار عن برامج الحج والعمرة.')} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={18} /> تواصل واتساب
          </a>
          <button className="burger" onClick={() => setOpen(!open)} aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={open}>
            <Icon name={open ? 'close' : 'menu'} size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}


/* ---------- شريط التلبية المتحرك + لوحة الحديث (أجواء الحج والعمرة) ---------- */
export function Talbiyah() {
  const t = 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ';
  return (
    <div className="talb" aria-label="التلبية">
      <div className="talb-track" aria-hidden="true">
        {[0, 1, 2, 3].map((k) => <span key={k}>{t}<i>✦</i></span>)}
      </div>
    </div>
  );
}
export function HadithBand() {
  return (
    <section className="hadith">
      <img src="images/madinah-birds.jpg" alt="" loading="lazy" />
      <div className="hadith-shade" />
      <div className="wrap hadith-in">
        <blockquote>
          <p>«العُمْرَةُ إِلَى العُمْرَةِ كَفَّارَةٌ لِمَا بَيْنَهُمَا، وَالحَجُّ المَبْرُورُ لَيْسَ لَهُ جَزَاءٌ إِلَّا الجَنَّةُ»</p>
          <footer>متفق عليه</footer>
        </blockquote>
        <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في حجز رحلة عمرة.')} target="_blank" rel="noreferrer">ابدأ رحلتك إليها</a>
      </div>
    </section>
  );
}

/* ---------- الفوتر ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-cta wrap">
        <div>
          <h2>جاهز لرحلتك؟ نبدأ بمحادثة واحدة.</h2>
          <p>أخبرنا بموعد سفرك وعدد المسافرين، ونرجع إليك ببرنامج واضح.</p>
        </div>
        <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في الاستفسار عن برنامج رحلة.')} target="_blank" rel="noreferrer">
          <Icon name="whatsapp" /> ابدأ المحادثة على واتساب
        </a>
      </div>
      <div className="wrap footer-grid">
        <div className="f-brand">
          <div className="brand"><span className="brand-mark"><img src="logo.svg" alt="" /></span><span className="brand-text"><b>{brand.name}</b><small className="en">AL DAHMA TOURS</small></span></div>
          <p className="f-motto">{brand.motto}.</p>
          <p>شركة سياحة مرخصة برقم {brand.license} من الفئة ({brand.licenseClass})، متخصصة في الحج والعمرة وكل خدمات السفر.</p>
        </div>
        <div><h4>البرامج</h4><a href="#/umrah">العمرة</a><a href="#/hajj">الحج</a><a href="#/tourism">السياحة الداخلية</a><a href="#/tourism">السياحة الخارجية</a></div>
        <div><h4>الخدمات</h4><a href="#/services">حجز الطيران</a><a href="#/services">حجز الفنادق</a><a href="#/services">النقل والانتقالات</a><a href="#/services">التأشيرات</a></div>
        <div>
          <h4>تواصل معنا</h4>
          <a href={"tel:" + brand.hotline}><Icon name="phone" size={16} /> الخط الساخن <bdi dir="ltr">{brand.hotline}</bdi></a>
          <a href={waLink('السلام عليكم')} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={16} /> واتساب <bdi dir="ltr">{brand.phoneIntl}</bdi></a>
          <a href={'tel:+2' + brand.phone}><Icon name="phone" size={16} /> {brand.phone}</a>
          <a href={brand.facebook} target="_blank" rel="noreferrer"><Icon name="facebook" size={16} /> صفحة فيسبوك</a>
          <a href={brand.website} target="_blank" rel="noreferrer"><Icon name="globe" size={16} /> aldahmatours.com</a>
        </div>
        <div className="f-branches">
          <h4>الفروع</h4>
          {brand.branches.map(([c, a]) => <p key={c}><b>{c}</b>{a}</p>)}
          <p className="f-hours">{brand.hours}</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} الدهمة للسياحة. جميع الحقوق محفوظة.</span>
        <span>ترخيص رقم {brand.license} · الفئة ({brand.licenseClass})</span>
      </div>
    </footer>
  );
}

/* ---------- عناصر عامة ---------- */
export function Float() {
  const [top, setTop] = useState(false);
  const [pct, setPct] = useState(0);
  const [chat, setChat] = useState(false);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement; const max = h.scrollHeight - innerHeight;
      setPct(max > 0 ? scrollY / max : 0); setTop(scrollY > 700);
    };
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f);
  }, []);
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && setChat(false); const c = () => setChat(false);
    addEventListener('keydown', k); addEventListener('hashchange', c); return () => { removeEventListener('keydown', k); removeEventListener('hashchange', c); };
  }, []);
  const q = [['العمرة', 'أرغب في الاستفسار عن برامج العمرة.', 'kaaba'], ['الحج', 'أرغب في الاستفسار عن برامج الحج.', 'moon'], ['السياحة', 'أرغب في الاستفسار عن رحلة سياحية.', 'globe'], ['الطيران والفنادق', 'أرغب في حجز طيران أو فندق.', 'plane']];
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${pct})` }} />
      {chat && (
        <div className="chat" role="dialog" aria-label="تواصل سريع">
          <div className="chat-h"><b>كيف نساعدك؟</b><small>نرد من 10 صباحًا إلى 9 مساءً، والجمعة إجازة.</small></div>
          <div className="chat-q">
            {q.map(([t, m, ic]) => <a key={t} href={waLink('السلام عليكم، ' + m)} target="_blank" rel="noreferrer"><Icon name={ic} size={20} />{t}<Icon name="arrow" size={16} className="go" /></a>)}
          </div>
          <a className="chat-call" href={'tel:' + brand.hotline}><Icon name="phone" size={18} /> أو اتصل بالخط الساخن <bdi dir="ltr">{brand.hotline}</bdi></a>
        </div>
      )}
      <button className={'fab' + (chat ? ' open' : '')} onClick={() => setChat(!chat)} aria-expanded={chat} aria-label={chat ? 'إغلاق' : 'تواصل سريع'}><Icon name={chat ? 'close' : 'whatsapp'} size={28} /></button>
      <button className={'to-top' + (top ? ' show' : '')} onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} aria-label="للأعلى"><Icon name="up" /></button>
      <nav className="mbar" aria-label="تواصل سريع">
        <a href={'tel:' + brand.hotline}><Icon name="phone" size={20} /> اتصل</a>
        <a className="main" href={waLink('السلام عليكم، أرغب في الاستفسار.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={20} /> واتساب</a>
        <a href="#/tools"><Icon name="compass" size={20} /> صمّم رحلتك</a>
      </nav>
    </>
  );
}

export function PageHero({ title, lead, image, crumb, position, cta = 'اسأل عن هذا البرنامج' }) {
  return (
    <section className="phero">
      <Path className="phero-path" />
      <div className="wrap phero-in">
        <div className="phero-copy">
          <p className="crumb"><a href="#/">الرئيسية</a> / {crumb}</p>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
          <a className="btn btn-gold lg" href={waLink(`السلام عليكم، أرغب في الاستفسار عن: ${crumb}`)} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> {cta}</a>
        </div>
        <Arch src={image} ratio="3 / 3.7" className="phero-arch" position={position} />
      </div>
    </section>
  );
}

export function Faq({ items }) {
  const [cur, setCur] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <div key={q} className={'faq-i' + (cur === i ? ' open' : '')}>
          <button onClick={() => setCur(cur === i ? -1 : i)} aria-expanded={cur === i}>
            <span>{q}</span><Icon name={cur === i ? 'minus' : 'plus'} size={20} />
          </button>
          <div className="faq-a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}

export function InquiryForm({ title = 'أخبرنا عن رحلتك', compact = false }) {
  const [f, setF] = useState({ name: '', type: 'عمرة', when: '', people: '2', note: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const msg = `السلام عليكم، أرغب في الاستفسار عن رحلة.\nالاسم: ${f.name || '-'}\nنوع الرحلة: ${f.type}\nالموعد المتوقع: ${f.when || '-'}\nعدد المسافرين: ${f.people}\n${f.note ? 'ملاحظات: ' + f.note : ''}`;
    const a = document.createElement('a'); a.href = waLink(msg); a.target = '_blank'; a.rel = 'noopener'; document.body.appendChild(a); a.click(); a.remove();
  };
  return (
    <form className={'form' + (compact ? ' compact' : '')} onSubmit={submit}>
      <h3>{title}</h3>
      <label>الاسم<input value={f.name} onChange={set('name')} placeholder="اسمك الكريم" required /></label>
      <div className="row2">
        <label>نوع الرحلة
          <select value={f.type} onChange={set('type')}>
            {['عمرة', 'حج', 'زيارة المدينة المنورة', 'سياحة داخلية', 'سياحة خارجية', 'حجز طيران', 'حجز فندق', 'تأشيرة'].map((o) => <option key={o}>{o}</option>)}
          </select>
        </label>
        <label>عدد المسافرين<input type="number" min="1" max="99" value={f.people} onChange={set('people')} /></label>
      </div>
      <label>الموعد المتوقع<input value={f.when} onChange={set('when')} placeholder="مثال: رمضان القادم" /></label>
      {!compact && <label>ملاحظات<textarea rows="3" value={f.note} onChange={set('note')} placeholder="مستوى الإقامة، عدد الليالي، أي طلب خاص" /></label>}
      <button className="btn btn-gold lg block" type="submit"><Icon name="whatsapp" /> أرسل الطلب عبر واتساب</button>
      <small className="hint">سيفتح تطبيق واتساب برسالة جاهزة، وليس عليك إلا الإرسال.</small>
    </form>
  );
}
