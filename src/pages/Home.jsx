import React, { useEffect, useRef, useState } from 'react';
import { Path, Arch, Icon, Counter, Faq, InquiryForm, Talbiyah, HadithBand, waLink } from '../ui';
import { Finder } from './Tools';
import { Planner } from './Planner';
import { Transport } from './Transport';
import { brand, stats, heroSlides, services, journey, why, packages, faq, img, video } from '../data';

/* ---------- مواقيت الصلاة بمكة (Aladhan API) ---------- */
function Prayer() {
  const [t, setT] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch('https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=Saudi%20Arabia&method=4')
      .then((r) => r.json()).then((j) => alive && setT(j.data.timings)).catch(() => {});
    return () => { alive = false; };
  }, []);
  if (!t) return null;
  const list = [['الفجر', 'Fajr'], ['الظهر', 'Dhuhr'], ['العصر', 'Asr'], ['المغرب', 'Maghrib'], ['العشاء', 'Isha']];
  return (
    <div className="prayer" aria-label="مواقيت الصلاة في مكة المكرمة">
      <b><Icon name="clock" size={16} /> مواقيت الصلاة بمكة المكرمة</b>
      <ul>{list.map(([a, k]) => <li key={k}><span>{a}</span><em>{t[k]}</em></li>)}</ul>
    </div>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % heroSlides.length), 5200);
    return () => clearInterval(id);
  }, [paused]);
  const s = heroSlides[i];
  return (
    <section className="hero">
      <Path className="hero-path" />
      <div className="wrap hero-in">
        <div className="hero-copy">
          <p className="hero-badge"><Icon name="shield" size={18} /> مرخصة برقم {brand.license} · الفئة ({brand.licenseClass})</p>
          <h1>
            <span>رحلتك إلى بيت الله،</span>
            <span>بطمأنينة <em>تبدأ من أول خطوة</em></span>
          </h1>
          <p className="hero-lead">أكثر من 17 عامًا ونحن نرافق ضيوف الرحمن في الحج والعمرة، بفنادق وطيران ونقل وإشراف ديني وإداري نختاره بأنفسنا.</p>
          <div className="hero-cta">
            <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في الاستفسار عن برامج الحج والعمرة.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> احجز استشارة مجانية</a>
            <a className="btn btn-ghost lg" href="#/umrah">شاهد برامج العمرة</a>
          </div>
          <ul className="hero-points">
            <li><Icon name="check" size={18} /> فنادق قريبة من الحرم</li>
            <li><Icon name="check" size={18} /> مرشد ومشرف طوال الرحلة</li>
            <li><Icon name="check" size={18} /> باقات مرنة لكل ميزانية</li>
          </ul>
        </div>

        <div className="hero-stage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <Arch ratio="3 / 4.5" className="hero-arch">
            {heroSlides.map((h, k) => (
              <img key={h.src} src={h.src} alt={h.place} className={'layer' + (k === i ? ' on' : '')} loading={k === 0 ? 'eager' : 'lazy'} />
            ))}
            <div className="hero-cap" key={i}>
              <small>{s.line}</small>
              <b>{s.place}</b>
            </div>
          </Arch>
          <div className="hero-thumbs" role="tablist" aria-label="اختيار الصورة">
            {heroSlides.map((h, k) => (
              <button key={h.src} role="tab" aria-selected={k === i} aria-label={h.place} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
                <Arch src={h.src} ratio="3 / 4" line={false} />
              </button>
            ))}
          </div>
          <Prayer />
        </div>
      </div>
      <div className="hero-edge" />
    </section>
  );
}

