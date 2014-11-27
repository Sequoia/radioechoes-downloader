## Purpose
I wanted all the [The Burkiss Way](https://en.wikipedia.org/wiki/The_Burkiss_Way) mp3s from [RadioEchoes.com](http://radioechoes.com).  In order to get the mp3 urls from the show page, one must click "download mp3", which opens a *second* page (typically in overlay), and that second page has the link.  So I wrote this simple scraper.

## Usage
The repository comes with an empty `mp3s` directory, where the mp3s will end up. After cloning the repo:

1. `npm install`
2. `node scraper.js`

The filenames will be reported as they are downloaded; when all files are downloaded the script will exit.

## Todo
- [x] Progress bar
- [ ] Externalize the show name so it can get other shows from RadioEchoes
- [ ] Add bit to create mp3 directory as needed & remove it from repo
- [ ] Create a menu to enable selection of a show archive to download (based on [the menu here](http://www.radioechoes.com/programs))
- [ ] Rewrite it all as one big stream chain

## License
GPL 3... million

## Special Thanks
to duchess & the entire honeyhole team, without whom this wouldn't have been possible
