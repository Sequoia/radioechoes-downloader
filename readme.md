# rado(1) -- find & download OTR programs

## SYNOPSIS
```sh
rado <command> [options]
```

## DESCRIPTION
This tool allows you to find & download old time radio shows available on
radioechoes.com. You can specify how which show to download and how many
episodes. See the `docs/` directory or the manpages for each command for more
info about those commands and their usage.

## COMMANDS
`download <slug> [options]`
  Download shows. See `rado help download` for more

`search <search_term>`
  Search for shows. See `rado help search` for more

## ABOUT
I wanted all the [The Burkiss Way](https://en.wikipedia.org/wiki/The_Burkiss_Way) 
mp3s from [RadioEchoes.com](http://radioechoes.com).  In order to get the mp3 
urls from the show page, one must click "download mp3", which opens a *second*
page (typically in overlay), and that second page has the link.  So I wrote this simple scraper.

## LICENSE
GPL 3

## CREDITS
by Sequoia McDowell

Special thanks to duchess & the entire honeyhole team, without whom this wouldn't have been possible
