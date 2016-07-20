# jstetris

Super simple JS Tetris game implemented in parellel with Brenna's [version of the same](https://github.com/switzerb/jstetris/).

The intent is NOT to be a good tetris implementation, but rather to slowly build up the game in really tiny pieces, with explicit motivation for every little change (for both "business" and "technical" requirements).

It's ready to play at http://barneyb.github.io/jstetris/

## Core Features

* Piece rotation (up arrow)
* Piece movement (left/right arrows)
* Completed line deletion
* Line counting
* Restart game (refresh the page)
* End-of-game detection

## Extra Features

* Pause game
* Wall kick
* Hard drop
* Piece preview
* Row clearing visual feedback
* Scoring
  * per piece placed (10 pts)

## Unsupported Features

* Soft Drop
* Drop ghosting
* Scoring
  * per line cleared
  * multi-line bonus
  * drop bonus
* Levels (speed)
* Time elapsed
* High score table
* Save/load game
