const app = {
    init: () => {
        app.setup();
        app.createDice();

        app.render();
        setTimeout(app.stop, 2000);
    },

    setup: () => {
        //objet renderer qui effectue les calculs et affiche le rendu de l'image 
        app.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        //définition de la taille du canvas contenu dans le renderer
        app.renderer.setSize(window.innerWidth, window.innerHeight);
        //ajout du canvas au DOM
        document.body.appendChild(app.renderer.domElement);

        //scène qui contiendras les objets 3D
        app.scene = new THREE.Scene();

        //caméra qui 'filme' la scène
        app.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 100);
        //recul de la caméra
        app.camera.position.z = 50;

        //lumière de la scène
        const ambientLight = new THREE.AmbientLight( 0xcffffff, 0.4 );
        app.scene.add( ambientLight );


    },

    createDice: () => {
        const loader = new THREE.TextureLoader();
        const face1 = loader.load('/images/1.png');
        const face2 = loader.load('/images/2.png');
        const face3 = loader.load('/images/3.png');
        const face4 = loader.load('/images/4.png');
        const face5 = loader.load('/images/5.png');
        const face6 = loader.load('/images/6.png');

        const materials = [
            new THREE.MeshBasicMaterial( { map: face1 }),
            new THREE.MeshBasicMaterial( { map: face6 }),
            new THREE.MeshBasicMaterial( { map: face3 }),
            new THREE.MeshBasicMaterial( { map: face4 }),
            new THREE.MeshBasicMaterial( { map: face5 }),
            new THREE.MeshBasicMaterial( { map: face2 }),
        ];
            
        const faceMaterial = new THREE.MeshFaceMaterial( materials );
        
        //construction du mesh
        const geometry = new THREE.BoxGeometry( 10, 10, 10 );
        // const material = new THREE.MeshBasicMaterial({color: 0xffffff});
        app.dice = new THREE.Mesh(geometry, faceMaterial);
        app.scene.add(app.dice);
        app.scene.rotation.x = 10;
        app.scene.rotation.y = 10;
        app.scene.rotation.z = 20;
        
        
    },

    createFace: () => {
        const loader = new THREE.TextureLoader();
        const face1 = loader.load('/images/1.png');
        const material = new THREE.MeshBasicMaterial( { map: face1 });
        const geometry = new THREE.PlaneGeometry( 10, 10, 10 );
        app.face = new THREE.Mesh( geometry, material );
        app.face.position.z = 0;
        app.face.position.x = 0;
        app.face.position.y = 0;

        app.scene.add( app.face );

    },



    render: () => {
       app.animation = requestAnimationFrame(app.render);
        

        //rotation
        app.scene.rotation.x += 0.3;


        app.renderer.render(app.scene, app.camera);


    },

    stop: () => {
        cancelAnimationFrame(app.animation);
        // console.log(app.dice);
        // app.dice.material.dispose();
        // app.dice.geometry.dispose();
        // app.scene.remove(app.dice);
    }
};

document.addEventListener('DOMContentLoaded', app.init);
