# Mahjong Tile Picker
A small JavaScript library for selecting mahjong tiles on a website

## Usage
In your HTML file:
```html
<script src="path/to/mahjong_tile_picker.js"></script>
...
<body>
    <div id="parentHtmlElementId"></div>
</body>
```

And your JavaScript file:
```javascript
// Call this after the page has loaded
var picker = new MahjongTilePicker("parentHtmlElementId");

picker.getTile(); // initially null

// Let the user pick a tile, or...
// programmatically pick one:
picker.pickTile(Tile.W9);

picker.getTile(); // Tile.W9
Tile[picker.getTile()]; // 'W9'
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

The `Tile` enum contains values `W1-W9, P1-P9, S1-S9, East, South, West, North, White, Green, Red`.
```javascript
Tile.W1 // 0
Tile[Tile.W1] // 'W1'
```

## To-Do
* Allow choosing dora tiles (the red ones)

## License
* MIT