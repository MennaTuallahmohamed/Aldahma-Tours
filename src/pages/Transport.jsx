import React, { useState } from 'react';
import { Arch, Icon, waLink } from '../ui';
import { transport } from '../data';

/* قسم النقل والانتقالات: قطار الحرمين + ليموزين + ميني فان */
export function Transport() {
  const [k, setK] = useState(0);
  const m = transport[k];
  return (
    <section className="sec dark trn" id="transport">
      <div className="pattern bg-pattern" />
      <div className="wrap">
        <div className="sec-head light">
          <h2>تنقّل مريح من لحظة وصولك حتى عودتك</h2>
          <p>اختر وسيلتك، ونحجزها وننسّق موعدها مع باقي رحلتك.</p>
        </div>

        <div className="route" aria-hidden="true">
          <div className="route-node"><i /><span>مطار جدة</span></div>
          <div className="route-line"><b key={m.k} className={'route-go ' + m.k}><Icon name={m.icon} size={20} /></b></div>
          <div className="route-node"><i /><span>مكة المكرمة</span></div>
          <div className="route-line"><b key={m.k + 'b'} className={'route-go ' + m.k}><Icon name={m.icon} size={20} /></b></div>
          <div className="route-node"><i /><span>المدينة المنورة</span></div>
        </div>

        <div className="trn-grid">
          <div className="trn-tabs" role="tablist">
            {transport.map((x, i) => (
              <button key={x.k} role="tab" aria-selected={i === k} className={i === k ? 'on' : ''} onClick={() => setK(i)}>
                <Icon name={x.icon} size={22} />
                <span><b>{x.t}</b><small>{x.tag}</small></span>
              </button>
            ))}
          </div>

          <div className="trn-view" key={m.k}>
            <div className="trn-txt">
              <h3>{m.t}</h3>
              <p>{m.d}</p>
              <ul className="ticks light">{m.list.map((l) => <li key={l}><Icon name="check" size={20} />{l}</li>)}</ul>
              <a className="btn btn-gold lg" href={waLink(`السلام عليكم، أرغب في حجز: ${m.t}.`)} target="_blank" rel="noreferrer"><Icon name="whatsapp" /> احجز {m.t}</a>
            </div>
            <div className="trn-pics">
              <Arch src={m.img} ratio="3 / 4" className="t1" position={m.pos} />
              <Arch src={m.img2} ratio="3 / 4" line={false} className="t2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
