# rado-download(1) -- download shows in batch

## SYNOPSIS
```sh
rado download <slug> [--out path] [--skip offset] [--get number]
```

## DESCRIPTION
This command identifies a show by it's "**slug**", or the last part of the show page's URL
For example, to download shows listed on http://www.radioechoes.com/alka-seltzer-time, use:

A directory is created in the output path for each series, based on the slug.

## OPTIONS
`-o, --out <path>`
    where to create show directory (if it doesn't exist). defaults to `.`.

`-s, --skip <offset>`
    how many to skip (`0` to start with first show i.e. skip none)
    If not specified the user will be prompted for this value.

`-n, --get <n>`
    how many files to download.
    If not specified the user will be prompted for this value.

## CONFIGURATION
All options for `rado download` may be specified in `.radorc`. Example:
```
# Always put tracks where Songbird can find them
out=~/Music
```

## EXAMPLES
Download Space Patrol, prompt for how many to d/l & skip
```sh
$ rado download space-patrol
```
Download the 11th episode of The Burkiss Way
```sh
$ rado download the-burkiss-way -s 10 -n 1
```
Download the first three episodes of The Six Shooter to your home directory
```sh
$ rado download the-burkiss-way --skip 0 --get 3 --out ~
```
This will prompt you for how many to skip & how many to get
```sh
$ ./rado.js download the-burkiss-way
```
