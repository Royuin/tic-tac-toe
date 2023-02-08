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

  function textEventListener(element, index) {
    element.addEventListener('click', () => {
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
    });
  }

  function squareSelectorLoop() {
    let currentSquare;
    for (let i = 0; i < 9; i += 1) {
      currentSquare = document.querySelector(`[data-index='${i}']`);
      const index = currentSquare.dataset.index;
      textEventListener(currentSquare, index);
    }
  }

  startBtn.addEventListener('click', () => {
    gameInfo.currentPlayer = player1;
    squareSelectorLoop(gameInfo.currentPlayer);
  });
})();
