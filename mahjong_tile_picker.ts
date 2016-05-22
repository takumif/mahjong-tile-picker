class MahjongTilePicker {
    private tile: Tile;
    private parentElem: HTMLElement;
    private containerElem: HTMLDivElement;
    private buttonElem: HTMLButtonElement;
    private previewElem: HTMLImageElement;
    private buttonText: string;
    private lightbox: MahjongTilePickerLightbox;
    
    constructor(elementId: string, buttonText="Pick a tile") {
        this.parentElem = document.getElementById(elementId);
        this.buttonText = buttonText;
        this.init();
    }
    
    pickTile(tile: Tile): void {
        this.tile = tile;
        this.updatePreview();
        this.onTilePicked(tile);
    }
    
    getTile(): Tile {
        return this.tile;
    }
    
    /**
     * This method is meant to be overwritten on instance-by-instance basis
     */
    onTilePicked(tile: Tile): any {
        console.log(Tile[tile] + " got picked.");
    }
    
    private init(): void {
        this.tile = null;
        this.lightbox = MahjongTilePickerLightbox.getInstance();
        this.initDomElements();
        this.initBindings();
    }
    
    private initDomElements(): void {
        this.containerElem = document.createElement("div");
        this.containerElem.className = "mahjong-tile-picker";
        
        this.initPreviewElem();
        this.initButtonElem();
        
        this.parentElem.appendChild(this.containerElem);
    }
    
    private initButtonElem(): void {
        this.buttonElem = document.createElement("button");
        this.buttonElem.innerText = this.buttonText;
        this.containerElem.appendChild(this.buttonElem);
    }
    
    private initPreviewElem(): void {
        this.previewElem = document.createElement("img");
        this.previewElem.setAttribute("src", MahjongTilePickerHelper.getImagePath(null));
        this.containerElem.appendChild(this.previewElem);
    }
    
    private initBindings(): void {
        this.buttonElem.onclick = () => {
            this.lightbox.showForPicker(this);
        }
    }
    
    private updatePreview(): void {
        var imagePath = MahjongTilePickerHelper.getImagePath(this.tile);
        this.previewElem.setAttribute("src", imagePath);
    }
}

/**
 * A singleton class that hosts the lightbox part of the picker that is shared
 * across all the pickers on the same page
 */
class MahjongTilePickerLightbox {
    private static instance: MahjongTilePickerLightbox;
    private tileElems: HTMLImageElement[];
    private boxElem: HTMLDivElement;
    private backgroundElem: HTMLDivElement;
    private selectedPicker: MahjongTilePicker;
    
    /**
     * Call this method instead of the constructor.
     */
    static getInstance(): MahjongTilePickerLightbox {
        if (this.instance == undefined) {
            this.instance = new MahjongTilePickerLightbox();
        }
        return this.instance;
    }
    
    showForPicker(picker: MahjongTilePicker): void {
        this.selectedPicker = picker;
        this.show();
    }
    
    /**
     * Do not call this. Use getInstance() instead.
     */
    constructor() {
        this.initBackgroundElem();
        this.initBoxElem();
        this.initBindings();
    }
    
    private initBackgroundElem(): void {
        this.backgroundElem = document.createElement("div");
        this.backgroundElem.className = "mahjong-tile-picker-lightbox-background";
        this.backgroundElem.setAttribute("max-opacity", "0.7");
        document.getElementsByTagName("body")[0].appendChild(this.backgroundElem);
    }
    
    private initBoxElem(): void {
        this.boxElem = document.createElement("div");
        this.boxElem.className = "mahjong-tile-picker-lightbox";
        this.boxElem.setAttribute("max-opacity", "1");
        this.initTileElems();
        document.getElementsByTagName("body")[0].appendChild(this.boxElem);
    }
    
    private initTileElems(): void {
        this.tileElems = [];
        ["W", "T", "S"].forEach((suit, index, suits) => {
            for (var i = 1; i <= 9; i++) {
                this.initTileElem("tile-" + suit, suit + i);
                if (i == 5) {
                    this.initTileElem("tile-" + suit, suit + i + "_red");
                }
            }
        });
        for (var i = Tile.East; i <= Tile.Red; i++) {
            this.initTileElem("tile-Winds", Tile[i]);
        }
    }
    
    private initTileElem(className: string, tileName: string): void {
        var tileElem = document.createElement("img");
        tileElem.className = "mahjong-tile " + className;
        tileElem.id = tileName;
        tileElem.setAttribute("src", MahjongTilePickerHelper.getImagePath(Tile[tileName]));
        this.boxElem.appendChild(tileElem);
        this.tileElems.push(tileElem);
    }
    
    private initBindings(): void {
        this.tileElems.forEach((tileElem, index, elems) => {
            tileElem.onclick = () => {
                this.selectedPicker.pickTile(Tile[tileElem.id]);
                this.selectedPicker = null;
                this.hide();
            }
        });
        this.backgroundElem.onclick = () => {
            this.selectedPicker = null;
            this.hide();
        }
    }
    
    private show(): void {
        fadeIn(this.boxElem);
        fadeIn(this.backgroundElem);
    }
    
    private hide(): void {
        fadeOut(this.boxElem);
        fadeOut(this.backgroundElem);
    }
}

/**
 * A class with static helper methods
 */
class MahjongTilePickerHelper {
    static getImagePath(tile: Tile): string {
        if (tile == null) {
            var name = "Back";
        } else {
            var name = Tile[tile];
        }
        return "images/" + name + ".png";
    }
}

enum Tile {
    W1, W2, W3, W4, W5, W5_red, W6, W7, W8, W9,
    T1, T2, T3, T4, T5, T5_red, T6, T7, T8, T9,
    S1, S2, S3, S4, S5, S5_red, S6, S7, S8, S9,
    East, South, West, North,
    White, Green, Red
}

function fadeOut(elem: HTMLElement): void {
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

function fadeIn(elem: HTMLElement): void {
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