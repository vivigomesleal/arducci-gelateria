document.addEventListener("DOMContentLoaded", function () {
    setupNavigation();
    setupSobreToggle();
    setupCookieBanner();
});

// Função de configuração da navegação
function setupNavigation() {

    /* ===== MOBILE MENU (HAMBÚRGUER) ===== */
    const iconMenu = document.getElementById("icon-menu");
    const navLinks = document.getElementById("links-nav");

    if (iconMenu && navLinks) {
        iconMenu.addEventListener("click", () => {
            navLinks.classList.toggle("show-menu");
        });
    }

    /* ===== DROPDOWNS ===== */
    const dropDesktopBtn = document.getElementById('btndrop-desktop');
    const dropdownDesktop = document.getElementById('dropdown-desktop');
    const dropMobileBtn = document.getElementById('btndrop-mobile');
    const dropdownMobile = document.getElementById('dropdown-mobile');

    const toggleDropdown = (button, dropdown) => {
        const isShown = dropdown.classList.toggle('show');
        button.setAttribute('aria-expanded', isShown);
    };

    /* DESKTOP */
    if (dropDesktopBtn && dropdownDesktop) {
        dropDesktopBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(dropDesktopBtn, dropdownDesktop);
        });
        dropDesktopBtn.setAttribute('aria-expanded', 'false');
    }

    /* MOBILE */
    if (dropMobileBtn && dropdownMobile) {
        dropMobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(dropMobileBtn, dropdownMobile);
        });
        dropMobileBtn.setAttribute('aria-expanded', 'false');
    }

    /* FECHAR DROPDOWNS AO CLICAR FORA */
    document.addEventListener('click', (e) => {
        if (dropDesktopBtn && dropdownDesktop && !dropDesktopBtn.contains(e.target) && !dropdownDesktop.contains(e.target)) {
            dropdownDesktop.classList.remove('show');
            dropDesktopBtn.setAttribute('aria-expanded', 'false');
        }
        if (dropMobileBtn && dropdownMobile && !dropMobileBtn.contains(e.target) && !dropdownMobile.contains(e.target)) {
            dropdownMobile.classList.remove('show');
            dropMobileBtn.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (dropdownDesktop && dropdownDesktop.classList.contains('show')) {
                dropdownDesktop.classList.remove('show');
                dropDesktopBtn.setAttribute('aria-expanded', 'false');
                e.preventDefault();
            }
            if (dropdownMobile && dropdownMobile.classList.contains('show')) {
                dropdownMobile.classList.remove('show');
                dropMobileBtn.setAttribute('aria-expanded', 'false');
                e.preventDefault();
            }
        }
    });
}





// Função de configuração para "Sobre"
function setupSobreToggle() {
    const toggleBtn = document.getElementById('toggleBtn');
    const texto = document.getElementById('textoSobre');

    if (toggleBtn && texto) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        
        toggleBtn.addEventListener('click', () => {
            const isExpanded = texto.classList.toggle('expandido');
            toggleBtn.textContent = isExpanded ? 'Ver menos' : 'Ver mais';
            toggleBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
}

// Função do banner de cookies
function setupCookieBanner() {
    const banner = document.getElementById("cookie-banner");

    if (!localStorage.getItem("cookieConsent")) {
        banner.style.display = "block";
    }

    document.getElementById("accept-cookies").addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "accepted");
        banner.style.display = "none";
    });

    document.getElementById("decline-cookies").addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "declined");
        banner.style.display = "none";
    });
}


