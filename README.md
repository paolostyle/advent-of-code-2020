# advent-of-code-2020
Solutions for [Advent of Code 2020 challenges](https://adventofcode.com/2020)

## About
I'll be posting my solutions to [Advent of Code 2020 challenges](https://adventofcode.com/2020) here, probably with some delays as I won't have time to do it daily.

Solutions will be written in modern (ES2020) vanilla JavaScript, in ~~as-functional-as-possible paradigm~~ yeah that's not going to work out... They should run in any environment (in fact I'm mostly developing them in DevTools console because I'm lazy).

I added a small Node.js script to make it easy to run, as well as a script to set up a new puzzle for the day. See *Usage* section below.

## Usage

### Setting up a puzzle
```node prepare [day]```

Downloads your input for the day to `inputs/day-[day].txt` and creates an empty template in `src/day-[day].js`.
Requires `cookie.txt` to be present in the main directory, copy contents of `cookie` HTTP header from AoC website.

### Running the puzzle
```node run [day] [puzzle]```

`[puzzle]` is either 1 or 2, `[day]` is obvious

Requires Node 14 or higher.
