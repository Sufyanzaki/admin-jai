export function loadImage(url){
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.src = url;
    })
}

export function loadLevel(name){
    return fetch(`/levels/${name}.json`)
        .then(response => response.json());
}