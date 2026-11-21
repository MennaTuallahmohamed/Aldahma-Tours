import React, { useState } from 'react';
import { Icon, Arch, waLink } from '../ui';
import { img } from '../data';

const months = ['رمضان', 'شعبان', 'رجب', 'ذو الحجة', 'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'شوال', 'ذو القعدة'];
const stars = [['near', 'قريب جدًا من الحرم', 'مشي قصير إلى الصلاة'], ['mid', 'متوسط المسافة', 'توازن بين السعر والقرب'], ['eco', 'اقتصادي', 'أبعد قليلًا مع نقل مريح']];
const moves = [['train', 'قطار الحرمين', 'train'], ['car', 'سيارة خاصة', 'car'], ['bus', 'حافلة مجموعة', 'bus']];
const extras = [['visa', 'التأشيرة والأوراق'], ['air', 'تذاكر الطيران'], ['ziy', 'زيارات المدينة'], ['guide', 'مشرف خاص للمجموعة']];

function Stepper({ v, set, min, max, label, sub }) {
  return (
    <div className="pl-step">
      <div><b>{label}</b>{sub && <small>{sub}</small>}</div>
      <div className="pl-ctl">
        <button type="button" onClick={() => set(Math.max(min, v - 1))} aria-label={'تقليل ' + label} disabled={v <= min}><Icon name="minus" size={18} /></button>
        <output>{v}</output>
        <button type="button" onClick={() => set(Math.min(max, v + 1))} aria-label={'زيادة ' + label} disabled={v >= max}><Icon name="plus" size={18} /></button>
      </div>
    </div>
  );
}

export function Planner() {
  const [kind, setKind] = useState('umrah');
  const [mk, setMk] = useState(5);
  const [md, setMd] = useState(3);
  const [ad, setAd] = useState(2);
  const [ch, setCh] = useState(0);
  const [month, setMonth] = useState('');
  const [star, setStar] = useState('near');
  const [mv, setMv] = useState('train');
  const [ex, setEx] = useState(['visa', 'air']);
  const nights = mk + md;
  const tog = (k) => setEx(ex.includes(k) ? ex.filter((x) => x !== k) : [...ex, k]);
  const pm = nights ? Math.round((mk / nights) * 100) : 100;
  const stop = (a) => stars.find((s) => s[0] === a)[1];
  const msg = [
    'السلام عليكم، أرغب في عرض مكتوب لرحلتي:',
    `النوع: ${kind === 'umrah' ? 'عمرة' : 'حج'}`,
    `المدة: ${nights} ليلة (${mk} في مكة${md ? ` و${md} في المدينة` : ''})`,
    `المسافرون: ${ad} بالغ${ch ? ` و${ch} أطفال` : ''}`,
    month ? `الموعد المتوقع: ${month}` : '',
    `الفندق: ${stop(star)}`,
    md ? `الانتقال بين المدينتين: ${moves.find((m) => m[0] === mv)[1]}` : '',
    ex.length ? `أحتاج: ${ex.map((k) => extras.find((e) => e[0] === k)[1]).join('، ')}` : '',
  ].filter(Boolean).join('\n');

  return (
    <section className="sec pl" id="planner">
      <div className="wrap">
        <div className="sec-head"><h2>صمّم رحلتك بنفسك</h2><p>حرّك الأرقام وشاهد برنامجك يتشكل أمامك، ثم أرسله لفريقنا ليرجع إليك بعرض مكتوب وواضح.</p></div>
        <div className="pl-grid">
          <div className="pl-form">
            <div className="seg" role="tablist" aria-label="نوع الرحلة">
              <button type="button" role="tab" aria-selected={kind === 'umrah'} className={kind === 'umrah' ? 'on' : ''} onClick={() => setKind('umrah')}>عمرة</button>
              <button type="button" role="tab" aria-selected={kind === 'hajj'} className={kind === 'hajj' ? 'on' : ''} onClick={() => setKind('hajj')}>حج</button>
            </div>
            <Stepper v={mk} set={setMk} min={2} max={20} label="ليالي مكة" sub="مدة الإقامة قرب الحرم المكي" />
            <Stepper v={md} set={setMd} min={0} max={12} label="ليالي المدينة" sub="صفر إن لم تكن ضمن رحلتك" />
            <Stepper v={ad} set={setAd} min={1} max={12} label="البالغون" />
            <Stepper v={ch} set={setCh} min={0} max={8} label="الأطفال" />
            <label className="pl-sel"><span>الموعد المتوقع</span>
              <select value={month} onChange={(e) => setMonth(e.target.value)}><option value="">لم أحدده بعد</option>{months.map((m) => <option key={m}>{m}</option>)}</select>
            </label>
            <fieldset><legend>مسافة الفندق من الحرم</legend>
              <div className="pl-opts">{stars.map(([k, t, s]) => <button type="button" key={k} className={star === k ? 'on' : ''} onClick={() => setStar(k)}><b>{t}</b><small>{s}</small></button>)}</div>
            </fieldset>
            {md > 0 && <fieldset><legend>الانتقال بين مكة والمدينة</legend>
              <div className="pl-opts three">{moves.map(([k, t, ic]) => <button type="button" key={k} className={mv === k ? 'on' : ''} onClick={() => setMv(k)}><Icon name={ic} size={22} /><b>{t}</b></button>)}</div>
            </fieldset>}
            <fieldset><legend>أحتاج أيضًا</legend>
              <div className="pl-chips">{extras.map(([k, t]) => <button type="button" key={k} aria-pressed={ex.includes(k)} className={ex.includes(k) ? 'on' : ''} onClick={() => tog(k)}><Icon name="check" size={15} />{t}</button>)}</div>
            </fieldset>
          </div>

          <aside className="pl-sum" aria-live="polite">
            <Arch src={md ? img.madinahBirds : img.kaabaSunset} ratio="16 / 8" className="pl-pic" />
            <div className="pl-total"><b>{nights}</b><span>ليلة · {nights + 1} يومًا تقريبًا</span></div>
            <div className="pl-bar" aria-hidden="true"><i style={{ width: pm + '%' }} /><u style={{ width: 100 - pm + '%' }} /></div>
            <div className="pl-legend"><span><i className="a" />مكة {mk}</span>{md > 0 && <span><i className="b" />المدينة {md}</span>}</div>
            <ul>
              <li><Icon name="users" size={18} />{ad} بالغ{ch ? ` و${ch} أطفال` : ''}</li>
              <li><Icon name="hotel" size={18} />{stop(star)}</li>
              {md > 0 && <li><Icon name="train" size={18} />{moves.find((m) => m[0] === mv)[1]} بين المدينتين</li>}
              {month && <li><Icon name="calendar" size={18} />{month}</li>}
              {ex.map((k) => <li key={k}><Icon name="check" size={18} />{extras.find((e) => e[0] === k)[1]}</li>)}
            </ul>
            <a className="btn btn-gold lg block" href={waLink(msg)} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> أرسل برنامجي للفريق</a>
            <small className="hint">لا نعرض سعرًا هنا لأنه يتغير بالموسم. نرد بعرض مكتوب بالسعر والتفاصيل.</small>
          </aside>
        </div>
      </div>
    </section>
  );
}
