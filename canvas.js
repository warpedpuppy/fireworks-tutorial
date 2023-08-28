(function () {




	const canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 300;
	const context = canvas.getContext('2d');

	class Firework {
		beamQ = 10;
		beams = [];
		centerX = canvas.width / 2;
		centerY = canvas.height / 2;
		radius = 0;
		angle = 0;
		buffer = 50;
		increase;
		alpha = 1;
		maxRadius = Math.max(canvas.height, canvas.width) / 2;
		constructor(radius) {
			this.radius = radius;
			for (let i = 0; i < this.beamQ; i++) {
				let beam = new Beam(this.radius);
				this.beams.push(beam);
			}
		}

		returnXY(radius, angle) {
			return {x: this.centerX + radius * Math.cos( this.angle ), y: this.centerY + radius * Math.sin( angle ) }
		}

		reset() {
			this.angle = 0;
			this.radius = 0;
			this.alpha = 1;
			this.centerX = this.buffer + Math.random() * canvas.width - (this.buffer * 2)
			this.centerY = this.buffer + Math.random() * canvas.height - (this.buffer * 2)
		}

		draw() {
			for (let i = 0; i < this.beamQ; i++) {
				let increase = (Math.PI * 2) / this.beamQ;
				this.angle += increase;
				let { x, y } = this.returnXY(this.radius, this.angle);
				this.beams[i].draw(x, y, this.alpha);
				this.alpha *= 0.997;
				this.radius += 0.5;
				if (this.radius > Math.max(canvas.width, canvas.height) / 2) {
					this.reset();
				}
			}
		}
	}

	class Beam {

		color = [255,0,255];
		size;
		radius = (Math.random() * 0.5) ;
		constructor (size) {
			this.size = size;
		}

		draw(x, y, alpha) {
			context.beginPath();
			context.arc(x, y, this.size, 0, 2 * Math.PI, false);
			context.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${alpha})`;
			context.fill();
		}
	}

	const firework = new Firework(5);
	function animate () {
		context.clearRect(0,0,canvas.width,canvas.height)
		firework.draw();
		requestAnimationFrame(animate)
	}
	animate();




	// const canvas = document.getElementById('canvas');
	// canvas.width = 600;
	// canvas.height = 300;
	// const context = canvas.getContext('2d');
	// let centerX =  canvas.width / 2;
	// let speed = 10;
	// let deacceleration = 0.95;
	// let centerY = canvas.height / 2;
	// let radius = 5;
	// let alpha = 1;
	// let beamQ = 10;
	// let angle = 0, increase;
	
	// drawCircle(centerX)

	// function drawCircle(centerX, centerY, alpha) {
	// 	context.beginPath();
	// 	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	// 	context.fillStyle = `rgba(0, 0, 0, ${alpha})`;
	// 	context.fill();
	// }

	// function returnXY(radius, angle) {
	// 	return {x: (canvas.width / 2) + radius * Math.cos( angle ), y: (canvas.height / 2) + radius * Math.sin( angle ) }
	// }



	// function animate () {
	// 	context.clearRect(0,0,canvas.width,canvas.height)
		
	// 	speed *= deacceleration;
	// 	alpha *= deacceleration;
		
		
	// 	for (let i = 0; i < beamQ; i++) {
	// 		centerX += speed;
	// 		increase = (Math.PI * 2) / beamQ;
	// 		angle += increase;
	// 		let { x, y } = returnXY(radius, angle);
	// 		drawCircle(x, y, alpha);
	// 	}

	// 	radius ++;

	// 	if (speed < 0.1) {
	// 		speed = 8;
	// 		alpha = 1;
	// 		radius = 0;
	// 	}

	// 	requestAnimationFrame(animate)
	// }
	// animate();

})()