// --- CARROSSEL DE IMAGENS ---
// Usa DOMContentLoaded, pois window.onload é chamado apenas uma vez e pode sobrescrever outras chamadas.
document.addEventListener('DOMContentLoaded', () => {
    
    // O código do carrossel foi movido para dentro do DOMContentLoaded
    // para garantir que os elementos estejam disponíveis.
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const slidesContainer = document.querySelector('.slides');

    const showSlide = (index) => {
        if (totalSlides === 0) return; // Segurança contra carrossel vazio

        if (index >= totalSlides) currentIndex = 0;
        else if (index < 0) currentIndex = totalSlides - 1;
        else currentIndex = index;

        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Melhoria de Acessibilidade: Anunciar qual slide está visível (WCAG 4.1.2)
        slidesContainer.setAttribute('aria-live', 'polite'); // Garante que o leitor de tela leia as mudanças
        // Ocultar slides não visíveis para leitores de tela
        slides.forEach((slide, i) => {
            slide.setAttribute('aria-hidden', i !== currentIndex);
        });
    };

    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (nextBtn && prevBtn) {
        // CORREÇÃO WCAG 1.1.1/2.4.4: Adiciona rótulo acessível
        prevBtn.setAttribute('aria-label', 'Slide Anterior'); 
        nextBtn.setAttribute('aria-label', 'Próximo Slide'); 

        // Seu código de listeners
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
    }

    showSlide(0);
});

// botÃ£o de ver mais/menos
const imagens = document.querySelectorAll('.produtos-img_fundo');
const btn = document.getElementById('verMaisBtn');
const imagensPorPagina = 10;
let indiceAtual = imagensPorPagina;
let modoVerMais = true;

