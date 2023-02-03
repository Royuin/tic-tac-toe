const gameboardModule = (() => {
  const gameboard = {
    board: [],
  };

  function makeBoard(Array) {
    const body = document.querySelector('body');

    for (let i = 0; i < 9; i += 1) {
      const square = body.appendChild(document.createElement('div'));
      square.dataset.number = i;
      Array.push(square);
    }
  }

  makeBoard(gameboard.board);

  gameboard.board[4].textContent = 'O';
  gameboard.board[1].textContent = 'X';
})();

function playerFactory(name, marker) {}
