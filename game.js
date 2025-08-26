
    var allNumbers = [];
    for (var i = 1; i <= 25; i++) {
      allNumbers.push(i);
    }
  
    var calledNumbers = [];
  
    function shuffle(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }
  
    function generateBingoCard(id) {
      var board = document.getElementById(id);
      board.innerHTML = '';
      var numbers = shuffle(allNumbers.slice());
  
      for (var i = 0; i < 25; i++) {
        var cell = document.createElement('div');
        cell.className = 'bingo-cell';
        cell.innerText = numbers[i];
        cell.setAttribute('data-number', numbers[i]);
        cell.setAttribute('data-marked', 'false');
  
        cell.onclick = function () {
          var num = Number(this.getAttribute('data-number'));
          var found = false;
          for (var i = 0; i < calledNumbers.length; i++) {
            if (calledNumbers[i] == num) {
              found = true;
            }
          }
          if (found) {
            if (this.getAttribute('data-marked') == 'false') {
              this.style.backgroundColor = '#eaa6d6';
              this.style.color = 'white';
              this.setAttribute('data-marked', 'true');
            } else {
              this.style.backgroundColor = '#fff0f9';
              this.style.color = '#4a004e';
              this.setAttribute('data-marked', 'false');
            }
            checkWin(id);
          }
        };
  
        board.appendChild(cell);
      }
    }
  
    function generateAllBoards() {
      calledNumbers = [];
      document.getElementById("number-display").innerText = "--";
      generateBingoCard("board1");
    }
  
    function callNextNumber() {
      var remaining = [];
      for (var i = 0; i < allNumbers.length; i++) {
        var alreadyCalled = false;
        for (var j = 0; j < calledNumbers.length; j++) {
          if (allNumbers[i] == calledNumbers[j]) {
            alreadyCalled = true;
          }
        }
        if (!alreadyCalled) {
          remaining.push(allNumbers[i]);
        }
      }
  
      if (remaining.length > 0) {
        var next = remaining[Math.floor(Math.random() * remaining.length)];
        calledNumbers.push(next);
        document.getElementById("number-display").innerText = next;
      }
    }
  
    function checkWin(id) {
      var board = document.getElementById(id);
      var cells = board.getElementsByClassName("bingo-cell");
      var marked = [];
  
      for (var i = 0; i < cells.length; i++) {
        marked.push(cells[i].getAttribute('data-marked') == 'true' ? 1 : 0);
      }
  
      var wins = [
        [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],
        [15,16,17,18,19],[20,21,22,23,24],
        [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],
        [3,8,13,18,23],[4,9,14,19,24],
        [0,6,12,18,24],[4,8,12,16,20]
      ];
  
      for (var i = 0; i < wins.length; i++) {
        var win = true;
        for (var j = 0; j < wins[i].length; j++) {
          if (marked[wins[i][j]] != 1) {
            win = false;
          }
        }
        if (win) {
          document.getElementById("winner-overlay").style.display = "flex";
        }
      }
    }
  
    function restartGame() {
      document.getElementById("winner-overlay").style.display = "none";
      generateAllBoards();
    }
  
    function goHome() {
      window.location.href = "index.html";
    }
  
    window.onload = generateAllBoards;

  