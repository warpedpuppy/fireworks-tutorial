(function () {

	const canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 300;
	const context = canvas.getContext('2d');

	class Firework {
		beamQ = 1;
		beams = [];
		centerX = 0.1;
		centerY = canvas.height / 2;
		radius;
		constructor(radius) {
			this.radius = radius;
			for (let i = 0; i < this.beamQ; i++) {
				let beam = new Beam(this.centerX, this.centerY, this.radius);
				this.beams.push(beam);
			}
		}

		draw() {
			for (let i = 0; i < this.beamQ; i++) {
				this.beams[i].draw();
			}
		}
	}

	class Beam {

		color = "#FF00FF";
		radius;
		centerX; 
		centerY;
		speed = 10;
		constructor (centerX, centerY, radius) {
			this.centerX = centerX;
			this.centerY = centerY;
			this.radius = radius;
		}

		draw() {
			this.centerX += this.speed;
			this.speed *= 0.99;
			if (this.centerX > canvas.width) {
				this.speed = 10;
				this.centerX = 0;
			}
			context.beginPath();
			context.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI, false);
			context.fillStyle = 'green';
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

})()