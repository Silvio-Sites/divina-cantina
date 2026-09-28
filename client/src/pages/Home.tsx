import {
  ArrowDownRight,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
  Quote,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const WHATSAPP_NUMBER = "551146122262";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = "https://www.instagram.com/granjinhabarerestaurante/";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Estrada+Fernando+Nobre+819+Cotia+SP";

export const images = {
  logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/QGnXiqcqzYEmHPOX.png",
  fachada: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/YwOQBdVgYjXRMZpO.png",
  comida: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/MGHNkZBGtIcjgLXh.png",
  petiscos: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663970320780/LBlenQSgHjqlENro.png",
};

export type MenuCategory = "espetos" | "favoritos" | "drinks";
export type MenuItem = { id: string; name: string; description: string; price: number; category: MenuCategory; image: string; tag?: string };
type CartItem = { item: MenuItem; quantity: number };

export const menu: Record<MenuCategory, MenuItem[]> = {
  espetos: [
    { id: "picanha", name: "Picanha na brasa", description: "Corte alto, sal de parrilla e farofa da casa.", price: 42, category: "espetos", image: images.comida, tag: "Casa" },
    { id: "coracao", name: "Coração de frango", description: "Temperado no ponto, com vinagrete de ervas.", price: 26, category: "espetos", image: images.petiscos },
    { id: "coalho", name: "Queijo coalho", description: "Dourado na brasa, melaço de cana e pimenta.", price: 24, category: "espetos", image: images.comida },
    { id: "linguica", name: "Linguiça artesanal", description: "Feita na casa, cebola tostada e molho de ervas.", price: 29, category: "espetos", image: images.petiscos },
  ],
  favoritos: [
    { id: "feijoada", name: "Feijoada Granjinha", description: "A panela que reúne a casa. Servida aos sábados.", price: 59, category: "favoritos", image: images.comida, tag: "Sábados" },
    { id: "parmegiana", name: "Parmegiana da casa", description: "Milanesa crocante, molho artesanal e fritas.", price: 56, category: "favoritos", image: images.petiscos },
    { id: "carreteiro", name: "Arroz carreteiro", description: "Charque, cebola tostada e ovo caipira.", price: 44, category: "favoritos", image: images.comida },
    { id: "pasteis", name: "Pastéis da Granjinha", description: "Porção dourada, recheio generoso e molho da casa.", price: 34, category: "favoritos", image: images.petiscos },
  ],
  drinks: [
    { id: "caipirinha", name: "Caipirinha Granjinha", description: "Cachaça, limão-cravo e açúcar demerara.", price: 24, category: "drinks", image: images.petiscos },
    { id: "cerveja", name: "Cerveja gelada", description: "Long neck e garrafas para brindar sem pressa.", price: 14, category: "drinks", image: images.fachada },
    { id: "suco", name: "Suco da estação", description: "Frutas frescas, feito na hora.", price: 12, category: "drinks", image: images.comida },
    { id: "drink-casa", name: "Drink da casa", description: "Frutas, especiarias e o toque secreto do bar.", price: 28, category: "drinks", image: images.petiscos },
  ],
};

export const reviews = [
  { author: "Ciara McCombe", text: "Excellent food and atmosphere — live music on feijoada days.", rating: 5, source: "Google Maps" },
  { author: "Robert Molin", text: "Good food, good music, rustic hippie vibe.", rating: 5, source: "Google Maps" },
  { author: "Mike Liaw", text: "Nice place close, not too far. A great option for a relaxed meal.", rating: 4, source: "Google Maps" },
];

const gallery = [
  { image: images.fachada, label: "A casa", className: "gallery-tall" },
  { image: images.comida, label: "Feito na hora", className: "gallery-wide" },
  { image: images.petiscos, label: "Para compartilhar", className: "" },
  { image: images.comida, label: "Sabor de verdade", className: "" },
  { image: images.fachada, label: "Mesa posta", className: "gallery-wide" },
  { image: images.petiscos, label: "Brinde com a gente", className: "" },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Logo() { return <a className="logo" href="#inicio" aria-label="Granjinha início"><img src={images.logo} alt="Granjinha Espeto, Bar e Restaurante" /></a>; }
function Button({ children, href, onClick, variant = "primary" }: { children: ReactNode; href?: string; onClick?: () => void; variant?: "primary" | "outline" | "light" }) { const className = `button button--${variant}`; return href ? <a className={className} href={href}>{children}</a> : <button className={className} onClick={onClick}>{children}</button>; }

function ReservationModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false); const [name, setName] = useState(""); const [date, setDate] = useState(""); const [time, setTime] = useState("20:00"); const [people, setPeople] = useState("2 pessoas"); const reservationMessage = `Olá! Gostaria de reservar uma mesa na Granjinha.

Nome: ${name}
Data: ${date || "a combinar"}
Horário: ${time}
Pessoas: ${people}

Aguardo confirmação, obrigado!`;
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Reservar mesa" onMouseDown={onClose}><div className="modal" onMouseDown={event => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={18} /></button>{!sent ? <><span className="eyebrow">RESERVAS</span><h2>Uma mesa esperando por você.</h2><p>Deixe seus dados e nossa equipe confirma tudo pelo WhatsApp.</p><label>Seu nome<input value={name} onChange={event => setName(event.target.value)} placeholder="Como podemos chamar você?" /></label><div className="form-grid"><label>Data<input type="date" value={date} onChange={event => setDate(event.target.value)} /></label><label>Horário<select value={time} onChange={event => setTime(event.target.value)}><option>12:00</option><option>19:00</option><option>20:00</option><option>21:00</option></select></label></div><label>Pessoas<select value={people} onChange={event => setPeople(event.target.value)}><option>2 pessoas</option><option>3 pessoas</option><option>4 pessoas</option><option>5+ pessoas</option></select></label><button className="button button--primary button--full" onClick={() => setSent(true)} disabled={!name.trim()}>Solicitar reserva <ArrowRight size={16} /></button></> : <div className="success"><div className="success-mark">✓</div><span className="eyebrow">TUDO CERTO</span><h2>Agora é só chamar.</h2><p>Para confirmar mais rápido, envie uma mensagem para a Granjinha pelo WhatsApp.</p><Button href={`${WHATSAPP_URL}?text=${encodeURIComponent(reservationMessage)}`}>Abrir WhatsApp <ArrowRight size={16} /></Button></div>}</div></div>;
}

