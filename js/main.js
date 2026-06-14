document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // ════════════════════════════════════════════════
    // DADOS — todos os 27 estados + DF
    // Para adicionar Spotify: substitua null pela URL da track
    // Aceita open.spotify.com/track/ID ou /embed/track/ID
    // ════════════════════════════════════════════════
    const musicByState = {
        BRAC: { name: "Acre",               flag: "🌳", song: "Aquarela do Brasil",      artist: "Gal Costa",              color: "#34d399", spotifyEmbed: null },
        BRAL: { name: "Alagoas",            flag: "🎵", song: "De Onde Vem o Baião",     artist: "Luiz Gonzaga",           color: "#fb923c", spotifyEmbed: null },
        BRAM: { name: "Amazonas",           flag: "🌿", song: "Aquarela",                artist: "Toquinho",               color: "#34d399", spotifyEmbed: null },
        BRAP: { name: "Amapá",              flag: "🌊", song: "Carimbó",                 artist: "Mestre Cupijó",          color: "#2dd4bf", spotifyEmbed: null },
        BRBA: { name: "Bahia",              flag: "🌊", song: "Aquarela do Brasil",      artist: "Gal Costa",              color: "#ff5c8a", spotifyEmbed: null },
        BRCE: { name: "Ceará",              flag: "🌵", song: "Asa Branca",              artist: "Luiz Gonzaga",           color: "#f97316", spotifyEmbed: null },
        BRDF: { name: "Brasília (DF)",      flag: "🏛️", song: "Brasília Invisível",      artist: "Skank",                  color: "#c084fc", spotifyEmbed: null },
        BRES: { name: "Espírito Santo",     flag: "🌺", song: "Maria Fumaça",            artist: "Banda Black Rio",        color: "#f43f5e", spotifyEmbed: null },
        BRGO: { name: "Goiás",              flag: "🎸", song: "Evidências",              artist: "Chitãozinho & Xororó",   color: "#fbbf24", spotifyEmbed: null },
        BRMA: { name: "Maranhão",           flag: "🪘", song: "Dança do Coco",           artist: "Tradicional",            color: "#f43f5e", spotifyEmbed: null },
        BRMG: { name: "Minas Gerais",       flag: "⛰️", song: "Tocando em Frente",       artist: "Almir Sater",            color: "#ffcc66", spotifyEmbed: null },
        BRMS: { name: "Mato Grosso do Sul", flag: "🌾", song: "Saudade do Matão",        artist: "Almir Sater",            color: "#a3e635", spotifyEmbed: null },
        BRMT: { name: "Mato Grosso",        flag: "🌅", song: "Chalana",                 artist: "Almir Sater",            color: "#fbbf24", spotifyEmbed: null },
        BRPA: { name: "Pará",               flag: "🎶", song: "Carimbó",                 artist: "Mestre Cupijó",          color: "#2dd4bf", spotifyEmbed: null },
        BRPB: { name: "Paraíba",            flag: "🎺", song: "Lamento Sertanejo",       artist: "Dominguinhos",           color: "#f97316", spotifyEmbed: null },
        BRPE: { name: "Pernambuco",         flag: "🥁", song: "O Leão do Norte",         artist: "Alcymar Monteiro",       color: "#e879f9", spotifyEmbed: null },
        BRPI: { name: "Piauí",              flag: "🌵", song: "Asa Branca",              artist: "Luiz Gonzaga",           color: "#fb923c", spotifyEmbed: null },
        BRPR: { name: "Paraná",             flag: "🌲", song: "Curitiba em Mim",         artist: "Yamandú Costa",          color: "#a3e635", spotifyEmbed: null },
        BRRJ: { name: "Rio de Janeiro",     flag: "🏖️", song: "Chega de Saudade",        artist: "João Gilberto",          color: "#1db954", spotifyEmbed: null },
        BRRN: { name: "Rio Grande do Norte",flag: "☀️", song: "Xote das Meninas",        artist: "Luiz Gonzaga",           color: "#fbbf24", spotifyEmbed: "https://open.spotify.com/embed/track/0PSVwGOWfSWJBKymcjAtLk" },
        BRRO: { name: "Rondônia",           flag: "🌿", song: "Aquarela",                artist: "Toquinho",               color: "#34d399", spotifyEmbed: null },
        BRRR: { name: "Roraima",            flag: "🌄", song: "Aquarela",                artist: "Toquinho",               color: "#60a5fa", spotifyEmbed: null },
        BRRS: { name: "Rio Grande do Sul",  flag: "🌿", song: "Trem das Onze",           artist: "Adoniran Barbosa",       color: "#8e7dff", spotifyEmbed: null },
        BRSC: { name: "Santa Catarina",     flag: "🏔️", song: "Peixe Vivo",              artist: "Tradicional",            color: "#60a5fa", spotifyEmbed: null },
        BRSE: { name: "Sergipe",            flag: "🎵", song: "De Onde Vem o Baião",     artist: "Luiz Gonzaga",           color: "#fb923c", spotifyEmbed: null },
        BRSP: { name: "São Paulo",          flag: "🏙️", song: "Oração",                  artist: "A Banda Mais Bonita",    color: "#00c2ff", spotifyEmbed: null },
        BRTO: { name: "Tocantins",          flag: "🌾", song: "Chalana",                 artist: "Almir Sater",            color: "#fbbf24", spotifyEmbed: null },
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

    // Estado inicial: invisíveis antes de qualquer trigger
    gsap.set([l1Words, l2Words], { opacity: 0, y: 20 });
    gsap.set(".line-3", { opacity: 0, y: 30 });

    // O scrub controla APENAS o overlay e a line-3.
    // As palavras das linhas 1 e 2 disparam uma única vez com onEnter,
    // sem depender da velocidade do scroll do usuário.
    gsap.timeline({
        scrollTrigger: {
            trigger: ".story-section",
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onEnter: () => {
                gsap.timeline()
                    .to(l1Words, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" })
                    .to(l2Words, { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, "-=0.2");
            }
        }
    })
    .to(".bg-overlay", { opacity: 0.85 }, 0)
    .to(".line-3", { opacity: 1, y: 0, duration: 0.15 }, 0.82);

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
    // Estado inicial garantido no CSS (.prep-line tem opacity:0).
    // Aqui só reforçamos via JS pra cobrir casos de restauração de scroll.
    const prepLines = document.querySelectorAll(".prep-line");
    gsap.set(prepLines, { opacity: 0, y: 40 });

    // Cada linha dispara uma vez quando a seção entra — sem scrub.
    // Scrub em texto sequencial causa o bug de ordem porque o progresso
    // inicial não é zero quando o browser restaura a posição de scroll.
    ScrollTrigger.create({
        trigger: ".prep-map-section",
        start: "top 60%",
        once: true,
        onEnter: () => {
            gsap.timeline()
                .to(prepLines[0], { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" })
                .to(prepLines[1], { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
                .to(prepLines[2], { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3");
        }
    });

    // O pin da seção permanece — mas sem animar texto via scrub
    ScrollTrigger.create({
        trigger: ".prep-map-section",
        start: "top top",
        end: "+=100%",
        pin: true,
        anticipatePin: 1
    });

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
    const infoFlag      = document.getElementById("info-flag");
    const infoState     = document.getElementById("info-state");
    const infoSong      = document.getElementById("info-song");
    const infoArtist    = document.getElementById("info-artist");
    const spotifyWrap   = document.getElementById("spotify-wrap");
    const spotifyIframe = document.getElementById("spotify-iframe");

    function setSpotify(url) {
        if (url) {
            // Aceita tanto a URL normal quanto a de embed — normaliza sempre pro embed
            const embedUrl = url.replace("open.spotify.com/track/", "open.spotify.com/embed/track/")
                               .replace("open.spotify.com/intl-pt/track/", "open.spotify.com/embed/track/");
            spotifyIframe.src = embedUrl + "?utm_source=generator&theme=0";
            spotifyWrap.classList.add("visible");
        } else {
            spotifyIframe.src = "";
            spotifyWrap.classList.remove("visible");
        }
    }

    let activeEl = null;

    // ── ÁUDIO COM CROSSFADE (mesmo sistema da seção journey) ──
    const mapPlayers = [new Audio(), new Audio()];
    let mapActivePIdx = 0;
    mapPlayers.forEach(p => { p.volume = 0; p.loop = true; });
    let mapFadeInterval = null;

    function mapCrossfadeTo(src) {
        if (!src) { mapFadeOutAll(); return; }

        const next = mapPlayers[1 - mapActivePIdx];
        const prev = mapPlayers[mapActivePIdx];

        const fullSrc = new URL(src, window.location.href).href;
        if (next.src === fullSrc && !next.paused) return; // já tocando no próximo slot

        if (next.src !== fullSrc) {
            next.src = src;
            next.currentTime = 0;
        }

        next.play().catch(() => {});

        // Cancela fade anterior se ainda estiver rodando
        if (mapFadeInterval) clearInterval(mapFadeInterval);

        const steps = 20;
        const interval = 800 / steps;
        let step = 0;
        const prevVol = prev.volume;

        mapFadeInterval = setInterval(() => {
            step++;
            const t = step / steps;
            prev.volume = Math.max(0, prevVol * (1 - t));
            next.volume = Math.min(0.25, 0.25 * t);
            if (step >= steps) {
                clearInterval(mapFadeInterval);
                mapFadeInterval = null;
                prev.pause();
                prev.volume = 0;
                mapActivePIdx = 1 - mapActivePIdx;
            }
        }, interval);
    }

    function mapFadeOutAll() {
        if (mapFadeInterval) clearInterval(mapFadeInterval);
        mapPlayers.forEach(p => {
            if (p.volume === 0) return;
            const start = p.volume;
            let step = 0;
            const iv = setInterval(() => {
                step++;
                p.volume = Math.max(0, start * (1 - step / 20));
                if (step >= 20) { clearInterval(iv); p.pause(); p.volume = 0; }
            }, 40);
        });
    }

    function playStateAudio(id) {
        mapCrossfadeTo(`./assets/musics/${id}.mp3`);
    }

    function stopAudio() {
        mapFadeOutAll();
    }
    // ──────────────────────────────────────────────────────────

    fetch("https://vondenryan.github.io/site-laila/assets/images/brasil.svg")
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
                        stopAudio();
                        setSpotify(null);
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
                    playStateAudio(id);
                    setSpotify(data.spotifyEmbed);
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

    // ════════════════════════════════════════════════
    // JOURNEY — seção de encerramento emocional
    // ════════════════════════════════════════════════

    // ── CONFIGURAÇÃO ─────────────────────────────────
    // Edite aqui: título, artista, texto narrativo e arquivo de áudio.
    // audioSrc: caminho relativo a partir de index.html, ex: "assets/musics/BRRJ.mp3"
    //           deixe null se não quiser áudio nesse slide.
    const journeySongs = [
        {
            song:     "Chega de Saudade",
            artist:   "João Gilberto",
            text:     "Tem músicas que a gente não escolhe. Elas simplesmente aparecem no momento certo e ficam.",
            audioSrc: "./assets/musics/BRRJ.mp3",
        },
        {
            song:     "Tocando em Frente",
            artist:   "Almir Sater",
            text:     "Cada lugar que você passou deixou um acorde diferente em você. Isso não tem nome — mas tem melodia.",
            audioSrc: "./assets/musics/BRMG.mp3",
        },
        {
            song:     "Oração",
            artist:   "A Banda Mais Bonita da Cidade",
            text:     "E no final, o que fica não é o lugar. É a sensação de ter estado lá com as pessoas certas.",
            audioSrc: "./assets/musics/BRSP.mp3",
        },
    ];
    // ─────────────────────────────────────────────────

    const N = journeySongs.length;

    // ── DOM ──────────────────────────────────────────
    const journeySection  = document.getElementById("journey-section");
    const journeySlidesCt = document.getElementById("journey-slides");
    const trailFill       = document.getElementById("journey-trail-fill");
    const journeyDotsCt   = document.getElementById("journey-dots");
    const journeyTrail    = document.querySelector(".journey-trail");

    // Define a altura da seção: 100vh de viewport fixa + 100vh por slide
    journeySection.style.height = `${(N + 1) * 100}vh`;

    // ── ÁUDIO (crossfade) ────────────────────────────
    // Dois players alternados para crossfade suave
    const players = [new Audio(), new Audio()];
    let activePIdx = 0;
    players.forEach(p => { p.volume = 0; p.loop = true; });

    function crossfadeTo(src) {
        if (!src) { fadeOutAll(); return; }

        const next = players[1 - activePIdx];
        const prev = players[activePIdx];

        // Carrega a próxima só se for diferente
        const fullSrc = new URL(src, window.location.href).href;
        if (next.src !== fullSrc) {
            next.src = src;
            next.currentTime = 0;
        }

        next.play().catch(() => {});

        // Fade out do anterior, fade in do próximo
        const duration = 800; // ms
        const steps = 20;
        const interval = duration / steps;
        let step = 0;

        const fade = setInterval(() => {
            step++;
            const t = step / steps;
            prev.volume = Math.max(0, 0.25 * (1 - t));
            next.volume = Math.min(0.25, 0.25 * t);
            if (step >= steps) {
                clearInterval(fade);
                prev.pause();
                prev.volume = 0;
                activePIdx = 1 - activePIdx;
            }
        }, interval);
    }

    function fadeOutAll() {
        players.forEach(p => {
            const start = p.volume;
            if (start === 0) return;
            let step = 0;
            const iv = setInterval(() => {
                step++;
                p.volume = Math.max(0, start * (1 - step / 20));
                if (step >= 20) { clearInterval(iv); p.pause(); p.volume = 0; }
            }, 40);
        });
    }

    // ── GERA SLIDES ─────────────────────────────────
    journeySongs.forEach((s, i) => {
        const slide = document.createElement("div");
        slide.className = "journey-slide";
        slide.id = `journey-slide-${i}`;
        slide.innerHTML = `
            <div class="journey-slide-num">${String(i + 1).padStart(2, "0")}</div>
            <div class="journey-slide-content">
                <p class="journey-slide-song">${s.song}</p>
                <p class="journey-slide-artist">${s.artist}</p>
                <div class="journey-slide-divider"></div>
                <p class="journey-slide-text">${s.text}</p>
            </div>`;
        journeySlidesCt.appendChild(slide);
    });

    // ── GERA PONTOS DA TRILHA ────────────────────────
    journeySongs.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "journey-dot";
        dot.id = `journey-dot-${i}`;
        journeyDotsCt.appendChild(dot);
    });

    // ── SCROLL TRIGGER PRINCIPAL ─────────────────────
    let currentSlide = -1;

    ScrollTrigger.create({
        trigger: journeySection,
        start: "top top",
        end: "bottom bottom",
        pin: false, // a stickiness é via position:sticky no .journey-slides
        onToggle: self => {
            if (self.isActive) {
                journeyTrail.classList.add("active");
            } else {
                journeyTrail.classList.remove("active");
                if (!self.isActive) fadeOutAll();
            }
        },
        onUpdate: self => {
            const p = self.progress; // 0 → 1

            // Atualiza trilha
            trailFill.style.height = `${p * 100}%`;

            // Determina slide ativo
            // Divide o progresso em N fatias iguais
            const idx = Math.min(Math.floor(p * N), N - 1);

            if (idx !== currentSlide) {
                // Saída do slide anterior
                if (currentSlide >= 0) {
                    const prevSlide = document.getElementById(`journey-slide-${currentSlide}`);
                    if (prevSlide) {
                        gsap.to(prevSlide, {
                            opacity: 0, y: p > currentSlide / N ? -40 : 40,
                            duration: 0.5, ease: "power2.in",
                            onComplete: () => prevSlide.classList.remove("active")
                        });
                    }
                    const prevDot = document.getElementById(`journey-dot-${currentSlide}`);
                    if (prevDot) prevDot.classList.add("reached");
                }

                currentSlide = idx;

                // Entrada do slide novo
                const newSlide = document.getElementById(`journey-slide-${idx}`);
                if (newSlide) {
                    newSlide.classList.add("active");
                    gsap.fromTo(newSlide,
                        { opacity: 0, y: 40 },
                        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                    );
                }

                const newDot = document.getElementById(`journey-dot-${idx}`);
                if (newDot) newDot.classList.add("reached");

                // Crossfade de áudio
                crossfadeTo(journeySongs[idx].audioSrc);
            }
        }
    });

    // ── PLAYLIST FINAL ───────────────────────────────
    gsap.to(".playlist-inner", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".playlist-section",
            start: "top 70%",
        }
    });

});

const isMobile = window.innerWidth < 768;

const gate = document.getElementById("mobile-gate");
const desktopBtn = document.getElementById("desktop-btn");
const continueBtn = document.getElementById("continue-btn");

if (isMobile) {
    gate.classList.add("show");
}

desktopBtn.addEventListener("click", () => {

    document.body.classList.add("force-desktop");

    gate.classList.remove("show");
});