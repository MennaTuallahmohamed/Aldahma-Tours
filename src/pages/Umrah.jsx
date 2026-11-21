import React, { useState } from 'react';
import { Arch, Icon, PageHero, Faq, waLink, useInView } from '../ui';
import { ScrollTimeline } from './Timeline';
import { img, rites, faq } from '../data';

const legs = [
  { t: 'مكة المكرمة', d: 'تحرم، وتطوف بالبيت، وتسعى بين الصفا والمروة، وتتحلل من إحرامك.', img: img.kaabaNight },
  { t: 'بين الحرمين', d: 'قطار سريع أو سيارة خاصة تنقلك بين المدينتين براحة وبموعد مرتب.', img: img.trainStation, pos: '72% center' },
  { t: 'المدينة المنورة', d: 'تزور المسجد النبوي وتسلّم على النبي ﷺ، وتزور المواضع المباركة بجدول هادئ.', img: img.madinahDome },
];

const places = [
  { t: 'الروضة الشريفة', d: 'ما بين بيت النبي ﷺ ومنبره. غالبًا تتطلب تصريحًا مسبقًا عبر القنوات الرسمية، ونرشدك إلى خطواته.', img: img.madinahSign },
  { t: 'المسجد النبوي', d: 'ساحاته الرحبة ومظلاته الكبيرة وقبته الخضراء، وفيه تجد سكينة تختلف عن كل مكان.', img: img.madinahDome },
  { t: 'ساعة مع القرآن', d: 'خصّص وقتًا للتلاوة في أروقة المسجد وساحاته، فهي من أجمل ما تحمله معك من المدينة.', img: img.quranCourt },
];
const more = [
  ['مسجد قباء', 'أول مسجد بُني في الإسلام، وورد في فضل الصلاة فيه بعد التطهر في البيت أجر عمرة.'],
  ['مسجد القبلتين', 'صلّى فيه النبي ﷺ متجهًا إلى بيت المقدس ثم نزل الأمر بالتحول إلى الكعبة.'],
  ['جبل أحد', 'موقع غزوة أحد وشهدائها، وتكفي فيه زيارة قصيرة للاعتبار والدعاء.'],
];

const plan = [
  { day: 'اليوم 1', t: 'الوصول والإحرام', d: 'استقبال في المطار، ثم انتقال إلى الفندق بمكة، والإحرام من الميقات المناسب.', chips: ['استقبال', 'إحرام'], icon: 'plane', img: img.carAirport },
  { day: 'اليوم 2', t: 'أداء العمرة', d: 'الطواف والسعي والحلق أو التقصير، بصحبة المرشد.', chips: ['طواف', 'سعي', 'حلق'], icon: 'kaaba', img: img.kaabaArch },
  { day: 'من 3 إلى 4', t: 'أيام في مكة', d: 'صلوات في الحرم، وطواف تطوع، ووقت حر للعبادة والدعاء.', chips: ['الحرم', 'عبادة حرة'], icon: 'moon', img: img.haramHall },
  { day: 'اليوم 5', t: 'إلى المدينة', d: 'انتقال بالقطار السريع أو بسيارة خاصة، ثم تسكين وراحة.', chips: ['قطار الحرمين'], icon: 'train', img: img.trainStation, pos: '72% center' },
  { day: 'من 6 إلى 8', t: 'المدينة المنورة', d: 'المسجد النبوي، الروضة الشريفة (بالتصريح)، قباء، القبلتين، وأحد.', chips: ['الروضة', 'قباء', 'أحد'], icon: 'star', img: img.madinahSunset },
  { day: 'اليوم 9 و10', t: 'العودة', d: 'تجهيز الحقائب والانتقال للمطار، ثم رحلة العودة بسلامة الله.', chips: ['توديع', 'مطار'], icon: 'plane', img: img.wing },
];

