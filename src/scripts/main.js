const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },
    values: {
        lives: 3,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        // Define a velocidade do jogo
        timerId: setInterval(randomSquare, 600),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function resetGame() {
    state.values.lives = 3;
    state.values.result = 0;
    state.values.currentTime = 60;

    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    state.actions.countDownTimerId = setInterval(countDown, 1000);
    state.actions.timerId = setInterval(randomSquare, 600);

    setTimeout(() => {
        alert("Game Over! O seu resultado foi: " + state.values.result)
        state.view.lives.textContent = "x" + state.values.lives;
        state.view.score.textContent = 0;;
    }, 100);
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        playSound("timeover");
        resetGame();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function playSound(audioname) {
    let audio = new Audio(`./src/audios/${audioname}.wav`);
    audio.volume = 0.2;
    audio.play();
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
                square.classList.remove("enemy");
            } else {
                state.values.lives--
                state.view.lives.textContent = "x" + state.values.lives;
                playSound("miss");
                if (state.values.lives <= 0) {
                    playSound("lose");
                    resetGame();
                }
            }
        });
    })
};

function main() {
    addListenerHitBox();
};

main();