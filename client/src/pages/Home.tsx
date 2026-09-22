import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crosshair,
  Instagram,
  MapPin,
  Menu,
  Minus,
  Pencil,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

const WHATSAPP_NUMBER = "5542998179252";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = "https://www.instagram.com/divinapizzatb/";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=R.+Carmo+da+Mata,+105,+Telemaco+Borba,+PR";

const images = {
  hero: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1400&q=88",
  calabresa: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=86",
  margherita: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=86",
  frango: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=900&q=86",
  portuguesa: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?auto=format&fit=crop&w=900&q=86",
  chocolate: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=86",
  coca: "https://files.manuscdn.com/search-media/310519663970320780/WtNJ3P9eNvHAXz5HQhT1pO/D2RbXQy8eAT9WUyxRJtqP8.jpg",
  guarana: "https://files.manuscdn.com/search-media/310519663970320780/WtNJ3P9eNvHAXz5HQhT1pO/NwH2Ep392rMpHrRfEYAPUb.jpg",
  interior: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1500&q=86",
};

type Category = "pizzas" | "lanches" | "doces" | "bebidas";
type SizeName = "Pequena" | "Média" | "Grande" | "Família";
type CrustName = "Tradicional" | "Catupiry" | "Cheddar";
type OrderType = "delivery" | "pickup";

type Product = {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  category: Category;
  image: string;
  popular?: boolean;
  customizable?: boolean;
};

type CartItem = {
  key: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  size?: SizeName;
  crust?: CrustName;
  extras?: string[];
  notes?: string;
  builder?: boolean;
};

const sizeOptions: Array<{ name: SizeName; note: string; add: number }> = [
  { name: "Pequena", note: "4 fatias", add: -8 },
  { name: "Média", note: "6 fatias", add: 0 },
  { name: "Grande", note: "8 fatias", add: 9 },
  { name: "Família", note: "12 fatias", add: 18 },
];
const crustOptions: Array<{ name: CrustName; add: number }> = [
  { name: "Tradicional", add: 0 },
  { name: "Catupiry", add: 6 },
  { name: "Cheddar", add: 6 },
];
const extraOptions = [
  { name: "Queijo", add: 5 },
  { name: "Catupiry", add: 6 },
  { name: "Cheddar", add: 6 },
  { name: "Bacon", add: 7 },
  { name: "Calabresa", add: 7 },
  { name: "Frango", add: 7 },
];
const builderFlavorOptions = ["Calabresa", "Frango com Catupiry", "Portuguesa", "Margherita"];

