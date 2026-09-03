// DEPRECATED — the game has been modularised under ./src/.
// This file exists only to provide a helpful error if an old cached index.html
// still references it. See src/main.js for the new entry point.
console.error(
    'game.js is no longer the entry point. Please hard-refresh (shift+reload). ' +
        'The game now loads from src/main.js as an ES module.'
);