function CartDrawer({ cart, onClose, onChange, onRemove, onOrderSent }: { cart: CartItem[]; onClose: () => void; onChange: (id: string, delta: number) => void; onRemove: (id: string) => void; onOrderSent: (message: string, total: number) => void }) {
  const total = cart.reduce((sum, line) => sum + line.item.price * line.quantity, 0); const count = cart.reduce((sum, line) => sum + line.quantity, 0);
  const message = `Olá! Gostaria de fazer um pedido na Granjinha:\n\n${cart.map(line => `${line.quantity}x ${line.item.name} — ${money(line.item.price * line.quantity)}`).join("\n")}\n\nTotal: ${money(total)}\n\nAguardo confirmação, obrigado!`;
  return <div className="cart-overlay" onMouseDown={onClose}><aside className="cart-drawer" onMouseDown={event => event.stopPropagation()}><div className="cart-head"><div><span className="eyebrow">SEU PEDIDO</span><h2>Na mesa</h2></div><button className="cart-close" onClick={onClose} aria-label="Fechar carrinho"><X size={19} /></button></div>{cart.length === 0 ? <div className="cart-empty"><ShoppingBag size={35} /><h3>Seu pedido está vazio.</h3><p>Escolha seus favoritos no cardápio e monte sua mesa.</p><button className="button button--outline" onClick={onClose}>Ver cardápio <ArrowRight size={15} /></button></div> : <><div className="cart-lines">{cart.map(line => <div className="cart-line" key={line.item.id}><img src={line.item.image} alt="" /><div className="cart-line-content"><div className="cart-line-head"><strong>{line.item.name}</strong><button onClick={() => onRemove(line.item.id)} aria-label={`Remover ${line.item.name}`}><Trash2 size={14} /></button></div><span>{money(line.item.price)}</span><div className="cart-quantity"><button onClick={() => onChange(line.item.id, -1)}><Minus size={13} /></button><b>{line.quantity}</b><button onClick={() => onChange(line.item.id, 1)}><Plus size={13} /></button></div></div></div>)}</div><div className="cart-total"><span>Total do pedido <small>{count} {count === 1 ? "item" : "itens"}</small></span><strong>{money(total)}</strong></div><a className="button button--primary button--full" onClick={() => onOrderSent(message, total)} href={`${WHATSAPP_URL}?text=${encodeURIComponent(message)}`}>Enviar pedido no WhatsApp <ArrowRight size={16} /></a><p className="cart-note">O pedido será confirmado pela equipe pelo WhatsApp.</p></>}</aside></div>;
}

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".reveal-section, .reveal-item").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const [catalog, setCatalog] = useState<Record<MenuCategory, MenuItem[]>>(() => { try { return JSON.parse(localStorage.getItem("granjinha_catalog") || "null") || menu; } catch { return menu; } }); const [activeTab, setActiveTab] = useState<MenuCategory>("espetos"); const [reservationOpen, setReservationOpen] = useState(false); const [cartOpen, setCartOpen] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const [cart, setCart] = useState<CartItem[]>([]);
  const activeItems = catalog[activeTab]; const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart]);
  const addToCart = (item: MenuItem) => setCart(current => current.some(line => line.item.id === item.id) ? current.map(line => line.item.id === item.id ? { ...line, quantity: line.quantity + 1 } : line) : [...current, { item, quantity: 1 }]);
  const changeCart = (id: string, delta: number) => setCart(current => current.flatMap(line => line.item.id === id ? (line.quantity + delta > 0 ? [{ ...line, quantity: line.quantity + delta }] : []) : [line]));
  const removeFromCart = (id: string) => setCart(current => current.filter(line => line.item.id !== id));
  const registerOrder = (message: string, total: number) => { const orders = JSON.parse(localStorage.getItem("granjinha_orders") || "[]"); localStorage.setItem("granjinha_orders", JSON.stringify([{ id: Date.now(), createdAt: new Date().toLocaleString("pt-BR"), message, total, status: "Novo" }, ...orders])); };
  return <div className="site-shell" id="inicio">
    <div className="announcement"><span><i /> Cotia, Parque Rincão</span><span className="announcement-center">Brasa acesa · música ao vivo · mesa farta</span><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@granjinhabarerestaurante <ArrowRight size={13} /></a></div>
    <header className="site-header"><div className="container header-inner"><Logo /><nav className={mobileOpen ? "main-nav main-nav--open" : "main-nav"}><a href="#experiencia" onClick={() => setMobileOpen(false)}>A casa</a><a href="#menu" onClick={() => setMobileOpen(false)}>Cardápio</a><a href="#galeria" onClick={() => setMobileOpen(false)}>Galeria</a><a href="#agenda" onClick={() => setMobileOpen(false)}>Agenda</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>Instagram</a></nav><div className="header-actions"><button className="header-cart" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho"><ShoppingBag size={17} /><span>{cartCount}</span></button><Button onClick={() => setReservationOpen(true)}>Reservar mesa <ArrowRight size={15} /></Button></div><button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menu">{mobileOpen ? <X size={22} /> : <MenuIcon size={22} />}</button></div></header>
    <main>
      <section className="hero"><div className="hero-image"><img src={images.fachada} alt="Fachada real da Granjinha" /><div className="hero-image-shade" /></div><div className="hero-content container"><div className="hero-copy"><span className="eyebrow eyebrow--light">DESDE 2011 · COTIA, SP</span><h1>O sabor que<br /><em>fica na memória.</em></h1><p>Espetos na brasa, panela cheia e música boa para viver a mesa sem pressa.</p><div className="hero-actions"><Button variant="light" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Pedir agora <ShoppingBag size={16} /></Button><a className="hero-link" href={MAPS_URL}>Como chegar <ArrowRight size={15} /></a></div></div><div className="hero-note"><span>BRASA · AFETO · ENCONTRO</span><strong>GRANJINHA</strong></div></div><div className="hero-bottom"><div className="container"><span><Clock3 size={14} /> Qua a dom · 11h às 23h</span><span className="hero-rating"><Star size={13} fill="currentColor" /> 4,4 no Google · 2.766 avaliações</span></div></div></section>
      <section className="intro reveal-section" id="experiencia"><div className="container intro-grid"><div><span className="eyebrow">A NOSSA CASA</span><h2>Comida simples.<br /><em>Experiência rara.</em></h2></div><div className="intro-copy"><p>Na Granjinha, cada detalhe tem gosto de encontro: o fogo crepitando, a cerveja chegando gelada e a mesa ficando maior conforme a noite acontece.</p><a className="text-link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Siga a Granjinha <Instagram size={15} /></a></div></div></section>
      <section className="feature reveal-section"><div className="container feature-grid"><div className="feature-photo"><img src={images.comida} alt="Comida real da Granjinha" /><span className="photo-stamp">FEITO<br />COM CALMA</span></div><div className="feature-copy"><span className="eyebrow">SÁBADO É DIA</span><h2>Feijoada,<br /><em>do nosso jeito.</em></h2><p>Panela no centro da mesa, acompanhamentos frescos e aquele sábado que começa no almoço e termina quando a conversa deixa.</p><div className="feature-meta"><span><CalendarDays size={17} /> Todos os sábados</span><strong>R$ 59 <small>por pessoa</small></strong></div><Button onClick={() => { setActiveTab("favoritos"); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>Pedir feijoada <ShoppingBag size={16} /></Button></div></div></section>
      <section className="menu-section reveal-section" id="menu"><div className="container"><div className="section-heading"><div><span className="eyebrow">DA BRASA À MESA</span><h2>Para chegar com fome.<br /><em>E sair contando.</em></h2></div><p>Escolha seus favoritos, adicione ao pedido e envie tudo direto para o WhatsApp da Granjinha.</p></div><div className="menu-tabs" role="tablist">{([["espetos", "Espetos & brasa"], ["favoritos", "Favoritos da casa"], ["drinks", "Bar & drinks"]] as [MenuCategory, string][]).map(([id, label]) => <button key={id} className={activeTab === id ? "active" : ""} onClick={() => setActiveTab(id)}>{label}</button>)}</div><div className="menu-list">{activeItems.map((item, index) => <article className="menu-item reveal-item" key={item.id}><span className="menu-number">0{index + 1}</span><div><h3>{item.name} {item.tag && <small>{item.tag}</small>}</h3><p>{item.description}</p></div><div className="menu-item-action"><strong>{money(item.price)}</strong><button className="menu-add" onClick={() => { addToCart(item); setCartOpen(true); }}><Plus size={15} /> Adicionar</button></div></article>)}</div><div className="menu-footer"><span>Pedido mínimo e disponibilidade confirmados no WhatsApp</span><Button variant="outline" onClick={() => setCartOpen(true)}><ShoppingBag size={15} /> Ver pedido ({cartCount})</Button></div></div></section>
      <section className="gallery-section reveal-section" id="galeria"><div className="container"><div className="gallery-heading"><div><span className="eyebrow">POR AQUI</span><h2>Um pouco da<br /><em>nossa mesa.</em></h2></div><a className="text-link" href={MAPS_URL} target="_blank" rel="noreferrer">Ver fotos no Maps <ArrowRight size={15} /></a></div><div className="gallery-grid">{gallery.map((photo, index) => <a className={`gallery-card reveal-item ${photo.className}`} href={MAPS_URL} target="_blank" rel="noreferrer" key={`${photo.label}-${index}`}><img src={photo.image} alt={photo.label} loading="lazy" /><span>{photo.label}</span></a>)}</div></div></section>
      <section className="testimonials reveal-section" id="depoimentos"><div className="container"><div className="testimonials-heading"><div><span className="eyebrow">QUEM JÁ VEIO</span><h2>Palavra de<br /><em>quem sentou.</em></h2></div><div className="google-score"><strong>4,4</strong><div><span className="stars">★★★★★</span><small>2.766 avaliações no Google</small></div></div></div><div className="reviews-grid">{reviews.map(review => <article className="review-card" key={review.author}><Quote size={25} /><div className="stars">{"★".repeat(review.rating)}</div><p>“{review.text}”</p><footer><strong>{review.author}</strong><small>{review.source} · avaliação pública</small></footer></article>)}</div></div></section><section className="agenda reveal-section" id="agenda"><div className="container agenda-grid"><div className="agenda-copy"><span className="eyebrow eyebrow--light">A NOITE ACONTECE AQUI</span><h2>Tem sempre<br /><em>um motivo</em><br />para brindar.</h2><p>Quarta a domingo, a casa recebe bandas e artistas que deixam a brasa ainda mais acesa.</p><div className="agenda-row"><span>QUARTA</span><strong>Jazz & blues</strong><small>20h</small></div><div className="agenda-row"><span>SÁBADO</span><strong>Feijoada + samba</strong><small>13h</small></div><div className="agenda-row"><span>DOMINGO</span><strong>Rock na varanda</strong><small>19h</small></div><a className="light-link" href={WHATSAPP_URL}>Consultar agenda completa <ArrowRight size={15} /></a></div><div className="agenda-photo"><img src={images.petiscos} alt="Petiscos e cerveja servidos na Granjinha" /><div className="agenda-photo-caption"><span>O palco é da casa.</span><strong>Você é nosso convidado.</strong></div></div></div></section>
      <section className="instagram-section reveal-section"><div className="container instagram-card"><div><span className="eyebrow">NO INSTAGRAM</span><h2>A vida da casa<br /><em>em tempo real.</em></h2><p>Shows, pratos do dia, novidades e aquela mesa que está esperando por você.</p></div><Button href={INSTAGRAM_URL}>@granjinhabarerestaurante <Instagram size={16} /></Button></div></section>
      <section className="visit reveal-section" id="contato"><div className="container visit-grid"><div><span className="eyebrow">VENHA VIVER</span><h2>A mesa está<br /><em>posta.</em></h2><p>Estr. Fernando Nobre, 819<br />Parque Rincão · Cotia, SP</p><div className="visit-actions"><Button onClick={() => setReservationOpen(true)}>Reservar mesa <ArrowRight size={16} /></Button><a className="text-link" href={MAPS_URL}>Traçar rota <MapPin size={15} /></a></div></div><div className="visit-info"><div><span><Phone size={15} /> Telefone</span><a href="tel:+551146122262">(11) 4612-2262</a></div><div><span><Clock3 size={15} /> Horários</span><p>Qua a dom<br />11h — 23h</p></div><div><span><Users size={15} /> Capacidade</span><p>Famílias, grupos<br />e mesas grandes</p></div></div></div></section>
    </main>
    <footer className="footer"><div className="container footer-top"><Logo /><p>Uma casa de comida, música e encontros<br />no coração de Cotia.</p><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a></div><div className="container footer-bottom"><span>© 2026 Granjinha Espeto, Bar e Restaurante</span><span>Feito para comer sem pressa.</span></div></footer>
    <button className="floating-cart" onClick={() => setCartOpen(true)} aria-label="Abrir pedido"><ShoppingBag size={18} /><span>{cartCount > 0 ? `${cartCount} ${cartCount === 1 ? "item" : "itens"}` : "Seu pedido"}</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
    {reservationOpen && <ReservationModal onClose={() => setReservationOpen(false)} />}{cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onChange={changeCart} onRemove={removeFromCart} onOrderSent={registerOrder} />}
  </div>;
}
