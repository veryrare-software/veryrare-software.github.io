import './index.css';
import * as THREE from 'three';
import { cubeLines, circleLines } from './geometries';
import { addClass, removeClass, lerp, EasingFunctions } from './utils';

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
let material2 = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
let material3 = new THREE.LineBasicMaterial( { color: 0x0000ff } );

let lines = [];

let state = 0;

let scrolling = false;

let glitches = document.getElementsByClassName('glitch-trigger');
let content = document.getElementById('content');
let contentContainer = document.querySelector('#content .container');
let bottomTxt = document.querySelector('.bottom-text .glitch-trigger');

let startScroll;
let desiredScroll;
let forcedScroll = false;
let timeFromStartScroll;

function clearScene(){
    lines = [];
    for( var i = scene.children.length - 1; i >= 0; i--) { 
        scene.remove(scene.children[i]);
    }
}

function fillCubes(){
    clearScene();
    for ( let i = 0; i < 64;i++ ){
        let line = new THREE.LineSegments( cubeLines, i % 3 == 0 ? material : i % 3 == 1 ? material2 : material3 );
        lines.push(line);
    }
    scene.add(...lines);
}

function fillCircles(){
    clearScene();
    for ( let i = 0; i < 16;i++ ){
        let line = new THREE.LineSegments( circleLines, i % 3 == 0 ? material : i % 3 == 1 ? material2 : material3 );
        line.rotation.x += THREE.Math.randFloat(-0.1,0.1);
        line.rotation.y += THREE.Math.randFloat(-0.1,0.1);
        line.position.y = THREE.Math.randFloat(-0.15,0.1);
        lines.push(line);
    }
    scene.add(...lines);
}

function fillLines(){
    clearScene();
    let horizontalLines = new THREE.Geometry();
    horizontalLines.vertices.push(new THREE.Vector3(-15,0,0));
    horizontalLines.vertices.push(new THREE.Vector3(15,0,0));
    for ( let i = 0; i < 32;i++ ){
        let line = new THREE.LineSegments( horizontalLines, i % 3 == 0 ? material : (i % 3 == 1 ? material2 : material3 ) );
        line.direction = ((i+1) % 3) -1;
        line.rotDirection = (i % 3) - 1;
        line.rotation.z += THREE.Math.randFloat(-0.02,0.02);
        line.position.y = THREE.Math.randFloat(-2.6,2.6);
        lines.push(line);
    }
    scene.add(...lines);
}

function setGlitches(){
    for(const gli of glitches){
        addClass(gli,'glitch');
    }
    setTimeout(function(){
        for(const gli of glitches){
            removeClass(gli,'glitch');
        }
    },1000);
}


let sections = document.querySelectorAll(".section");

function scroll() {
    if ( state == 3){
        if ( !forcedScroll ){
            desiredScroll = content.scrollTop - content.clientHeight;
            desiredScroll =( (~~(desiredScroll / content.clientHeight))) * content.clientHeight; 
            for(let section of sections){
                if ( section.offsetTop + 1 + section.clientHeight - content.clientHeight >= content.scrollTop){
                    break;
                } else {
                    desiredScroll = section.offsetTop + section.clientHeight - content.clientHeight;
                }
            }
            startScroll = content.scrollTop;
            timeFromStartScroll = 0;
            forcedScroll = true;
        }
    } else {
        trigger();
    }
};

function trigger(e) { 
    setGlitches();
    if (e && e.keyCode ==27) state = 0; 
    else if ( state == 3 && e && e.keyCode == 32) scroll();
    else if ( state == 3) return;
    else if (!e || e.keyCode == 32) state++ 
    content.style = 'display:none';
    bottomTxt.setAttribute('data-text','Press space.');
    bottomTxt.innerHTML = 'Press space.';
    switch(state){
        case 0: fillCubes(); break;
        case 1: break;
        case 2: fillCircles(); break;
        case 3: 
            fillLines(); 
            content.style = 'display:block';
            content.scrollTop = content.scrollHeight;
            bottomTxt.setAttribute('data-text','Scroll.');
            bottomTxt.innerHTML = 'Scroll.';
            break;
    }
}

window.onkeydown = trigger;
document.onclick = function(e) { trigger() };
bottomTxt.onclick = scroll;

let isScrolling;
content.addEventListener('scroll', function ( e ) {
    scrolling = true;
	clearTimeout( isScrolling );
	isScrolling = setTimeout(function() {
        scrolling = false;
	}, 66);
}, false);

fillCubes();

camera.position.z = 5;
var startTime = new Date();
function update() {
    const endTime = new Date();
    const timeDelta =  (endTime - startTime)  * 0.001;
    startTime = endTime; 

    switch (state){
        // nothing
        case 1:
            for ( let i = 0; i < 64; i++ ){
                let line = lines[i];
                line.rotation.x += THREE.Math.randFloat(-0.01,0.01);
                line.rotation.y += THREE.Math.randFloat(-0.01,0.01);
                line.position.x += THREE.Math.randFloat(-0.01,0.01);
                line.position.y += THREE.Math.randFloat(-0.01,0.01);
                line.position.z += THREE.Math.randFloat(-0.01,0.01);
                if ( Math.abs(line.rotation.x) > 5 ) line.rotation.x = 0;
                if ( Math.abs(line.rotation.y) > 5 ) line.rotation.y = 0;
                if ( Math.abs(line.position.x) > 2 ) line.position.x = 0;
                if ( Math.abs(line.position.y) > 2 ) line.position.y = 0;
                if ( Math.abs(line.position.z) > 1 ) line.position.z = 0;
            }
            break;
        case 2:
            for ( let i = 0; i < 16; i++ ){
                let line = lines[i];
                line.rotation.z += (i > 7 ? -1 : 1) * THREE.Math.randFloat(0.001,0.002);
                line.position.x += THREE.Math.randFloat(-0.001,0.001);
                line.position.y += THREE.Math.randFloat(-0.001,0.001);
                line.position.z += THREE.Math.randFloat(0.001,0.002);
                if ( Math.abs(line.position.x) > .5 ) line.position.x = 0;
                if ( Math.abs(line.position.y) > .5 ) line.position.y = 0;
                if ( Math.abs(line.position.z) > 2 ) line.position.z = 0;
            }
            break;
        case 3:
            if ( forcedScroll){
                timeFromStartScroll += timeDelta  * 4;
                if ( timeFromStartScroll > 1){
                    content.scrollTop = desiredScroll;
                    forcedScroll = false;
                } else {
                    content.scrollTop = lerp(startScroll,desiredScroll, EasingFunctions.easeInOutQuad(timeFromStartScroll));
                }
            }
            contentContainer.style = scrolling ? 'background:rgba(0,0,0,0.9);' : '';
            if (  scrolling){
                for ( let i = 0; i < 32;i++ ){
                    let line = lines[i];
                    if ( line.rotDirection != 0)
                        line.rotation.z += THREE.Math.randFloat(0.001,0.0001) * (line.rotDirection == 1 ? 1:-1);
                    if ( line.direction != 0)
                        line.position.y += THREE.Math.randFloat(0.01,0.001) * (line.direction == 1 ? 1:-1);
                    if ( Math.abs(line.rotation.z) > 0.02 ) line.rotDirection *= -1;
                    if ( Math.abs(line.position.y) > 2.6 ) line.direction *= -1;
                }
            }
            break;
    }
	requestAnimationFrame( update );
	renderer.render( scene, camera );
}
update();