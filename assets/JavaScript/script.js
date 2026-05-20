document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  setupCardapioDigital();
  setupRevenda();
  setupFiltroCatalogo();
  setupLGPD();
  setupCookies();
  setupSliders();
});

/* ########## NAVEGAÇÃO ########## */

function setupNavigation() {
  const iconMenu = document.getElementById("icon-menu");
  const navLinks = document.getElementById("links-nav");

  const dropDesktopBtn = document.getElementById("btndrop-desktop");
  const dropdownDesktop = document.getElementById("dropdown-desktop");

  const dropMobileBtn = document.getElementById("btndrop-mobile");
  const dropdownMobile = document.getElementById("dropdown-mobile");

  function fecharMenuMobile() {
    if (navLinks) {
      navLinks.classList.remove("show-menu");
    }

    if (iconMenu) {
      iconMenu.setAttribute("aria-expanded", "false");
      iconMenu.innerHTML = '<i class="fas fa-bars"></i>';
    }

    if (dropdownMobile && dropMobileBtn) {
      dropdownMobile.classList.remove("show");
      dropMobileBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (iconMenu && navLinks) {
    iconMenu.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("show-menu");

      iconMenu.setAttribute("aria-expanded", String(isOpen));
      iconMenu.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    const linksMobile = navLinks.querySelectorAll("a");

    linksMobile.forEach((link) => {
      link.addEventListener("click", fecharMenuMobile);
    });
  }

  function toggleDropdown(button, dropdown) {
    if (!button || !dropdown) return;

    const isOpen = dropdown.classList.toggle("show");
    button.setAttribute("aria-expanded", String(isOpen));
  }

  if (dropDesktopBtn && dropdownDesktop) {
    dropDesktopBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(dropDesktopBtn, dropdownDesktop);
    });
  }

  if (dropMobileBtn && dropdownMobile) {
    dropMobileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleDropdown(dropMobileBtn, dropdownMobile);
    });
  }

  document.addEventListener("click", (e) => {
    if (
      dropdownDesktop &&
      dropDesktopBtn &&
      !dropDesktopBtn.contains(e.target) &&
      !dropdownDesktop.contains(e.target)
    ) {
      dropdownDesktop.classList.remove("show");
      dropDesktopBtn.setAttribute("aria-expanded", "false");
    }

    if (
      dropdownMobile &&
      dropMobileBtn &&
      !dropMobileBtn.contains(e.target) &&
      !dropdownMobile.contains(e.target)
    ) {
      dropdownMobile.classList.remove("show");
      dropMobileBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      fecharMenuMobile();

      if (dropdownDesktop && dropDesktopBtn) {
        dropdownDesktop.classList.remove("show");
        dropDesktopBtn.setAttribute("aria-expanded", "false");
      }
    }
  });
}

/* ########## PÁGINA CARDÁPIO DIGITAL ########## */

function setupCardapioDigital() {
  const botoes = document.querySelectorAll(".menu-toggle");

  if (botoes.length === 0) return;

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const conteudo = botao.nextElementSibling;

      if (!conteudo) return;

      const estaAberto = botao.getAttribute("aria-expanded") === "true";

      botao.setAttribute("aria-expanded", String(!estaAberto));
      conteudo.hidden = estaAberto;

      const sinal = botao.querySelector(".menu-action");

      if (sinal) {
        sinal.textContent = estaAberto ? "+" : "−";
      }
    });
  });
}

/* ########## PÁGINA REVENDA ########## */

function setupRevenda() {
  const checkboxes = document.querySelectorAll(".sabores-grid input");
  const statusSabores = document.getElementById("status-sabores");
  const textoPedido = document.getElementById("texto-pedido");
  const btnWhatsApp = document.getElementById("btn-whatsapp");
  const avisoCopia = document.getElementById("aviso-copia");

  if (
    checkboxes.length === 0 ||
    !statusSabores ||
    !textoPedido ||
    !btnWhatsApp ||
    !avisoCopia
  ) {
    return;
  }

  const numeroWhatsApp = "5513981739220";

  function atualizarPedido() {
    const sabores = Array.from(checkboxes)
      .filter((item) => item.checked)
      .map((item) => item.value);

    if (sabores.length === 0) {
      statusSabores.textContent = "Nenhum sabor selecionado";
      textoPedido.value = "";
      return;
    }

    statusSabores.textContent = `${sabores.length} sabor(es) selecionado(s)`;

    textoPedido.value =
      `Olá! Tenho interesse no programa de revenda Arducci.\n\n` +
      `Gostaria de saber mais sobre os seguintes sabores:\n` +
      sabores.map((sabor) => `• ${sabor}`).join("\n") +
      `\n\nPode me passar mais informações?`;
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", atualizarPedido);
  });

  btnWhatsApp.addEventListener("click", async () => {
    atualizarPedido();

    if (!textoPedido.value.trim()) {
      avisoCopia.textContent = "Selecione pelo menos um sabor antes de enviar.";
      return;
    }

    try {
      await navigator.clipboard.writeText(textoPedido.value);
      avisoCopia.textContent = "Pedido copiado! Agora é só colar no WhatsApp.";
    } catch {
      textoPedido.select();
      avisoCopia.textContent = "Copie o texto acima e cole no WhatsApp.";
    }

    const mensagem = encodeURIComponent(textoPedido.value);
    const link = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(link, "_blank");
  });
}