function Facts() {
  return (
    <section className="facts">
      <div className="wrap facts-in">
        {stats.map((s) => (
          <div key={s.label} className="fact">
            <Counter to={s.n} suffix={s.suffix} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="sec-head">
          <h2>كل ما تحتاجه رحلتك، تحت مظلة واحدة</h2>
          <p>من التذكرة إلى الغرفة إلى الطواف، نتولى التفاصيل حتى تتفرغ للمعنى.</p>
        </div>
        <div className="bento">
          {services.map((s) => (
            <a key={s.t} href={'#' + s.to} className={'tile ' + s.size}>
              <img src={s.img} alt="" loading="lazy" style={{ objectPosition: s.pos || "center" }} />
              <div className="tile-txt">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
              <span className="tile-go"><Icon name="arrowUp" size={18} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const [act, setAct] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) setAct(Number(e.target.dataset.i)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <section className="sec dark journey">
      <div className="pattern bg-pattern" />
      <div className="wrap">
        <div className="sec-head light">
          <h2>رحلتك معنا، من أول رسالة إلى يوم العودة</h2>
          <p>خمس محطات واضحة، وفي كل واحدة فريق يعرف دوره.</p>
        </div>
        <div className="journey-grid">
          <div className="journey-sticky" aria-hidden="true">
            <Arch ratio="3 / 4.2" className="j-arch">
              {journey.map((j, k) => <img key={j.t} src={j.img} alt="" className={'layer' + (k === act ? ' on' : '')} loading="lazy" />)}
            </Arch>
            <div className="j-count"><b>{act + 1}</b><span>من {journey.length}</span></div>
          </div>
          <ol className="steps">
            {journey.map((j, k) => (
              <li key={j.t} data-i={k} ref={(el) => (refs.current[k] = el)} className={k === act ? 'on' : ''}>
                <span className="step-n">{k + 1}</span>
                <div>
                  <h3>{j.t}</h3>
                  <p>{j.d}</p>
                  <img className="step-img" src={j.img} alt="" loading="lazy" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Stay() {
  return (
    <section className="sec sand stay">
      <div className="wrap stay-in">
        <div className="stay-copy">
          <h2>تفتح ستارة غرفتك فترى الحرم</h2>
          <p>نوضح لك المسافة إلى الحرم وطبيعة الغرفة قبل الحجز، ونرشح لك الفندق المناسب لعائلتك وميزانيتك، مع غرف بإطلالة على الحرم حسب التوفر.</p>
          <ul className="ticks">
            <li><Icon name="check" size={20} /> المسافة إلى الحرم مكتوبة بالمتر في عرضك</li>
            <li><Icon name="check" size={20} /> نوع الغرفة والإطلالة قبل أن تدفع</li>
            <li><Icon name="check" size={20} /> فنادق في مكة والمدينة بحسب باقتك</li>
          </ul>
          <a className="btn btn-gold lg" href="#/services">تعرف على خدمات الإقامة</a>
        </div>
        <div className="stay-pair">
          <Arch src={img.roomKaaba} ratio="3 / 4.4" className="mini s1" />
          <div className="stay-col">
            <Arch src={img.roomMadinah} ratio="1 / 1" className="mini s2" />
            <Arch src={img.windowTea} ratio="3 / 3.4" className="mini s3" position="50% 60%" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Vid({ v, label }) {
  const ref = useRef(null);
  const [on, setOn] = useState(!matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const el = ref.current; if (!el) return; on ? el.play().catch(() => setOn(false)) : el.pause(); }, [on]);
  return (
    <div className="vid">
      <div className="vid-wrap">
        <Arch ratio="478 / 850" className="vid-arch">
          <video ref={ref} src={v.src} poster={v.poster} muted loop playsInline preload="metadata" />
        </Arch>
        <button className="vid-btn" onClick={() => setOn(!on)} aria-label={on ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}><Icon name={on ? 'pause' : 'play'} size={18} fill /></button>
      </div>
      <span className="vid-label">{label}</span>
    </div>
  );
}
function Films() {
  return (
    <section className="sec films">
      <div className="wrap films-in">
        <div className="films-copy">
          <h2>مشاهد من قلب الحرمين</h2>
          <p>هذا ما ينتظرك: ساحات الحرم المكي بصفوف المصلين، ومنارات المسجد النبوي تحت سماء المدينة. نرافقك إليها بخطوات ميسّرة وقلب مطمئن.</p>
          <a className="btn btn-dark lg" href="#/umrah">اكتشف رحلة العمرة</a>
        </div>
        <div className="films-pair">
          <Vid v={video.makkah} label="المسجد الحرام" />
          <Vid v={video.madinah} label="المسجد النبوي" />
          <Vid v={video.street} label="الطريق إلى الحرم" />
        </div>
      </div>
    </section>
  );
}

function Packages() {
  return (
    <section className="sec sand" id="packages">
      <div className="wrap">
        <div className="sec-head">
          <h2>باقات تناسب كل عائلة</h2>
          <p>اختر الفئة الأقرب إليك، ثم نعدّل فيها حتى تصبح مقاسك تمامًا. الأسعار تُحدَّد وقت طلبك حسب الموسم والتوفر.</p>
        </div>
        <div className="pk-grid">
          {packages.map((p) => (
            <article key={p.name} className={'pk' + (p.featured ? ' featured' : '')}>
              <Arch src={p.img} ratio="3 / 2.6" line={false} className="pk-arch" />
              <div className="pk-body">
                <span className="pk-tag">{p.tag}</span>
                <h3>{p.name}</h3>
                <ul>{p.list.map((l) => <li key={l}><Icon name="check" size={18} />{l}</li>)}</ul>
                <a className={'btn block ' + (p.featured ? 'btn-gold' : 'btn-dark')} href={waLink(`السلام عليكم، أرغب في الاستفسار عن ${p.name}.`)} target="_blank" rel="noreferrer">اسأل عن السعر</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const items = [
    [img.kaabaArch, 'الكعبة المشرفة من نافذة المحراب'], [img.madinah, 'المسجد النبوي'], [img.arafatDusk, 'جبل عرفة عند الغروب'],
    [img.toHaram, 'الطريق إلى الحرم'], [img.wing, 'رحلة الطيران'], [img.madinahSunset, 'المسجد النبوي وقت الغروب'], [img.trainStation, 'قطار الحرمين السريع'], [img.carAirport, 'استقبال من المطار'], [img.quranCourt, 'ساعة مع القرآن'], [img.towers, 'أبراج الفنادق'],
    [img.haramHall, 'داخل أروقة الحرم'], [img.beach, 'شواطئ الغروب'], [img.streetNight, 'ليالي مكة'], [img.roomKaaba, 'غرفة بإطلالة على الكعبة'], [img.kaabaSunset, 'الكعبة وقت الغروب'], [img.madinahBirds, 'المسجد النبوي والحمام'], [img.makkahTowers, 'أبراج مكة'], [img.saiCrowd, 'نحو المسعى'], [img.crowdRoad, 'الطريق إلى الحرم يوم الجمعة'],
  ];
  const [box, setBox] = useState(null);
  useEffect(() => {
    if (box === null) return;
    const k = (e) => { if (e.key === 'Escape') setBox(null); if (e.key === 'ArrowLeft') setBox((b) => (b + 1) % items.length); if (e.key === 'ArrowRight') setBox((b) => (b - 1 + items.length) % items.length); };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, [box]);
  return (
    <section className="sec gallery">
      <div className="wrap sec-head">
        <h2>لقطات من الرحلة</h2>
        <p>اضغط على أي صورة لتكبيرها.</p>
      </div>
      <div className="g-rail" tabIndex="0" aria-label="معرض الصور">
        {items.map(([s, a], k) => (
          <button key={s} className="g-item" onClick={() => setBox(k)} aria-label={'تكبير: ' + a}>
            <Arch src={s} alt={a} ratio="3 / 4.3" line={false} />
            <span>{a}</span>
          </button>
        ))}
      </div>
      {box !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setBox(null)}>
          <button className="lb-x" aria-label="إغلاق"><Icon name="close" size={26} /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={items[box][0]} alt={items[box][1]} />
            <figcaption>{items[box][1]}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

function Why() {
  return (
    <section className="sec">
      <div className="wrap why-in">
        <div className="why-side">
          <h2>لماذا يختارنا الناس لأهم رحلة في عمرهم؟</h2>
          <p>لأن هذه الرحلة لا تحتمل التجربة. ولأننا نعرف ما تحتاجه قبل أن تسأل.</p>
          <Arch src={img.namira} ratio="3 / 3.4" className="why-arch" />
        </div>
        <ul className="why-list">
          {why.map(([t, d]) => (
            <li key={t}><Icon name="star" size={20} /><div><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ul>
      </div>
    </section>
  );
}


function ToolsTeaser() {
  const items = [['compass', 'اختر برنامجك', 'ثلاثة أسئلة وترشيح فوري للباقة الأنسب.'], ['moon', 'عدّاد الطواف والسعي', 'سبعة أشواط تعدّها بلمسة.'], ['clock', 'عدّ تنازلي', 'كم يتبقى على رمضان ويوم عرفة.'], ['globe', 'حاسبة الريال', 'ميزانيتك بالجنيه في ثوانٍ.']];
  return (
    <section className="sec sand">
      <div className="wrap">
        <div className="sec-head"><h2>ابدأ تخطيط رحلتك الآن</h2><p>اختر برنامجك في دقيقة، ثم أرسله لفريقنا برسالة واتساب جاهزة.</p></div>
        <Finder />
        <div className="teaser-row">
          {items.slice(1).map(([ic, t, d]) => (
            <a key={t} href="#/tools" className="teaser"><Icon name={ic} size={24} /><div><b>{t}</b><span>{d}</span></div></a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Facts />
      <Talbiyah />
      <Services />
      <Transport />
      <Journey />
      <ToolsTeaser />
      <Stay />
      <HadithBand />
      <Packages />
      <Planner />
      <Films />
      <Gallery />
      <Why />
      <section className="sec sand">
        <div className="wrap ask-in">
          <div className="ask-copy">
            <h2>أسئلة يسألها كل معتمر</h2>
            <Faq items={faq} />
          </div>
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
