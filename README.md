# Mahjong Tile Picker
A small JavaScript library for selecting mahjong tiles on a website.
Take a look at the `typescript` branch for the code in TypeScript.

## Usage
HTML:
```html
<script src="path/to/mahjong_tile_picker.js"></script>
<link rel="stylesheet" type="text/css" href="path/to/mahjong_tile_picker.css">
...
<body>
    <div id="parentHtmlElementId"></div>
</body>
```

JavaScript:
```javascript
// Call this after the page has loaded
var picker = new MahjongTilePicker("parentHtmlElementId");

console.log(picker.getTile()); // initially null

// Let the user pick a tile, or
// programmatically pick one:
picker.pickTile(Tile.W9);

picker.getTile(); // Tile.W9
Tile[picker.getTile()]; // 'W9'
```

The `Tile` enum contains values `W1-W9, T1-T9, S1-S9, East, South, West, North, White, Green, Red`.
W for wanzi, T for tongzi, and S for suozi.
```javascript
Tile.W1 // 0
Tile[Tile.W1] // 'W1'
```

You can also set a callback function:
```javascript
picker.onTilePicked = function(tile) {
    console.log("You just picked " + Tile[tile] + "!");
}

// now pick a tile, either manually or programmatically
picker.pickTile(Tile.East);
// log: You just picked East!
```

## To-Do
* Hide tiles when not choosing
* Group tiles by suit
* Add CSS to make it prettier
* Allow choosing dora tiles (the red ones)
* Add a gif to the readme
* Make a demo page oh gh-pages
* Have the picking box div float in the middle of the page
* Allow for multiple pickers on the same page (that share the box div)

## License
* MIT
* The image assets are by Aki ([source](http://sozai.7gates.net/docs/mahjong01/))