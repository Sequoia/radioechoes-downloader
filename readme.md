## Background
I wanted all the [The Burkiss Way](https://en.wikipedia.org/wiki/The_Burkiss_Way) mp3s from [RadioEchoes.com](http://radioechoes.com).  In order to get the mp3 urls from the show page, one must click "download mp3", which opens a *second* page (typically in overlay), and that second page has the link.  So I wrote this simple scraper.

## Later on...
I decided to use this project as the basis for a talk with tags as steps & I don't keep the readme up to date on each step. As such the readme **may/will be inaccurate** 'til the end when I'll update it all to reflect the state of the project.

# Commands
:warning: Changes from step to step, watch the talk @todo link to talk :warning:
:point_right: Will update in the end

## `download`

### Arguments
* show slug: e.g. `a-day-in-the-life-of-dennis-day` for `http://www.radioechoes.com/a-day-in-the-life-of-dennis-day`

### Switches
* `out` *default: `.`*: where to create show directory (if it doesn't exist)
* `skip`: offset-- how many to skip (`0` to start with first show i.e. skip none)
* `get`: how many files to download

### `.radorc`
Any of the options that can be passed as switches may also be set in a `.radorc`
file in any of the [usual `rc` file locations](https://github.com/dominictarr/rc#standards). 
See `.radorc.example`

:information_source: `skip` & `get` will be requested if not passed as switches

## `search`
Search for shows by title & output info about those shows

### Arguments
* search string: word/term to search for. show title is searched, case insensitive

## Examples
Download the first 10 Burkiss Ways
```sh
$ ./rado.js download the-burkiss-way --out . --skip 0 --get 10
```
This will prompt you for how many to skip & how many to get
```sh
$ ./rado.js download the-burkiss-way
```
Download episodes 11-20 of The Six Shooter
```sh
$ ./rado.js download the-six-shooter -s 10 -n 10
```
Search for shows with "shoot" in the title
```sh
$ ./rado.js search shoot
```
Search for "space patrol"
```sh
$ ./rado.js search "space patrol"
```

## License
GPL 3

## Special Thanks
to duchess & the entire honeyhole team, without whom this wouldn't have been possible