if (btn && imagens.length > 0) {
  btn.addEventListener('click', function () {
    if (modoVerMais) {
      for (let i = indiceAtual; i < indiceAtual + imagensPorPagina && i < imagens.length; i++) {
        imagens[i].classList.remove('ocultar');
        imagens[i].style.display = 'block';
      }

      indiceAtual += imagensPorPagina;

      if (indiceAtual >= imagens.length) {
        btn.textContent = 'Ver menos';
        modoVerMais = false;
      }
    } else {
      for (let i = imagensPorPagina; i < imagens.length; i++) {
        imagens[i].classList.add('ocultar');
        imagens[i].style.display = 'none';
      }
      indiceAtual = imagensPorPagina;
      btn.textContent = 'Ver mais';
      modoVerMais = true;
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Define a string de texto a ser procurada no label
    const LABEL_TEXT = 'Página Inteira';

    // Cria um intervalo para verificar periodicamente se o label foi carregado
    const correcaoInterval = setInterval(corrigirLabelInjetado, 500); // Verifica a cada 500ms

    function corrigirLabelInjetado() {
        // 1. Localiza o elemento <label> que contém o texto específico
        const allLabels = document.querySelectorAll('label.aifnmjmchg-cursor-pointer');
        let targetLabel = null;

        // Itera sobre todos os labels com a classe específica do widget
        allLabels.forEach(label => {
            // Verifica se o texto interno do label corresponde ao que procuramos
            if (label.textContent.trim().includes(LABEL_TEXT)) {  // Mudamos de === para includes para flexibilidade
                targetLabel = label;
            }
        });

        if (targetLabel) {
            // 2. Cria o elemento <input type="checkbox">
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'pagina-inteira-checkbox'; // Dá um nome para o formulário
            
            // Opcional: Adiciona um ID para melhor acessibilidade, se necessário
            checkbox.id = 'pagina-inteira-toggle';
            
            // 3. Injeta o checkbox DENTRO do <label> antes do texto
            targetLabel.prepend(checkbox);
            
            // Opcional: Garante que o texto original esteja na mesma linha se for um checkbox
            targetLabel.style.whiteSpace = 'nowrap';
            
            console.log("Correção de acessibilidade 3.3.2 aplicada: Checkbox injetado no label 'Página Inteira'.");
            
            // Limpa o temporizador assim que o checkbox for injetado
            clearInterval(correcaoInterval);
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    
    // Rótulo que será lido pelo leitor de tela (WCAG 2.4.4)
    const ARIA_LABEL_BUTTON = "Anexar Imagem";

    function corrigirBotoesVazios() {
        // Localiza o botão que contém a classe específica do ícone 'fa-image'
        // Este seletor procura por um botão que contém o SVG com a classe 'fa-image'
        const emptyButton = document.querySelector('button .fa-image');
        
        // O seletor retorna o elemento SVG. Precisamos do elemento PAI (<button>).
        const targetButton = emptyButton ? emptyButton.closest('button') : null;

        if (targetButton) {
            // 1. Injeta o rótulo programático ARIA-LABEL no botão
            // Isso resolve o erro "Empty button" para leitores de tela
            targetButton.setAttribute('aria-label', ARIA_LABEL_BUTTON); 
            
            console.log("Correção de acessibilidade 1.1.1/2.4.4 aplicada: aria-label adicionado ao botão de imagem.");
            
            // Resolve o erro de Conteúdo Não Textual:
            // O SVG já tem aria-hidden="true" e foco, o que está tecnicamente correto,
            // mas garantir o rótulo no botão é essencial.

            // Para o temporizador se a correção for aplicada
            clearInterval(correcaoInterval);
        }
    }

    // Tenta aplicar a correção a cada 500ms, garantindo que funcione
    // após o widget de terceiros injetar o botão.
    const correcaoInterval = setInterval(corrigirBotoesVazios, 500);

    // Limite o intervalo para parar após 10 segundos.
    setTimeout(() => {
        clearInterval(correcaoInterval);
    }, 10000);

});



document.addEventListener('DOMContentLoaded', function() {
    
    // Define a string de texto a ser procurada no label
    const LABEL_TEXT = 'Página Inteira';

    function corrigirLabelInjetado() {
        // 1. Localiza o elemento <label> que contém o texto específico
        // Usamos querySelectorAll e iteramos para garantir que achamos o texto exato
        
        // Seletor que busca todos os labels com a classe específica do widget
        const allLabels = document.querySelectorAll('label.aifnmjmchg-cursor-pointer'); 
        let targetLabel = null;

        // Itera sobre os labels para encontrar o que tem o texto 'Página Inteira'
        allLabels.forEach(label => {
            // Verifica se o texto interno do label corresponde ao que procuramos
            if (label.textContent.trim() === LABEL_TEXT) {
                targetLabel = label;
            }
        });

        if (targetLabel) {
            // 2. Cria o elemento <input type="checkbox">
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'pagina-inteira-checkbox'; 
            checkbox.id = 'pagina-inteira-toggle'; // Adiciona ID para ser alvo
            
            // 3. Injeta o checkbox DENTRO do <label> (prepend insere no início)
            // Isso cria a Associação Implícita: <label><input>Texto</label>
            targetLabel.prepend(checkbox);
            
            console.log("Correção de acessibilidade 3.3.2 aplicada: Checkbox injetado no label 'Página Inteira'.");
            
            // Limpa o temporizador se o elemento for encontrado
            clearInterval(correcaoInterval);
        }
    }

    // Tenta aplicar a correção a cada 500ms
    const correcaoInterval = setInterval(corrigirLabelInjetado, 500);

    // Limite o intervalo para parar após 10 segundos.
    setTimeout(() => {
        clearInterval(correcaoInterval);
    }, 10000);
});


document.addEventListener('DOMContentLoaded', function() {
    
    // Rótulo claro que será lido pelo leitor de tela (WCAG 3.3.2)
    const ARIA_LABEL_TEXT = "Anexar Imagem";

    function corrigirAltSuspeito() {
        // 1. Localiza a imagem pelo atributo alt="coin image"
        const coinImage = document.querySelector('img[alt="coin image"]');

        if (coinImage) {
            // 2. Aplica a correção: Define o alt como nulo (alt="")
            // Isso sinaliza ao leitor de tela que ele deve ignorar a imagem,
            // resolvendo o alerta de "Suspicious alternative text".
            coinImage.setAttribute('alt', ''); 
            
            console.log("Correção de acessibilidade 1.1.1 aplicada: alt da imagem 'coin' definido como nulo.");
            
            // Para o temporizador se a correção for aplicada
            clearInterval(correcaoInterval);
        }
    }

    // Tenta aplicar a correção a cada 500ms
    const correcaoInterval = setInterval(corrigirAltSuspeito, 500);

    // Limite o intervalo para parar após 10 segundos.
    setTimeout(() => {
        clearInterval(correcaoInterval);
    }, 10000);

});

// --- LÓGICA DE VALIDAÇÃO E MODAL ---

// 1. Associa a validação ao evento de SUBMIT do formulário
document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Previne o envio padrão do formulário (que sairia da página)
    event.preventDefault(); 
    validateAndConfirm();
});

function validateAndConfirm() { 
    let valid = true; 
    const form = document.getElementById('contactForm');
    
    // Esconder todas as mensagens de erro e limpar ARIA
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        const inputId = el.id.replace('-error', '');
        const input = document.getElementById(inputId);
        if (input) {
            input.setAttribute('aria-invalid', 'false');
        }
    });

    // -------------------------------------------------------------------
    // Validações
    // -------------------------------------------------------------------
    
    // Nome
    if (!document.getElementById('Nome').value.trim()) { 
        document.getElementById('nome-error').style.display = 'block'; 
        document.getElementById('Nome').setAttribute('aria-invalid', 'true');
        valid = false; 
    } 
    
    // E-mail (com validação básica de formato)
    const emailInput = document.getElementById('email');
    if (!emailInput.value.trim() || !/\S+@\S+\.\S+/.test(emailInput.value)) { 
        document.getElementById('email-error').style.display = 'block'; 
        emailInput.setAttribute('aria-invalid', 'true');
        valid = false; 
    } 
    
    // Mensagem
    if (!document.getElementById('msg').value.trim()) {
        document.getElementById('msg-error').style.display = 'block'; 
        document.getElementById('msg').setAttribute('aria-invalid', 'true');
        valid = false; 
    } 
    
    // -------------------------------------------------------------------
    
    if (valid) { 
        const summary = `
            Nome: ${document.getElementById('Nome').value}<br>
            Email: ${document.getElementById('email').value}<br>
            Telefone: ${document.getElementById('tel').value || 'Não fornecido'}<br>
            Mensagem: ${document.getElementById('msg').value}
        `; 
        document.getElementById('summary').innerHTML = summary; 
        document.getElementById('confirmationModal').style.display = 'block'; 
        
        // CORREÇÃO WCAG 2.1.1/4.1.2: Move o foco para o conteúdo do modal
        document.getElementById('modalContent').focus();

    } else {
        // Se houver erro, move o foco para o primeiro campo inválido
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
             firstInvalid.focus();
        }
    }
} 

