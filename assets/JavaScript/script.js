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
