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
        this.parentElem.appendChild(this.containerElem);
    };
    MahjongTilePicker.prototype.initPreviewElem = function () {
        this.previewElem = document.createElement("img");
        this.previewElem.className = "mahjong-tile-picker-preview";
        this.previewElem.setAttribute("src", MahjongTilePickerHelper.getImagePath(null));
        this.containerElem.appendChild(this.previewElem);
    };
    MahjongTilePicker.prototype.initBindings = function () {
        var _this = this;
        this.previewElem.onclick = function () {
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
        this.initBackgroundElem();
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
        this.show();
    };
    MahjongTilePickerLightbox.prototype.initBackgroundElem = function () {
        this.backgroundElem = document.createElement("div");
        this.backgroundElem.className = "mahjong-tile-picker-lightbox-background";
        this.backgroundElem.setAttribute("max-opacity", "0.7");
        document.getElementsByTagName("body")[0].appendChild(this.backgroundElem);
    };
    MahjongTilePickerLightbox.prototype.initBoxElem = function () {
        this.boxElem = document.createElement("div");
        this.boxElem.className = "mahjong-tile-picker-lightbox";
        this.boxElem.setAttribute("max-opacity", "1");
        this.initTileElems();
        document.getElementsByTagName("body")[0].appendChild(this.boxElem);
    };
    MahjongTilePickerLightbox.prototype.initTileElems = function () {
        var _this = this;
        this.tileElems = [];
        ["W", "T", "S"].forEach(function (suit, index, suits) {
            for (var i = 1; i <= 9; i++) {
                _this.initTileElem("tile-" + suit, suit + i);
                if (i == 5) {
                    _this.initTileElem("tile-" + suit, suit + i + "_red");
                }
            }
        });
        for (var i = Tile.East; i <= Tile.Red; i++) {
            this.initTileElem("tile-Winds", Tile[i]);
        }
        this.initTileElem("tile-Back", "Back");
    };
    MahjongTilePickerLightbox.prototype.initTileElem = function (className, tileName) {
        var tileElem = document.createElement("img");
        tileElem.className = "mahjong-tile " + className;
        tileElem.id = tileName;
        tileElem.setAttribute("src", MahjongTilePickerHelper.getImagePath(Tile[tileName]));
        this.boxElem.appendChild(tileElem);
        this.tileElems.push(tileElem);
    };
    MahjongTilePickerLightbox.prototype.initBindings = function () {
        var _this = this;
        this.tileElems.forEach(function (tileElem, index, elems) {
            tileElem.onclick = function () {
                if (tileElem.id == "Back") {
                    var tile = null;
                }
                else {
                    var tile = Tile[tileElem.id];
                }
                _this.selectedPicker.pickTile(tile);
                _this.selectedPicker = null;
                _this.hide();
            };
        });
        this.backgroundElem.onclick = function () {
            _this.selectedPicker = null;
            _this.hide();
        };
    };
    MahjongTilePickerLightbox.prototype.show = function () {
        fadeIn(this.boxElem);
        fadeIn(this.backgroundElem);
    };
    MahjongTilePickerLightbox.prototype.hide = function () {
        fadeOut(this.boxElem);
        fadeOut(this.backgroundElem);
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
    Tile[Tile["W5_red"] = 5] = "W5_red";
    Tile[Tile["W6"] = 6] = "W6";
    Tile[Tile["W7"] = 7] = "W7";
    Tile[Tile["W8"] = 8] = "W8";
    Tile[Tile["W9"] = 9] = "W9";
    Tile[Tile["T1"] = 10] = "T1";
    Tile[Tile["T2"] = 11] = "T2";
    Tile[Tile["T3"] = 12] = "T3";
    Tile[Tile["T4"] = 13] = "T4";
    Tile[Tile["T5"] = 14] = "T5";
    Tile[Tile["T5_red"] = 15] = "T5_red";
    Tile[Tile["T6"] = 16] = "T6";
    Tile[Tile["T7"] = 17] = "T7";
    Tile[Tile["T8"] = 18] = "T8";
    Tile[Tile["T9"] = 19] = "T9";
    Tile[Tile["S1"] = 20] = "S1";
    Tile[Tile["S2"] = 21] = "S2";
    Tile[Tile["S3"] = 22] = "S3";
    Tile[Tile["S4"] = 23] = "S4";
    Tile[Tile["S5"] = 24] = "S5";
    Tile[Tile["S5_red"] = 25] = "S5_red";
    Tile[Tile["S6"] = 26] = "S6";
    Tile[Tile["S7"] = 27] = "S7";
    Tile[Tile["S8"] = 28] = "S8";
    Tile[Tile["S9"] = 29] = "S9";
    Tile[Tile["East"] = 30] = "East";
    Tile[Tile["South"] = 31] = "South";
    Tile[Tile["West"] = 32] = "West";
    Tile[Tile["North"] = 33] = "North";
    Tile[Tile["White"] = 34] = "White";
    Tile[Tile["Green"] = 35] = "Green";
    Tile[Tile["Red"] = 36] = "Red";
})(Tile || (Tile = {}));
function fadeOut(elem) {
    var opacity = Number(elem.style.opacity);
    var timer = setInterval(function () {
        if (opacity <= 0.1) {
            clearInterval(timer);
            elem.style.display = 'none';
        }
        elem.style.opacity = String(opacity);
        opacity -= 0.1;
    }, 20);
}
function fadeIn(elem) {
    var opacity = 0;
    var timer = setInterval(function () {
        if (opacity >= Number(elem.getAttribute("max-opacity"))) {
            clearInterval(timer);
        }
        elem.style.opacity = String(opacity);
        opacity += 0.1;
    }, 20);
    elem.style.display = 'block';
}
