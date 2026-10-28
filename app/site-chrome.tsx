import Link from "next/link";
import { siteConfig } from "./content";

function Wordmark() {
  return (
    <span className="wordmark">
      <strong>ICC</strong>
      <span>
        Ingeniería en Ciencias Computacionales
        <em>CETYS Universidad · Campus Mexicali</em>
      </span>
    </span>
  );
}

function Navigation() {
  return (
    <nav className="primary-nav" aria-label="Navegación principal">
      <Link href="/ser-icc">Ser ICC</Link>
      <details className="nav-menu">
        <summary>Explora</summary>
        <div className="nav-dropdown">
          <Link href="/proyectos">Proyectos</Link>
          <Link href="/foxcoding">FoxCoding</Link>
          <Link href="/eventos">Eventos y sedes</Link>
          <Link href="/multimedia">Multimedia</Link>
        </div>
      </details>
      <details className="nav-menu">
        <summary>Comunidad</summary>
        <div className="nav-dropdown">
          <Link href="/egresados">Egresados</Link>
          <Link href="/logros">Logros</Link>
          <Link href="/noticias">Noticias</Link>
        </div>
      </details>
      <Link href="/contacto">Contacto</Link>
    </nav>
  );
}

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="site-header-top">
          <Link href="/" aria-label="ICC CETYS Mexicali, inicio"><Wordmark /></Link>
          <div className="nav-desktop"><Navigation /></div>
        </div>
        <details className="nav-mobile">
          <summary>Menú</summary>
          <Navigation />
        </details>
      </header>
      {siteConfig.expoBanner.enabled && (
        <aside className="expo-strip">
          <span>{siteConfig.expoBanner.text}</span>
          <a href={siteConfig.expoBanner.href} target="_blank" rel="noreferrer">
            {siteConfig.expoBanner.linkLabel} <span aria-hidden="true">↗</span>
          </a>
        </aside>
      )}
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" aria-label="ICC CETYS Mexicali, inicio"><Wordmark /></Link>
        <p>Ideas que se convierten en tecnología y tecnología que mejora vidas.</p>
      </div>
      <div>
        <h2>Explora</h2>
        <div className="footer-links">
          <Link href="/ser-icc">Ser ICC</Link><Link href="/proyectos">Proyectos</Link>
          <Link href="/foxcoding">FoxCoding</Link><Link href="/eventos">Eventos</Link>
          <Link href="/egresados">Egresados</Link><Link href="/multimedia">Multimedia</Link>
          <Link href="/noticias">Noticias</Link>
        </div>
      </div>
      <div>
        <h2>Conversemos</h2>
        <a href={`mailto:${siteConfig.contacts.coordination.email}`}>
          {siteConfig.contacts.coordination.email}
        </a>
        <p>Campus Mexicali · Baja California</p>
        <p>© CETYS Universidad</p>
      </div>
    </footer>
  );
}