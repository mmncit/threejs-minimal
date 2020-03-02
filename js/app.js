

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

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

var path = new CustomSinCurve( 10 );
var geometry = new THREE.TubeGeometry( path, 20, 2, 8, false);
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.BackSide, wireframe: true});

var mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );



camera.position.z = 50;

var animate = function () {
	requestAnimationFrame( animate );

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.01;

	renderer.render( scene, camera );
};
animate();