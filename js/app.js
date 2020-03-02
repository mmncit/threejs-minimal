var scene, camera, renderer, mesh;
var keyboard = {};
var player = {height: 1.8};
const width = 1280;
const height = 720;

function CustomSinCurve( scale ) {

	THREE.Curve.call( this );

	this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

	var tx = t * 3 - 1.5;
	var ty = Math.sin( 2 * Math.PI * t );
	var tz = 0;

	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

	mesh = new THREE.Mesh(
		new THREE.TubeGeometry( new CustomSinCurve(20), 20, 2, 8, false),
		new THREE.MeshBasicMaterial({color: 0x0ff9999, wireframe: true})
	);

	scene.add(mesh);

	camera.position.set(0, player.height, 100);
	camera.lookAt(new THREE.Vector3(0, player.height, 0));

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.body.appendChild(renderer.domElement);

    animate();
}

function animate(){

	requestAnimationFrame(animate);

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	if(keyboard[37]){ // left arrow key
		camera.rotation.y -= Math.PI * 0.01;
	}
	if(keyboard[39]){ // right arrow key
		camera.rotation.y += Math.PI * 0.01;
	}


	renderer.render(scene, camera);
}

window.onload = init;