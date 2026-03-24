import CONFIG from './config.js';

/**
 * 📝 GESTIÓN DE PROYECTOS (Versión Profesional)
 */
const PROYECTOS = [
    {
        id: 1,
        title: "Residencia Vista Mar",
        tag: "Arquitectura Residencial",
        desc: "Lujosa casa unifamiliar diseñada para maximizar las vistas al océano. Incorpora materiales nobles como mármol travertino y maderas recicladas, logrando un balance perfecto entre opulencia y calidez natural.",
        img: "assets/house1.png",
        specs: { area: "450m²", year: "2024", status: "Finalizado" }
    },
    {
        id: 2,
        title: "Edificio Horizonte",
        tag: "Desarrollo Urbano",
        desc: "Símbolo de modernidad en el centro de la ciudad. Este complejo habitacional cuenta con certificación LEED, sistemas de recolección de agua lluvia y fachadas ventiladas para un ahorro energético del 40%.",
        img: "assets/house2.png",
        specs: { area: "12,500m²", year: "2023", status: "Entregado" }
    },
    {
        id: 3,
        title: "Villa Serenidad",
        tag: "Construcción Premium",
        desc: "Ubicada en un entorno boscoso, esta villa se integra con la topografía local. Su piscina infinita de borde negativo parece fundirse con el horizonte, creando una atmósfera de paz absoluta.",
        img: "assets/house3.png",
        specs: { area: "320m²", year: "2025", status: "En preventa" }
    }
];

// DOM Elements
const navbar = document.getElementById('navbar');
const projectGrid = document.getElementById('projectGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxDetails = document.getElementById('lightboxDetails');
const closeLightbox = document.querySelector('.close-lightbox');

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    renderProjects();
    setupAnimations();
    initCharts();
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    closeLightbox.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });
}

/**
 * Gráficos Profesionales (Chart.js)
 */
function initCharts() {
    // Gráfico de Crecimiento
    const ctxGrowth = document.getElementById('growthChart').getContext('2d');
    new Chart(ctxGrowth, {
        type: 'line',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Obras Entregadas',
                data: [12, 19, 28, 35, 42, 58],
                borderColor: '#cba864',
                backgroundColor: 'rgba(203, 168, 100, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
            }
        }
    });

    // Gráfico de Valores (Radar)
    const ctxValues = document.getElementById('valuesChart').getContext('2d');
    new Chart(ctxValues, {
        type: 'radar',
        data: {
            labels: ['Seguridad', 'Innovación', 'Sustentabilidad', 'Rapidez', 'Calidad'],
            datasets: [{
                label: 'Desempeño Aura',
                data: [100, 95, 98, 90, 100],
                borderColor: '#cba864',
                backgroundColor: 'rgba(203, 168, 100, 0.2)',
                pointBackgroundColor: '#cba864'
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: {
                r: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: { color: '#94a3b8', font: { size: 10 } },
                    ticks: { display: false }
                }
            }
        }
    });
}

/**
 * Limpiador de URLs de Google Drive para mostrar imágenes directas
 */
function formatImageUrl(url) {
    if (url.includes('drive.google.com')) {
        let fileId = '';
        if (url.includes('/file/d/')) {
            fileId = url.split('/file/d/')[1].split('/')[0];
        } else if (url.includes('id=')) {
            fileId = url.split('id=')[1].split('&')[0];
        }
        if (fileId) return `https://drive.google.com/uc?id=${fileId}&export=view`;
    }
    return url;
}

function renderProjects() {
    projectGrid.innerHTML = '';
    PROYECTOS.forEach((project, index) => {
        const urlLimpia = formatImageUrl(project.img);
        const card = document.createElement('div');
        card.className = 'project-card reveal';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="project-img">
                <img src="${urlLimpia}" alt="${project.title}">
            </div>
            <div class="project-info">
                <span class="project-tag">${project.tag}</span>
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <div class="project-footer">
                    <span class="stat-bubble">${project.specs.area}</span>
                    <span class="stat-bubble">${project.specs.status}</span>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => openLightbox(project));
        projectGrid.appendChild(card);
    });
    
    // Re-trigger reveal after render
    setTimeout(setupAnimations, 100);
}

function openLightbox(project) {
    const urlLimpia = formatImageUrl(project.img);
    const mensaje = `Hola, quiero cotizar la obra: ${project.title}`;
    
    lightboxImg.src = urlLimpia;
    lightboxDetails.innerHTML = `
        <h2>${project.title}</h2>
        <p>${project.desc}</p>
        <div class="detail-specs">
            <div class="spec-item"><label>Superficie</label><span>${project.specs.area}</span></div>
            <div class="spec-item"><label>Año</label><span>${project.specs.year}</span></div>
            <div class="spec-item"><label>Estado</label><span>${project.specs.status}</span></div>
        </div>
        <a href="https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(mensaje)}" target="_blank" class="btn-primary">
            <i class="fa-brands fa-whatsapp"></i> Consultar Cotización
        </a>
    `;
    lightbox.classList.add('active');
}

function setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