/* ########## FILTRO CATÁLOGO ########## */

function setupFiltroCatalogo() {
  const inputBusca = document.getElementById("buscarGelato");
  const catalogoSection = document.querySelector(".catalogo-section");
  const categorias = document.querySelectorAll(".categoria-bloco,.catalogo-grid");

  if (!inputBusca || !catalogoSection || categorias.length === 0) return;

  inputBusca.addEventListener("input", () => {
    const textoDigitado = inputBusca.value.toLowerCase().trim();

    catalogoSection.classList.toggle("pesquisando", textoDigitado !== "");

    categorias.forEach((categoria) => {
      const cards = categoria.querySelectorAll(".produto-card");
      let encontrouNaCategoria = false;

      cards.forEach((card) => {
        const nomeProduto = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const descricaoProduto = card.querySelector("p")?.textContent.toLowerCase() || "";

        const encontrou =
          nomeProduto.includes(textoDigitado) ||
          descricaoProduto.includes(textoDigitado);

        card.style.display = encontrou ? "flex" : "none";

        if (encontrou) {
          encontrouNaCategoria = true;
        }
      });

      categoria.classList.toggle(
        "sem-resultados",
        textoDigitado !== "" && !encontrouNaCategoria
      );
    });
  });
}

/* ########## POLÍTICA DE PRIVACIDADE ########## */

function setupLGPD() {
  const abrirLgpd = document.getElementById("abrirLgpd");
  const lgpdPopup = document.getElementById("lgpdPopup");
  const fecharLgpd = document.getElementById("fecharLgpd");

  if (!abrirLgpd || !lgpdPopup || !fecharLgpd) return;

  abrirLgpd.addEventListener("click", (e) => {
    e.preventDefault();
    lgpdPopup.classList.add("ativo");
  });

  fecharLgpd.addEventListener("click", () => {
    lgpdPopup.classList.remove("ativo");
  });

  lgpdPopup.addEventListener("click", (e) => {
    if (e.target === lgpdPopup) {
      lgpdPopup.classList.remove("ativo");
    }
  });
}

/* ########## COOKIES ########## */

function setupCookies() {
  const cookiesPopup = document.getElementById("cookiesPopup");
  const aceitarCookies = document.getElementById("aceitarCookies");
  const recusarCookies = document.getElementById("recusarCookies");

  if (!cookiesPopup || !aceitarCookies || !recusarCookies) return;

  let escolhaCookies = null;

  try {
    escolhaCookies = localStorage.getItem("cookiesMetricas");
  } catch {
    escolhaCookies = null;
  }

  if (!escolhaCookies) {
    cookiesPopup.classList.add("ativo");
  }

  aceitarCookies.addEventListener("click", () => {
    try {
      localStorage.setItem("cookiesMetricas", "aceito");
    } catch {
      console.log("LocalStorage bloqueado.");
    }

    cookiesPopup.classList.remove("ativo");
  });

  recusarCookies.addEventListener("click", () => {
    try {
      localStorage.setItem("cookiesMetricas", "recusado");
    } catch {
      console.log("LocalStorage bloqueado.");
    }

    cookiesPopup.classList.remove("ativo");
  });
}

/* ########## SLIDER PÁGINA OUTROS ########## */

function setupSliders() {
  const sliders = document.querySelectorAll(".card-slider");

  if (sliders.length === 0) return;

  sliders.forEach((slider) => {
    const track = slider.querySelector(".card-slider-track");
    const images = slider.querySelectorAll("img");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dotsContainer = slider.querySelector(".slider-dots");

    if (!track || images.length === 0 || !dotsContainer) return;

    images.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `Ir para imagem ${index + 1}`);

      if (index === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {
        track.scrollTo({
          left: track.clientWidth * index,
          behavior: "smooth",
        });
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("button");

    function atualizarDots() {
      const indexAtual = Math.round(track.scrollLeft / track.clientWidth);

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === indexAtual);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const indexAtual = Math.round(track.scrollLeft / track.clientWidth);
        const proximoIndex =
          indexAtual >= images.length - 1 ? 0 : indexAtual + 1;

        track.scrollTo({
          left: track.clientWidth * proximoIndex,
          behavior: "smooth",
        });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const indexAtual = Math.round(track.scrollLeft / track.clientWidth);
        const anteriorIndex =
          indexAtual <= 0 ? images.length - 1 : indexAtual - 1;

        track.scrollTo({
          left: track.clientWidth * anteriorIndex,
          behavior: "smooth",
        });
      });
    }

    let scrollTimer;

    track.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);

      scrollTimer = setTimeout(() => {
        atualizarDots();
      }, 50);
    });
  });
}

