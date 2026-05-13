document.addEventListener("DOMContentLoaded", function () {
  setupNavigation();
});

function setupNavigation() {
  const iconMenu = document.getElementById("icon-menu");
  const navLinks = document.getElementById("links-nav");

  const dropDesktopBtn = document.getElementById("btndrop-desktop");
  const dropdownDesktop = document.getElementById("dropdown-desktop");

  const dropMobileBtn = document.getElementById("btndrop-mobile");
  const dropdownMobile = document.getElementById("dropdown-mobile");

  if (iconMenu && navLinks) {
    iconMenu.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("show-menu");

      iconMenu.setAttribute("aria-expanded", isOpen);

      iconMenu.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  function toggleDropdown(button, dropdown) {
    const isOpen = dropdown.classList.toggle("show");
    button.setAttribute("aria-expanded", isOpen);
  }

  if (dropDesktopBtn && dropdownDesktop) {
    dropDesktopBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleDropdown(dropDesktopBtn, dropdownDesktop);
    });
  }

  if (dropMobileBtn && dropdownMobile) {
    dropMobileBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleDropdown(dropMobileBtn, dropdownMobile);
    });
  }

  document.addEventListener("click", function (e) {
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

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (navLinks) {
        navLinks.classList.remove("show-menu");
      }

      if (iconMenu) {
        iconMenu.setAttribute("aria-expanded", "false");
        iconMenu.innerHTML = '<i class="fas fa-bars"></i>';
      }

      if (dropdownDesktop && dropDesktopBtn) {
        dropdownDesktop.classList.remove("show");
        dropDesktopBtn.setAttribute("aria-expanded", "false");
      }

      if (dropdownMobile && dropMobileBtn) {
        dropdownMobile.classList.remove("show");
        dropMobileBtn.setAttribute("aria-expanded", "false");
      }
    }
  });
}

// ############ PAGINA CARDAPIO DIGITAL ###########


document.addEventListener("DOMContentLoaded", () => {
  const botoes = document.querySelectorAll(".menu-toggle");

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const conteudo = botao.nextElementSibling;
      const estaAberto = botao.getAttribute("aria-expanded") === "true";

      botao.setAttribute("aria-expanded", String(!estaAberto));
      conteudo.hidden = estaAberto;

      const sinal = botao.querySelector(".menu-action");
      sinal.textContent = estaAberto ? "+" : "−";
    });
  });
});

// ############ PAGINA REVENDA  ###########



document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".sabores-grid input");
  const statusSabores = document.getElementById("status-sabores");
  const textoPedido = document.getElementById("texto-pedido");
  const btnWhatsApp = document.getElementById("btn-whatsapp");
  const avisoCopia = document.getElementById("aviso-copia");

  const numeroWhatsApp = "+5513981739220"; // troque pelo número real

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
});

// ############ FILTRO  ###########

  document.addEventListener("DOMContentLoaded", function () {
  const inputBusca = document.getElementById("buscarGelato");
  const catalogoSection = document.querySelector(".catalogo-section");
  const categorias = document.querySelectorAll(".categoria-bloco");

  if (!inputBusca || categorias.length === 0) return;

  inputBusca.addEventListener("input", function () {
    const textoDigitado = inputBusca.value.toLowerCase().trim();

    if (textoDigitado !== "") {
      catalogoSection.classList.add("pesquisando");
    } else {
      catalogoSection.classList.remove("pesquisando");
    }

    categorias.forEach(function (categoria) {
      const cards = categoria.querySelectorAll(".produto-card");
      let encontrouNaCategoria = false;

      cards.forEach(function (card) {
        const nomeProduto = card.querySelector("h3").textContent.toLowerCase();
        const descricaoProduto = card.querySelector("p").textContent.toLowerCase();

        const encontrou =
          nomeProduto.includes(textoDigitado) ||
          descricaoProduto.includes(textoDigitado);

        card.style.display = encontrou ? "flex" : "none";

        if (encontrou) {
          encontrouNaCategoria = true;
        }
      });

      if (textoDigitado !== "" && !encontrouNaCategoria) {
        categoria.classList.add("sem-resultados");
      } else {
        categoria.classList.remove("sem-resultados");
      }
    });
  });
});

  // ############ politica de privacidade ###########

 document.addEventListener("DOMContentLoaded", function () {
  const abrirLgpd = document.getElementById("abrirLgpd");
  const lgpdPopup = document.getElementById("lgpdPopup");
  const fecharLgpd = document.getElementById("fecharLgpd");

  if (!abrirLgpd || !lgpdPopup || !fecharLgpd) return;

  abrirLgpd.addEventListener("click", function (e) {
    e.preventDefault();
    lgpdPopup.classList.add("ativo");
  });

  fecharLgpd.addEventListener("click", function () {
    lgpdPopup.classList.remove("ativo");
  });
});

 // ############ COOKIES ###########

document.addEventListener("DOMContentLoaded", function () {
  const cookiesPopup = document.getElementById("cookiesPopup");
  const aceitarCookies = document.getElementById("aceitarCookies");
  const recusarCookies = document.getElementById("recusarCookies");

  if (!cookiesPopup || !aceitarCookies || !recusarCookies) return;

  const escolhaCookies = localStorage.getItem("cookiesMetricas");

  if (!escolhaCookies) {
    cookiesPopup.classList.add("ativo");
  }

  aceitarCookies.addEventListener("click", function () {
    localStorage.setItem("cookiesMetricas", "aceito");
    cookiesPopup.classList.remove("ativo");

    // Aqui você pode carregar o Google Analytics depois do aceite
    // carregarGoogleAnalytics();
  });

  recusarCookies.addEventListener("click", function () {
    localStorage.setItem("cookiesMetricas", "recusado");
    cookiesPopup.classList.remove("ativo");
  });
});

 // ############ SLIDER PAG OUTROS ###########


document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".card-slider");

  sliders.forEach(function (slider) {
    const track = slider.querySelector(".card-slider-track");
    const images = slider.querySelectorAll("img");
    const prevBtn = slider.querySelector(".prev");
    const nextBtn = slider.querySelector(".next");
    const dotsContainer = slider.querySelector(".slider-dots");

    if (!track || images.length === 0 || !dotsContainer) return;

    images.forEach(function (_, index) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Ir para imagem " + (index + 1));

      if (index === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", function () {
        track.scrollTo({
          left: track.clientWidth * index,
          behavior: "smooth"
        });
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("button");

    function atualizarDots() {
      const indexAtual = Math.round(track.scrollLeft / track.clientWidth);

      dots.forEach(function (dot, index) {
        dot.classList.toggle("active", index === indexAtual);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        const indexAtual = Math.round(track.scrollLeft / track.clientWidth);
        const proximoIndex = indexAtual >= images.length - 1 ? 0 : indexAtual + 1;

        track.scrollTo({
          left: track.clientWidth * proximoIndex,
          behavior: "smooth"
        });
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        const indexAtual = Math.round(track.scrollLeft / track.clientWidth);
        const anteriorIndex = indexAtual <= 0 ? images.length - 1 : indexAtual - 1;

        track.scrollTo({
          left: track.clientWidth * anteriorIndex,
          behavior: "smooth"
        });
      });
    }

    track.addEventListener("scroll", atualizarDots);
  });
});