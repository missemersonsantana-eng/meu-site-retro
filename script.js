// Banco de dados dos jogos
const games = [
    {
        id: 1,
        title: "Meu Primeiro Jogo",
        year: "2024",
        category: "ACTION",
        description: "Um jogo divertido para testar!",
        image: "assets/images/meujogo.jpg",
        tags: ["ACTION", "COLETAR"],
        gamePath: "games/Meu Primeiro Jogo (2024)/index.html"  // ← caminho para seu jogo
    },
    // Adicione mais jogos aqui
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