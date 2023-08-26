(function () {

	const canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 300;
	const context = canvas.getContext('2d');
	let centerX =  canvas.width / 2;
	let speed = 10;
	let deacceleration = 0.95;
	const centerY = canvas.height / 2;
	const radius = 5;
	let alpha = 1;
	
	drawCircle(centerX)

	function drawCircle(centerX, centerY, alpha) {
		context.beginPath();
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		context.fillStyle = `rgba(0, 0, 0, ${alpha})`;
		context.fill();
	}

	function distributeAroundRadial (array, radius, addTo, spiral, itemQ) {
		var arrayQ = (itemQ === undefined)?array.length:itemQ;
		var increase = (Math.PI * 2)/arrayQ;
		var  angle = 0;
		for( var i = 0; i < arrayQ; i++ ) {
			var item = array[i];
			item.rotation = 0;
			item.x =  radius * Math.cos( angle ) ;
			item.y =  radius * Math.sin( angle ) ;
			angle += increase;
			addTo.addChild(item);
			if(spiral === true)radius +=3;
		}
	}


	function animate () {
		context.clearRect(0,0,canvas.width,canvas.height)
		centerX += speed;
		speed *= deacceleration;
		alpha *= deacceleration;
		if (speed < 0.1) {
			centerX = canvas.width / 2;
			speed = 8;
			alpha = 1;
		}

		drawCircle(centerX, centerY, alpha);
		requestAnimationFrame(animate)
	}
	animate();

})()