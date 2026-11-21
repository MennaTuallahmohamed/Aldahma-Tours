import { Planner } from './Planner';
import React, { useEffect, useState } from 'react';
import { Arch, Icon, PageHero, waLink } from '../ui';
import { img, packages } from '../data';

const store = {
  get: (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- اختيار البرنامج المناسب (3 أسئلة) ---------- */
const Q = [
  { k: 'type', q: 'ما نوع رحلتك؟', o: ['عمرة', 'حج', 'عمرة مع زيارة المدينة', 'سياحة'] },
  { k: 'who', q: 'من سيسافر معك؟', o: ['أسافر وحدي', 'مع العائلة', 'مع مجموعة أو أصدقاء', 'مع والديّ'] },
  { k: 'pri', q: 'ما الأهم عندك؟', o: ['القرب من الحرم', 'توفير التكلفة', 'الراحة والخدمة الخاصة'] },
];
const pick = (pri) => (pri === 'توفير التكلفة' ? packages[0] : pri === 'الراحة والخدمة الخاصة' ? packages[2] : packages[1]);

export function Finder() {
  const [a, setA] = useState({});
  const step = Q.findIndex((x) => !a[x.k]);
  const done = step === -1;
  const pk = done ? pick(a.pri) : null;
  return (
    <div className="finder">
      <div className="finder-dots" aria-hidden="true">{Q.map((x, i) => <i key={x.k} className={a[x.k] ? 'on' : i === step ? 'cur' : ''} />)}</div>
      {!done ? (
        <div key={step} className="finder-q">
          <h3>{Q[step].q}</h3>
          <div className="finder-opts">
            {Q[step].o.map((o) => <button key={o} onClick={() => setA({ ...a, [Q[step].k]: o })}>{o}</button>)}
          </div>
        </div>
      ) : (
        <div className="finder-res">
          <Arch src={pk.img} ratio="3 / 2.6" line={false} className="finder-arch" />
          <div>
            <small>الأنسب لك</small>
            <h3>{pk.name}</h3>
            <p>{a.type} · {a.who} · الأولوية: {a.pri}</p>
            <ul>{pk.list.map((l) => <li key={l}><Icon name="check" size={18} />{l}</li>)}</ul>
            <div className="finder-act">
              <a className="btn btn-gold" target="_blank" rel="noreferrer" href={waLink(`السلام عليكم، أرغب في ${pk.name}.\nنوع الرحلة: ${a.type}\nالمسافرون: ${a.who}\nالأولوية: ${a.pri}`)}><Icon name="whatsapp" size={18} /> أرسل اختياراتي</a>
              <button className="btn btn-ghost-d" onClick={() => setA({})}>ابدأ من جديد</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- عدّاد الطواف والسعي ---------- */
function Tally() {
  const [mode, setMode] = useState('الطواف');
  const [n, setN] = useState(() => store.get('dahma_tally', { 'الطواف': 0, 'السعي': 0 }));
  const c = n[mode];
  const set = (v) => { const x = { ...n, [mode]: Math.max(0, Math.min(7, v)) }; setN(x); store.set('dahma_tally', x); try { navigator.vibrate && navigator.vibrate(30); } catch {} };
  const R = 84, L = 2 * Math.PI * R;
  const hint = mode === 'الطواف' ? 'يبدأ من الحجر الأسود وينتهي عنده' : 'يبدأ من الصفا وينتهي بالمروة';
  const label = c === 7 ? 'تم بحمد الله' : c === 0 ? 'لم تبدأ بعد' : `الشوط ${c} من 7`;
  return (
    <div className="tool tally">
      <h3>عدّاد {mode}</h3>
      <div className="seg sm" role="tablist">
        {['الطواف', 'السعي'].map((m) => <button key={m} role="tab" aria-selected={mode === m} className={mode === m ? 'on' : ''} onClick={() => setMode(m)}>{m}</button>)}
      </div>
      <div className="ring">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r={R} className="ring-bg" />
          <circle cx="100" cy="100" r={R} className="ring-fg" strokeDasharray={L} strokeDashoffset={L * (1 - c / 7)} />
        </svg>
        <b>{c}</b>
      </div>
      <p className="ring-label" role="status">{label}</p>
      <small className="hint-d">{hint}</small>
      <div className="tally-act">
        <button className="btn btn-dark lg" onClick={() => set(c + 1)} disabled={c >= 7}><Icon name="plus" size={20} /> شوط جديد</button>
        <button className="round" onClick={() => set(c - 1)} aria-label="تراجع عن شوط"><Icon name="minus" size={20} /></button>
        <button className="round" onClick={() => set(0)} aria-label="تصفير العدّاد"><Icon name="close" size={18} /></button>
      </div>
    </div>
  );
}

/* ---------- عدّ تنازلي ---------- */
const targets = [
  ['رمضان المبارك', '2027-02-08T00:00:00', 'تقريبًا، ويثبت برؤية الهلال'],
  ['يوم عرفة', '2027-05-15T00:00:00', 'تقريبًا، ويثبت برؤية الهلال'],
];
function Countdown() {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(id); }, []);
  return (
    <div className="tool count">
      <h3>كم يتبقى على الموعد؟</h3>
      {targets.map(([t, d, note]) => {
        const left = Math.max(0, new Date(d).getTime() - now);
        const days = Math.floor(left / 864e5), hrs = Math.floor((left % 864e5) / 36e5);
        return (
          <div key={t} className="count-row">
            <div><b>{t}</b><small>{note}</small></div>
            <div className="count-n"><span>{days.toLocaleString('en-US')}</span><em>يوم</em><span>{hrs}</span><em>ساعة</em></div>
          </div>
        );
      })}
      <a className="btn btn-dark block" href="#/contact">احجز قبل الزحام</a>
    </div>
  );
}

/* ---------- أدعية ---------- */
const duas = [
  ['التلبية', 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ.'],
  ['دخول المسجد', 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.'],
  ['بين الركن اليماني والحجر الأسود', 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.'],
  ['عند الصفا والمروة', 'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ. أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ.'],
  ['يوم عرفة', 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.'],
  ['دعاء السفر', 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ.'],
];
function Duas() {
  const [i, setI] = useState(0);
  const [ok, setOk] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(duas[i][1]); setOk(true); setTimeout(() => setOk(false), 1600); } catch {}
  };
  return (
    <div className="tool duas">
      <h3>أدعية ومواضعها</h3>
      <div className="dua-tabs">
        {duas.map(([t], k) => <button key={t} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{t}</button>)}
      </div>
      <blockquote key={i}>{duas[i][1]}</blockquote>
      <button className="btn btn-dark" onClick={copy}><Icon name={ok ? 'check' : 'star'} size={18} /> {ok ? 'تم النسخ' : 'انسخ الدعاء'}</button>
    </div>
  );
}

/* ---------- حاسبة الريال ---------- */
function Sar() {
  const [sar, setSar] = useState('1000');
  const [rate, setRate] = useState(() => store.get('dahma_rate', ''));
  const r = parseFloat(rate), s = parseFloat(sar);
  const egp = r > 0 && s >= 0 ? Math.round(s * r).toLocaleString('en-US') : null;
  return (
    <div className="tool sar">
      <h3>حاسبة الريال السعودي</h3>
      <p className="hint-d">اكتب سعر صرف اليوم من البنك أو مكتب الصرف، فتعرف ميزانيتك بالجنيه.</p>
      <label htmlFor="sar-amount">المبلغ بالريال<input id="sar-amount" type="number" inputMode="decimal" min="0" value={sar} onChange={(e) => setSar(e.target.value)} /></label>
      <label htmlFor="sar-rate">سعر الريال بالجنيه اليوم<input id="sar-rate" type="number" inputMode="decimal" min="0" step="0.01" placeholder="مثال: اكتب سعر اليوم" value={rate} onChange={(e) => { setRate(e.target.value); store.set('dahma_rate', e.target.value); }} /></label>
      <div className="sar-out" role="status">{egp ? <><span>{egp}</span> جنيه مصري</> : <em>أدخل سعر الصرف لتظهر النتيجة</em>}</div>
    </div>
  );
}

export function Tools() {
  return (
    <>
      <PageHero crumb="أدوات المعتمر" title="أدوات صغيرة تسهّل رحلتك" lead="اختر برنامجك في دقيقة، وعدّ أشواطك، واحسب ميزانيتك، واحفظ أدعيتك." image={img.kaabaArch} cta="اسأل الفريق" />
      <Planner />
      <section className="sec sand">
        <div className="wrap">
          <div className="sec-head"><h2>أي برنامج يناسبك؟</h2><p>ثلاثة أسئلة، ثم نرشح لك الباقة الأقرب.</p></div>
          <Finder />
        </div>
      </section>
      <section className="sec">
        <div className="wrap tools-grid">
          <Tally />
          <Countdown />
          <Duas />
          <Sar />
        </div>
        <p className="wrap note c">الأدعية للتعريف العام. يُرجع لأهل العلم في التفاصيل الشرعية.</p>
      </section>
    </>
  );
}
