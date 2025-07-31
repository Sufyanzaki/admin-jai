import {loadLevel} from "./loader.js";
import {loadBackgroundSprites, loadMarioSprites} from "./sprites.js";
import {Compositor} from "./compositor.js";
import {createBackgroundLayer} from "./layers.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

function createSpriteLayer(sprite, pos){
    return function drawSpriteLayer(context){
        for(let i=0; i<1; i++){
            sprite.draw('idle', context, pos.x + i * 16, pos.y);
        }
    }
}

Promise.all([loadMarioSprites(), loadBackgroundSprites(), loadLevel('1-1')])
.then(([marioSprites ,backgroundSprites,level]) => {
    const comp = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const gravity = 0.5;

    const pos = {
        x: 64,
        y: 180,
    }

    const vel = {
        x: 2,
        y: -10,
    }

    const spriteLayer = createSpriteLayer(marioSprites, pos);
    comp.layers.push(spriteLayer);

    function update(){
        comp.draw(context);
        pos.x += vel.x;
        pos.y += vel.y;
        vel.y += gravity;
        requestAnimationFrame(update);
    }

    update();
})