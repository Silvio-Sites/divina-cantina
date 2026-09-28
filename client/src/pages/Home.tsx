import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";

const WHATSAPP_URL = "https://wa.me/551146122262?text=Ol%C3%A1!%20Gostaria%20de%20reservar%20uma%20mesa%20na%20Granjinha.";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Estrada+Fernando+Nobre+819+Cotia+SP";

const images = {
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/QGnXiqcqzYEmHPOX.png",
  hero: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/FoVTNUIYKvAGyFta.jpg",
  feijoada: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/TSLlUseylRqhrarq.jpg",
  interior: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/qQXWTOYMoUwVKFoD.jpg",
};

type MenuItem = { name: string; description: string; price: string; tag?: string };
const menu: Record<string, MenuItem[]> = {
  espetos: [
    { name: "Picanha na brasa", description: "Corte alto, sal de parrilla e farofa da casa.", price: "R$ 42", tag: "Casa" },
    { name: "Coração de frango", description: "Temperado no ponto, com vinagrete de ervas.", price: "R$ 26" },
    { name: "Queijo coalho", description: "Dourado na brasa, melaço de cana e pimenta.", price: "R$ 24" },
  ],
  favoritos: [
    { name: "Feijoada Granjinha", description: "A panela que reúne a casa. Servida aos sábados.", price: "R$ 59", tag: "Sábados" },
    { name: "Parmegiana da casa", description: "Milanesa crocante, molho artesanal e fritas.", price: "R$ 56" },
    { name: "Arroz carreteiro", description: "Charque, cebola tostada e ovo caipira.", price: "R$ 44" },
  ],
  drinks: [
    { name: "Caipirinha Granjinha", description: "Cachaça, limão-cravo e açúcar demerara.", price: "R$ 24" },
    { name: "Cerveja gelada", description: "Long neck e garrafas para brindar sem pressa.", price: "R$ 14" },
    { name: "Suco da estação", description: "Frutas frescas, feito na hora.", price: "R$ 12" },
  ],
};

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`logo ${light ? "logo--light" : ""}`} href="#inicio" aria-label="Granjinha início"><img src={images.logo} alt="Granjinha Espeto, Bar e Restaurante" /></a>;
}

function Button({ children, href, onClick, variant = "primary" }: { children: ReactNode; href?: string; onClick?: () => void; variant?: "primary" | "outline" | "light" }) {
  const className = `button button--${variant}`;
  return href ? <a className={className} href={href}>{children}</a> : <button className={className} onClick={onClick}>{children}</button>;
}

function ReservationModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Reservar mesa" onMouseDown={onClose}>
    <div className="modal" onMouseDown={event => event.stopPropagation()}>
      <button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={18} /></button>
      {!sent ? <>
        <span className="eyebrow">RESERVAS</span><h2>Uma mesa esperando por você.</h2><p>Deixe seus dados e nossa equipe confirma tudo pelo WhatsApp.</p>
        <label>Seu nome<input value={name} onChange={event => setName(event.target.value)} placeholder="Como podemos chamar você?" /></label>
        <div className="form-grid"><label>Data<input type="date" /></label><label>Horário<select defaultValue="20:00"><option>12:00</option><option>19:00</option><option>20:00</option><option>21:00</option></select></label></div>
        <label>Pessoas<select defaultValue="2"><option>2 pessoas</option><option>3 pessoas</option><option>4 pessoas</option><option>5+ pessoas</option></select></label>
        <button className="button button--primary button--full" onClick={() => setSent(true)} disabled={!name.trim()}>Solicitar reserva <ArrowRight size={16} /></button>
      </> : <div className="success"><div className="success-mark">✓</div><span className="eyebrow">TUDO CERTO</span><h2>Agora é só chamar.</h2><p>Para confirmar mais rápido, envie uma mensagem para a Granjinha pelo WhatsApp.</p><Button href={WHATSAPP_URL}>Abrir WhatsApp <ArrowRight size={16} /></Button></div>}
    </div>
  </div>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("espetos");
  const [reservationOpen, setReservationOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="site-shell" id="inicio">
    <div className="announcement"><span><i /> Cotia, Parque Rincão</span><span className="announcement-center">Brasa acesa · música ao vivo · mesa farta</span><a href={WHATSAPP_URL}>Fale com a gente <ArrowRight size={13} /></a></div>
    <header className="site-header"><div className="container header-inner"><Logo /><nav className={mobileOpen ? "main-nav main-nav--open" : "main-nav"}><a href="#experiencia" onClick={() => setMobileOpen(false)}>A casa</a><a href="#menu" onClick={() => setMobileOpen(false)}>Cardápio</a><a href="#agenda" onClick={() => setMobileOpen(false)}>Agenda</a><a href="#contato" onClick={() => setMobileOpen(false)}>Contato</a></nav><Button onClick={() => setReservationOpen(true)}>Reservar mesa <ArrowRight size={15} /></Button><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">{mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}</button></div></header>

    <main>
      <section className="hero"><div className="hero-image"><img src={images.hero} alt="Espetos e legumes grelhados na brasa" /><div className="hero-image-shade" /></div><div className="hero-content container"><div className="hero-copy"><span className="eyebrow eyebrow--light">DESDE 2011 · COTIA, SP</span><h1>O sabor que<br /><em>fica na memória.</em></h1><p>Espetos na brasa, panela cheia e música boa para viver a mesa sem pressa.</p><div className="hero-actions"><Button variant="light" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Conheça o cardápio <ArrowDownRight size={16} /></Button><a className="hero-link" href={MAPS_URL}>Como chegar <ArrowRight size={15} /></a></div></div><div className="hero-note"><span>BRASA · AFETO · ENCONTRO</span><strong>GRANJINHA</strong></div></div><div className="hero-bottom"><div className="container"><span><Clock3 size={14} /> Qua a dom · 11h às 23h</span><span className="hero-rating"><Star size={13} fill="currentColor" /> 4,4 no Google · 2.766 avaliações</span></div></div></section>

      <section className="intro" id="experiencia"><div className="container intro-grid"><div><span className="eyebrow">A NOSSA CASA</span><h2>Comida simples.<br /><em>Experiência rara.</em></h2></div><div className="intro-copy"><p>Na Granjinha, cada detalhe tem gosto de encontro: o fogo crepitando, a cerveja chegando gelada e a mesa ficando maior conforme a noite acontece.</p><a className="text-link" href="#agenda">Veja a programação <ArrowRight size={15} /></a></div></div></section>

      <section className="feature"><div className="container feature-grid"><div className="feature-photo"><img src={images.feijoada} alt="Feijoada servida à mesa" /><span className="photo-stamp">FEITO<br />COM CALMA</span></div><div className="feature-copy"><span className="eyebrow">SÁBADO É DIA</span><h2>Feijoada,<br /><em>do nosso jeito.</em></h2><p>Panela no centro da mesa, acompanhamentos frescos e aquele sábado que começa no almoço e termina quando a conversa deixa.</p><div className="feature-meta"><span><CalendarDays size={17} /> Todos os sábados</span><strong>R$ 59 <small>por pessoa</small></strong></div><Button href={WHATSAPP_URL}>Reservar feijoada <ArrowRight size={16} /></Button></div></div></section>

      <section className="menu-section" id="menu"><div className="container"><div className="section-heading"><div><span className="eyebrow">DA BRASA À MESA</span><h2>Para chegar com fome.<br /><em>E sair contando.</em></h2></div><p>Uma seleção do que faz a Granjinha ser a Granjinha. O cardápio muda com a estação e com a vontade da nossa cozinha.</p></div><div className="menu-tabs" role="tablist">{[["espetos", "Espetos & brasa"], ["favoritos", "Favoritos da casa"], ["drinks", "Bar & drinks"]].map(([id, label]) => <button key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}>{label}</button>)}</div><div className="menu-list">{menu[activeTab].map((item, index) => <article className="menu-item" key={item.name}><span className="menu-number">0{index + 1}</span><div><h3>{item.name} {item.tag && <small>{item.tag}</small>}</h3><p>{item.description}</p></div><strong>{item.price}</strong></article>)}</div><div className="menu-footer"><span>Consulte disponibilidade no dia</span><Button variant="outline" href={WHATSAPP_URL}>Falar com a equipe <ArrowRight size={15} /></Button></div></div></section>

      <section className="agenda" id="agenda"><div className="container agenda-grid"><div className="agenda-copy"><span className="eyebrow eyebrow--light">A NOITE ACONTECE AQUI</span><h2>Tem sempre<br /><em>um motivo</em><br />para brindar.</h2><p>Quarta a domingo, a casa recebe bandas e artistas que deixam a brasa ainda mais acesa.</p><div className="agenda-row"><span>QUARTA</span><strong>Jazz & blues</strong><small>20h</small></div><div className="agenda-row"><span>SÁBADO</span><strong>Feijoada + samba</strong><small>13h</small></div><div className="agenda-row"><span>DOMINGO</span><strong>Rock na varanda</strong><small>19h</small></div><a className="light-link" href={WHATSAPP_URL}>Consultar agenda completa <ArrowRight size={15} /></a></div><div className="agenda-photo"><img src={images.interior} alt="Petiscos e cerveja servidos na Granjinha" /><div className="agenda-photo-caption"><span>O palco é da casa.</span><strong>Você é nosso convidado.</strong></div></div></div></section>

      <section className="visit" id="contato"><div className="container visit-grid"><div><span className="eyebrow">VENHA VIVER</span><h2>A mesa está<br /><em>posta.</em></h2><p>Estr. Fernando Nobre, 819<br />Parque Rincão · Cotia, SP</p><div className="visit-actions"><Button onClick={() => setReservationOpen(true)}>Reservar mesa <ArrowRight size={16} /></Button><a className="text-link" href={MAPS_URL}>Traçar rota <MapPin size={15} /></a></div></div><div className="visit-info"><div><span><Phone size={15} /> Telefone</span><a href="tel:+551146122262">(11) 4612-2262</a></div><div><span><Clock3 size={15} /> Horários</span><p>Qua a dom<br />11h — 23h</p></div><div><span><Users size={15} /> Capacidade</span><p>Famílias, grupos<br />e mesas grandes</p></div></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-top"><Logo light /><p>Uma casa de comida, música e encontros<br />no coração de Cotia.</p><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={18} /></a></div><div className="container footer-bottom"><span>© 2026 Granjinha Espeto, Bar e Restaurante</span><span>Feito para comer sem pressa.</span></div></footer>
    <a className="floating-whatsapp" href={WHATSAPP_URL} aria-label="Falar com a Granjinha no WhatsApp">WhatsApp <ArrowRight size={15} /></a>
    {reservationOpen && <ReservationModal onClose={() => setReservationOpen(false)} />}
  </div>;
}
