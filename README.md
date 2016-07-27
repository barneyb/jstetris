# jstetris - build your own

---

## ANSWER KEY BRANCH

This branch is "completed", with all the assignments finished and correct. It's
the "answer key", more or less, though obviously there isn't necessarily a
single correct answer for any of the assignments.

---

Super simple JS Tetris game, designed to be reconstructed in place by anyone
with a little JavaScript familiarity. The game is fully implemented, with a
series of "assignments" that slowly build up the same functionality, replacing
the base implementation. That way the game is always fully functional as you
progress through assignments, including before you start.

To get started, clone the repo, open `index.html` in your browser, and check out
the 'assignments' subfolder. It's "cheating" to look in the 'lib' folder -
that's where the initial implementation lives, along with the assignment
processing machinery.

Each assignment builds on previous ones, and include not just a description of
what needs to be done, but discussion about what motivates the need. Once all
the assignments are completed, the entire initial implementation can be deleted.
It should be said that the game implementation is not necessarily an "ideal"
one: it is aimed at being a teaching tool for people without a lot of
experience, not pretty or feature rich. 

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
