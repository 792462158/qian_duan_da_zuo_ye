let numToAlpha = ["A", "B", "C", "D", "E", "F", "G"];

let view = {
    displayMessage: function (msg) {
        let msgArea = document.getElementById("msgArea");
        msgArea.innerHTML = msg;
    },

    displayHit: function (location) {
        let atom = document.getElementById(location);
        atom.setAttribute("class", "hit");
    },

    displayMiss: function (location) {
        let atom = document.getElementById(location);
        atom.setAttribute("class", "miss");
    },

    stopInput: function () {
        let guessInput = document.getElementById("guessInput");
        guessInput.setAttribute("readonly", "readonly");
    },
    getIfGuessed: function (location) {
        let atom = document.getElementById(location);
        return (atom.className === "hit" || atom.className === "miss");
    }
}

let model = {
    borderSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships: [
        {locations: [], hits: []},
        {locations: [], hits: []},
        {locations: [], hits: []},
    ],

    tryLocation: function (location) {
        if (view.getIfGuessed(location)) {
            view.displayMessage("这个位置猜过了！");
            guessController.guesses--;
            return false;
        }
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(location);

            if (index !== -1) {
                ship.hits[index] = "hit";
                view.displayHit(location);
                view.displayMessage("命中！")

                if (this.isSunk(ship)) {
                    view.displayMessage("击毁一艘船");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(location);
        view.displayMessage("未命中");
        return false;
    },

    isSunk: function (ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

    initShips: function () {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do {
                locations = this.buildAShip();
            } while (this.isInvalidLocations(locations));
            // isInvalidLocations 碰撞检测
            this.ships[i].locations = locations;
        }
        console.log("Answer:");
        console.log(this.ships);
    },

    buildAShip: function () {
        let direction = Math.floor(Math.random() * 2);
        let row, col;
        let shipLocations = [];

        if (direction === 1) { // 水平的船
            row = Math.floor(Math.random() * this.borderSize);
            col = Math.floor(Math.random() * (this.borderSize - this.shipLength + 1));
            for (let i = 0; i < this.shipLength; i++) {
                shipLocations.push("" + numToAlpha[row] + (col + i));
            }
        } else { // 垂直的船
            row = Math.floor(Math.random() * (this.borderSize - this.shipLength + 1));
            col = Math.floor(Math.random() * this.borderSize);
            for (let i = 0; i < this.shipLength; i++) {
                shipLocations.push("" + numToAlpha[row + i] + col);
            }
        }
        return shipLocations;
    },

    isInvalidLocations: function (locations) {
        for (let i = 0; i < this.ships.length; i++) {
            let ship = this.ships[i];
            for (let j = 0; j < this.shipLength; j++) {
                if (ship.locations.indexOf(locations[j]) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
};

let guessController = {
    guesses: 0,
    processGuess: function (guess) {
        if (isValidGuess(guess)) {
            this.guesses++;
            model.tryLocation(guess);
            if (model.shipsSunk === model.numShips) {
                view.displayMessage("游戏结束,共猜<br>" + this.guesses + "次");
                view.stopInput();
            }
        } else {
            alert("输入格式错误");
        }
    }
}

function isValidGuess(guess) {
    if (guess === null || guess.length !== 2) {
        return false;
    } else {
        let firstChar = guess.charAt(0);
        let row = numToAlpha.indexOf(firstChar);
        let col = guess.charAt(1);
        if (isNaN(row) || isNaN(col) ||
            row < 0 || row >= model.borderSize ||
            col < 0 || col >= model.borderSize) {
            return false;
        }
    }
    return true;
}

function handleGuessButton() {
    let guessInput = document.getElementById("guessInput");
    let guess = guessInput.value.toUpperCase();

    guessController.processGuess(guess);
    guessInput.value = "";
}

// 按回车键完成输入
function handleEnterKey(e) {
    let guessButton = document.getElementById("guessButton");

    if (e.keyCode === 13) {
        guessButton.click();
        return false;
    }
}


window.onload = init;

function init() {
    model.initShips();

    let guessButton = document.getElementById("guessButton");
    guessButton.onclick = handleGuessButton;

    let guessInput = document.getElementById("guessInput");
    guessInput.onkeydown = handleEnterKey;
}