(() => {
  const topbar = document.querySelector(".topbar");
  const burger = document.querySelector(".burger");
  const drawer = document.querySelector(".drawer");
  const form = document.querySelector(".contact-form");
  const formNote = document.querySelector(".form-note");
  const WA = "5566981189746";

  const onScroll = () => {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 16);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (burger && drawer) {
    burger.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll(".reveal").forEach((el) => {
    if (!("IntersectionObserver" in window)) {
      el.classList.add("show");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const texto = [
        "Olá! Vim pelo site da Decorart Floricultura.",
        data.get("nome") && `Nome: ${String(data.get("nome")).trim()}`,
        data.get("telefone") && `WhatsApp: ${String(data.get("telefone")).trim()}`,
        data.get("servico") && `Pedido: ${String(data.get("servico")).trim()}`,
        data.get("mensagem") && `Detalhes: ${String(data.get("mensagem")).trim()}`,
      ]
        .filter(Boolean)
        .join("\n");
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(texto)}`, "_blank", "noopener,noreferrer");
      if (formNote) {
        formNote.textContent = "Abrindo o WhatsApp da Decorart…";
        formNote.classList.add("show");
      }
    });
  }
})();
