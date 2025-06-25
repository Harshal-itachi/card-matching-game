const grid = document.querySelector(".game-cards");
const btn = document.querySelector(".restart");
const movesCounter = document.querySelector("#moves-counter");
const timer = document.querySelector("#timer");

const symbols = ["❤️", "⭐", "🍀", "🐱", "🎵", "⚽", "🧩", "🌈"];
let cards = [...symbols, ...symbols];

let flippedCard = [];
let moves = 0;
let matchedPair = 0;
let time = 0;
let timeInterval;

function shuffleCards() {
    cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    grid.innerHTML = "";
    shuffleCards();
    cards.forEach(symbol => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.symbol = symbol;
        card.innerHTML = "?";
        card.addEventListener("click", flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCard.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.innerHTML = this.dataset.symbol;
        flippedCard.push(this);

        if (flippedCard.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    moves++;
    movesCounter.textContent = moves;

    if (flippedCard[0].dataset.symbol === flippedCard[1].dataset.symbol) {
        matchedPair++;
        flippedCard = [];

        if (matchedPair === symbols.length) {
            clearInterval(timeInterval);
            setTimeout(() => {
                alert("You win!");
            }, 300);
        }
    } else {
        flippedCard.forEach(card => {
            card.classList.remove("flipped");
            card.innerHTML = "?";
        });
        flippedCard = [];
    }
}


function startGame() {
    moves = 0;
    movesCounter.textContent = moves;
    matchedPair = 0;
    time = 0;
    timer.textContent = "00:00";
    clearInterval(timeInterval);

    createBoard();

    document.querySelectorAll(".card").forEach(card => {
        card.classList.add("flipped");
        card.style.pointerEvents = "none";
        card.innerHTML = card.dataset.symbol;
    });

    setTimeout(() => {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("flipped");
            card.innerHTML = "?";
        });


        timeInterval = setInterval(() => {
            time++;
            let minutes = String(Math.floor(time / 60)).padStart(2, "0~");
            let seconds = String(time % 60).padStart(2, "0");
            timer.textContent = `${minutes}:${seconds}`;
        }, 1000);

 
        setTimeout(() => {
            document.querySelectorAll(".card").forEach(card => {
                card.style.pointerEvents = "auto";
            });
        }, 500);
    }, 3000);  
}


btn.addEventListener("click", startGame);

startGame();