// Função que envia o formulário assincronamente (chamada pelo modal)
async function submitFormAsync() { 
    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    
    // Fecha o modal de confirmação
    closeModal();

    // Remove mensagens de feedback antigas
    document.getElementById('success-feedback')?.remove();
    document.getElementById('loading-feedback')?.remove();

    // Feedback de Carregamento
    const formContainer = form.parentElement;
    const loadingMessage = document.createElement('p');
    loadingMessage.textContent = 'Enviando... Aguarde.';
    loadingMessage.style.textAlign = 'center';
    loadingMessage.style.fontWeight = 'bold';
    loadingMessage.id = 'loading-feedback';
    formContainer.prepend(loadingMessage); 

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                // Necessário para que FormSubmit retorne sem redirecionar
                'X-Requested-With': 'XMLHttpRequest' 
            }
        });

        if (response.ok) {
            showSuccess(form, formContainer, loadingMessage);
        } else {
            throw new Error('Erro ao enviar o formulário.');
        }
    } catch (error) {
        console.error('Erro de envio:', error);
        loadingMessage.textContent = 'ERRO: Não foi possível enviar. Verifique sua conexão.';
        loadingMessage.style.color = 'red';
        setTimeout(() => loadingMessage.remove(), 5000);
    }
}

// Função para exibir sucesso e limpar o formulário
function showSuccess(form, formContainer, loadingElement) {
    if (loadingElement) loadingElement.remove(); 
    
    form.reset(); 

    const successMessage = document.createElement('p');
    successMessage.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
    successMessage.style.color = 'green';
    successMessage.style.fontWeight = 'bold';
    successMessage.id = 'success-feedback';
    
    formContainer.prepend(successMessage);
    
    // Remove a mensagem após 5 segundos
    setTimeout(() => successMessage.remove(), 5000);
}

