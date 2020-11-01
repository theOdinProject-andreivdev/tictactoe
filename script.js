const Player = (_sign, name) => {
  let sign = _sign;
  let wins = 0;
  const saySign = () => {
    return sign;
  };

  const isWinner = () => {
    console.log(name + " wins!");
    wins++;
  };

  return { saySign, isWinner };
};

const game = (() => {
  let currentPlayer;

  const play = () => {
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
    }
    if (currentPlayer == playerOne) currentPlayer = playerTwo;
    else currentPlayer = playerOne;
  };
  return { setCurrentPlayer, click, play };
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

  return { draw, mark, resetBoard, checkGameOver };
})();

const playerOne = Player("X", "The X");
const playerTwo = Player("O", "The O");

game.setCurrentPlayer(playerOne);
game.play();
