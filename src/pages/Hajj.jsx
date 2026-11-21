import React, { useState } from 'react';
import { Arch, Icon, PageHero, waLink } from '../ui';
import { ScrollTimeline } from './Timeline';
import { img } from '../data';

const days = [
  { day: '8 ذو الحجة', t: 'يوم التروية', d: 'تُحرم بالحج وتتوجه إلى منى، وتصلي فيها الظهر والعصر والمغرب والعشاء والفجر قصرًا بلا جمع.', chips: ['إحرام', 'منى'], icon: 'moon', img: img.namira },
  { day: '9 ذو الحجة', t: 'يوم عرفة', d: 'الوقوف بعرفة وهو ركن الحج الأعظم. يوم الدعاء والتضرع، ثم تنصرف بعد الغروب إلى مزدلفة.', chips: ['عرفات', 'الوقوف'], icon: 'star', img: img.arafatDusk, pos: 'center 80%' },
  { day: 'ليلة العاشر', t: 'مزدلفة', d: 'تصلي المغرب والعشاء جمعًا، وتبيت وتجمع الحصى، وللضعفاء رخصة الانصراف بعد منتصف الليل.', chips: ['مبيت', 'جمع الحصى'], icon: 'moon', img: img.arafatRock },
  { day: '10 ذو الحجة', t: 'يوم النحر', d: 'ترمي جمرة العقبة، ثم النحر، ثم الحلق أو التقصير، ثم طواف الإفاضة والسعي.', chips: ['رمي', 'نحر', 'طواف الإفاضة'], icon: 'kaaba', img: img.kaabaNight },
  { day: '11 إلى 13', t: 'أيام التشريق', d: 'المبيت بمنى ورمي الجمرات الثلاث كل يوم بعد الزوال، ويجوز التعجل في اليوم الثاني عشر.', chips: ['منى', 'رمي الجمرات'], icon: 'compass', img: img.namira },
  { day: 'قبل المغادرة', t: 'طواف الوداع', d: 'آخر عهد للحاج بالبيت قبل مغادرة مكة، ويسقط عن الحائض والنفساء.', chips: ['مكة', 'وداع'], icon: 'check', img: img.kaabaArch },
];

/* ---------- مخطط المشاعر: كيف ننقلك بين المناسك ---------- */
const stops = [
  { k: 'mak', t: 'مكة', x: 7 },
  { k: 'min', t: 'منى', x: 34 },
  { k: 'muz', t: 'مزدلفة', x: 61 },
  { k: 'ara', t: 'عرفات', x: 89 },
];
const X = Object.fromEntries(stops.map((s) => [s.k, s.x]));
const steps = [
  { day: '8 ذو الحجة', t: 'من مكة إلى منى', from: 'mak', to: 'min', d: 'تخرج بعد الإحرام في موعد مرتب مع المجموعة، ونوصلك إلى مخيمك في منى مع حقائبك.', tip: 'احمل حقيبة صغيرة بما تحتاجه ليومين.' },
  { day: '9 ذو الحجة', t: 'من منى إلى عرفات', from: 'min', to: 'ara', d: 'ننقلك بعد الفجر إلى عرفات قبل الزحام، ونحجز لك مكانك في المخيم قبل وصولك.', tip: 'أكثر من الماء وتجنب الشمس المباشرة.' },
  { day: 'بعد الغروب', t: 'من عرفات إلى مزدلفة', from: 'ara', to: 'muz', d: 'تنصرف بعد الغروب بنظام يخفف الزحام، وتبيت في مزدلفة وتجمع الحصى.', tip: 'يُستحب أن تجمع حصى الرمي من مزدلفة.' },
  { day: '10 ذو الحجة', t: 'من مزدلفة إلى منى', from: 'muz', to: 'min', d: 'بعد الفجر تعود إلى منى لرمي جمرة العقبة والنحر والحلق، ثم نرتب لك الذهاب إلى مكة.', tip: 'احرص على المشي بهدوء مع مجموعتك.' },
  { day: '10 إلى 13', t: 'من منى إلى مكة', from: 'min', to: 'mak', d: 'تذهب إلى الحرم لطواف الإفاضة والسعي، ثم ترجع إلى منى لباقي أيام التشريق.', tip: 'اختر وقتًا أخف زحامًا بنصيحة المرشد.' },
];
const modes = [['train', 'قطار المشاعر'], ['bus', 'حافلات منظمة'], ['users', 'مشيًا مع المجموعة']];

