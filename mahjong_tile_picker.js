var MahjongTilePicker = (function () {
    function MahjongTilePicker(elementId, buttonText) {
        if (buttonText === void 0) { buttonText = "Pick a tile"; }
        this.parentElem = document.getElementById(elementId);
        this.buttonText = buttonText;
        this.init();
    }
    MahjongTilePicker.prototype.pickTile = function (tile) {
        this.tile = tile;
        this.updatePreview();
        this.onTilePicked(tile);
    };
    MahjongTilePicker.prototype.getTile = function () {
        return this.tile;
    };
    /**
     * This method is meant to be overwritten on instance-by-instance basis
     */
    MahjongTilePicker.prototype.onTilePicked = function (tile) {
        console.log(Tile[tile] + " got picked.");
    };
    MahjongTilePicker.prototype.init = function () {
        this.tile = null;
        this.lightbox = MahjongTilePickerLightbox.getInstance();
        this.initDomElements();
        this.initBindings();
    };
    MahjongTilePicker.prototype.initDomElements = function () {
        this.containerElem = document.createElement("div");
        this.containerElem.className = "mahjong-tile-picker";
        this.initPreviewElem();
        this.initButtonElem();
        this.parentElem.appendChild(this.containerElem);
    };
    MahjongTilePicker.prototype.initButtonElem = function () {
        this.buttonElem = document.createElement("button");
        this.buttonElem.innerText = this.buttonText;
        this.containerElem.appendChild(this.buttonElem);
    };
    MahjongTilePicker.prototype.initPreviewElem = function () {
        this.previewElem = document.createElement("img");
        this.previewElem.setAttribute("src", MahjongTilePickerHelper.getImagePath(null));
        this.containerElem.appendChild(this.previewElem);
    };
    MahjongTilePicker.prototype.initBindings = function () {
        var _this = this;
        this.buttonElem.onclick = function () {
            _this.lightbox.showForPicker(_this);
        };
    };
    MahjongTilePicker.prototype.updatePreview = function () {
        var imagePath = MahjongTilePickerHelper.getImagePath(this.tile);
        this.previewElem.setAttribute("src", imagePath);
    };
    return MahjongTilePicker;
}());
/**
 * A singleton class that hosts the lightbox part of the picker that is shared
 * across all the pickers on the same page
 */
var MahjongTilePickerLightbox = (function () {
    /**
     * Do not call this. Use getInstance() instead.
     */
    function MahjongTilePickerLightbox() {
        this.initBoxElem();
        this.initBindings();
    }
    /**
     * Call this method instead of the constructor.
     */
    MahjongTilePickerLightbox.getInstance = function () {
        if (this.instance == undefined) {
            this.instance = new MahjongTilePickerLightbox();
        }
        return this.instance;
    };
    MahjongTilePickerLightbox.prototype.showForPicker = function (picker) {
        this.selectedPicker = picker;
        fadeIn(this.boxElem);
    };
    MahjongTilePickerLightbox.prototype.initBoxElem = function () {
        this.boxElem = document.createElement("div");
        this.boxElem.className = "mahjong-tile-picker-lightbox";
        this.initTileElems();
        document.getElementsByTagName("body")[0].appendChild(this.boxElem);
    };
    MahjongTilePickerLightbox.prototype.initTileElems = function () {
        var _this = this;
        this.tileElems = [];
        ["W", "T", "S"].forEach(function (suit, index, suits) {
            for (var i = 1; i <= 9; i++) {
                _this.initTileElem("tile-" + suit, suit + i);
            }
        });
        for (var i = Tile.East; i <= Tile.Red; i++) {
            this.initTileElem("tile-Winds", Tile[i]);
        }
    };
    MahjongTilePickerLightbox.prototype.initTileElem = function (className, tileName) {
        var tileElem = document.createElement("img");
        tileElem.setAttribute("class", "mahjong-tile " + className);
        tileElem.setAttribute("id", tileName);
        tileElem.setAttribute("src", MahjongTilePickerHelper.getImagePath(Tile[tileName]));
        this.boxElem.appendChild(tileElem);
        this.tileElems.push(tileElem);
    };
    MahjongTilePickerLightbox.prototype.initBindings = function () {
        var _this = this;
        this.tileElems.forEach(function (tileElem, index, elems) {
            tileElem.onclick = function () {
                _this.selectedPicker.pickTile(Tile[tileElem.id]);
                fadeOut(_this.boxElem);
            };
        });
    };
    return MahjongTilePickerLightbox;
}());
/**
 * A class with static helper methods
 */
var MahjongTilePickerHelper = (function () {
    function MahjongTilePickerHelper() {
    }
    MahjongTilePickerHelper.getImagePath = function (tile) {
        if (tile == null) {
            var name = "Back";
        }
        else {
            var name = Tile[tile];
        }
        return "images/" + name + ".png";
    };
    return MahjongTilePickerHelper;
}());
var Tile;
(function (Tile) {
    Tile[Tile["W1"] = 0] = "W1";
    Tile[Tile["W2"] = 1] = "W2";
    Tile[Tile["W3"] = 2] = "W3";
    Tile[Tile["W4"] = 3] = "W4";
    Tile[Tile["W5"] = 4] = "W5";
    Tile[Tile["W6"] = 5] = "W6";
    Tile[Tile["W7"] = 6] = "W7";
    Tile[Tile["W8"] = 7] = "W8";
    Tile[Tile["W9"] = 8] = "W9";
    Tile[Tile["T1"] = 9] = "T1";
    Tile[Tile["T2"] = 10] = "T2";
    Tile[Tile["T3"] = 11] = "T3";
    Tile[Tile["T4"] = 12] = "T4";
    Tile[Tile["T5"] = 13] = "T5";
    Tile[Tile["T6"] = 14] = "T6";
    Tile[Tile["T7"] = 15] = "T7";
    Tile[Tile["T8"] = 16] = "T8";
    Tile[Tile["T9"] = 17] = "T9";
    Tile[Tile["S1"] = 18] = "S1";
    Tile[Tile["S2"] = 19] = "S2";
    Tile[Tile["S3"] = 20] = "S3";
    Tile[Tile["S4"] = 21] = "S4";
    Tile[Tile["S5"] = 22] = "S5";
    Tile[Tile["S6"] = 23] = "S6";
    Tile[Tile["S7"] = 24] = "S7";
    Tile[Tile["S8"] = 25] = "S8";
    Tile[Tile["S9"] = 26] = "S9";
    Tile[Tile["East"] = 27] = "East";
    Tile[Tile["South"] = 28] = "South";
    Tile[Tile["West"] = 29] = "West";
    Tile[Tile["North"] = 30] = "North";
    Tile[Tile["White"] = 31] = "White";
    Tile[Tile["Green"] = 32] = "Green";
    Tile[Tile["Red"] = 33] = "Red";
})(Tile || (Tile = {}));
function fadeOut(elem) {
    elem.style.display = "none";
}
function fadeIn(elem) {
    elem.style.display = "block";
}
