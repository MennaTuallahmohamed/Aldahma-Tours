import { createRoot } from 'react-dom/client';
import React, { useEffect, useState } from 'react';
import { ArchDefs, Header, Footer, Float, Path, useRoute } from './ui';
import Home from './pages/Home';
import { Tourism, Services, Contact } from './pages/Inner';
import { Tools } from './pages/Tools';
import About from './pages/About';
import Umrah from './pages/Umrah';
import Hajj from './pages/Hajj';
import Guide from './pages/Guide';
import './styles.css';
import './theme.css';

const pages = { '/': Home, '/umrah': Umrah, '/hajj': Hajj, '/tourism': Tourism, '/services': Services, '/guide': Guide, '/tools': Tools, '/about': About, '/contact': Contact };

function Splash() {
  const [gone, setGone] = useState(() => { try { return !!sessionStorage.getItem('dahma_splash') || matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; } });
  useEffect(() => {
    if (gone) return;
    const t = setTimeout(() => { setGone(true); try { sessionStorage.setItem('dahma_splash', '1'); } catch {} }, 2300);
    return () => clearTimeout(t);
  }, [gone]);
  if (gone) return null;
  return (
    <div className="splash" aria-hidden="true">
      <img src="logo.svg" alt="" />
      <b>الدهمة للسياحة</b>
      <small className="en">AL DAHMA TOURS</small>
      <em>صدق نرتقي به</em>
      <Path className="splash-path" />
    </div>
  );
}
function useReveal(route) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    const id = setTimeout(() => document.querySelectorAll('.sec-head, .pk, .why-list li, .crowd-row figure, .teaser, .tool, .dest, .vals > div, .br, .zi, .pl-form, .pl-sum').forEach((el) => { el.classList.add('rvh'); io.observe(el); }), 60);
    return () => { clearTimeout(id); io.disconnect(); };
  }, [route]);
}
function App() {
  const route = useRoute();
  useReveal(route);
  const Page = pages[route];
  return (
    <>
      <Splash />
      <ArchDefs />
      <Header route={route} />
      <main key={route} className="page">{Page ? <Page /> : <section className="sec wrap"><h1>الصفحة غير موجودة</h1><a className="btn btn-dark" href="#/">العودة للرئيسية</a></section>}</main>
      <Footer />
      <Float />
    </>
  );
}
createRoot(document.getElementById('root')).render(<App />);
