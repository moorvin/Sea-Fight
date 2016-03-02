angular.module "application"
  .controller "MainController", ($rootScope, $scope)->
    $scope.startButton = true
    $scope.start = (h,w) ->
      $scope.startButton = false
      shipDimension = [10, 5, 5, 2, 2, 2] #Array of ships
      playerShips = []  #Coordinates Player ships
      pcShips = []  #Coordinates ships computer
      p1 = document.querySelector '#p1'
      p2 = document.querySelector '#p2'

      # Generates field
      for i in [0...w]
        for j in [0...h]
          div1 = document.createElement 'div'
          div2 = document.createElement 'div'
          div1.id = 'p1_' + i + '_' + j
          div1.className = 'w'
          p1.appendChild div1
          div2.id = 'p2_' + i + '_' + j
          div2.className = 'w'
          div2.onclick = ->
            if fire(this, pcShips, "#p2_")
              backfire playerShips
          p2.appendChild div2

      # Generates coordinates ships
      getRandomPosition = (ships, dimension, width, height) ->
        isHorizintal = Math.ceil(Math.random() * 2) % 2 == 0
        location = [] # Масив з координатами кораблів

        if isHorizintal
          xPoint = Math.floor(Math.random() * (width - dimension  + 1))
          yPoint = Math.floor(Math.random() * height)
          for i in [xPoint...xPoint + dimension]
            point = i + '_' + yPoint
            for j in [0...ships.length]
              if ships[j].indexOf(point) != -1
                return getRandomPosition(ships, dimension, width, height)
            location.push(point)
        else
          xPoint = Math.floor(Math.random() * width)
          yPoint = Math.floor(Math.random() * (height - dimension  + 1))
          for i in [yPoint...yPoint + dimension]
            point = xPoint + '_' + i
            for j in [0...ships.length]
              if ships[j].indexOf(point) != -1
                return getRandomPosition(ships, dimension, width, height)
            location.push(point)

        return location

      # Put ships
      updateShips = (ships, prefix) ->
        for i in [0...(ships.length)]
          for j in [0...ships[i].length]
            el = document.querySelector('#' + prefix + ships[i][j])
            el.classList.add('s')
            el.classList.remove('w')

      for shipEl in shipDimension
        playerShips.push(getRandomPosition(playerShips, shipEl, w, h))
        pcShips.push(getRandomPosition(pcShips, shipEl, w, h))

      updateShips(playerShips, 'p1_')
      updateShips(pcShips, 'p2_')

      killShip = (ships, elId, prefix) ->
        for i in [0...ships.length]
          ship = ships[i]
          if (ship.indexOf(elId.slice(3,elId.length)) !=-1)
            for j in [0...ship.length]
              el = document.querySelector(prefix  + ship[j])
              el.className = 'd'
            return

      fire = (el, ships, prefix) ->
        if el.className == 'd' || el.className == 'm'
          return false

        if el.className == 's'
          el.className = 'd'
        else
          el.className = 'm'

        if el.className == 'd'
          killShip(ships, el.id, prefix)
          if prefix == "#p1_"
            alert "You lost ship"
          else
            alert "You have destroyed the ship"
        if document.querySelectorAll('#p2 .s').length == 0
          alert "Congratulations!"
          return false
        if el.className == 'm'
          return true

      backfire = (ships) ->
        for i in [w*h...0]
          targets = document.querySelectorAll('#p1 .s, #p1 .w')
          p1El = targets[Math.floor(Math.random() * targets.length)]
          if targets.length == 0 || fire(p1El, ships, "#p1_")
            break
        if document.querySelectorAll('#p1 .s').length == 0
          alert "You lose!"

    return