/* ---------- خريطة المواقيت التفاعلية ---------- */
const mq = [
  { k: 'dh', t: 'ذو الحليفة', sub: 'أبيار علي', who: 'أهل المدينة ومن يمر بها', far: 'نحو 450 كم شمال مكة', x: 320, y: 62 },
  { k: 'ju', t: 'الجحفة', sub: 'رابغ', who: 'أهل مصر والشام والمغرب', far: 'نحو 180 كم شمال غرب مكة', x: 108, y: 150, eg: true },
  { k: 'da', t: 'ذات عرق', sub: '', who: 'أهل العراق', far: 'نحو 95 كم شمال شرق مكة', x: 532, y: 150 },
  { k: 'qa', t: 'قرن المنازل', sub: 'السيل الكبير', who: 'أهل نجد والطائف', far: 'نحو 95 كم شرق مكة', x: 560, y: 300 },
  { k: 'ya', t: 'يلملم', sub: 'السعدية', who: 'أهل اليمن', far: 'نحو 120 كم جنوب مكة', x: 320, y: 470 },
];
function MiqatMap() {
  const [k, setK] = useState('ju');
  const m = mq.find((x) => x.k === k);
  return (
    <div className="mq">
      <svg className="mq-svg" viewBox="0 0 640 520" role="img" aria-label="مخطط مواقيت الإحرام حول مكة المكرمة">
        <circle cx="320" cy="275" r="150" className="mq-ring" />
        <circle cx="320" cy="275" r="215" className="mq-ring r2" />
        {mq.map((p) => (
          <line key={p.k} x1="320" y1="275" x2={p.x} y2={p.y} className={'mq-line' + (p.k === k ? ' on' : '')} />
        ))}
        <g className="mq-mak"><circle cx="320" cy="275" r="34" /><path d="M303 268l17-8 17 8v18l-17 7-17-7zM303 268l17 6 17-6M320 274v19" /></g>
        <text x="320" y="330" className="mq-lbl">مكة المكرمة</text>
        {mq.map((p) => (
          <g key={p.k} className={'mq-node' + (p.k === k ? ' on' : '')} onClick={() => setK(p.k)} tabIndex="0" role="button" aria-label={p.t} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setK(p.k)}>
            <circle cx={p.x} cy={p.y} r="26" className="halo" />
            <circle cx={p.x} cy={p.y} r="13" />
            <text x={p.x} y={p.y + 44}>{p.t}</text>
          </g>
        ))}
      </svg>
      <div className="mq-card" key={k}>
        {m.eg && <span className="mq-eg">الأقرب لرحلات مصر</span>}
        <small>ميقات</small>
        <h3>{m.t}{m.sub ? ` (${m.sub})` : ''}</h3>
        <ul>
          <li><Icon name="users" size={18} /> {m.who}</li>
          <li><Icon name="pin" size={18} /> {m.far}</li>
        </ul>
        <p>لو كنت قادمًا بالطائرة، يخبرك مرشد المجموعة بموعد الإحرام قبل الوصول إلى محاذاة الميقات.</p>
        <small className="note">المسافات تقريبية للتعريف.</small>
      </div>
    </div>
  );
}

