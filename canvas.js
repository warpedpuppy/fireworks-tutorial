(function () {

	const canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 300;
	const context = canvas.getContext('2d');
	let centerX =  canvas.width / 2;
	let speed = 10;
	let deacceleration = 0.95;
	let centerY = canvas.height / 2;
	let radius = 5;
	let alpha = 1;
	let beamQ = 10;
	let angle = 0, increase;
	
	drawCircle(centerX)

	function drawCircle(centerX, centerY, alpha) {
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = `rgba(0, 0, 0, ${alpha})`;
		context.fill();
	}

	function returnXY(radius, angle) {
		return {x: (canvas.width / 2) + radius * Math.cos( angle ), y: (canvas.height / 2) + radius * Math.sin( angle ) }
	}



	function animate () {
		context.clearRect(0,0,canvas.width,canvas.height)
		
		speed *= deacceleration;
		alpha *= deacceleration;
		
		
		for (let i = 0; i < beamQ; i++) {
			centerX += speed;
			increase = (Math.PI * 2) / beamQ;
			angle += increase;
			let { x, y } = returnXY(radius, angle);
			drawCircle(x, y, alpha);
		}

		radius ++;

		if (speed < 0.1) {
			speed = 8;
			alpha = 1;
			radius = 0;
		}

		requestAnimationFrame(animate)
	}
	animate();

})()