const gameboardModule = (() => {
  const gameboard = {
    board: [],
  };

  function makeBoard(Array) {
    const body = document.querySelector('body');
    const wrapper = document.createElement('div');
    body.appendChild(wrapper);
    wrapper.classList = 'gameboard-wrapper';

    for (let i = 0; i < 9; i += 1) {
      const square = wrapper.appendChild(document.createElement('div'));
      square.classList = 'square';
      square.dataset.index = i;
      Array.push(square);
    }
  }

  makeBoard(gameboard.board);

  gameboard.board[4].textContent = 'O';
  gameboard.board[1].textContent = 'X';
})();

function playerFactory(name, marker) {}
