First Species counterpoint generator in JS
==========================================

## What

Generate first species counterpoint lines for a given cantus firmus according to the rules in [Fux'](https://en.wikipedia.org/wiki/Johann_Joseph_Fux) [_Gradus ad parnassum_](https://books.wwnorton.com/books/detail.aspx?id=17569).

## History

Counterpoint is a way of writing music for multiple voices in which each part can stand as a tune on its own, while harmonizing with the other voices. It codifies the practice of music from the early Rennaissance. The ideas are still relevant - see [Ray Harmony's excellent Hack Music Theory video](https://www.youtube.com/watch?v=PI631Vq3qn4)

I started learning counterpoint from Johann Joseph Fux's venerable textbook. (That may be like learning Geometry from Euclid's elements, but if it was good enough for Haydn, Mozart and Beethoven, it is good enough for me :) But at the first exercise I got sidetracked by the question of how many possible counterpoints could be written to the cantus firmus which Fux sets his student. I didn't know how to tackle the combinatorics mathematically, so I decided to write a script to generate them. I followed only the hard rules - allowed intervals and motions - not the soft rules designed to make the lines musical and singable - no large skips, try to give the line a nice rising and falling countour.

According to the script, there are 17988 counterpoints lines above the cantus firmus `"d f e d g f a g f e d"`...

## Fullstack Academy project

I thought this would be a fun topic to motivate learning DOM manipulation, so I'm putting a divs-and-text UI around the generating script.

As a real app, the music would be displayed on a canvas or via SVG, and I really need to add audio output...!

## TODO

1. Something better for clefs
2. Ledger lines
3. Stems (and later, when eigth notes are allowed, flags)
4. Staff wrap
5. Staff resize
6. User-supplied melody
7. User-supplied counterpoint, program acts as rule-checker
8. ... bluesky ... musical counterpoints (the soft rules)
9. ... bluesky ... judging counterpoints as more or less satifsfying (this is art and psychology, maybe machine learning and statistics...?)
