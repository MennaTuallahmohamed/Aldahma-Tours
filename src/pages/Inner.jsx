import React, { useState } from 'react';
import { Arch, Icon, PageHero, Faq, InquiryForm, Counter, waLink } from '../ui';
import { Transport } from './Transport';
import { Vid } from './Home';
import { useEffect } from 'react';
import { video } from '../data';
import { brand, img, rites, hajjDays, miqats, ziyarat, checklist, serviceRows, destinations, faq, stats } from '../data';

/* ---------- السياحة ---------- */
export function Tourism() {
  const [tab, setTab] = useState('domestic');
  const list = destinations[tab];
  return (
    <>
      <PageHero crumb="السياحة" title="إجازتك القادمة، على مقاسك" lead="رحلات داخل مصر وخارجها، نرتبها لك من التذكرة إلى الفندق إلى الانتقالات." image={img.sea} />
      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>اختر وجهتك</h2></div>
          <div className="seg" role="tablist">
            <button role="tab" aria-selected={tab === 'domestic'} className={tab === 'domestic' ? 'on' : ''} onClick={() => setTab('domestic')}>داخل مصر</button>
            <button role="tab" aria-selected={tab === 'international'} className={tab === 'international' ? 'on' : ''} onClick={() => setTab('international')}>حول العالم</button>
          </div>
          <div className="dest-grid">
            {list.map((d) => (
              <a key={d.t} className="dest" href={waLink(`السلام عليكم، أرغب في الاستفسار عن رحلة إلى ${d.t}.`)} target="_blank" rel="noreferrer">
                <span className="dest-arch" aria-hidden="true" />
                <h3>{d.t}</h3>
                <p>{d.tag}</p>
                <span className="dest-go">اسأل عن الرحلة <Icon name="arrow" size={16} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="sec sea">
        <div className="wrap sea-in">
          <div className="sea-copy">
            <h2>إجازة تبدأ من البحر</h2>
            <p className="para">شواطئ وهواء وأفق مفتوح. نرتب لك الإقامة والانتقالات والرحلات البحرية، وتختار أنت إيقاع الإجازة.</p>
            <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في الاستفسار عن رحلة بحرية أو شاطئية.')} target="_blank" rel="noreferrer">اسأل عن رحلات الشواطئ</a>
          </div>
          <div className="sea-vid"><Vid v={video.sea} label="رحلة بحرية" /></div>
        </div>
      </section>
      <section className="sec sand">
        <div className="wrap two">
          <div>
            <h2>رحلة تُصمَّم حولك</h2>
            <p className="para">أخبرنا بميزانيتك ومدة إجازتك ومن سيسافر معك، ونقترح عليك وجهة وبرنامجًا مناسبين. نحجز الطيران والفندق والانتقالات في مكان واحد.</p>
            <ul className="ticks">
              {['طيران وفنادق بأسعار واضحة ومكتوبة', 'برامج للعائلات والأزواج والمجموعات', 'انتقالات ومزارات منظمة'].map((t) => <li key={t}><Icon name="check" size={20} />{t}</li>)}
            </ul>
          </div>
          <InquiryForm compact title="اطلب رحلتك" />
        </div>
      </section>
    </>
  );
}

function Row({ s, i }) {
  return (
    <article className={'srow' + (i % 2 ? ' rev' : '')}>
      <div className="srow-imgs">
        <Arch src={s.img} ratio="3 / 4" className="s1" />
        <Arch src={s.img2} ratio="3 / 4" line={false} className="s2" />
      </div>
      <div className="srow-txt">
        <h2>{s.t}</h2>
        <p>{s.d}</p>
        <ul className="ticks">{s.list.map((l) => <li key={l}><Icon name="check" size={20} />{l}</li>)}</ul>
        <a className="btn btn-dark" href={waLink(`السلام عليكم، أرغب في الاستفسار عن ${s.t}.`)} target="_blank" rel="noreferrer">اطلب {s.t}</a>
      </div>
    </article>
  );
}

/* ---------- الخدمات ---------- */
export function Services() {
  return (
    <>
      <PageHero crumb="الخدمات" title="خدمات سفر كاملة في مكان واحد" lead="طيران، فنادق، انتقالات، تأشيرات. نرتبها معًا فلا تتشتت بين أكثر من جهة." image={img.wing} />
      <section className="sec">
        <div className="wrap">{serviceRows.slice(0, 2).map((s, i) => <Row key={s.t} s={s} i={i} />)}</div>
      </section>
      <Transport />
      <section className="sec">
        <div className="wrap">{serviceRows.slice(3).map((s, i) => <Row key={s.t} s={s} i={i} />)}</div>
      </section>
    </>
  );
}

/* ---------- تواصل ---------- */

function Branches() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(id); }, []);
  const f = new Intl.DateTimeFormat('en-US', { timeZone: 'Africa/Cairo', weekday: 'short', hour: 'numeric', hour12: false }).formatToParts(now);
  const day = f.find((p) => p.type === 'weekday').value; const hr = +f.find((p) => p.type === 'hour').value % 24;
  const open = day !== 'Fri' && hr >= 10 && hr < 21;
  const label = open ? 'مفتوح الآن حتى 9 مساءً' : day === 'Thu' && hr >= 21 || day === 'Fri' ? 'مغلق الآن، نفتح السبت 10 صباحًا' : 'مغلق الآن، نفتح 10 صباحًا';
  return (
    <section className="sec sand">
      <div className="wrap">
        <div className="sec-head"><h2>فروعنا</h2><p>{brand.hours}. بتوقيت القاهرة.</p></div>
        <span className={'br-state' + (open ? ' on' : '')}><i />{label}</span>
        <div className="br-grid">
          {brand.branches.map(([c, a]) => (
            <article key={c} className="br">
              <Icon name="pin" size={24} />
              <h3>فرع {c}</h3>
              <p>{a}</p>
              <a className="btn btn-dark sm" href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('الدهمة للسياحة ' + a + ' ' + c)} target="_blank" rel="noreferrer">افتح الخريطة</a>
            </article>
          ))}
        </div>
        <p className="br-hot">الخط الساخن <bdi dir="ltr">{brand.hotline}</bdi></p>
      </div>
    </section>
  );
}
export function Contact() {
  return (
    <>
      <PageHero crumb="تواصل معنا" title="نردّ عليك بنفسنا" lead="اكتب لنا على واتساب أو اتصل بنا، وسنساعدك في اختيار الأنسب." image={img.toHaram} cta="راسلنا الآن" />
      <section className="sec">
        <div className="wrap two">
          <div className="contact-list">
            <a href={waLink('السلام عليكم')} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={26} /><div><b>واتساب</b><span dir="ltr">{brand.phoneIntl}</span></div></a>
            <a href={'tel:+2' + brand.phone}><Icon name="phone" size={26} /><div><b>اتصال هاتفي</b><span dir="ltr">{brand.phone}</span></div></a>
            <a href={brand.facebook} target="_blank" rel="noreferrer"><Icon name="facebook" size={26} /><div><b>فيسبوك</b><span>EldahmaTours</span></div></a>
            <a href={brand.website} target="_blank" rel="noreferrer"><Icon name="globe" size={26} /><div><b>الموقع الرسمي</b><span dir="ltr">aldahmatours.com</span></div></a>
            <div className="lic"><Icon name="shield" size={26} /><div><b>ترخيص رقم {brand.license}</b><span>الفئة ({brand.licenseClass})</span></div></div>
          </div>
          <InquiryForm />
        </div>
      </section>
      <Branches />
    </>
  );
}