export default function Umrah() {
  const [k, setK] = useState(0);
  const r = rites[k];
  return (
    <>
      <PageHero crumb="العمرة" title="عمرة تبدأ في مكة وتكتمل في المدينة" lead="نرتب لك الطواف والسعي، ثم نصحبك إلى المدينة المنورة بجدول هادئ وإقامة مريحة." image={img.kaabaArch} cta="احجز عمرتك" />

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>رحلتك على ثلاث محطات</h2><p>مكة للعمرة، والقطار بين الحرمين، والمدينة للزيارة. نتولى كل محطة ونوصلها بالتي بعدها.</p></div>
          <div className="legs">
            {legs.map((l, i) => (
              <article key={l.t} className="leg" style={{ '--i': i }}>
                <Arch src={l.img} ratio="3 / 3.8" position={l.pos} />
                <h3>{l.t}</h3>
                <p>{l.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sand">
        <div className="wrap">
          <div className="sec-head"><h2>أعمال العمرة بالترتيب</h2><p>اختر الخطوة لتعرف ما يحدث فيها وكيف نساعدك.</p></div>
          <div className="rites">
            <div className="rites-tabs" role="tablist">
              {rites.map((x, i) => (
                <button key={x.t} role="tab" aria-selected={i === k} className={i === k ? 'on' : ''} onClick={() => setK(i)}>
                  <span className="step-n">{i + 1}</span>{x.t}
                </button>
              ))}
            </div>
            <div className="rite-view" key={k}>
              <div className="rite-txt">
                <h3>{r.t}</h3>
                <p>{r.d}</p>
                <p className="tip"><Icon name="compass" size={18} /> {r.tip}</p>
                <small className="note">المحتوى للتعريف العام، وليس فتوى. يُرجع لأهل العلم والمرشد الشرعي في التفاصيل.</small>
              </div>
              <Arch src={r.img} ratio="3 / 3.6" className="rite-arch" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== فصل المدينة المنورة ===== */}
      <section className="mad">
        <img className="mad-bg" src={img.madinahSunset} alt="" />
        <div className="mad-shade" />
        <div className="wrap mad-in">
          <div className="mad-copy">
            <small>الفصل الثاني من الرحلة</small>
            <h2>المدينة المنورة، حيث تهدأ الروح</h2>
            <p>بعد مكة تأتي المدينة بسكينتها. نجعل زيارتك للمسجد النبوي بلا عجلة: وقت لصلاة هادئة، وسلام على رسول الله ﷺ، ومواضع مباركة تزورها مع من يشرح لك قصتها.</p>
            <a className="btn btn-gold lg" href={waLink('السلام عليكم، أرغب في برنامج عمرة مع زيارة المدينة المنورة.')} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> احجز عمرة مع المدينة</a>
          </div>
          <Arch src={img.madinahSunset} ratio="3 / 4.2" className="mad-arch" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>ما تزوره في المدينة</h2></div>
          <div className="places">
            {places.map((p, i) => (
              <article key={p.t} className="place" style={{ '--i': i }}>
                <Arch src={p.img} ratio="3 / 4" />
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </article>
            ))}
          </div>
          <div className="more">
            {more.map(([t, d]) => (
              <div key={t}><Icon name="moon" size={22} /><div><h3>{t}</h3><p>{d}</p></div></div>
            ))}
          </div>
          <small className="note c">المحتوى للتعريف العام. تتغير تنظيمات الدخول والتصاريح، ونؤكدها لك قبل السفر.</small>
        </div>
      </section>

      {/* ===== بين الحرمين ===== */}
      <section className="sec sand">
        <div className="wrap two">
          <div>
            <h2>بين الحرمين في ساعات قليلة</h2>
            <p className="para">القطار السريع يربط مكة المكرمة بالمدينة المنورة، فتختصر عناء الطريق وتصل إلى المسجد النبوي وأنت مرتاح. إن فضلت سيارة خاصة، رتبناها لك بموعد واضح.</p>
            <ul className="ticks">
              {['حجز التذاكر وتنسيق الوصول للمحطة', 'استقبال بعد الوصول وانتقال إلى الفندق', 'خيارات خاصة للعائلات وكبار الزوار'].map((t) => <li key={t}><Icon name="check" size={20} />{t}</li>)}
            </ul>
            <a className="btn btn-dark lg" href="#/services">تعرف على خدمات النقل</a>
          </div>
          <div className="duo">
            <Arch src={img.trainStation} ratio="3 / 4" position="72% center" className="d1" />
            <Arch src={img.trainInside} ratio="3 / 4" line={false} className="d2" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>برنامج عمرة نموذجي</h2><p>مثال استرشادي لعشرة أيام. تتغير الأيام والمدن بحسب الباقة وموعد الرحلة.</p></div>
          <ScrollTimeline items={plan} />
        </div>
      </section>

      <section className="sec sand">
        <div className="wrap two">
          <div>
            <h2>ماذا يشمل برنامج العمرة؟</h2>
            <ul className="ticks">
              {['إقامة في مكة والمدينة بحسب الباقة', 'استقبال من المطار وانتقالات بين المدن', 'متابعة التأشيرة وتذاكر الطيران', 'مرشد ديني ومشرف إداري مرافق للمجموعة', 'زيارة المسجد النبوي والمزارات بجدول مريح', 'متابعة من الفريق قبل السفر وأثناءه وبعده'].map((t) => <li key={t}><Icon name="check" size={20} />{t}</li>)}
            </ul>
          </div>
          <Arch src={img.haramHall} ratio="3 / 3.6" className="side-arch" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head"><h2>مواقيت الإحرام</h2><p>اضغط على أي ميقات لترى من يمرّ به وأين يقع من مكة.</p></div>
          <MiqatMap />
        </div>
      </section>

      <section className="sec sand"><div className="wrap narrow"><div className="sec-head"><h2>أسئلة شائعة</h2></div><Faq items={faq} /></div></section>
    </>
  );
}
