# advent-of-code-2020
Solutions for [Advent of Code 2020 challenges](https://adventofcode.com/2020)

## About
I'll be posting my solutions to [Advent of Code 2020 challenges](https://adventofcode.com/2020) here, probably with some delays as I won't have time to do it daily.

Solutions will be written in modern (ES2020) vanilla JavaScript, in ~~as-functional-as-possible paradigm~~ yeah that's not going to work out... They should run in any environment (in fact I'm mostly developing them in DevTools console because I'm lazy).

I added a small Node.js script to make it easy to run, see *Usage* section below.

I won't be commiting the inputs I'll be getting from AoC, if you want to run it by yourself, put your input files as `day-n.txt` files in `inputs` directory. For certain puzzles line endings are important; they should have LF line endings (e.g. Day 3 will give the wrong answer if it's CRLF).

## Usage
```node index.js [day] [puzzle]```

`day` and `puzzle` are integers. Requires Node 14 or higher.
