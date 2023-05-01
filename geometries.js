import * as THREE from 'three';

let cubeLines = new THREE.Geometry();
cubeLines.vertices.push(new THREE.Vector3( -1, -1, -1));
cubeLines.vertices.push(new THREE.Vector3( -1, -1, 1));
cubeLines.vertices.push(new THREE.Vector3( -1, -1, -1));
cubeLines.vertices.push(new THREE.Vector3( -1, 1,  -1));
cubeLines.vertices.push(new THREE.Vector3( -1, -1, -1));
cubeLines.vertices.push(new THREE.Vector3( 1, -1, -1));
cubeLines.vertices.push(new THREE.Vector3( 1, 1, 1));
cubeLines.vertices.push(new THREE.Vector3( 1, 1, -1));
cubeLines.vertices.push(new THREE.Vector3( 1, 1, 1));
cubeLines.vertices.push(new THREE.Vector3( 1, -1,  1));
cubeLines.vertices.push(new THREE.Vector3( 1, 1, 1));
cubeLines.vertices.push(new THREE.Vector3( -1, 1, 1));
cubeLines.vertices.push(new THREE.Vector3( 1, -1, -1));
cubeLines.vertices.push(new THREE.Vector3( 1, 1, -1));
cubeLines.vertices.push(new THREE.Vector3( -1, -1, 1));
cubeLines.vertices.push(new THREE.Vector3( -1, 1, 1));
cubeLines.vertices.push(new THREE.Vector3( -1, -1, 1));
cubeLines.vertices.push(new THREE.Vector3( 1, -1, 1));
cubeLines.vertices.push(new THREE.Vector3( -1, 1, -1));
cubeLines.vertices.push(new THREE.Vector3( 1, 1, -1));
cubeLines.vertices.push(new THREE.Vector3( -1, 1, -1));
cubeLines.vertices.push(new THREE.Vector3( -1, 1, 1));
cubeLines.vertices.push(new THREE.Vector3( 1, -1, -1));
cubeLines.vertices.push(new THREE.Vector3( 1, -1, 1));

let circleLines = new THREE.Geometry();

const N = 32;
for ( let i = 0; i < N;i++ ){
    circleLines.vertices.push(new THREE.Vector3(0,0,0));
    circleLines.vertices.push(new THREE.Vector3(1 * Math.sin((i - .5) * Math.PI * 2 / N), 1 * Math.cos((i - .5) * Math.PI * 2 / N), 0));
    circleLines.vertices.push(new THREE.Vector3(1 * Math.sin((i - .5) * Math.PI * 2 / N), 1 * Math.cos((i - .5) * Math.PI * 2 / N), 0));
    circleLines.vertices.push(new THREE.Vector3(2 * Math.sin((i + 1.5) * Math.PI * 2 / N), 2 * Math.cos((i + 1.5) * Math.PI * 2 / N), 0));
    circleLines.vertices.push(new THREE.Vector3(2 * Math.sin((i + 1.5) * Math.PI * 2 / N), 2 * Math.cos((i + 1.5) * Math.PI * 2 / N), 0));
    circleLines.vertices.push(new THREE.Vector3(2 * Math.sin((i + 2) * Math.PI * 2 / N), 2 * Math.cos((i + 2) * Math.PI * 2 / N), 0));
}

export { cubeLines, circleLines};