(function () {

	const canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 300;
	const context = canvas.getContext('2d');
	let centerX = 0.1;
	const centerY = canvas.height / 2;
	const radius = 10;
	
	drawCircle(centerX)

	function drawCircle(centerX) {
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = 'green';
		context.fill();
	}


	function animate () {
		context.clearRect(0,0,canvas.width,canvas.height)
		centerX *= 1.1;
		drawCircle(centerX);
		requestAnimationFrame(animate)
	}
	animate();

})()