function MashaerMap() {
  const [i, setI] = useState(0);
  const s = steps[i];
  const pos = X[s.to];
  const from = X[s.from];
  return (
    <section className="sec dark mash">
      <div className="pattern bg-pattern" />
      <div className="wrap">
        <div className="sec-head light">
          <h2>ننقلك بين المشاعر وأنت مطمئن</h2>
          <p>اختر محطة من محطات الحج لترى كيف تنتقل بين مكة ومنى وعرفات ومزدلفة.</p>
        </div>

        <div className="mmap" aria-label="مخطط توضيحي للمشاعر">
          <div className="mmap-road" />
          <div className="mmap-fill" style={{ insetInlineStart: Math.min(from, pos) + '%', width: Math.abs(pos - from) + '%' }} />
          {stops.map((p) => (
            <div key={p.k} className={'mmap-stop' + (p.k === s.to ? ' on' : '') + (p.k === s.from ? ' from' : '')} style={{ insetInlineStart: p.x + '%' }}>
              <i><Icon name={p.k === 'mak' ? 'kaaba' : p.k === 'ara' ? 'star' : 'moon'} size={20} /></i>
              <span>{p.t}</span>
            </div>
          ))}
          <div className="mmap-bus" style={{ insetInlineStart: pos + '%' }}><span><Icon name="bus" size={22} /></span></div>
        </div>
        <p className="mmap-note">مخطط توضيحي لترتيب المشاعر وليس للمسافات.</p>

        <div className="mash-grid">
          <div className="mash-steps" role="tablist">
            {steps.map((x, k) => (
              <button key={x.t} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
                <small>{x.day}</small><b>{x.t}</b>
              </button>
            ))}
          </div>
          <div className="mash-card" key={i}>
            <small>{s.day}</small>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            <p className="tip dark-tip"><Icon name="compass" size={18} /> {s.tip}</p>
            <div className="mash-modes">
              {modes.map(([ic, t]) => <span key={t}><Icon name={ic} size={18} />{t}</span>)}
            </div>
            <small className="mash-note">نختار لك الوسيلة الأنسب بحسب تنظيمات الجهات المسؤولة عن الحج في موسمك.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hajj() {
  return (
    <>
      <PageHero crumb="الحج" title="الحج، رحلة العمر بتنظيم يُطمئنك" lead="من يوم التروية إلى طواف الوداع، فريق يرافقك في كل مشعر ويشرح لك كل خطوة." image={img.arafatDusk} cta="احجز مقعدك في الحج" />

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>أيام الحج، يومًا بيوم</h2><p>انزل بالصفحة لتتبع مسار الحاج من منى إلى طواف الوداع.</p></div>
          <ScrollTimeline items={days} />
          <small className="note c">المحتوى للتعريف العام، وليس فتوى. يُرجع لأهل العلم والجهة المنظمة في التفاصيل.</small>
        </div>
      </section>

      <section className="sec sand crowd">
        <div className="wrap">
          <div className="sec-head"><h2>الزحام حقيقي، والتنظيم يخففه</h2><p>في أيام الحج تمتلئ الطرق والساحات. لهذا نحدد مواعيد التحرك مسبقًا، ونرافقك بمجموعة صغيرة ومشرف يعرف الطريق.</p></div>
          <div className="crowd-row">
            <figure><Arch src={img.crowdRoad} ratio="3 / 4.2" /><figcaption><b>الطريق إلى الحرم</b>نحدد لك وقت الخروج لتتجنب ذروة الزحام.</figcaption></figure>
            <figure><Arch src={img.saiCrowd} ratio="3 / 4.2" /><figcaption><b>المسعى</b>نذكّرك بالبقاء مع مجموعتك وبرقم المشرف.</figcaption></figure>
            <figure><Arch src={img.kaabaSunset} ratio="3 / 4.2" /><figcaption><b>الطواف</b>نختار وقتًا أخف زحامًا بنصيحة المرشد.</figcaption></figure>
          </div>
        </div>
      </section>

      <MashaerMap />

      <section className="sec sand">
        <div className="wrap two">
          <Arch src={img.namira} ratio="3 / 3.6" className="side-arch" />
          <div>
            <h2>كيف نخدمك في الحج</h2>
            <ul className="ticks">
              {['حجز الإقامة في مكة ومنى بحسب الباقة', 'انتقالات منظمة بين المشاعر', 'مشرف ديني وإداري مع المجموعة طوال الأيام', 'تجهيز الأوراق والتأشيرة قبل السفر', 'قائمة تجهيزات واضحة تصلك مبكرًا', 'متابعة صحية وإرشادية على مدار الساعة'].map((t) => <li key={t}><Icon name="check" size={20} />{t}</li>)}
            </ul>
            <div className="hero-cta">
              <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في الاستفسار عن برامج الحج.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> اسأل عن مقاعد الحج</a>
              <a className="btn btn-dark lg" href="#/guide">قائمة التجهيز</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