// Catálogo centralizado: altere preços, fotos e descrições aqui antes de publicar.
const products: Product[] = [
  {
    id: "calabresa",
    name: "Pizza Calabresa",
    description: "A clássica que nunca decepciona.",
    ingredients: "Molho de tomate, muçarela, calabresa e cebola.",
    price: 44.9,
    category: "pizzas",
    image: images.calabresa,
    popular: true,
    customizable: true,
  },
  {
    id: "margherita",
    name: "Pizza Margherita",
    description: "Leve, fresca e cheia de sabor.",
    ingredients: "Molho de tomate, muçarela, tomate e manjericão.",
    price: 42.9,
    category: "pizzas",
    image: images.margherita,
    popular: true,
    customizable: true,
  },
  {
    id: "frango-catupiry",
    name: "Frango com Catupiry",
    description: "Cremosa na medida certa.",
    ingredients: "Frango desfiado, muçarela, catupiry e orégano.",
    price: 48.9,
    category: "pizzas",
    image: images.frango,
    popular: true,
    customizable: true,
  },
  {
    id: "portuguesa",
    name: "Pizza Portuguesa",
    description: "Recheio farto para compartilhar.",
    ingredients: "Presunto, ovo, cebola, ervilha, muçarela e azeitona.",
    price: 49.9,
    category: "pizzas",
    image: images.portuguesa,
    customizable: true,
  },
  {
    id: "x-divino",
    name: "X-Divino",
    description: "O lanche da casa para matar a fome.",
    ingredients: "Pão, hambúrguer, muçarela, bacon, alface e tomate.",
    price: 29.9,
    category: "lanches",
    image: images.calabresa,
  },
  {
    id: "pizza-choco",
    name: "Chocolate com Morango",
    description: "O final feliz da noite.",
    ingredients: "Chocolate cremoso, morango e confeitos.",
    price: 39.9,
    category: "doces",
    image: images.chocolate,
    customizable: true,
  },
  {
    id: "coca-2l",
    name: "Coca-Cola 2L",
    description: "Bem gelada para acompanhar.",
    ingredients: "Refrigerante Coca-Cola original.",
    price: 13.9,
    category: "bebidas",
    image: images.coca,
  },
  {
    id: "guarana-2l",
    name: "Guaraná Antarctica 2L",
    description: "A companhia perfeita para a pizza.",
    ingredients: "Refrigerante Guaraná Antarctica.",
    price: 11.9,
    category: "bebidas",
    image: images.guarana,
  },
];

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand--light" : ""}`} href="#inicio" aria-label="Divina Pizza — início">
      <span className="brand-word">DIVINA</span>
      <span className="brand-subline"><i /> PIZZA <i /></span>
    </a>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
  type = "button",
}: {
  children: ReactNode;
  variant?: "primary" | "dark" | "outline" | "cream" | "ghost";
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: "button" | "submit";
}) {
  const classNameValue = `button button--${variant} ${className}`;
  if (href) {
    return <a className={classNameValue} href={href}>{children}</a>;
  }
  return <button className={classNameValue} onClick={onClick} type={type}>{children}</button>;
}

function SectionIntro({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return (
    <div className={`section-intro ${light ? "section-intro--light" : ""}`}>
      <span className="eyebrow"><i /> {eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function ProductCard({ product, onAdd, onCustomize }: { product: Product; onAdd: () => void; onCustomize: () => void }) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img src={product.image} alt={product.name} className="product-card__image" loading="lazy" />
        {product.popular && <span className="product-card__badge"><Star size={12} fill="currentColor" /> Queridinha</span>}
        {product.customizable && <button className="product-card__edit" onClick={onCustomize} aria-label={`Personalizar ${product.name}`}><Pencil size={14} /></button>}
      </div>
      <div className="product-card__body">
        <div className="product-card__topline"><h3>{product.name}</h3><span className="product-card__price">{money(product.price)}</span></div>
        <p className="product-card__desc">{product.description}</p>
        <p className="product-card__ingredients">{product.ingredients}</p>
        <div className="product-card__footer">
          <span className="from-label">a partir de</span>
          {product.customizable ? <Button variant="dark" onClick={onCustomize}>Personalizar <ArrowRight size={15} /></Button> : <Button variant="dark" onClick={onAdd}>Adicionar <Plus size={16} /></Button>}
        </div>
      </div>
    </article>
  );
}

function CartLine({ item, onChange, onRemove }: { item: CartItem; onChange: (delta: number) => void; onRemove: () => void }) {
  return (
    <div className="cart-line">
      <img src={item.product.image} alt="" />
      <div className="cart-line__content">
        <div className="cart-line__heading"><strong>{item.product.name}</strong><button onClick={onRemove} aria-label={`Remover ${item.product.name}`}><X size={14} /></button></div>
        {item.size && <span className="cart-line__details">{item.builder ? "Pizza montada" : `${item.size} · ${item.crust}`} {item.extras?.length ? ` · +${item.extras.join(", ")}` : ""}</span>}
        {item.notes && <span className="cart-line__note">Obs.: {item.notes}</span>}
        <div className="cart-line__bottom"><strong>{money(item.unitPrice * item.quantity)}</strong><div className="quantity"><button onClick={() => onChange(-1)} aria-label="Diminuir quantidade"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => onChange(1)} aria-label="Aumentar quantidade"><Plus size={13} /></button></div></div>
      </div>
    </div>
  );
}

function AppModal({ children, onClose, wide = false }: { children: ReactNode; onClose: () => void; wide?: boolean }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className={`modal ${wide ? "modal--wide" : ""}`} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Fechar"><X size={20} /></button>
        {children}
      </div>
    </div>
  );
}

