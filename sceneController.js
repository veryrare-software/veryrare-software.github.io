import { LineBasicMaterial, WebGLRenderer, Scene, PerspectiveCamera, LineSegments, MathUtils, Vector3 } from 'three';
import { cubeLines, circleLines, horizontalLine } from './geometries';

class SceneController
{
    state = 0
    scrolling = false
    scene
    camera
    contentContainer
    content
    targetCamY = 0
    wiggleCubesOffset = -1000
    circlesOffset = -1000
    horizontalLinesOffset = -2000

    materials = [
        new LineBasicMaterial({ color: 0xff0000 }),
        new LineBasicMaterial({ color: 0x00ff00 }),
        new LineBasicMaterial({ color: 0x0000ff }) 
    ]

    constructor(scene, camera, contentContainer, content)
    {
        this.scene = scene
        this.camera = camera
        
        // init
        this.camera.position.z = 5;
        this.contentContainer = contentContainer
        this.content = content

        this.wiggleCubesOffset = -1 *  window.innerHeight;
        this.circlesOffset = -1 * window.innerHeight;
        this.horizontalLinesOffset = -2 *  window.innerHeight;

        this.fillCube(0)
        this.fillCircles(this.circlesOffset)
        this.fillHorizontalLines(this.horizontalLinesOffset)
        this.fillCubes(this.wiggleCubesOffset)
    }

    // removes all objects from scene
    clearScene() 
    {
        for (var i = this.scene.children.length - 1; i >= 0; i--)
            this.scene.remove(this.scene.children[i]);
    }

    fillCube(positionOffset)
    {
        var lineObject = new LineSegments(cubeLines, this.materials[2] );
        lineObject.position.y = positionOffset;
        this.scene.add( lineObject );
    } 

    //use geometry from geometries to add lines to scene (add to lines array for clearing as well)
    fillCubes(positionOffset) 
    {
        // add 64 cubes
        for (let i = 0; i < 64; i++) 
        {
            var lineObject = new LineSegments(cubeLines, this.materials[i % 3] );
            lineObject.position.y = positionOffset;
            this.scene.add( lineObject );
        }
    }

    fillCircles(positionOffset) 
    {
        // add 16 circles
        for (let i = 0; i < 16; i++) {
            let line = new LineSegments(circleLines, this.materials[i % 3] );
            line.position.y = positionOffset;
            line.rotation.x += MathUtils.randFloat(-0.1, 0.1);
            line.rotation.y += MathUtils.randFloat(-0.1, 0.1);
            line.position.y +=  MathUtils.randFloat(-0.15, 0.1);
            
            line.scale.x = MathUtils.randFloat(0.5, 1.5);
            line.scale.z = MathUtils.randFloat(0.5, 1.5);
            this.scene.add(line);
        }
    }

    fillHorizontalLines(positionOffset) 
    {
        //add 32 horizontal lines, that are randomly distributed and slighly rotated
        for (let i = 0; i < 32; i++) 
        {
            let line = new LineSegments(horizontalLine, this.materials[i % 3] );
            line.position.y = positionOffset;
            line.direction = ((i + 1) % 3) - 1;
            line.rotDirection = (i % 3) - 1;
            line.rotation.z += MathUtils.randFloat(-0.02, 0.02);
            line.position.y +=  MathUtils.randFloat(-2.6, 2.6);
            this.scene.add(line);
        }
    }


    setScrolling(_scrolling)
    {
        this.scrolling = _scrolling
    }

    moveTowards(current, target, speed, timeDelta) 
    {
        // Calculate the difference between the current and target values
        var diff = target - current;
      
        // If the difference is smaller than the speed, just move directly to the target
        if (Math.abs(diff) <= speed * timeDelta) {
          return target;
        } else {
          // Calculate the amount to move based on the speed and time delta
          var move = speed * timeDelta * Math.sign(diff);
          return current + move;
        }
    }

    lerp (start, end, amt){
        return (1-amt)*start+amt*end
      }

    updateScene(timeDelta)
    {
        // update camera y
        this.camera.position.y = this.lerp(this.camera.position.y, this.targetCamY, 18.8 * timeDelta);
        
        // wiggle cubes
        for (let i = 1+16+32; i < 1+16+32+64; i++) 
        {
            // let line = lines[i];
            let line = this.scene.children[i];
            line.rotation.x += MathUtils.randFloat(-0.01, 0.01);
            line.rotation.y += MathUtils.randFloat(-0.01, 0.01);
            line.position.x += MathUtils.randFloat(-0.01, 0.01);
            line.position.y += MathUtils.randFloat(-0.01, 0.01);
            line.position.z += MathUtils.randFloat(-0.01, 0.01);
            if (Math.abs(line.rotation.x) > 3) line.rotation.x = 0;
            if (Math.abs(line.rotation.y) > 3) line.rotation.y = 0;
            if (Math.abs(line.position.x) > 1) line.position.x = 0;
            if (Math.abs(line.position.y-this.wiggleCubesOffset) > 1) line.position.y = this.wiggleCubesOffset;
            if (Math.abs(line.position.z) > 1) line.position.z = 0;
        }

        // rotate circles
        for (let i = 1; i < 1+16; i++) 
        {
            // let line = lines[i];
            let line = this.scene.children[i];
            line.rotation.z += (i > 7 ? -1 : 1) * MathUtils.randFloat(0.001, 0.002);
            line.position.x += MathUtils.randFloat(-0.001, 0.001);
            line.position.y += MathUtils.randFloat(-0.001, 0.001);
            line.position.z += MathUtils.randFloat(0.001, 0.002);
            if (Math.abs(line.position.x) > .5) line.position.x = 0;
            if (Math.abs(line.position.y-this.circlesOffset) > .5) line.position.y = this.circlesOffset;
            if (Math.abs(line.position.z) > 2) line.position.z = 0;

            line.scale.x += timeDelta * MathUtils.randFloat(i /  this.scene.children.length, 1);
            line.scale.z += timeDelta * MathUtils.randFloat( i / this.scene.children.length, 1);
            if (line.scale.x > 5)
                line.scale.x = 1
            if (line.scale.z > 5)
                line.scale.z = 1
        }

        // horizontal lines
                
        for (let i = 1+16; i < 1+16+32; i++) 
        {
            // let line = lines[i];
            let line = this.scene.children[i];
            if (line.rotDirection != 0)
                line.rotation.z += MathUtils.randFloat(0.01, 0.001) * (line.rotDirection == 1 ? 1 : -1) * timeDelta * (this.scrolling ? 10 : 2);
            if (line.direction != 0)
                line.position.y += MathUtils.randFloat(0.1, 0.01) * (line.direction == 1 ? 1 : -1)      * timeDelta * (this.scrolling ? 10 : 2);
            if (Math.abs(line.rotation.z) > 0.02) line.rotDirection *= -1;
            if (Math.abs(line.position.y-this.horizontalLinesOffset) > 2.6)  line.direction *= -1;
        }
    
    
    }

}


export { SceneController };
