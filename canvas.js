(function () {



	const canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 300;
	const context = canvas.getContext('2d');

	class Firework {
		beamQ = 10;
		beams = [];
		centerX = 0.1;
		centerY = canvas.height / 2;
		radius = 0;
		angle = 0;
		increase;
		constructor(radius) {
			this.radius = radius;
			for (let i = 0; i < this.beamQ; i++) {
				let beam = new Beam(this.radius);
				this.beams.push(beam);
			}
		}

		returnXY(radius, angle) {
			return {x: (canvas.width / 2) + radius * Math.cos( this.angle ), y: (canvas.height / 2) + radius * Math.sin( angle ) }
		}

		reset() {
			this.angle = 0;
			this.radius = 0;
		}

		draw() {
			for (let i = 0; i < this.beamQ; i++) {
				let increase = (Math.PI * 2) / this.beamQ;
				this.angle += increase;
				let { x, y } = this.returnXY(this.radius, this.angle);
				this.beams[i].draw(x,y);
				this.radius += 0.25;
				if (this.radius > Math.max(canvas.width, canvas.height) / 2) {
					this.reset();
				}
			}
		}
	}

	class Beam {

		color = "#FF00FF";
		size;
		constructor (size) {
			this.size = size;
		}

		draw(x, y) {
			context.beginPath();
			context.arc(x, y, this.size, 0, 2 * Math.PI, false);
			context.fillStyle = this.color;
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