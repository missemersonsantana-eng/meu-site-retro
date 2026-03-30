// Banco de dados dos jogos
const games = [
    {
        id: 1,
        title: "Top Gear",
        year: "1992",
        category: "RACING",
        description: "Corrida clássica do SNES! Velocidade e adrenalina pura.",
        image: "assets/images/top-gear.jpg",
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
        slug: "street-fighter-ii",
        tags: ["FIGHTING", "ARCADE", "CAPCOM"]
    },
    {
        id: 4,
        title: "Cadillacs e Dinossauros",
        year: "1996",
        category: "FIGHTING",
        description: "Cadillacs and Dinosaurs é um jogo de luta de rolagem lateral frenético que captura a energia barulhenta e acelerada dos fliperamas.",
        image: "assets/images/cadilacedino.jpg",
        slug: "cadillacs-and-dinosaurs-1993",
        tags: ["FIGHTING", "ARCADE", "CAPCOM"]
    },

    {
        id: 5,
        title: "Pokemon",
        year: "1993",
        category: "FIGHTING",
        description: "Pokémon Blue Version para Game Boy é uma versão aprimorada dos lançamentos originais Pokémon Red e Green, chegando em 1996 como o primeiro lançamento internacional independente da série.",
        image: "assets/images/pokemonblue.jpg",
        slug: "pokemon-blue-version",
        tags: ["FIGHTING", "ARCADE", "CAPCOM"]
    }
];

// URL base do ClassicJoy
const BASE_URL = "https://classicjoy.games/embed?slug=";

// Renderizar os cards na página
function renderGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = games.map(game => `
        <div class="game-card" onclick="playGame(${game.id})">
            <img class="game-image" src="${game.image}" 
                 alt="${game.title}" 
                 onerror="this.src='https://via.placeholder.com/280x180?text=${game.title}'">
            <div class="game-info">
                <div class="game-title">${game.title} (${game.year})</div>
                <div class="game-category">${game.category}</div>
                <div class="game-description">${game.description}</div>
                <div class="game-tags">
                    ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

// Abrir o jogo
function playGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        // Salvar qual jogo foi escolhido
        localStorage.setItem('currentGame', JSON.stringify({
            title: game.title,
            url: BASE_URL + game.slug
        }));
        // Redirecionar para página do jogo
        window.location.href = 'game.html';
    }
}

// Scroll suave até os jogos
function scrollToGames() {
    document.querySelector('.games-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Busca de jogos
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = games.filter(game => 
            game.title.toLowerCase().includes(term) ||
            game.category.toLowerCase().includes(term) ||
            game.tags.some(tag => tag.toLowerCase().includes(term))
        );
        
        const gamesGrid = document.getElementById('gamesGrid');
        gamesGrid.innerHTML = filtered.map(game => `
            <div class="game-card" onclick="playGame(${game.id})">
                <img class="game-image" src="${game.image}" 
                     alt="${game.title}" 
                     onerror="this.src='https://via.placeholder.com/280x180?text=${game.title}'">
                <div class="game-info">
                    <div class="game-title">${game.title} (${game.year})</div>
                    <div class="game-category">${game.category}</div>
                    <div class="game-description">${game.description}</div>
                    <div class="game-tags">
                        ${game.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    setupSearch();
});
