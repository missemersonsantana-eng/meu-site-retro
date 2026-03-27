// Banco de dados dos jogos
const games = [
    {
        id: 1,
        title: "Cadillacs and Dinosaurs",
        year: "1993",
        category: "ACTION",
        description: "Lute contra dinossauros e salve o mundo neste clássico arcade!",
        image: "assets/images/cadillacs.jpg",
        tags: ["ACTION", "SIDE-SCROLLING", "MULTIPLAYER"],
        gamePath: "games/cadillacs/index.html"
    },
    {
        id: 2,
        title: "Dynasty Wars",
        year: "1989",
        category: "ACTION",
        description: "Monte a cavalo e lute na China antiga! Derrote generais poderosos.",
        image: "assets/images/dynasty.jpg",
        tags: ["ACTION", "HISTORY", "BEAT 'EM UP"],
        gamePath: "games/dynasty/index.html"
    },
    {
        id: 3,
        title: "Street Fighter II",
        year: "1991",
        category: "FIGHTING",
        description: "O clássico dos jogos de luta! Escolha seu lutador e vença.",
        image: "assets/images/sf2.jpg",
        tags: ["FIGHTING", "ARCADE", "VS"],
        gamePath: "games/sf2/index.html"
    },
    {
        id: 4,
        title: "Super Mario Bros",
        year: "1985",
        category: "PLATFORM",
        description: "O encanador mais famoso do mundo em sua aventura clássica!",
        image: "assets/images/mario.jpg",
        tags: ["PLATFORM", "NINTENDO", "CLASSIC"],
        gamePath: "games/mario/index.html"
    },
    {
        id: 5,
        title: "Sonic the Hedgehog",
        year: "1991",
        category: "PLATFORM",
        description: "Corra em alta velocidade com o ouriço mais rápido do mundo!",
        image: "assets/images/sonic.jpg",
        tags: ["PLATFORM", "SEGA", "SPEED"],
        gamePath: "games/sonic/index.html"
    },
    {
        id: 6,
        title: "Metal Slug",
        year: "1996",
        category: "SHOOTER",
        description: "O clássico run-and-gun com gráficos incríveis e ação frenética!",
        image: "assets/images/metalslug.jpg",
        tags: ["SHOOTER", "ARCADE", "RUN-AND-GUN"],
        gamePath: "games/metalslug/index.html"
    }
];

// Função para renderizar os cards
function renderGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    
    if (!gamesGrid) return;
    
    gamesGrid.innerHTML = games.map(game => `
        <div class="game-card" onclick="playGame(${game.id})">
            <img class="game-image" src="${game.image}" alt="${game.title}" onerror="this.src='https://via.placeholder.com/280x180?text=${game.title}'">
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

// Função para abrir o jogo
function playGame(gameId) {
    const game = games.find(g => g.id === gameId);
    if (game) {
        // Salvar no localStorage qual jogo está sendo jogado
        localStorage.setItem('currentGame', JSON.stringify(game));
        // Redirecionar para a página do jogo
        window.location.href = 'game.html';
    }
}

// Função para scroll suave até os jogos
function scrollToGames() {
    document.querySelector('.games-section').scrollIntoView({ behavior: 'smooth' });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    
    // Busca de jogos
    const searchInput = document.querySelector('.search input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredGames = games.filter(game => 
                game.title.toLowerCase().includes(searchTerm) ||
                game.category.toLowerCase().includes(searchTerm) ||
                game.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            
            const gamesGrid = document.getElementById('gamesGrid');
            gamesGrid.innerHTML = filteredGames.map(game => `
                <div class="game-card" onclick="playGame(${game.id})">
                    <img class="game-image" src="${game.image}" alt="${game.title}" onerror="this.src='https://via.placeholder.com/280x180?text=${game.title}'">
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
});