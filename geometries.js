import { BufferGeometry, BufferAttribute} from 'three';

// default geometries to copy vertices from

let cubeVertices = [
    -1.0, -1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, -1.0, -1.0,
    -1.0, 1.0,  -1.0,
    -1.0, -1.0, -1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, -1.0,
    1.0, 1.0, 1.0,
    1.0, -1.0,  1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, 1.0, -1.0,
    -1.0, -1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    -1.0, 1.0, -1.0,
    1.0, 1.0, -1.0,
    -1.0, 1.0, -1.0,
    -1.0, 1.0, 1.0,
    1.0, -1.0, -1.0,
    1.0, -1.0, 1.0
]
let cubeLines = new BufferGeometry();
cubeLines.setAttribute( 'position', new BufferAttribute( new Float32Array( cubeVertices ), 3 ) );


// default geometry for circle nodes
const N = 32;
let circleVertices = []

for ( let i = 0; i < N;i++ ) {
    circleVertices.push(0.0);
    circleVertices.push(0.0);
    circleVertices.push(0.0);

    circleVertices.push(1.0 * Math.sin((i - 0.1) * Math.PI * 2.0 / N) ); 
    circleVertices.push(1.0 * Math.cos((i - 0.1) * Math.PI * 2.0 / N) );
    circleVertices.push(0);
    
    circleVertices.push(1.0 * Math.sin((i - 0.1) * Math.PI * 2.0 / N)); 
    circleVertices.push(1.0 * Math.cos((i - 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(0);
    
    circleVertices.push(4.0 * Math.sin((i + 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(4.0 * Math.cos((i + 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(0);

    circleVertices.push(4.0 * Math.sin((i + 0.1) * Math.PI * 2.0 / N)); 
    circleVertices.push(4.0 * Math.cos((i + 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(0);

    circleVertices.push(6.0 * Math.sin((i - 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(6.0 * Math.cos((i - 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(0.0);

    circleVertices.push(6.0 * Math.sin((i - 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(6.0 * Math.cos((i - 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(0.0);

    circleVertices.push(10.0 * Math.sin((i + 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(10.0 * Math.cos((i + 0.1) * Math.PI * 2.0 / N));
    circleVertices.push(0.0);
}
let circleLines = new BufferGeometry();
circleLines.setAttribute( 'position', new BufferAttribute( new Float32Array( circleVertices ), 3 ) );

let horizontalVertices = [ 
    -15.0 , 0.0 , 0.0,
    15.0 , 0.0 , 0.0
];
let horizontalLine = new BufferGeometry();
horizontalLine.setAttribute( 'position', new BufferAttribute( new Float32Array( horizontalVertices ), 3 ) );

export { cubeLines, circleLines, horizontalLine };