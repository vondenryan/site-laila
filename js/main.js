document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // ════════════════════════════════════════════════
    // DADOS — todos os 27 estados + DF
    // Para adicionar Spotify: substitua null pela URL da track
    // Aceita open.spotify.com/track/ID ou /embed/track/ID
    // ════════════════════════════════════════════════
    const musicByState = {
        BRAC: { name: "Acre",                flag: "🌳", song: "Something - Remastered 2009",          artist: "The Beatles",               color: "#34d399", preview: "https://p.scdn.co/mp3-preview/104949214901a426c39555215ec79d8a30d6d905", spotifyEmbed: "https://open.spotify.com/embed/track/0pNeVovbiZHkulpGeOx1Gj" },
        BRAL: { name: "Alagoas",             flag: "🎵", song: "Se...",                                 artist: "Djavan",                    color: "#fb923c", preview: "https://p.scdn.co/mp3-preview/e683be2df46e1c97720559050cffac77c11494a8", spotifyEmbed: "https://open.spotify.com/embed/track/0PgsB53yhlKs8D19LgYU4i" },
        BRAM: { name: "Amazonas",            flag: "🌿", song: "Vilarejo - Ao Vivo",                    artist: "Tribalistas",               color: "#34d399", preview: "https://p.scdn.co/mp3-preview/168f7b0092e6e9b7d99f82a95b43577f16de3a6c", spotifyEmbed: "https://open.spotify.com/embed/track/0pWG2AKckt7Rcy9JGr4oLq" },
        BRAP: { name: "Amapá",               flag: "🌊", song: "Exagerado",                             artist: "Cazuza",                    color: "#2dd4bf", preview: "https://p.scdn.co/mp3-preview/fe7cb86b056e2ca805f8c31d369d1e583469d3c6", spotifyEmbed: "https://open.spotify.com/embed/track/4d0DpU7Odiv0ztvX2GxJlk" },
        BRBA: { name: "Bahia",               flag: "🌊", song: "Aquele Abraço",                         artist: "Gilberto Gil",              color: "#ff5c8a", preview: "https://p.scdn.co/mp3-preview/0599af45cb3b68642151db0083ab7c24b522d7d3", spotifyEmbed: "https://open.spotify.com/embed/track/7CjSjWTdVPD0ov82Qz55Xb" },
        BRCE: { name: "Ceará",               flag: "🌵", song: "Lilás",                                 artist: "Djavan",                    color: "#f97316", preview: "https://p.scdn.co/mp3-preview/6a4e1a8614ef77a1cb8dcd2c573549bf4b972803", spotifyEmbed: "https://open.spotify.com/embed/track/0V0DEGw7N5KlubvARp4VOm" },
        BRDF: { name: "Brasília (DF)",       flag: "🏛️", song: "Tempo Perdido",                         artist: "Legião Urbana",             color: "#c084fc", preview: "https://p.scdn.co/mp3-preview/f4da817032001471ba40cfd9f112b737e28d062c", spotifyEmbed: "https://open.spotify.com/embed/track/7MnT7msJZg3XBAS0OTfGrB" },
        BRES: { name: "Espírito Santo",      flag: "🌺", song: "O Sol",                                 artist: "Jota Quest",                color: "#f43f5e", preview: "https://p.scdn.co/mp3-preview/4847ca1734498f3002bac3d7028f5b6283d9d188", spotifyEmbed: "https://open.spotify.com/embed/track/0v1fLMHpMqsh6AiAGQ9Dam" },
        BRGO: { name: "Goiás",               flag: "🎸", song: "Por Onde Andei - Ao Vivo",              artist: "Nando Reis",                color: "#fbbf24", preview: "https://p.scdn.co/mp3-preview/1b46f0ef48aded0a84a39b96917075c3c07eb82e", spotifyEmbed: "https://open.spotify.com/embed/track/4CpwoEs39CydHJuTCl9kfm" },
        BRMA: { name: "Maranhão",            flag: "🪘", song: "Pisando Descalço",                      artist: "Maneva",                    color: "#f43f5e", preview: "https://p.scdn.co/mp3-preview/65824dc20b64f18898557459595f2a799c2898f1", spotifyEmbed: "https://open.spotify.com/embed/track/4wsQ8QosIoFCIeLuGUPtDW" },
        BRMG: { name: "Minas Gerais",        flag: "⛰️", song: "Flor de Lis",                           artist: "Djavan",                    color: "#ffcc66", preview: "https://p.scdn.co/mp3-preview/e19e8fb40d097bd63cdfbf509c03a959eff1e6da", spotifyEmbed: "https://open.spotify.com/embed/track/1dociHCC4kVIaZu4Sg9ip6" },
        BRMS: { name: "Mato Grosso do Sul",  flag: "🌾", song: "Aonde Quer Que Eu Vá",                  artist: "Os Paralamas Do Sucesso",   color: "#a3e635", preview: "https://p.scdn.co/mp3-preview/4a43ae9f81332f9ecc4a62f703c8361a9c4bd855", spotifyEmbed: "https://open.spotify.com/embed/track/0NFVg74sSsdU1gNc9xfpIO" },
        BRMT: { name: "Mato Grosso",         flag: "🌅", song: "Mamma Mia",                             artist: "ABBA",                      color: "#fbbf24", preview: "https://p.scdn.co/mp3-preview/b578f8867804a1545b49ef6aea52bd0b8ec766d4", spotifyEmbed: "https://open.spotify.com/embed/track/2TxCwUlqaOH3TIyJqGgR91" },
        BRPA: { name: "Pará",                flag: "🎶", song: "Não Quero Dinheiro (Só Quero Amar)",    artist: "Tim Maia",                  color: "#2dd4bf", preview: "https://p.scdn.co/mp3-preview/99f42f32e9e19b0d63b436fb270956aa952c7776", spotifyEmbed: "https://open.spotify.com/embed/track/0SfcG65T1KKCj5NQffpzQR" },
        BRPB: { name: "Paraíba",             flag: "🎺", song: "Sina",                                  artist: "Djavan",                    color: "#f97316", preview: "https://p.scdn.co/mp3-preview/172251ef4372f7eb2c445e24820f0d3aecc17e04", spotifyEmbed: "https://open.spotify.com/embed/track/5gQeBRDlFEreoxtojHnzn1" },
        BRPE: { name: "Pernambuco",          flag: "🥁", song: "Relicário - Ao Vivo",                   artist: "Cássia Eller, Nando Reis",  color: "#e879f9", preview: "https://p.scdn.co/mp3-preview/c672e1683700134a42322dc408cc0a571f792f5d", spotifyEmbed: "https://open.spotify.com/embed/track/6HhXiy5XZ81Pyv3yCZMtj1" },
        BRPI: { name: "Piauí",               flag: "🌵", song: "Vamos Fugir",                           artist: "Skank",                     color: "#fb923c", preview: "https://p.scdn.co/mp3-preview/6ceebfdfe2820d77703bcda17c9ac0485924a169", spotifyEmbed: "https://open.spotify.com/embed/track/7dxK6RSoCWZcb5gobxs1h9" },
        BRPR: { name: "Paraná",              flag: "🌲", song: "Como Tudo Deve Ser",                    artist: "Charlie Brown Jr.",         color: "#a3e635", preview: "https://p.scdn.co/mp3-preview/4f3eea4de1f41ee68a4f1c00093db11ba99ab1b1", spotifyEmbed: "https://open.spotify.com/embed/track/3QI5bIozef0HZ1kJnA2RdT" },
        BRRJ: { name: "Rio de Janeiro",      flag: "🏖️", song: "Amiga da Minha Mulher",                 artist: "Seu Jorge",                 color: "#1db954", preview: "https://p.scdn.co/mp3-preview/6be44b508ca653b8aa7193cd9b063dede19f7e87", spotifyEmbed: "https://open.spotify.com/embed/track/5nh2T9qvyXZCvVVYYESeRW" },
        BRRN: { name: "Rio Grande do Norte", flag: "☀️", song: "O Sol",                                 artist: "Vitor Kley",                color: "#fbbf24", preview: "https://p.scdn.co/mp3-preview/5acd088a19d058da046e2898a228d2bff6579434", spotifyEmbed: "https://open.spotify.com/embed/track/1j5N75y26nH2l0uPa9JlKe" },
        BRRO: { name: "Rondônia",            flag: "🌿", song: "Proibida Pra Mim (Grazon)",             artist: "Charlie Brown Jr.",         color: "#34d399", preview: "https://p.scdn.co/mp3-preview/02e097e967ba7a9ba1cd36a815451440c21d8c57", spotifyEmbed: "https://open.spotify.com/embed/track/5HOkVB35cz5nK6ZeRj0xM6" },
        BRRR: { name: "Roraima",             flag: "🌄", song: "Here Comes The Sun - Remastered 2009",  artist: "The Beatles",               color: "#60a5fa", preview: "https://p.scdn.co/mp3-preview/c92aa1522f4d342468892d77a4e55e27356aa295", spotifyEmbed: "https://open.spotify.com/embed/track/6dGnYIeXmHdcikdzNNDMm2" },
        BRRS: { name: "Rio Grande do Sul",   flag: "🌿", song: "Sol Loiro",                             artist: "Armandinho",                color: "#8e7dff", preview: "https://p.scdn.co/mp3-preview/9fe79bc39823d84e3d0cf6da82e37b3b6fea57f1", spotifyEmbed: "https://open.spotify.com/embed/track/679bhkmbKtkLaBd9CfSQH8" },
        BRSC: { name: "Santa Catarina",      flag: "🏔️", song: "Analua",                                artist: "Armandinho",                color: "#60a5fa", preview: "https://p.scdn.co/mp3-preview/d8d768455f615e8b1671a73720816b1fe07aa2d6", spotifyEmbed: "https://open.spotify.com/embed/track/1gJJghkaqrRTk9WwmyEwyd" },
        BRSE: { name: "Sergipe",             flag: "🎵", song: "Sutilmente",                            artist: "Skank",                     color: "#fb923c", preview: "https://p.scdn.co/mp3-preview/034ce8cf84b1c8ec7ee593609809a4b028b65b19", spotifyEmbed: "https://open.spotify.com/embed/track/4pG8lbKPKkfGSniMXxZTM7" },
        BRSP: { name: "São Paulo",           flag: "🏙️", song: "Dona do Meu Pensamento",                artist: "Charlie Brown Jr.",         color: "#00c2ff", preview: "https://p.scdn.co/mp3-preview/bf482da711892c02160df2e9c709b45fe7301533", spotifyEmbed: "https://open.spotify.com/embed/track/3EBtHRt4uSSFhNladqH3UP" },
        BRTO: { name: "Tocantins",           flag: "🌾", song: "O Vagabundo e a Dama",                  artist: "Oriente",                   color: "#fbbf24", preview: "https://p.scdn.co/mp3-preview/ce2ec6212a595eb0387a9da57a5c589d1c4b5759", spotifyEmbed: "https://open.spotify.com/embed/track/7MQJYm0QPF2Vf0UtzKapSc" },
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

    // — Deseleciona estado e para áudio ao sair da seção do mapa —
    ScrollTrigger.create({
        trigger: ".map-section",
        start: "top top",
        end: "bottom bottom",
        onLeave: () => {
            if (activeEl) {
                activeEl.classList.remove("active");
                activeEl.style.fill = "";
                activeEl.style.filter = "";
                activeEl = null;
            }
            infoPanel.classList.remove("visible");
            setSpotify(null);
            mapFadeOutAll();
        },
        onLeaveBack: () => {
            if (activeEl) {
                activeEl.classList.remove("active");
                activeEl.style.fill = "";
                activeEl.style.filter = "";
                activeEl = null;
            }
            infoPanel.classList.remove("visible");
            setSpotify(null);
            mapFadeOutAll();
        }
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
        const url = musicByState[id]?.preview;
        if (url) mapCrossfadeTo(url);
        else mapFadeOutAll();
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
            song:     "Pela Luz dos Olhos Teus",
            artist:   "Miúcha, Antônio Carlos Jobim",
            text:     "Algumas músicas não são só favoritas. São quase parte de quem você é.",
            audioSrc: "https://p.scdn.co/mp3-preview/1e4c088009e9152e80a303192de90abcd2d101b0",
        },
        {
            song:     "Billie Jean",
            artist:   "Michael Jackson",
            text:     "E às vezes você surpreende. Porque seu gosto vai muito além do esperado.",
            audioSrc: "https://p.scdn.co/mp3-preview/84c7d8302cebe916b8a02392ece9b2c72ce95d34",
        },
        {
            song:     "Dona do Meu Pensamento",
            artist:   "Charlie Brown Jr.",
            text:     "E no fim, algumas músicas não explicam nada. Só deixam tudo mais claro.",
            audioSrc: "https://p.scdn.co/mp3-preview/bf482da711892c02160df2e9c709b45fe7301533",
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

    // — Música de fundo da seção playlist —
    const playlistAudioSrc = "./assets/musics/playlist-ambient.mp3"; // substituir pelo nome real do arquivo
    const playlistPlayer = new Audio();
    playlistPlayer.src = playlistAudioSrc;
    playlistPlayer.loop = true;
    playlistPlayer.volume = 0;
    let playlistFadeInterval = null;

    function playlistFadeIn() {
        if (playlistFadeInterval) clearInterval(playlistFadeInterval);
        playlistPlayer.play().catch(() => {});
        const steps = 20;
        let step = 0;
        const target = 0.05;
        playlistFadeInterval = setInterval(() => {
            step++;
            playlistPlayer.volume = Math.min(target, target * (step / steps));
            if (step >= steps) { clearInterval(playlistFadeInterval); playlistFadeInterval = null; }
        }, 40);
    }

    function playlistFadeOut() {
        if (playlistFadeInterval) clearInterval(playlistFadeInterval);
        const start = playlistPlayer.volume;
        if (start === 0) return;
        let step = 0;
        playlistFadeInterval = setInterval(() => {
            step++;
            playlistPlayer.volume = Math.max(0, start * (1 - step / 20));
            if (step >= 20) {
                clearInterval(playlistFadeInterval);
                playlistFadeInterval = null;
                playlistPlayer.pause();
                playlistPlayer.volume = 0;
            }
        }, 40);
    }

    // playlistAudioSrc ja definido acima como assets/musics/playlist-ambient.mp3
    // Começa quando chega na playlist — não para nunca pelo scroll
    ScrollTrigger.create({
        trigger: ".playlist-section",
        start: "top 80%",
        once: true,
        onEnter: () => playlistFadeIn(),
    });

    // Para a playlist quando o usuário volta pro journey
    ScrollTrigger.create({
        trigger: "#journey-section",
        start: "top top",
        end: "bottom bottom",
        onEnter: () => playlistFadeOut(),
        onEnterBack: () => playlistFadeOut(),
    });

});