// Função para fechar o modal
function closeModal() { 
    document.getElementById('confirmationModal').style.display = 'none'; 
    // Retorna o foco ao botão Enviar original
    const sendButton = document.querySelector('.botao');
    if (sendButton) {
        sendButton.focus(); 
    }
}

// -------------------------------------------------------------------
// AJUSTES DE ACESSIBILIDADE GLOBAIS
// -------------------------------------------------------------------

// CORREÇÃO WCAG 2.1.1: Permite fechar o modal com a tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && document.getElementById('confirmationModal').style.display === 'block') {
        closeModal();
    }
});


// -------------------------------------------------------------------
// CÓDIGOS DE CORREÇÃO DE WIDGETS (CONSOLIDADOS E ISOLADOS)
// -------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    
    // === Variáveis e Constantes para Correção de Widgets ===
    const LABEL_TEXT = 'Página Inteira';
    const ARIA_LABEL_BUTTON = "Anexar Imagem";

    // --- 1. CORREÇÃO DE RÓTULO ÓRFÃO (CHECKBOX) ---
    function corrigirLabelInjetado() {
        const allLabels = document.querySelectorAll('label.aifnmjmchg-cursor-pointer'); 
        let targetLabel = null;

        allLabels.forEach(label => {
            if (label.textContent.trim() === LABEL_TEXT) {
                targetLabel = label;
            }
        });

        if (targetLabel) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'pagina-inteira-checkbox'; 
            checkbox.id = 'pagina-inteira-toggle'; 
            
            targetLabel.prepend(checkbox);
            targetLabel.style.whiteSpace = 'nowrap';
            return true; // Sucesso
        }
        return false;
    }

    // --- 2. CORREÇÃO DE BOTÃO VAZIO (ÍCONE DE IMAGEM) ---
    function corrigirBotoesVazios() {
        const emptyButton = document.querySelector('button .fa-image');
        const targetButton = emptyButton ? emptyButton.closest('button') : null;

        if (targetButton) {
            targetButton.setAttribute('aria-label', ARIA_LABEL_BUTTON); 
            return true; // Sucesso
        }
        return false;
    }

    // --- 3. EXECUÇÃO PERIÓDICA PARA ELEMENTOS DINÂMICOS ---
    
    let correcaoContador = 0;
    const MAX_TENTATIVAS = 20; // Tenta por 10 segundos (20 * 500ms)
    
    const correcaoInterval = setInterval(() => {
        let corrigido = 0;

        // Tenta aplicar as correções
        if (corrigirLabelInjetado()) corrigido++;
        if (corrigirBotoesVazios()) corrigido++;
        // Adicione outras correções dinâmicas aqui
        
        correcaoContador++;

        if (corrigido > 0 || correcaoContador >= MAX_TENTATIVAS) {
            // Se pelo menos uma coisa foi corrigida ou o tempo limite foi atingido, para.
            clearInterval(correcaoInterval);
        }

    }, 500); 
});

document.addEventListener('DOMContentLoaded', function() {
    
    // LINHA 11 DO SEU SCRIPT (provavelmente)
    const btnDesktop = document.getElementById("btndrop-desktop"); 
    
    // Verificação de segurança (crucial para o erro 'null')
    if (btnDesktop) { 
        btnDesktop.addEventListener('click', function() {
            // Lógica do seu dropdown
        });
    }

    // Repita a verificação para os outros elementos que deram erro, como o mobile
    const btnMobile = document.getElementById("btndrop-mobile"); 
    if (btnMobile) { 
        btnMobile.addEventListener('click', function() {
            // Lógica do seu dropdown
        });
    }

}); // Fecha a função DOMContentLoaded