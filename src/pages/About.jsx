import React, { useEffect, useRef, useState } from 'react';
import { Arch, Icon, Counter, InquiryForm, Talbiyah, HadithBand, waLink, useInView } from '../ui';
import { brand, img, video, stats } from '../data';

/* ---------- 1) الهيرو: نافذة حية على الحرم ---------- */
function Hero() {
  const v = useRef(null);
  useEffect(() => { v.current && v.current.play().catch(() => {}); }, []);
  return (
    <section className="ab-hero">
      <img className="ab-hero-bg" src={img.kaabaNight} alt="" />
      <div className="ab-hero-shade" />
      <div className="wrap ab-hero-in">
        <div className="ab-hero-copy">
          <p className="hero-badge"><Icon name="shield" size={18} /> ترخيص رقم {brand.license} · الفئة ({brand.licenseClass})</p>
          <h1>صدق نرتقي به</h1>
          <p className="ab-sub">نحن الدهمة للسياحة. منذ 17 عامًا نرافق ضيوف الرحمن إلى مكة والمدينة، ونحمل عنهم كل ما يشغلهم عن الطواف والدعاء.</p>
          <div className="hero-cta">
            <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في حجز مقعد في رحلة عمرة أو حج.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> احجز مقعدك الآن</a>
            <a className="btn btn-ghost lg" href="#ab-scenes" onClick={(e) => { e.preventDefault(); document.getElementById('ab-scenes').scrollIntoView({ behavior: 'smooth' }); }}>عِش الرحلة معنا</a>
          </div>
        </div>
        <div className="ab-hero-win">
          <Arch ratio="478 / 850" className="ab-win">
            <video ref={v} src={video.makkah.src} poster={video.makkah.poster} muted loop playsInline autoPlay preload="metadata" />
          </Arch>
          <span className="ab-live"><i /> من ساحات الحرم</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- 2) من نحن + ختم الترخيص ---------- */
function Story() {
  return (
    <section className="sec">
      <div className="wrap ab-story">
        <div>
          <h2>شرف نحمله، وأمانة نؤديها</h2>
          <p className="para">الدهمة للسياحة شركة مرخصة برقم {brand.license} من الفئة ({brand.licenseClass})، تخصصت في رحلات الحج والعمرة، وتقدم إلى جانبها السياحة الداخلية والخارجية وحجز الطيران والفنادق والنقل.</p>
          <p className="para">نؤمن أن خدمة ضيف الرحمن شرف قبل أن تكون عملًا. لذلك نختار الفندق والرحلة والنقل بأنفسنا، ونُرفق بكل مجموعة مرشدًا دينيًا ومشرفًا إداريًا، ونبقى على الهاتف قبل السفر وأثناءه وبعده.</p>
          <ul className="ab-quick">
            <li><Icon name="check" size={20} /> نوضح لك ما يشمله البرنامج قبل أن تحجز</li>
            <li><Icon name="check" size={20} /> نجيب على واتساب في أي وقت تحتاجنا فيه</li>
            <li><Icon name="check" size={20} /> نرافقك حتى تعود إلى بيتك سالمًا</li>
          </ul>
        </div>
        <div className="ab-seal-wrap">
          <Arch src={img.towers} ratio="3 / 4" className="ab-story-arch" />
          <div className="ab-seal" aria-label={`ترخيص رقم ${brand.license} فئة ${brand.licenseClass}`}>
            <svg viewBox="0 0 120 120" aria-hidden="true"><path d="M60 4l10 12 15-5 5 15 15 4-3 16 12 11-12 11 3 16-15 4-5 15-15-5-10 12-10-12-15 5-5-15-15-4 3-16L4 62l12-11-3-16 15-4 5-15 15 5z" /></svg>
            <div><small>ترخيص رقم</small><b>{brand.license}</b><span>الفئة ({brand.licenseClass})</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3) المشاهد: سكرول يعيشك أجواء الرحلة ---------- */
const scenes = [
  { img: img.kaabaArch, pos: 'center 40%', t: 'أول نظرة إلى الكعبة', d: 'لحظة تنتظرها منذ سنوات. نحرص ألا يشغلك فيها شيء، لا حجز ولا تذكرة ولا موعد.' },
  { img: img.haramHall, pos: 'center', t: 'تطوف مع الآلاف وقلبك واحد', d: 'نرتب لك الإقامة والانتقال، فتصل إلى الطواف بكامل قوتك وهدوئك.' },
  { img: img.streetNight, pos: 'center', t: 'ليالي مكة', d: 'تمشي إلى الحرم في هدوء الليل، ونختار لك مكان إقامة يناسب قدرتك وقدرة من معك.' },
  { img: img.arafatDusk, pos: 'center 70%', t: 'يوم عرفة', d: 'أعظم أيام العمر. يرافقك مرشد ومشرف في كل مشعر، وتتفرغ أنت للدعاء.' },
  { img: img.trainInside, pos: 'center', t: 'بين الحرمين بلا تعب', d: 'قطار سريع أو سيارة خاصة تنقلك من مكة إلى المدينة وأنت مرتاح.' },
  { img: img.madinahSunset, pos: 'center', t: 'ثم المدينة، حيث السكينة', d: 'زيارة المسجد النبوي بجدول مريح وخطوات واضحة، بلا استعجال.' },
  { img: img.quranCourt, pos: 'center', t: 'وقت للقرآن في أروقة النبي ﷺ', d: 'نترك لك ساعات حرة لتجلس مع كتاب الله، فهذه ثمرة الرحلة.' },
];
function Scenes() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  useEffect(() => {
    const f = () => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - innerHeight;
      const p = total > 0 ? Math.min(0.999, Math.max(0, -r.top / total)) : 0;
      setI(Math.floor(p * scenes.length));
    };
    f(); addEventListener('scroll', f, { passive: true }); addEventListener('resize', f);
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f); };
  }, []);
  return (
    <section id="ab-scenes" ref={ref} className="scenes" style={{ height: `${scenes.length * 85 + 15}vh` }}>
      <div className="scenes-stick">
        {scenes.map((s, k) => (
          <div key={s.t} className={'scene' + (k === i ? ' on' : '')} aria-hidden={k !== i}>
            <img className="scene-bg" src={s.img} alt="" />
            <div className="scene-shade" />
            <div className="wrap scene-in">
              <div className="scene-copy">
                <small>تخيّل</small>
                <h2>{s.t}</h2>
                <p>{s.d}</p>
              </div>
              <Arch src={s.img} ratio="3 / 4.2" className="scene-arch" position={s.pos} />
            </div>
          </div>
        ))}
        <div className="scene-dots" aria-hidden="true">{scenes.map((s, k) => <i key={s.t} className={k === i ? 'on' : ''} />)}</div>
        <a className="scene-cta btn btn-gold" href={waLink('السلام عليكم، أرغب في حجز رحلة.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> احجز رحلتك</a>
      </div>
    </section>
  );
}


/* ---------- بين الحرمين ---------- */
function Bridge() {
  const [ref, seen] = useInView({ threshold: 0.25 });
  const stops = [
    { t: 'مكة المكرمة', d: 'الطواف والسعي', src: img.kaabaNight, pos: 'center' },
    { t: 'قطار الحرمين', d: 'رحلة مريحة بين المدينتين', src: img.trainStation, pos: '72% center' },
    { t: 'المدينة المنورة', d: 'سكينة المسجد النبوي', src: img.madinahDome, pos: 'center' },
  ];
  return (
    <section className="sec bridge">
      <div className="wrap">
        <div className="sec-head"><h2>نرافقك من الحرم إلى الحرم</h2><p>من الطواف في مكة، إلى القطار السريع، إلى سكينة المدينة المنورة. رحلة واحدة بإشراف واحد.</p></div>
        <div ref={ref} className={'bridge-row' + (seen ? ' seen' : '')}>
          <svg className="bridge-path" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0,60 C160,0 340,120 500,60 S840,0 1000,60" /></svg>
          {stops.map((x, i) => (
            <div key={x.t} className="bridge-stop" style={{ '--i': i }}>
              <Arch src={x.src} ratio="3 / 4" position={x.pos} />
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 4) ما نعدك به ---------- */
const promises = [
  ['kaaba', 'برنامج واضح قبل الحجز', 'تعرف الفندق والمدة والانتقالات وما يشمله السعر قبل أن تقرر.'],
  ['hotel', 'إقامة مختارة بعناية', 'نذكر لك المسافة إلى الحرم وطبيعة الغرفة بصراحة.'],
  ['users', 'مرشد ومشرف مع المجموعة', 'تسأل فيُجاب عليك في الموقع نفسه، لا عبر الهاتف فقط.'],
  ['id', 'أوراقك على عاتقنا', 'نراجع التأشيرة والحجوزات قبل السفر حتى لا تتفاجأ في المطار.'],
  ['whatsapp', 'نردّ عليك بسرعة', 'واتساب وهاتف يردّ عليك قبل السفر وأثناءه وبعده.'],
  ['moon', 'نحترم عبادتك', 'جدول لا يرهقك، ووقت كافٍ للطواف والصلاة والدعاء.'],
];
function Promises() {
  return (
    <section className="sec sand">
      <div className="wrap">
        <div className="sec-head"><h2>ما نلتزم به معك</h2><p>ستة التزامات نعمل بها في كل رحلة، كبيرة كانت أو صغيرة.</p></div>
        <div className="prom-grid">
          {promises.map(([ic, t, d]) => (
            <div key={t} className="prom">
              <span className="prom-ic"><Icon name={ic} size={26} /></span>
              <div><h3>{t}</h3><p>{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 5) الحجز المبكر + النموذج ---------- */
function Book() {
  const [now] = useState(Date.now());
  const days = Math.max(0, Math.ceil((new Date('2027-02-08T00:00:00').getTime() - now) / 864e5));
  return (
    <section className="ab-book">
      <img className="ab-book-bg" src={img.roomView} alt="" />
      <div className="ab-book-shade" />
      <div className="wrap ab-book-in">
        <div className="ab-book-copy">
          <h2>مقعدك في الرحلة القادمة ينتظرك</h2>
          {days > 0 && <p className="ab-days"><Counter to={days} /> <span>يوم تقريبًا على رمضان</span></p>}
          <p className="lead">كلما حجزت مبكرًا اتسعت اختياراتك. هذا ما يمنحك الحجز المبكر:</p>
          <ul className="ticks light">
            <li><Icon name="check" size={20} /> فنادق أقرب إلى الحرم قبل أن تمتلئ</li>
            <li><Icon name="check" size={20} /> مواعيد طيران أنسب وأسعار أهدأ</li>
            <li><Icon name="check" size={20} /> وقت كافٍ لتجهيز التأشيرة والأوراق</li>
            <li><Icon name="check" size={20} /> راحة بال قبل السفر بأسابيع</li>
          </ul>
          <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في حجز مقعد مبكر.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> احجز مقعدًا مبكرًا</a>
        </div>
        <InquiryForm title="أخبرنا عن رحلتك" compact />
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Hero />
      <Talbiyah />
      <Story />
      <Bridge />
      <Scenes />
      <HadithBand />
      <section className="sec dark">
        <div className="pattern bg-pattern" />
        <div className="wrap facts-in on-dark">
          {stats.map((s) => <div key={s.label} className="fact"><Counter to={s.n} suffix={s.suffix} /><span>{s.label}</span></div>)}
        </div>
      </section>
      <Promises />
      <Book />
    </>
  );
}
