class MahjongTilePicker {
    private tile: Tile;
    private parentElem: HTMLElement;
    private buttonElem: HTMLButtonElement;
    private previewElem: HTMLImageElement;
    private tileElems: HTMLImageElement[];
    private boxElem: HTMLDivElement;
    private buttonText: string;
    
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
        this.initDomElements();
        this.initBindings();
    }
    
    private initDomElements(): void {
        this.boxElem = document.createElement("div");
        this.initTileElems();
        this.parentElem.appendChild(this.boxElem);
        this.initButtonElem();
        this.initPreviewElem();
    }
    
    private initButtonElem(): void {
        this.buttonElem = document.createElement("button");
        this.parentElem.appendChild(this.buttonElem);
    }
    
    private initPreviewElem(): void {
        this.previewElem = document.createElement("img");
        this.previewElem.setAttribute("src", this.getImagePath(null));
        this.parentElem.appendChild(this.previewElem);
    }
    
    private initTileElems(): void {
        this.tileElems = [];
        ["W", "P", "S"].forEach((suit, index, suits) => {
            for (var i = 1; i <= 9; i++) {
                this.initTileElem("tile-" + suit, suit + i);
            }
        });
        for (var i = Tile.East; i <= Tile.Red; i++) {
            this.initTileElem("tile-Winds", Tile[i]);
        }
    }
    
    private initTileElem(className: string, tileName: string): void {
        var tileElem = document.createElement("img");
        tileElem.setAttribute("class", className);
        tileElem.setAttribute("id", tileName);
        tileElem.setAttribute("src", this.getImagePath(Tile[tileName]));
        this.boxElem.appendChild(tileElem);
        this.tileElems.push(tileElem);
    }
    
    private initBindings(): void {
        this.buttonElem.onclick = () => {
            
        }
        this.tileElems.forEach((tileElem, index, elems) => {
            tileElem.onclick = () => {
                this.pickTile(Tile[tileElem.id]);
                this.fadeOut(this.boxElem);
            }
        });
    }
    
    private updatePreview(): void {
        var imagePath = this.getImagePath(this.tile);
        this.previewElem.setAttribute("src", imagePath);
    }
    
    private getImagePath(tile: Tile): string {
        if (tile == null) {
            var name = "Back";
        } else {
            var name = Tile[tile];
        }
        return "images/" + name + ".png";
    }
}

enum Tile {
    W1, W2, W3, W4, W5, W6, W7, W8, W9,
    P1, P2, P3, P4, P5, P6, P7, P8, P9,
    S1, S2, S3, S4, S5, S6, S7, S8, S9,
    East, South, West, North,
    White, Green, Red
}