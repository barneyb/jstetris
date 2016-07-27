# jstetris - build your own

Super simple JS Tetris game, designed to be reconstructed in place by anyone
with a little JavaScript familiarity. The game is fully implemented, with a
series of "assignments" that slowly build up the same functionality, replacing
the base implementation. That way the game is always fully functional as you
progress through assignments, including before you start. Once all the
assignments are completed, the entire initial implementation can be deleted.

The Tetris is not designed to be pretty or feature rich, but as an instructional
tool.

To get started, clone the repo, and check out the 'assignments' subfolder. It's
cheating to look in the 'lib' folder - that's where the initial implementation
lives, along with the assignment processing machinery.

Each assignment builds on previous ones, and include not just a description of
what needs to be done, but discussion about what motivates the need. It should
be said that the game implementation is not necessarily an "ideal" one, rather
it is focused on being a teaching tool for people without a lot of experience.

If you want a preview, you can play at http://barneyb.github.io/jstetris/

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
  * multi-line bonus (100 for 1, 200 for 2, 400 for 3, 800 for 4)
  * drop bonus (2 pts / line)
* Levels (speed)

## Unsupported Features

* Soft Drop
* Drop ghosting
* Time elapsed
* High score table
* Save/load game
* Preferences
