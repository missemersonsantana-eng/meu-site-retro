const games = [
    {
        id: 1,
        title: "Top Gear",
        year: "1992",
        category: "RACING",
        description: "Corrida clássica do SNES! Velocidade e adrenalina pura.",
        image: "assets/images/top-gear.jpg",
        type: "iframe",
        slug: "top-gear",
        tags: ["RACING", "SNES", "ARCADE"]
    },
    {
        id: 2,
        title: "Super Mario World",
        year: "1990",
        category: "PLATFORM",
        description: "O clássico do Mario no SNES! Aventura inesquecível.",
        image: "assets/images/mario-world.jpg",
        type: "iframe",
        slug: "super-mario-world",
        tags: ["PLATFORM", "SNES", "NINTENDO"]
    },
    {
        id: 3,
        title: "Street Fighter II",
        year: "1991",
        category: "FIGHTING",
        description: "O rei dos jogos de luta! Escolha seu lutador.",
        image: "assets/images/street-fighter.jpg",
        type: "iframe",
        slug: "street-fighter-ii",
        tags: ["FIGHTING", "ARCADE", "CAPCOM"]
    },
    {
        id: 4,
        title: "Cadillacs e Dinossauros",
        year: "1996",
        category: "ARCADE",
        description: "Um clássico beat 'em up frenético dos fliperamas.",
        image: "assets/images/cadilacedino.jpg",
        type: "iframe",
        slug: "cadillacs-and-dinosaurs-1993",
        tags: ["ARCADE", "CAPCOM", "BEATEMUP"]
    },
    {
        id: 5,
        title: "Pokemon Blue Version",
        year: "1996",
        category: "RPG",
        description: "Pokémon Blue Version para Game Boy é um clássico absoluto.",
        image: "assets/images/pokemonblue.jpg",
        type: "iframe",
        slug: "pokemon-blue-version",
        tags: ["RPG", "GAMEBOY", "NINTENDO"]
    },
    {
        id: 6,
        title: "Meu Jogo SNES",
        year: "1994",
        category: "CUSTOM",
        description: "Minha ROM local para testar o emulador!",
        image: "assets/images/meu-jogo.jpg",
        type: "rom",
        system: "snes",
        romPath: "games/meu-jogo/rom.smc",
        tags: ["SNES", "CUSTOM", "LOCAL"]
    },
    {
        id: 7,
        title: "Carregar Minha Própria ROM",
        year: "2026",
        category: "CUSTOM",
        description: "Escolha uma ROM .nes, .smc ou .sfc do seu computador.",
        image: "assets/images/meu-jogo.jpg",
        type: "rom",
        system: "auto",
        romPath: null,
        allowFileSelect: true,
        tags: ["NES", "SNES", "UPLOAD"]
    }
];

// URL base do ClassicJoy
const BASE_URL = "https://classicjoy.games/embed?slug=";

// ============================================
// NORMALIZAR TEXTO
// ============================================
function normalizeText(text) {
    return String(text || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// ============================================
// ATUALIZAR CONTADOR
// ============================================
function updateGameCount(count) {
    const gameCount = document.getElementById("gameCount");
    if (gameCount) {
        gameCount.textContent = `${count} jogo${count !== 1 ? "s" : ""}`;
    }
}

// ============================================
// RENDERIZAR OS CARDS
// ============================================
function renderGames(list = games) {
    const gamesGrid = document.getElementById("gamesGrid");
    if (!gamesGrid) return;

    updateGameCount(list.length);

    if (!list.length) {
        gamesGrid.innerHTML = `
            <div class="empty-state">
                <p>Nenhum jogo encontrado.</p>
            </div>
        `;
        return;
    }

    gamesGrid.innerHTML = list.map(game => `
    <div class="game-card" onclick="playGame(${game.id})">
        <img 
            class="game-image" 
            src="${game.image}" 
            alt="${game.title}"
            onerror="this.onerror=null; this.src='assets/images/fallback.jpg';"
        />
        <div class="game-info">
            <div class="game-title">${game.title} (${game.year})</div>
            <div class="game-category">${game.category}</div>
            <div class="game-description">${game.description}</div>
            <div class="game-tags">
                ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>
        </div>
    </div>
`).join("");
}

// ============================================
// ABRIR O JOGO
// ============================================
function playGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (!game) return;

    const gameData = {
        id: game.id,
        title: game.title,
        year: game.year,
        category: game.category,
        description: game.description,
        image: game.image,
        type: game.type,
        tags: game.tags || []
    };

    // JOGO VIA IFRAME
    if (game.type === "iframe") {
        gameData.slug = game.slug;
        gameData.url = BASE_URL + game.slug;
    }

    // JOGO VIA ROM (AUTOMÁTICA OU MANUAL)
    if (game.type === "rom" || game.type === "local") {
        gameData.system = game.system || "auto";
        gameData.romPath = game.romPath || null;
        gameData.allowFileSelect = !!game.allowFileSelect;
    }

    localStorage.setItem("currentGame", JSON.stringify(gameData));
    window.location.href = "game.html";
}

// ============================================
// SCROLL SUAVE
// ============================================
function scrollToGames() {
    document.querySelector(".games-section")?.scrollIntoView({
        behavior: "smooth"
    });
}

// ============================================
// BUSCA
// ============================================
function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
        const term = normalizeText(e.target.value.trim());

        if (!term) {
            renderGames();
            return;
        }

        const filtered = games.filter(game =>
            normalizeText(game.title).includes(term) ||
            normalizeText(game.category).includes(term) ||
            normalizeText(game.description).includes(term) ||
            (game.tags || []).some(tag => normalizeText(tag).includes(term))
        );

        renderGames(filtered);
    });
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
    renderGames();
    setupSearch();
});