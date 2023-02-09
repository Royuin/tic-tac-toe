const gameboardModule = (() => {
  const board = [];

  function makeBoard() {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');
    body.appendChild(wrapper);
    wrapper.classList = 'gameboard-wrapper';

    for (let i = 0; i < 9; i += 1) {
      const square = wrapper.appendChild(document.createElement('div'));
      square.classList = 'square';
      square.dataset.index = i;
    }
  }

  makeBoard(board);

  function updateGameboard() {
    for (let i = 0; i < 9; i += 1) {
      const currentSquare = document.querySelector(`[data-index='${i}']`);

      currentSquare.textContent = board[i];
    }
  }

  return { board, updateGameboard };
})();

function playerFactory(name, marker) {
  return { name, marker };
}

const player1 = playerFactory('player1', 'X');
const player2 = playerFactory('Player2', 'O');

const gameFunctions = (() => {
  const gameInfo = {
    currentPlayer: undefined,
    winner: undefined,
  };
  const startBtn = document.querySelector('.start');

  function checkForWinner() {
    const display = document.querySelector('.display');
    const array = gameboardModule.board;
    const p1Marker = player1.marker;
    if (
      array[0] === p1Marker &&
      array[1] === p1Marker &&
      array[2] === p1Marker
    ) {
      gameInfo.winner = player1;
      display.textContent = `${gameInfo.winner.name} wins!`;
    }
  }

  function takeTurnEventListener(element, index) {
    element.addEventListener('click', () => {
      if (gameInfo.winner !== undefined) {
        return;
      }
      if (
        gameboardModule.board[index] !== 'X' &&
        gameboardModule.board[index] !== 'O'
      ) {
        gameboardModule.board[index] = gameInfo.currentPlayer.marker;
        gameboardModule.updateGameboard();
        if (gameInfo.currentPlayer === player1) {
          gameInfo.currentPlayer = player2;
        } else if (gameInfo.currentPlayer === player2) {
          gameInfo.currentPlayer = player1;
        }
      }
      checkForWinner();
    });
  }

  function squareSelectorLoop() {
    let currentSquare;
    for (let i = 0; i < 9; i += 1) {
      currentSquare = document.querySelector(`[data-index='${i}']`);
      const index = currentSquare.dataset.index;
      takeTurnEventListener(currentSquare, index);
    }
  }

  startBtn.addEventListener('click', () => {
    gameInfo.currentPlayer = player1;
    squareSelectorLoop(gameInfo.currentPlayer);
  });
})();
