document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // ════════════════════════════════════════════════
    // DADOS — todos os 27 estados + DF
    // ════════════════════════════════════════════════
    const musicByState = {
        BRAC: { name: "Acre",               flag: "🌳", song: "Aquarela do Brasil",      artist: "Gal Costa",              color: "#34d399" },
        BRAL: { name: "Alagoas",            flag: "🎵", song: "De Onde Vem o Baião",     artist: "Luiz Gonzaga",           color: "#fb923c" },
        BRAM: { name: "Amazonas",           flag: "🌿", song: "Aquarela",                artist: "Toquinho",               color: "#34d399" },
        BRAP: { name: "Amapá",              flag: "🌊", song: "Carimbó",                 artist: "Mestre Cupijó",          color: "#2dd4bf" },
        BRBA: { name: "Bahia",              flag: "🌊", song: "Aquarela do Brasil",      artist: "Gal Costa",              color: "#ff5c8a" },
        BRCE: { name: "Ceará",              flag: "🌵", song: "Asa Branca",              artist: "Luiz Gonzaga",           color: "#f97316" },
        BRDF: { name: "Brasília (DF)",      flag: "🏛️", song: "Brasília Invisível",      artist: "Skank",                  color: "#c084fc" },
        BRES: { name: "Espírito Santo",     flag: "🌺", song: "Maria Fumaça",            artist: "Banda Black Rio",        color: "#f43f5e" },
        BRGO: { name: "Goiás",              flag: "🎸", song: "Evidências",              artist: "Chitãozinho & Xororó",   color: "#fbbf24" },
        BRMA: { name: "Maranhão",           flag: "🪘", song: "Dança do Coco",           artist: "Tradicional",            color: "#f43f5e" },
        BRMG: { name: "Minas Gerais",       flag: "⛰️", song: "Tocando em Frente",       artist: "Almir Sater",            color: "#ffcc66" },
        BRMS: { name: "Mato Grosso do Sul", flag: "🌾", song: "Saudade do Matão",        artist: "Almir Sater",            color: "#a3e635" },
        BRMT: { name: "Mato Grosso",        flag: "🌅", song: "Chalana",                 artist: "Almir Sater",            color: "#fbbf24" },
        BRPA: { name: "Pará",               flag: "🎶", song: "Carimbó",                 artist: "Mestre Cupijó",          color: "#2dd4bf" },
        BRPB: { name: "Paraíba",            flag: "🎺", song: "Lamento Sertanejo",       artist: "Dominguinhos",           color: "#f97316" },
        BRPE: { name: "Pernambuco",         flag: "🥁", song: "O Leão do Norte",         artist: "Alcymar Monteiro",       color: "#e879f9" },
        BRPI: { name: "Piauí",              flag: "🌵", song: "Asa Branca",              artist: "Luiz Gonzaga",           color: "#fb923c" },
        BRPR: { name: "Paraná",             flag: "🌲", song: "Curitiba em Mim",         artist: "Yamandú Costa",          color: "#a3e635" },
        BRRJ: { name: "Rio de Janeiro",     flag: "🏖️", song: "Chega de Saudade",        artist: "João Gilberto",          color: "#1db954" },
        BRRN: { name: "Rio Grande do Norte",flag: "☀️", song: "Xote das Meninas",         artist: "Luiz Gonzaga",           color: "#fbbf24" },
        BRRO: { name: "Rondônia",           flag: "🌿", song: "Aquarela",                artist: "Toquinho",               color: "#34d399" },
        BRRR: { name: "Roraima",            flag: "🌄", song: "Aquarela",                artist: "Toquinho",               color: "#60a5fa" },
        BRRS: { name: "Rio Grande do Sul",  flag: "🌿", song: "Trem das Onze",           artist: "Adoniran Barbosa",       color: "#8e7dff" },
        BRSC: { name: "Santa Catarina",     flag: "🏔️", song: "Peixe Vivo",              artist: "Tradicional",            color: "#60a5fa" },
        BRSE: { name: "Sergipe",            flag: "🎵", song: "De Onde Vem o Baião",     artist: "Luiz Gonzaga",           color: "#fb923c" },
        BRSP: { name: "São Paulo",          flag: "🏙️", song: "Oração",                  artist: "A Banda Mais Bonita",    color: "#00c2ff" },
        BRTO: { name: "Tocantins",          flag: "🌾", song: "Chalana",                 artist: "Almir Sater",            color: "#fbbf24" },
    };

    // ════════════════════════════════════════════════
    // ANIMAÇÕES GSAP
    // ════════════════════════════════════════════════

    // — Story section —
    const line1 = document.querySelector(".line-1");
    const line2 = document.querySelector(".line-2");

    function splitWords(element) {
        const words = element.innerText.trim().split(/\s+/);
        element.innerHTML = "";
        return words.map(word => {
            const span = document.createElement("span");
            span.innerText = word;
            span.style.display = "inline-block";
            span.style.marginRight = "0.35em";
            element.appendChild(span);
            return span;
        });
    }

    const l1Words = splitWords(line1);
    const l2Words = splitWords(line2);

    gsap.set([l1Words, l2Words], { opacity: 0, y: 20 });

    const introTl = gsap.timeline();
    introTl
        .to(l1Words, { opacity: 1, y: 0, stagger: 0.03, duration: 0.8, ease: "power3.out" })
        .to(l2Words, { opacity: 1, y: 0, stagger: 0.03, duration: 0.8, ease: "power3.out" }, "-=0.4");

    gsap.timeline({
        scrollTrigger: {
            trigger: ".story-section",
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    })
    .to(".bg-overlay", { opacity: 0.85 }, 0)
    .fromTo(".line-3", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, 0.85);

    // — About section —
    gsap.timeline({
        scrollTrigger: {
            trigger: ".about-section",
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    })
    .fromTo(".about-gradient", { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
    .fromTo(".about-title",    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 0.1)
    .fromTo(".about-item",     { opacity: 0, y: 60 }, { opacity: 1, y: 0, stagger: 0.25, duration: 1 }, 0.3);

    // — Prep-map section —
    const prepLines = document.querySelectorAll(".prep-line");
    // Garante que as linhas estão invisíveis desde o carregamento,
    // antes do ScrollTrigger ter chance de rodar o fromTo
    gsap.set(prepLines, { opacity: 0, y: 40 });
    gsap.timeline({
        scrollTrigger: {
            trigger: ".prep-map-section",
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true
        }
    })
    .fromTo(prepLines[0], { opacity: 0, y: 40 },  { opacity: 1, y: 0, duration: 1 }, 0)
    .fromTo(prepLines[1], { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 1 }, 0.3)
    .fromTo(prepLines[2], { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: 1 }, 0.6);

    // — Map section entrada —
    gsap.from(".map-section", {
        opacity: 0, y: 60, duration: 1,
        scrollTrigger: { trigger: ".map-section", start: "top 80%" }
    });

    // ════════════════════════════════════════════════
    // MAPA
    // ════════════════════════════════════════════════
    const wrapper = document.getElementById("map-wrapper");
    const infoPanel = document.getElementById("map-info");
    const infoFlag   = document.getElementById("info-flag");
    const infoState  = document.getElementById("info-state");
    const infoSong   = document.getElementById("info-song");
    const infoArtist = document.getElementById("info-artist");

    let activeEl = null;

    fetch("./assets/images/brasil.svg")
        .then(r => r.text())
        .then(svgText => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, "image/svg+xml");
            const svgEl = doc.querySelector("svg");

            if (!svgEl) throw new Error("SVG não encontrado no arquivo carregado.");

            // Normaliza viewBox (o SVG original pode ter 'viewbox' em lowercase)
            const vb = svgEl.getAttribute("viewBox") || svgEl.getAttribute("viewbox") || "0 0 1000 912";
            svgEl.removeAttribute("viewbox");
            svgEl.removeAttribute("width");
            svgEl.removeAttribute("height");
            svgEl.setAttribute("viewBox", vb);
            svgEl.style.width = "100%";
            svgEl.style.height = "auto";

            wrapper.innerHTML = "";
            wrapper.appendChild(svgEl);

            const allStates = svgEl.querySelectorAll("path[id], circle[id]");

            allStates.forEach(el => {
                const id = el.getAttribute("id");
                if (!id || !id.startsWith("BR")) return;

                const data = musicByState[id];
                if (data) {
                    el.classList.add("has-song");
                    el.setAttribute("title", data.name);
                }

                el.addEventListener("click", () => {
                    if (!data) return;

                    // Restaura estado anterior
                    if (activeEl && activeEl !== el) {
                        activeEl.classList.remove("active");
                        activeEl.style.fill = "";
                        activeEl.style.filter = "";
                    }

                    // Toggle: clicou no mesmo estado ativo = deseleciona
                    if (activeEl === el) {
                        el.classList.remove("active");
                        el.style.fill = "";
                        el.style.filter = "";
                        activeEl = null;
                        infoPanel.classList.remove("visible");
                        return;
                    }

                    el.classList.add("active");
                    el.style.fill = data.color;
                    el.style.filter = `drop-shadow(0 0 12px ${data.color}99)`;
                    activeEl = el;

                    infoFlag.textContent   = data.flag;
                    infoState.textContent  = data.name;
                    infoSong.textContent   = `♪ ${data.song}`;
                    infoArtist.textContent = data.artist;

                    infoPanel.classList.add("visible");
                });

                // Hover: só aplica cor se não estiver ativo
                el.addEventListener("mouseenter", () => {
                    if (el !== activeEl) {
                        el.style.fill = data ? data.color + "aa" : "";
                    }
                });
                el.addEventListener("mouseleave", () => {
                    if (el !== activeEl) {
                        el.style.fill = "";
                    }
                });
            });

            // Animação de entrada
            gsap.from(allStates, {
                opacity: 0,
                scale: 0.95,
                transformOrigin: "center center",
                stagger: 0.004,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".map-section",
                    start: "top 70%"
                }
            });
        })
        .catch(err => {
            console.error(err);
            wrapper.innerHTML = '<p style="text-align:center;opacity:.4;padding:40px">Não foi possível carregar o mapa.</p>';
        });

});