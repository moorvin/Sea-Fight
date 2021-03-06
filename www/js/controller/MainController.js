angular.module('application').controller('MainController', [
  '$rootScope',
  '$scope',
  function ($rootScope, $scope) {
    $scope.startButton = true;
    $scope.start = function (h, w) {
      var backfire, div1, div2, fire, getRandomPosition, i, j, k, killShip, l, len, m, p1, p2, pcShips, playerShips, ref, ref1, shipDimension, shipEl, updateShips;
      $scope.startButton = false;
      shipDimension = [
        10,
        5,
        5,
        2,
        2,
        2
      ];
      playerShips = [];
      pcShips = [];
      p1 = document.querySelector('#p1');
      p2 = document.querySelector('#p2');
      for (i = k = 0, ref = w; 0 <= ref ? k < ref : k > ref; i = 0 <= ref ? ++k : --k) {
        for (j = l = 0, ref1 = h; 0 <= ref1 ? l < ref1 : l > ref1; j = 0 <= ref1 ? ++l : --l) {
          div1 = document.createElement('div');
          div2 = document.createElement('div');
          div1.id = 'p1_' + i + '_' + j;
          div1.className = 'w';
          p1.appendChild(div1);
          div2.id = 'p2_' + i + '_' + j;
          div2.className = 'w';
          div2.onclick = function () {
            if (fire(this, pcShips, '#p2_')) {
              return backfire(playerShips);
            }
          };
          p2.appendChild(div2);
        }
      }
      getRandomPosition = function (ships, dimension, width, height) {
        var isHorizintal, location, m, n, o, p, point, ref2, ref3, ref4, ref5, ref6, ref7, xPoint, yPoint;
        isHorizintal = Math.ceil(Math.random() * 2) % 2 === 0;
        location = [];
        if (isHorizintal) {
          xPoint = Math.floor(Math.random() * (width - dimension + 1));
          yPoint = Math.floor(Math.random() * height);
          for (i = m = ref2 = xPoint, ref3 = xPoint + dimension; ref2 <= ref3 ? m < ref3 : m > ref3; i = ref2 <= ref3 ? ++m : --m) {
            point = i + '_' + yPoint;
            for (j = n = 0, ref4 = ships.length; 0 <= ref4 ? n < ref4 : n > ref4; j = 0 <= ref4 ? ++n : --n) {
              if (ships[j].indexOf(point) !== -1) {
                return getRandomPosition(ships, dimension, width, height);
              }
            }
            location.push(point);
          }
        } else {
          xPoint = Math.floor(Math.random() * width);
          yPoint = Math.floor(Math.random() * (height - dimension + 1));
          for (i = o = ref5 = yPoint, ref6 = yPoint + dimension; ref5 <= ref6 ? o < ref6 : o > ref6; i = ref5 <= ref6 ? ++o : --o) {
            point = xPoint + '_' + i;
            for (j = p = 0, ref7 = ships.length; 0 <= ref7 ? p < ref7 : p > ref7; j = 0 <= ref7 ? ++p : --p) {
              if (ships[j].indexOf(point) !== -1) {
                return getRandomPosition(ships, dimension, width, height);
              }
            }
            location.push(point);
          }
        }
        return location;
      };
      updateShips = function (ships, prefix) {
        var el, m, ref2, results;
        results = [];
        for (i = m = 0, ref2 = ships.length; 0 <= ref2 ? m < ref2 : m > ref2; i = 0 <= ref2 ? ++m : --m) {
          results.push(function () {
            var n, ref3, results1;
            results1 = [];
            for (j = n = 0, ref3 = ships[i].length; 0 <= ref3 ? n < ref3 : n > ref3; j = 0 <= ref3 ? ++n : --n) {
              el = document.querySelector('#' + prefix + ships[i][j]);
              el.classList.add('s');
              results1.push(el.classList.remove('w'));
            }
            return results1;
          }());
        }
        return results;
      };
      for (m = 0, len = shipDimension.length; m < len; m++) {
        shipEl = shipDimension[m];
        playerShips.push(getRandomPosition(playerShips, shipEl, w, h));
        pcShips.push(getRandomPosition(pcShips, shipEl, w, h));
      }
      updateShips(playerShips, 'p1_');
      updateShips(pcShips, 'p2_');
      killShip = function (ships, elId, prefix) {
        var el, n, o, ref2, ref3, ship;
        for (i = n = 0, ref2 = ships.length; 0 <= ref2 ? n < ref2 : n > ref2; i = 0 <= ref2 ? ++n : --n) {
          ship = ships[i];
          if (ship.indexOf(elId.slice(3, elId.length)) !== -1) {
            for (j = o = 0, ref3 = ship.length; 0 <= ref3 ? o < ref3 : o > ref3; j = 0 <= ref3 ? ++o : --o) {
              el = document.querySelector(prefix + ship[j]);
              el.className = 'd';
            }
            return;
          }
        }
      };
      fire = function (el, ships, prefix) {
        if (el.className === 'd' || el.className === 'm') {
          return false;
        }
        if (el.className === 's') {
          el.className = 'd';
        } else {
          el.className = 'm';
        }
        if (el.className === 'd') {
          killShip(ships, el.id, prefix);
          if (prefix === '#p1_') {
            alert('You lost ship');
          } else {
            alert('You have destroyed the ship');
          }
        }
        if (document.querySelectorAll('#p2 .s').length === 0) {
          alert('Congratulations!');
          return false;
        }
        if (el.className === 'm') {
          return true;
        }
      };
      return backfire = function (ships) {
        var n, p1El, ref2, targets;
        for (i = n = ref2 = w * h; ref2 <= 0 ? n < 0 : n > 0; i = ref2 <= 0 ? ++n : --n) {
          targets = document.querySelectorAll('#p1 .s, #p1 .w');
          p1El = targets[Math.floor(Math.random() * targets.length)];
          if (targets.length === 0 || fire(p1El, ships, '#p1_')) {
            break;
          }
        }
        if (document.querySelectorAll('#p1 .s').length === 0) {
          return alert('You lose!');
        }
      };
    };
  }
]);