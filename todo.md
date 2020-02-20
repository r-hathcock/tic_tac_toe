#TODO
[] Gameboard object
    [x] use module
    [x] gameboard array
    [] reset()
[x] player objects
    [x] use factories
    [x] {name}
    [x] get game from modal and store in player object
    [x] score
    [x] display player names on screen
[] gameflow object
    player vs computer {
        - start
        - if turn is odd
            - computer
            - randomly picks
            - render
        - if odd
            - player
            - player picks
            - render
        - if win condition
            - 3 in a row
            - announce winner
            - game over
        - if tie condition
            - board full but no row
            - announce tie
            - game over
        - increment turn number
    }
[x] setup html
    [x] render() contents to webpage
    [x] display player names on screen

