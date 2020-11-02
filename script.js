const Player = (_sign, _name) => {
  let name = _name;
  let sign = _sign;
  let wins = 0;
  const saySign = () => {
    return sign;
  };

  const sayName = () => {
    return name;
  };

  const isWinner = () => {
    console.log(name + " wins!");
    wins++;
  };

  const getWins = () => {
    return wins;
  };

  return { saySign, sayName, isWinner, getWins };
};

const game = (() => {
  let currentPlayer;
  let gameMode;

  const start = () => {
    let chooseGameMode = document.querySelector(".chooseGameMode");
    chooseGameMode.style.display = "grid";

    let singlePlayerButton = document.querySelector(".singleplayer");
    let multiPlayerButton = document.querySelector(".multiplayer");
    singlePlayerButton.addEventListener("click", function () {
      game.setGameMode("singleplayer");
      startSinglePlayer();
    });

    multiPlayerButton.addEventListener("click", function () {
      game.setGameMode("multiplayer");
      startMultiPlayer();
    });
  };

  const startSinglePlayer = () => {
    let chooseGameMode = document.querySelector(".chooseGameMode");
    chooseGameMode.style.display = "none";

    let singleplayerscreen = document.querySelector(".singleplayerscreen");
    singleplayerscreen.style.display = "grid";

    let startSingleplayerButton = document.querySelector(".startsingleplayer");
    startSingleplayerButton.addEventListener("click", function () {
      let playerName = document.querySelector(".player");
      if (playerName.value != "") {
        singleplayerscreen.style.display = "none";

        playerOne = Player("X", playerName.value);
        playerTwo = Player("O", "Computer");

        game.setCurrentPlayer(playerOne);
        game.play();
        drawScoreBoard();
      } else alert("Please choose a name");
    });
  };

  const startMultiPlayer = () => {
    let chooseGameMode = document.querySelector(".chooseGameMode");
    chooseGameMode.style.display = "none";

    let multiplayerscreen = document.querySelector(".multiplayerscreen");
    multiplayerscreen.style.display = "grid";

    let startMultiplayerButton = document.querySelector(".startmultiplayer");
    startMultiplayerButton.addEventListener("click", function () {
      let player1Name = document.querySelector(".player1");
      let player2Name = document.querySelector(".player2");

      if (player1Name.value != "" && player2Name.value != "") {
        multiplayerscreen.style.display = "none";

        playerOne = Player("X", player1Name.value);
        playerTwo = Player("O", player2Name.value);

        game.setCurrentPlayer(playerOne);
        game.play();
        drawScoreBoard();
      } else alert("Please choose player names");
    });
  };

  const drawScoreBoard = () => {
    let player1Score = document.querySelector(".player1score");
    let player2Score = document.querySelector(".player2score");

    player1Score.innerHTML =
      playerOne.sayName() + ": " + playerOne.getWins() + " wins";

    player2Score.innerHTML =
      playerTwo.sayName() + ": " + playerTwo.getWins() + " wins";
  };
  const setGameMode = (mode) => {
    gameMode = mode;
  };

  const play = () => {
    drawScoreBoard();
    gameboard.resetBoard();
    gameboard.draw();
  };

  const setCurrentPlayer = (player) => {
    currentPlayer = player;
  };

  const click = (position) => {
    if (gameboard.mark(position, currentPlayer.saySign())) {
      if (gameboard.checkGameOver() == "win") {
        currentPlayer.isWinner();
        play();
      }
      if (gameboard.checkGameOver() == "tie") play();
    } else {
      alert("Please pick a valid block");
      return;
    }

    if (currentPlayer == playerOne) currentPlayer = playerTwo;
    else currentPlayer = playerOne;

    if (gameMode == "singleplayer" && currentPlayer == playerTwo) {
      //computer
      setTimeout(function () {
        playComputer();
      }, 250);
    }
  };

  const playComputer = () => {
    let moves = gameboard.possibleMoves();
    console.log(moves);
    let move = moves[Math.floor(parseFloat(moves.length) * Math.random())];
    console.log(move);
    click(move);
  };
  return { start, setGameMode, setCurrentPlayer, click, play };
})();

const gameboard = (() => {
  let gridData = ["", "", "", "", "", "", "", "", ""];
  let grid = document.querySelector(".grid");

  const resetBoard = () => {
    gridData = ["", "", "", "", "", "", "", "", ""];
  };

  const draw = (data) => {
    while (grid.firstChild) grid.removeChild(grid.firstChild);
    for (i = 0; i < 9; i++) {
      let gridElement = document.createElement("div");
      gridElement.classList.add("gridElement");
      gridElement.dataset.position = i;
      gridElement.addEventListener("click", function () {
        game.click(this.dataset.position);
      });
      gridElement.textContent = gridData[i];
      grid.appendChild(gridElement);
    }
  };

  const mark = (position, val) => {
    if (gridData[position] != "X" && gridData[position] != "O") {
      gridData[position] = val;
      draw();
      return true;
    } else return false;
  };

  const checkLine = (a, b, c) => {
    if (
      gridData[a] == gridData[b] &&
      gridData[b] == gridData[c] &&
      gridData[a] != ""
    )
      return true;
    else return false;
  };

  const checkBoardFull = () => {
    for (i = 0; i < gridData.length; i++) {
      if (gridData[i] == "") {
        return false;
      }
    }
    return true;
  };

  const checkGameOver = () => {
    if (
      checkLine(0, 1, 2) ||
      checkLine(3, 4, 5) ||
      checkLine(6, 7, 8) ||
      checkLine(0, 3, 6) ||
      checkLine(1, 4, 7) ||
      checkLine(2, 5, 8) ||
      checkLine(0, 4, 8) ||
      checkLine(2, 4, 6)
    ) {
      return "win";
    } else if (checkBoardFull()) {
      return "tie";
    } else return false;
  };

  const possibleMoves = () => {
    let possibleMoves = [];
    for (i = 0; i < gridData.length; i++) {
      if (gridData[i] != "X" && gridData[i] != "O") {
        possibleMoves.push(i);
      }
    }
    return possibleMoves;
  };
  return { draw, mark, resetBoard, checkGameOver, possibleMoves };
})();

/* const playerOne = Player("X", "The X");
const playerTwo = Player("O", "The O");

game.setCurrentPlayer(playerOne);
game.play();
 */

//choose game mode

let playerOne, playerTwo;

document.querySelector(".chooseGameMode").style.display = "none";
document.querySelector(".singleplayerscreen").style.display = "none";
document.querySelector(".multiplayerscreen").style.display = "none";

game.start();