function CustomizationModal({ product, onClose, onAdd }: { product: Product; onClose: () => void; onAdd: (item: CartItem) => void }) {
  const [size, setSize] = useState<SizeName>("Média");
  const [crust, setCrust] = useState<CrustName>("Tradicional");
  const [extras, setExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const sizeAdd = sizeOptions.find((option) => option.name === size)?.add ?? 0;
  const crustAdd = crustOptions.find((option) => option.name === crust)?.add ?? 0;
  const extrasAdd = extras.reduce((total, extra) => total + (extraOptions.find((option) => option.name === extra)?.add ?? 0), 0);
  const total = product.price + sizeAdd + crustAdd + extrasAdd;
  const toggleExtra = (extra: string) => setExtras((current) => current.includes(extra) ? current.filter((item) => item !== extra) : [...current, extra]);
  const add = () => {
    onAdd({ key: `${product.id}-${size}-${crust}-${extras.join("-")}-${Date.now()}`, product, quantity: 1, unitPrice: total, size, crust, extras, notes });
    onClose();
  };
  return (
    <AppModal onClose={onClose} wide>
      <div className="customizer">
        <div className="customizer__media"><img src={product.image} alt={product.name} /><div className="customizer__media-caption"><span>Monte do seu jeito</span><strong>{product.name}</strong></div></div>
        <div className="customizer__form">
          <div className="modal-kicker">PERSONALIZAÇÃO</div><h2>{product.name}</h2><p className="modal-copy">Escolha os detalhes para deixar sua pizza exatamente como você gosta.</p>
          <fieldset><legend>Tamanho</legend><div className="option-grid option-grid--four">{sizeOptions.map((option) => <button key={option.name} className={`choice-card ${size === option.name ? "choice-card--active" : ""}`} onClick={() => setSize(option.name)}><span>{option.name}</span><small>{option.note}</small>{option.add > 0 && <b>+{money(option.add)}</b>}</button>)}</div></fieldset>
          <fieldset><legend>Borda</legend><div className="option-grid">{crustOptions.map((option) => <button key={option.name} className={`choice-card ${crust === option.name ? "choice-card--active" : ""}`} onClick={() => setCrust(option.name)}><span>{option.name}</span>{option.add > 0 && <b>+{money(option.add)}</b>}</button>)}</div></fieldset>
          <fieldset><legend>Adicionais <small>opcional</small></legend><div className="extras-grid">{extraOptions.map((option) => <button key={option.name} className={`extra-choice ${extras.includes(option.name) ? "extra-choice--active" : ""}`} onClick={() => toggleExtra(option.name)}><span className="checkbox">{extras.includes(option.name) && <Check size={12} />}</span><span>{option.name}</span><b>+{money(option.add)}</b></button>)}</div></fieldset>
          <label className="field-label">Observação <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Ex.: sem cebola, bem passada..." /></label>
          <div className="customizer__submit"><div><span>Total deste item</span><strong>{money(total)}</strong></div><Button variant="primary" onClick={add}>Adicionar ao pedido <ArrowRight size={16} /></Button></div>
        </div>
      </div>
    </AppModal>
  );
}

function PizzaBuilder({ onAdd }: { onAdd: (item: CartItem) => void }) {
  const [size, setSize] = useState<SizeName>("Grande");
  const [flavors, setFlavors] = useState<string[]>(["Calabresa"]);
  const [crust, setCrust] = useState<CrustName>("Tradicional");
  const [extras, setExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const sizeAdd = sizeOptions.find((option) => option.name === size)?.add ?? 0;
  const crustAdd = crustOptions.find((option) => option.name === crust)?.add ?? 0;
  const extrasAdd = extras.reduce((total, extra) => total + (extraOptions.find((option) => option.name === extra)?.add ?? 0), 0);
  const builderBase = 46.9;
  const total = builderBase + sizeAdd + crustAdd + extrasAdd + (flavors.length - 1) * 5;
  const toggle = (item: string, setter: (value: string[] | ((current: string[]) => string[])) => void) => setter((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item]);
  const addBuilder = () => {
    const product = products.find((item) => item.id === "calabresa")!;
    onAdd({ key: `builder-${Date.now()}`, product: { ...product, name: "Pizza do seu jeito" }, quantity: 1, unitPrice: total, size, crust, extras: [...flavors, ...extras], notes, builder: true });
  };
  return (
    <div className="builder-card">
      <div className="builder-card__intro"><span className="eyebrow eyebrow--light"><i /> PERSONALIZE DE VERDADE</span><h3>Monte sua pizza</h3><p>Você escolhe a combinação. A gente cuida do forno.</p><div className="builder-card__seal"><Sparkles size={17} /> <span>Feita na hora</span></div></div>
      <div className="builder-card__steps">
        <div className="builder-step"><span className="step-number">01</span><div><strong>Tamanho</strong><div className="segmented">{sizeOptions.map((option) => <button key={option.name} className={size === option.name ? "active" : ""} onClick={() => setSize(option.name)}>{option.name}</button>)}</div></div></div>
        <div className="builder-step"><span className="step-number">02</span><div><strong>Sabores <small>até 2</small></strong><div className="builder-pills">{builderFlavorOptions.map((flavor) => <button key={flavor} className={flavors.includes(flavor) ? "active" : ""} onClick={() => { if (flavors.includes(flavor) || flavors.length < 2) toggle(flavor, setFlavors); }}>{flavor}</button>)}</div></div></div>
        <div className="builder-step"><span className="step-number">03</span><div><strong>Borda</strong><div className="segmented">{crustOptions.map((option) => <button key={option.name} className={crust === option.name ? "active" : ""} onClick={() => setCrust(option.name)}>{option.name}</button>)}</div></div></div>
        <div className="builder-step"><span className="step-number">04</span><div><strong>Adicionais <small>opcional</small></strong><div className="builder-pills">{extraOptions.map((option) => <button key={option.name} className={extras.includes(option.name) ? "active" : ""} onClick={() => toggle(option.name, setExtras)}>{option.name}</button>)}</div></div></div>
        <div className="builder-step builder-step--notes"><span className="step-number">05</span><label><strong>Observações</strong><input value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Algum pedido especial?" /></label></div>
      </div>
      <div className="builder-card__action"><div><span>Seu total</span><strong>{money(total)}</strong></div><Button variant="cream" onClick={addBuilder}>Adicionar ao pedido <Plus size={17} /></Button></div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [customizing, setCustomizing] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [generalNote, setGeneralNote] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [toast, setToast] = useState("");
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const filteredProducts = activeCategory === "all" ? products : products.filter((product) => product.category === activeCategory);
  const popularProducts = products.filter((product) => product.popular);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);
  useEffect(() => {
    document.body.style.overflow = menuOpen || customizing !== null || checkoutOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, customizing, checkoutOpen]);

  const addItem = (item: CartItem) => {
    setCart((current) => {
      const sameSimple = !item.size && current.find((existing) => existing.product.id === item.product.id && !existing.size);
      if (sameSimple) return current.map((existing) => existing.key === sameSimple.key ? { ...existing, quantity: existing.quantity + 1 } : existing);
      return [...current, item];
    });
    setToast(`${item.product.name} entrou no pedido`);
  };
  const addSimple = (product: Product) => addItem({ key: product.id, product, quantity: 1, unitPrice: product.price });
  const changeQuantity = (key: string, delta: number) => setCart((current) => current.flatMap((item) => item.key === key ? (item.quantity + delta <= 0 ? [] : [{ ...item, quantity: item.quantity + delta }]) : [item]));
  const removeItem = (key: string) => setCart((current) => current.filter((item) => item.key !== key));
  const closeMenu = () => setMenuOpen(false);
  const openCheckout = () => { setCartOpen(false); setCheckoutError(""); setCheckoutOpen(true); };
  const buildWhatsappMessage = () => {
    const lines = cart.map((item) => {
      const detail = [item.size, item.crust, item.extras?.length ? `Adicionais: ${item.extras.join(", ")}` : "", item.notes ? `Obs.: ${item.notes}` : ""].filter(Boolean).join(" | ");
      return `${item.quantity}x ${item.product.name}${detail ? `\n   ${detail}` : ""}\n   Valor: ${money(item.unitPrice * item.quantity)}`;
    }).join("\n\n");
    return `🍕 *NOVO PEDIDO — DIVINA PIZZA*\n\n👤 *Cliente:* ${customerName}\n📞 *Telefone:* ${phone || "Não informado"}\n📦 *Tipo:* ${orderType === "delivery" ? "Delivery" : "Retirada no balcão"}\n\n🛒 *PEDIDO:*\n${lines}\n\n━━━━━━━━━━━━━━\n💰 *TOTAL: ${money(cartTotal)}*\n${generalNote ? `\n📝 *Observações gerais:*\n${generalNote}\n` : ""}\n━━━━━━━━━━━━━━\n\nOlá! Gostaria de confirmar este pedido.`;
  };
  const sendOrder = (event: React.FormEvent) => {
    event.preventDefault();
    if (!customerName.trim()) { setCheckoutError("Digite seu nome para continuar."); return; }
    if (!cart.length) { setCheckoutError("Adicione pelo menos um item ao pedido."); return; }
    window.open(`${WHATSAPP_URL}?text=${encodeURIComponent(buildWhatsappMessage())}`, "_blank", "noopener,noreferrer");
  };

  const categories = [
    { id: "all" as const, label: "Tudo", icon: "✦" },
    { id: "pizzas" as const, label: "Pizzas", icon: "🍕" },
    { id: "lanches" as const, label: "Lanches", icon: "🍔" },
    { id: "doces" as const, label: "Doces", icon: "🍫" },
    { id: "bebidas" as const, label: "Bebidas", icon: "🥤" },
  ];

  return (
    <div className="site-shell" id="inicio">
      <div className="top-strip"><div className="container top-strip__inner"><span><span className="status-dot" /> Aberto hoje para pedidos</span><span className="top-strip__center">Delivery &nbsp;·&nbsp; Balcão</span><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Fale com a gente <ArrowRight size={13} /></a></div></div>
      <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
        <div className="container header-inner">
          <Logo />
          <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}>
            <a href="#inicio" onClick={closeMenu}>Início</a><a href="#cardapio" onClick={closeMenu}>Cardápio</a><a href="#promocoes" onClick={closeMenu}>Promoções</a><a href="#monte" onClick={closeMenu}>Monte sua pizza</a><a href="#sobre" onClick={closeMenu}>Sobre</a><a href="#contato" onClick={closeMenu}>Contato</a>
            <Button variant="primary" onClick={() => { closeMenu(); scrollToId("cardapio"); }}>Pedir agora <ArrowRight size={15} /></Button>
          </nav>
          <div className="header-actions"><button className="header-cart" onClick={() => setCartOpen(true)} aria-label="Abrir carrinho"><ShoppingBag size={20} /><span>{totalItems || ""}</span></button><button className="menu-toggle" onClick={() => setMenuOpen((current) => !current)} aria-label="Abrir menu">{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-texture" />
          <div className="container hero-grid">
            <div className="hero-copy"><div className="hero-kicker"><span>DESDE O PRIMEIRO PEDAÇO</span><span className="hero-kicker__line" /></div><h1>Uma pizza<br /><em>de respeito</em><br />começa pela massa.</h1><p>Pizzas e lanches preparados para conquistar no primeiro pedaço.</p><div className="hero-actions"><Button variant="primary" onClick={() => scrollToId("cardapio")}>Ver cardápio <ArrowRight size={17} /></Button><a className="text-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Pedir pelo WhatsApp <ArrowRight size={16} /></a></div><div className="hero-meta"><span><Truck size={16} /> Delivery</span><span><Utensils size={16} /> Balcão</span><span><Clock3 size={16} /> Feita na hora</span></div></div>
            <div className="hero-visual"><div className="hero-image-frame"><img src={images.hero} alt="Pizza artesanal da Divina Pizza" /><div className="hero-image-overlay" /><div className="hero-image-caption"><span>O sabor que fica</span><strong>DIVINA PIZZA</strong></div></div><div className="hero-stamp"><span>massa</span><strong>de verdade</strong><span>desde o primeiro pedaço</span></div><div className="hero-side-note">TELÊMACO BORBA <span>·</span> PR</div></div>
          </div>
          <div className="hero-bottom-rule"><div className="container"><span>Role para pedir</span><ChevronDown size={17} /></div></div>
        </section>

        <section className="category-bar"><div className="container category-bar__inner">{categories.map((category) => <button key={category.id} className={activeCategory === category.id ? "active" : ""} onClick={() => { setActiveCategory(category.id); if (category.id !== "all") scrollToId("cardapio"); }}><span>{category.icon}</span>{category.label}</button>)}</div></section>

        <section className="menu-section" id="cardapio">
          <div className="container"><div className="menu-section__heading"><SectionIntro eyebrow="CARDÁPIO" title="Escolha sua próxima obsessão." copy="Sabores para dividir — ou guardar só para você. Tudo preparado na hora, do nosso forno para a sua mesa." /><div className="menu-note"><span>Pedidos pelo WhatsApp</span><strong>(42) 99817-9252</strong></div></div><div className="menu-toolbar"><div className="menu-tabs">{categories.map((category) => <button key={category.id} className={activeCategory === category.id ? "active" : ""} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}</div><span className="menu-toolbar__hint">{filteredProducts.length} itens no cardápio <span className="dot-separator" /> preços configuráveis</span></div><div className="products-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={() => addSimple(product)} onCustomize={() => setCustomizing(product)} />)}</div></div>
        </section>

        <section className="spotlight-section" id="promocoes"><div className="container spotlight-grid"><div className="spotlight-image"><img src={images.interior} alt="Interior acolhedor da pizzaria" loading="lazy" /><div className="spotlight-image__label"><span>DO FORNO</span><strong>PARA SUA MESA</strong></div></div><div className="spotlight-copy"><span className="eyebrow"><i /> OFERTAS DA DIVINA</span><h2>Seu dia pede<br /><em>uma pizza.</em></h2><p>Consulte as combinações e condições especiais da semana direto com a nossa equipe.</p><div className="offer-list"><div><span className="offer-list__icon">01</span><div><strong>Combo para compartilhar</strong><small>Pizza + bebida para deixar a mesa completa</small></div><ArrowRight size={18} /></div><div><span className="offer-list__icon">02</span><div><strong>Seu sabor, seu jeito</strong><small>Personalize tamanho, borda e adicionais</small></div><ArrowRight size={18} /></div></div><Button variant="dark" href={WHATSAPP_URL}>Consultar no WhatsApp <ArrowRight size={16} /></Button></div></div></section>

        <section className="popular-section"><div className="container"><div className="popular-heading"><SectionIntro eyebrow="OS QUERIDINHOS DA DIVINA" title="Os mais pedidos." /><div className="carousel-controls"><button aria-label="Anterior"><ChevronLeft size={18} /></button><button aria-label="Próximo"><ChevronRight size={18} /></button></div></div><div className="popular-grid">{popularProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={() => addSimple(product)} onCustomize={() => setCustomizing(product)} />)}</div></div></section>

        <section className="builder-section" id="monte"><div className="container"><PizzaBuilder onAdd={(item) => addItem(item)} /></div></section>

        <section className="about-section" id="sobre"><div className="container about-grid"><div className="about-copy"><span className="eyebrow"><i /> A DIVINA PIZZA</span><h2>Feita para conquistar no <em>primeiro pedaço.</em></h2><p>Na Divina Pizza, cada pedido é preparado para entregar sabor, qualidade e aquela experiência que faz você querer repetir.</p><div className="about-perks"><span><b>🍕</b> Pizzas</span><span><b>🔥</b> Promoções</span><span><b>🚗</b> Delivery</span><span><b>📦</b> Retirada</span></div><a className="text-link text-link--dark" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Conheça a nossa rotina <ArrowRight size={16} /></a></div><div className="about-visual"><div className="about-card about-card--red"><span>5,0</span><div className="stars">★★★★★</div><small>5 avaliações no Google</small></div><img src={images.margherita} alt="Pizza fresca saindo do forno" loading="lazy" /><div className="about-visual__tag">MASSA<br /><strong>ARTESANAL</strong></div></div></div></section>

        <section className="instagram-section"><div className="container"><div className="instagram-heading"><SectionIntro eyebrow="@DIVINAPIZZATB" title="Siga a Divina Pizza." copy="Por trás de cada pizza tem uma equipe que gosta de fazer bonito." /><Button variant="outline" href={INSTAGRAM_URL}>Siga a gente <Instagram size={17} /></Button></div><div className="instagram-grid"><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src={images.calabresa} alt="Pizza da Divina Pizza" loading="lazy" /><span><Instagram size={16} /> @divinapizzatb</span></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src={images.interior} alt="Ambiente de pizzaria" loading="lazy" /><span><Instagram size={16} /> @divinapizzatb</span></a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><img src={images.frango} alt="Pizza artesanal" loading="lazy" /><span><Instagram size={16} /> @divinapizzatb</span></a></div></div></section>

        <section className="contact-section" id="contato"><div className="container contact-grid"><div className="contact-main"><span className="eyebrow eyebrow--light"><i /> ONDE ESTAMOS</span><h2>Vem buscar.<br /><em>Ou deixa com a gente.</em></h2><p>Escolha o seu jeito de pedir. A gente prepara com carinho e avisa quando estiver pronto.</p><div className="contact-actions"><Button variant="cream" href={MAPS_URL}>Como chegar <MapPin size={16} /></Button><a className="contact-phone" href="tel:+5542998179252"><Phone size={16} /> (42) 99817-9252</a></div></div><div className="contact-info"><div><span className="info-label"><MapPin size={15} /> Endereço</span><p>R. Carmo da Mata, 105<br />Jardim Alvorada<br />Telêmaco Borba - PR<br />84272-400</p></div><div><span className="info-label"><Clock3 size={15} /> Atendimento</span><p>Hoje até 23h30<br />Abertura às 18h</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Falar com a equipe <ArrowRight size={15} /></a></div></div></div></section>
        <section className="location-map" aria-label="Localização da Divina Pizza"><div className="container location-map__inner"><div><span className="eyebrow"><i /> LOCALIZAÇÃO</span><h2>Encontre a gente em <em>Telêmaco Borba.</em></h2><p>R. Carmo da Mata, 105<br />Jardim Alvorada<br />Telêmaco Borba - PR<br />84272-400</p><Button variant="dark" href={MAPS_URL}>Abrir no Google Maps <MapPin size={16} /></Button></div><div className="location-map__frame"><iframe title="Mapa da Divina Pizza" src="https://www.google.com/maps?q=Divina%20Pizza%2C%20R.%20Carmo%20da%20Mata%2C%20105%2C%20Tel%C3%AAmaco%20Borba%20-%20PR&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>
      </main>

      <footer className="site-footer"><div className="container"><div className="footer-main"><Logo light /><p>Pizza de verdade, do nosso forno para o seu momento.</p><Button variant="primary" href={WHATSAPP_URL}>Pedir pelo WhatsApp <ArrowRight size={16} /></Button></div><div className="footer-bottom"><span>© 2026 Divina Pizza. Feito para compartilhar.</span><div><a href="#inicio">Início</a><a href="#cardapio">Cardápio</a><a href="#sobre">Sobre</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a></div></div></div></footer>

      {totalItems > 0 && <button className="mobile-cart-bar" onClick={() => setCartOpen(true)}><span><ShoppingBag size={18} /> {totalItems} {totalItems === 1 ? "item" : "itens"}</span><strong>Ver pedido</strong><span>{money(cartTotal)}</span></button>}
      <a className="floating-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Fale com a Divina Pizza no WhatsApp"><span>Fale com a Divina Pizza</span><Phone size={21} /></a>

      {cartOpen && <div className="cart-backdrop" onMouseDown={() => setCartOpen(false)}><aside className="cart-drawer" onMouseDown={(event) => event.stopPropagation()}><div className="cart-drawer__header"><div><span className="eyebrow"><i /> SEU PEDIDO</span><h2>{totalItems ? `${totalItems} ${totalItems === 1 ? "item" : "itens"}` : "Seu carrinho"}</h2></div><button onClick={() => setCartOpen(false)} aria-label="Fechar carrinho"><X /></button></div>{cart.length ? <><div className="cart-lines">{cart.map((item) => <CartLine key={item.key} item={item} onChange={(delta) => changeQuantity(item.key, delta)} onRemove={() => removeItem(item.key)} />)}</div><div className="cart-drawer__footer"><div className="cart-summary"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><p>Pagamento combinado diretamente pelo WhatsApp.</p><Button variant="primary" onClick={openCheckout}>Finalizar pedido <ArrowRight size={17} /></Button><button className="continue-button" onClick={() => setCartOpen(false)}>Continuar comprando</button></div></> : <div className="cart-empty"><ShoppingBag size={34} /><h3>Seu pedido está vazio</h3><p>Escolha uma pizza e comece a montar uma noite deliciosa.</p><Button variant="dark" onClick={() => { setCartOpen(false); scrollToId("cardapio"); }}>Ver cardápio <ArrowRight size={16} /></Button></div>}</aside></div>}
      {customizing && <CustomizationModal product={customizing} onClose={() => setCustomizing(null)} onAdd={addItem} />}
      {checkoutOpen && <AppModal onClose={() => setCheckoutOpen(false)}><form className="checkout-form" onSubmit={sendOrder}><div className="modal-kicker">QUASE LÁ</div><h2>Finalize seu pedido.</h2><p className="modal-copy">Preencha seus dados e a gente abre uma conversa pronta no WhatsApp.</p><label className="field-label">Seu nome *<input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Como podemos te chamar?" /></label><label className="field-label">Telefone <input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(42) 99999-9999" /></label><fieldset><legend>Como você quer receber?</legend><div className="order-type-grid"><button type="button" className={orderType === "delivery" ? "active" : ""} onClick={() => setOrderType("delivery")}><Truck size={18} /><strong>Delivery</strong><small>Receba em casa</small></button><button type="button" className={orderType === "pickup" ? "active" : ""} onClick={() => setOrderType("pickup")}><Utensils size={18} /><strong>Retirada</strong><small>Busque no balcão</small></button></div></fieldset>{orderType === "pickup" && <div className="checkout-info"><MapPin size={16} /> Seu pedido será preparado para retirada no balcão da Divina Pizza.</div>}<label className="field-label">Observação geral <textarea value={generalNote} onChange={(event) => setGeneralNote(event.target.value)} placeholder="Ex.: tocar a campainha, enviar troco..." /></label>{checkoutError && <p className="form-error">{checkoutError}</p>}<div className="checkout-total"><span>Total do pedido</span><strong>{money(cartTotal)}</strong></div><Button variant="primary" type="submit">Enviar pedido no WhatsApp <ArrowRight size={16} /></Button></form></AppModal>}
      {toast && <div className="toast"><Check size={16} /> {toast}</div>}
    </div>
  );
}
