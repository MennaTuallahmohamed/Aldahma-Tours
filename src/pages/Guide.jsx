import React, { useState } from 'react';
import { Arch, Icon, PageHero, Faq, waLink } from '../ui';
import { img, checklist, ziyarat, faq } from '../data';

const icons = { 'الوثائق': 'id', 'الملابس': 'star', 'الصحة': 'shield', 'متفرقات': 'compass' };
const msg = (p) => p === 100 ? 'جاهز للسفر. تقبل الله منك' : p >= 70 ? 'اقتربت، بقيت أشياء قليلة' : p >= 30 ? 'أنت في منتصف الطريق' : p > 0 ? 'بداية موفقة، تابع بالوثائق' : 'ابدأ بالوثائق، فهي الأهم';

export default function Guide() {
  const all = checklist.flatMap((g) => g.items.map((i) => g.g + '|' + i));
  const [done, setDone] = useState(() => { try { return JSON.parse(localStorage.getItem('dahma_check') || '[]'); } catch { return []; } });
  const save = (n) => { setDone(n); try { localStorage.setItem('dahma_check', JSON.stringify(n)); } catch {} };
  const toggle = (k) => save(done.includes(k) ? done.filter((x) => x !== k) : [...done, k]);
  const pct = Math.round((done.length / all.length) * 100);
  const left = all.filter((k) => !done.includes(k));
  const R = 78, L = 2 * Math.PI * R;
  const leftText = checklist.map((g) => {
    const r = g.items.filter((i) => !done.includes(g.g + '|' + i));
    return r.length ? `${g.g}: ${r.join('، ')}` : '';
  }).filter(Boolean).join('\n');
  return (
    <>
      <PageHero crumb="دليل المعتمر" title="دليلك قبل أن تحزم حقيبتك" lead="قائمة تجهيز تفاعلية، وأماكن تزورها، وأجوبة عن أكثر الأسئلة تكرارًا." image={img.passport} cta="اسأل عن رحلتك" />

      <section className="sec gd">
        <div className="wrap">
          <div className={'gd-top' + (pct === 100 ? ' full' : '')}>
            <div className="gd-ring" role="img" aria-label={`الجاهزية ${pct} بالمئة`}>
              <svg viewBox="0 0 200 200" aria-hidden="true">
                <circle cx="100" cy="100" r={R} className="gd-bg" />
                <circle cx="100" cy="100" r={R} className="gd-fg" strokeDasharray={L} strokeDashoffset={L * (1 - pct / 100)} />
              </svg>
              <b>{pct}<small>%</small></b>
            </div>
            <div className="gd-msg">
              <h2>{msg(pct)}</h2>
              <p>{done.length} من {all.length} جاهز. يُحفظ تقدمك في هذا المتصفح.</p>
              <div className="gd-act">
                {left.length > 0
                  ? <a className="btn btn-gold" href={waLink('السلام عليكم، هذه الأشياء التي لم أجهزها بعد لرحلتي:\n' + leftText + '\nأرجو مساعدتي.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> أرسل المتبقي لفريقنا</a>
                  : <a className="btn btn-gold" href={waLink('السلام عليكم، جهّزت كل شيء وأرغب في تأكيد حجز رحلتي.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={18} /> أكّد حجزك الآن</a>}
                <button className="btn btn-ghost" onClick={() => save([])}>ابدأ من جديد</button>
              </div>
            </div>
          </div>

          <div className="gd-grid">
            {checklist.map((g) => {
              const n = g.items.filter((i) => done.includes(g.g + '|' + i)).length;
              return (
                <div key={g.g} className={'gd-col' + (n === g.items.length ? ' all' : '')}>
                  <header>
                    <span className="gd-ic"><Icon name={icons[g.g] || 'check'} size={22} /></span>
                    <h3>{g.g}</h3>
                    <em>{n}/{g.items.length}</em>
                  </header>
                  <div className="gd-bar"><i style={{ width: (n / g.items.length) * 100 + '%' }} /></div>
                  {g.items.map((it) => {
                    const k = g.g + '|' + it; const on = done.includes(k);
                    return (
                      <label key={k} className={on ? 'on' : ''}>
                        <input type="checkbox" checked={on} onChange={() => toggle(k)} />
                        <span className="box"><Icon name="check" size={15} /></span>
                        <span className="gd-t">{it}</span>
                      </label>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec sand">
        <div className="wrap">
          <div className="sec-head"><h2>أماكن تستحق الزيارة</h2></div>
          <div className="zi-grid">
            {ziyarat.map((z) => (
              <article key={z.t} className="zi">
                <Arch src={z.img} ratio="3 / 3.6" line={false} />
                <small>{z.c}</small><h3>{z.t}</h3><p>{z.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="sec"><div className="wrap narrow"><div className="sec-head"><h2>أسئلة شائعة</h2></div><Faq items={faq} /></div></section>
    </>
  );
}
