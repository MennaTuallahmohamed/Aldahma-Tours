import React, { useEffect, useRef, useState } from 'react';
import { Arch, Icon } from '../ui';

/* خط زمني ينبض مع السكرول: الخط الذهبي يمتلئ، والمحطة الحالية تضيء وصورتها تتقدم */
export function ScrollTimeline({ items }) {
  const box = useRef(null);
  const refs = useRef([]);
  const [p, setP] = useState(0);
  const [act, setAct] = useState(0);
  useEffect(() => {
    const f = () => {
      const el = box.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const line = innerHeight * 0.55;
      setP(Math.min(1, Math.max(0, (line - r.top) / r.height)));
      let a = 0;
      refs.current.forEach((x, i) => { if (x && x.getBoundingClientRect().top + 80 < line) a = i; });
      setAct(a);
    };
    f(); addEventListener('scroll', f, { passive: true }); addEventListener('resize', f);
    return () => { removeEventListener('scroll', f); removeEventListener('resize', f); };
  }, []);
  return (
    <div className="stl" ref={box}>
      <div className="stl-rail" aria-hidden="true">
        <i style={{ height: p * 100 + '%' }}><b /></i>
      </div>
      {items.map((it, i) => (
        <article key={it.t} ref={(el) => (refs.current[i] = el)} className={'stl-i' + (i % 2 ? ' alt' : '') + (i <= act ? ' on' : '') + (i === act ? ' cur' : '')}>
          <div className="stl-card">
            <span className="stl-day">{it.day}</span>
            <h3>{it.t}</h3>
            <p>{it.d}</p>
            {it.chips && <div className="stl-chips">{it.chips.map((c) => <em key={c}>{c}</em>)}</div>}
          </div>
          <div className="stl-dot"><Icon name={it.icon || 'moon'} size={20} /></div>
          <Arch src={it.img} ratio="3 / 3.7" position={it.pos} className="stl-arch" />
        </article>
      ))}
    </div>
  );
}
