import {loadImage} from "./loader.js";
import SpriteSheet from "./spritesheet.js";

export function loadMarioSprites(){
    return loadImage("/img/characters.gif").then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle',276, 44, 16, 16);
        return sprites;
    })
}

export function loadBackgroundSprites(){
    return loadImage("/img/tile.png").then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
    })
}