/* ########## SLIDER PÁGINA OUTROS ########## */

document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(`
    .produtos-section,
    .sobre-section,
    .curiosidades-section,
    .contato-section,
    .produto-home,
    .comparativo-card,
    .contato-card
  `);

  elementos.forEach((el) => {
    if (
      el.classList.contains("produto-home") ||
      el.classList.contains("comparativo-card") ||
      el.classList.contains("contato-card")
    ) {
      el.classList.add("reveal-card");
    } else {
      el.classList.add("reveal");
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
      }
    });
  }, {
    threshold: 0.15
  });

  elementos.forEach((el) => observer.observe(el));
});

/* ########## SLIDER PÁGINA OUTROS ########## */


const elementosAnimados = document.querySelectorAll(`
  .produtos-subtitulo,
  .produtos-titulo,
  .produto-home,
  .produtos-info p,

  .sobre-subtitulo,
  .sobre-titulo,
  .sobre-texto p,
  .sobre-numeros div,

  .curiosidades-titulo,
  .curiosidades-linha,
  .curiosidades-intro,
  .comparativo-card,
  .comparativo-divisor,

  .contato-subtitulo,
  .contato-titulo,
  .contato-card,
  .contato-botao
`);

const observerAnimacoes = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("ativo");
      observerAnimacoes.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

elementosAnimados.forEach((item) => {
  observerAnimacoes.observe(item);
});


// ################# animation paginas   ################

document.addEventListener("DOMContentLoaded", () => {
  const elementosCardapio = document.querySelectorAll(`
    .cardapio-titulo,
    .cardapio-linha,
    .cardapio-descricao,
    .menu-item
  `);

  const observerCardapio = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
        observerCardapio.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elementosCardapio.forEach((item) => {
    observerCardapio.observe(item);
  });

  const botoesMenu = document.querySelectorAll(".menu-toggle");

  botoesMenu.forEach((botao) => {
    botao.addEventListener("click", () => {
      const artigo = botao.closest(".menu-item");
      const conteudo = artigo.querySelector(".menu-content");
      const itensInternos = conteudo.querySelectorAll(`
        .menu-alerta,
        .menu-preco,
        .menu-titulo-link,
        .categoria,
        .menu-content > h4,
        .menu-content > p,
        .produto-linha
      `);

      setTimeout(() => {
        itensInternos.forEach((item, index) => {
          item.classList.remove("ativo");

          setTimeout(() => {
            item.classList.add("ativo");
          }, index * 90);
        });
      }, 80);
    });
  });
});


// ##########  animation revenda ###################

document.addEventListener("DOMContentLoaded", () => {
  const elementosRevenda = document.querySelectorAll(`
    .revenda-subtitulo,
    .revenda-titulo,
    .revenda-frase,
    .revenda-linha,
    .revenda-texto,
    .revenda-card,
    .pedido-box,
    .voltar-link
  `);

  const observerRevenda = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
        observerRevenda.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elementosRevenda.forEach((item) => {
    observerRevenda.observe(item);
  });

  const sabores = document.querySelectorAll(".sabores-grid label");

  const observerSabores = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const listaSabores = [...sabores];
        const index = listaSabores.indexOf(entry.target);

        entry.target.style.animationDelay = `${(index % 12) * 0.06}s`;
        entry.target.classList.add("ativo");

        observerSabores.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  sabores.forEach((sabor) => {
    observerSabores.observe(sabor);
  });
});

// ############ paginas ##############

document.addEventListener("DOMContentLoaded", () => {
  const gelatoAnimados = document.querySelectorAll(`
  .filtro-gelatos,
  .categoria-bloco h2,
  .catalogo-grid .produto-card
`);

  const observerGelatos = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
        observerGelatos.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  gelatoAnimados.forEach((item, index) => {
    item.style.animationDelay = `${(index % 3) * 0.12}s`;
    observerGelatos.observe(item);
  });
});

// ############ footer animation ####################

const footer = document.querySelector(".footer");

if (footer) {
  const observerFooter = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("ativo");
        observerFooter.unobserve(entry.target);
      }

    });

  }, {
    threshold: 0.15
  });

  observerFooter.observe(footer);
}