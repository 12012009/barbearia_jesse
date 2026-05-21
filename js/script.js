// Scroll suave ao clicar no botão "Agendar Horário" do hero
const btnAgendarHero = document.getElementById('btn-agendar-hero');
if (btnAgendarHero) {
    btnAgendarHero.addEventListener('click', function () {
        const agendamento = document.getElementById('agendamento');
        if (agendamento) {
            agendamento.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}
// Efeito de navbar ao descer com opacidade progressiva
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollY = Math.max(window.scrollY, 0);
    const SCROLL_THRESHOLD = 20;

    if (scrollY < SCROLL_THRESHOLD) {
        navbar.classList.remove('navbar-frosted');
        return;
    }

    navbar.classList.add('navbar-frosted');
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (navToggle && mobileMenu) {
    const closeMobileMenu = () => {
        navToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    };

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    document.addEventListener('click', event => {
        if (!mobileMenu.contains(event.target) && !navToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });
}

// Formulário de agendamento
const agendamentoForm = document.querySelector('.agendamento-form');

if (agendamentoForm) {
    agendamentoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const aviso = document.getElementById('agendamento-aviso');
        if (aviso) {
            aviso.style.display = 'none';
            aviso.textContent = '';
        }
    // Oculta o aviso ao focar em qualquer campo do formulário
    Array.from(agendamentoForm.querySelectorAll('input, select')).forEach(el => {
        el.addEventListener('focus', function() {
            const aviso = document.getElementById('agendamento-aviso');
            if (aviso) {
                aviso.style.display = 'none';
                aviso.textContent = '';
            }
        });
    });

        // Obter valores do formulário
        const nome = this.querySelector('input[type="text"]').value;
        const servico = this.querySelector('select').value;
        const data = this.querySelector('input[type="date"]').value;
        const hora = this.querySelector('input[type="time"]').value;

        // Validação simples
        if (!nome || !servico || !data || !hora) {
            if (aviso) {
                aviso.textContent = 'Por favor, preencha todos os campos.';
                aviso.style.display = 'block';
            }
            return;
        }

        // Validar data/hora
        const dataObj = new Date(data + 'T' + hora);
        const agora = new Date();
        if (dataObj < agora) {
            if (aviso) {
                aviso.textContent = 'Escolha uma data e horário futuros.';
                aviso.style.display = 'block';
            }
            return;
        }

        const diaSemana = dataObj.getDay(); // 0=Dom, 1=Seg, ..., 6=Sáb
        const horaNum = parseInt(hora.split(':')[0], 10);
        const minNum = parseInt(hora.split(':')[1], 10);
        let valido = false;

        if (diaSemana >= 1 && diaSemana <= 6) { // Seg-Sáb
            if (horaNum > 7 && (horaNum < 20 || (horaNum === 20 && minNum === 0))) {
                valido = true;
            }
        } else if (diaSemana === 0) { // Domingo
            if (horaNum > 6 && (horaNum < 14 || (horaNum === 14 && minNum === 0))) {
                valido = true;
            }
        }

        // Feriados: para simplificação, não há lista de feriados nacionais/locais, então só domingo é tratado especial

        if (!valido) {
            if (aviso) {
                aviso.textContent = 'Escolha um horário dentro do funcionamento: Seg-Sáb: 8h às 20h / Dom: 7h às 14h';
                aviso.style.display = 'block';
            }
            return;
        }

        // Formatar data
        const [year, month, day] = data.split('-');
        const dataFormatada = `${day}/${month}/${year}`;

        // Criar mensagem para WhatsApp
        const mensagem = `Olá! Gostaria de agendar um atendimento.\n\n` +
            `Nome: ${nome}\n` +
            `Serviço: ${servico}\n` +
            `Data: ${dataFormatada}\n` +
            `Horário: ${hora}`;

        // Link do WhatsApp
        const numeroWhatsApp = '5511963521713';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        // Abrir WhatsApp
        window.open(urlWhatsApp, '_blank');

        // Limpar formulário
        this.reset();
    });
}

// Animação ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar classe de animação aos elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar cards
    const cards = document.querySelectorAll('.servico-card, .depoimento-card, .feature-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Log de carregamento
console.log('Barbearia Jessé - Site carregado com sucesso!');

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(() => {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
        }, 400);
    }
});

// Atualiza ano no rodapé automaticamente
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});
