import { LineBasicMaterial, WebGLRenderer, Scene, PerspectiveCamera, LineSegments, MathUtils } from 'three';

import { addClass, removeClass, lerp, EasingFunctions } from './utils';
import { SceneController } from './sceneController'
import { ScrollController } from './scrollController'

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let glitches = document.getElementsByClassName('glitch-trigger');
let content = document.getElementById('content');
let contentContainer = document.querySelector('#content .container');


let sceneController = new SceneController(scene, camera, contentContainer, content);

let scrollController = new ScrollController( content, ()=>{} )

let bottomBtn = document.getElementById("bottom-button");
bottomBtn.onclick = () => scrollController.scrollToElement( document.querySelector(bottomBtn.getAttribute('href')))

var lastSelected
for(let menuBtn of document.getElementsByClassName("menu-button"))
{
    menuBtn.addEventListener("click", ()=>
    {
        if (lastSelected)
            removeClass(lastSelected, "selected")
        addClass(menuBtn, "selected")
        lastSelected = menuBtn
        var href = menuBtn.getAttribute('href')
        console.log("menu button href - " + href)
        let targetEl = document.querySelector(href)
        scrollController.scrollToElement(targetEl)
        var camoffs = menuBtn.getAttribute('data-camoffset')
        console.log("menu button camoffs- " + camoffs)
        sceneController.targetCamY = camoffs * window.innerHeight;
    });

    menuBtn.addEventListener("mouseover", (event) => {
        removeClass(contentContainer, "scrolling")
    });

    menuBtn.addEventListener("mouseout", (event) => {
        addClass(contentContainer, "scrolling")
    });
}



// check scrolling over time, mostly to trigger scrolling lines anim
let isScrolling;
let lastScrollTop = content.scrollTop
content.addEventListener('scroll', function (e) {
    sceneController.setScrolling(false)
    removeClass(contentContainer, "scrolling")
    // for scroll delta
    lastScrollTop = content.scrollTop;
    clearTimeout(isScrolling);
    isScrolling = setTimeout(()=>{
        addClass(contentContainer, "scrolling")
        sceneController.setScrolling(true)
    }, 66);
}, false);

// let isMouseMove;
// content.addEventListener('mousemove', function (e) {
//     sceneController.setScrolling(true)
//     clearTimeout(isMouseMove);
//     isMouseMove = setTimeout(()=>sceneController.setScrolling(false), 66);
// });

function setGlitches() {
    for (const gli of glitches) {
        addClass(gli, 'glitch');
    }
    setTimeout(function () {
        for (const gli of glitches) {
            removeClass(gli, 'glitch');
        }
    }, 1000);
}

window.onkeydown = e => {
    setGlitches();
}

// init
if(window.location.hash) 
    scrollController.scrollToElement(document.getElementById(window.location.hash))

var startTime = new Date();

function update() {
    // compute delta time since last frame
    const endTime = new Date();
    const timeDelta = (endTime - startTime) * 0.001;
    startTime = endTime;
    
    sceneController.updateScene(timeDelta)

    scrollController.update(timeDelta)

    // inifinite update loop
    requestAnimationFrame(update);

    renderer.render(scene, camera);
}
update();