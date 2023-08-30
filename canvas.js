(function () {


	const fireworkQText = document.getElementById("fireworkQ");
	const fireworkQInputRange = document.getElementById("fireworkQInputRange");
	let fireworks = [];
	let fireworkQ = 5;
	fireworkQText.innerText = fireworkQ;
	fireworkQInputRange.value = fireworkQ;

	fireworkQInputRange.addEventListener('change', e => {


		fireworks = [];
		fireworkQ = e.target.value;
		fireworkQText.innerText = fireworkQ;

		for (let i = 0; i <= fireworkQ; i++){
			let size = i + 5;
			fireworks.push(new Firework(size))
		}
	})
	

	const canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 300;
	const context = canvas.getContext('2d');

	class Background {
		constructor () {
			
		}
		draw() {
			context.beginPath();
			context.rect(0,0,canvas.width, canvas.height);
			context.fillStyle = `rgba(0,0,0,1)`;
			context.fill();

		}
	}

	class Firework {
		beamQ = 20;
		beams = [];
		centerX = canvas.width / 2;
		centerY = canvas.height / 2;
		radius = 0;
		angle = 0;
		buffer = 50;
		increase;
		alpha = 1;
		radiusIncrease = this.returnRadiusIncrease();
		maxRadius = Math.max(canvas.height, canvas.width) / 2;
		constructor(radius) {
			this.radius = radius;
			this.color = this.returnColor();
			for (let i = 0; i < this.beamQ; i++) {
				let beam = new Beam(this.radius);
				this.beams.push(beam);
			}
		}

		returnRadiusIncrease() {
			return (Math.random() * 0.1) + 0.05;;
		}

		returnXY() {
			return {
				x: this.centerX + this.radius * Math.cos( this.angle ), 
				y: this.centerY + this.radius * Math.sin( this.angle ) 
			}
		}

		returnColor () {
			let arr = [];
			for (let i = 0; i < 3; i++) {
				arr.push(Math.floor(Math.random() * 255))
			}
			return arr;
		}

		reset() {
			this.radiusIncrease = this.returnRadiusIncrease();
			this.color = this.returnColor();
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
				let { x, y } = this.returnXY();
				this.beams[i].draw(x, y, this.alpha, this.color);
				this.alpha *= 0.999;
				this.radius += this.radiusIncrease;
				if (this.radius > Math.max(canvas.width, canvas.height) / 2) {
					this.reset();
				}
			}
		}
	}

	class Beam {

		size;
		sizeVariance = (Math.random() * 0.3) + 0.7;
		constructor (size) {
			this.size = size;
		}

		alter () {
			this.sizeVariance = (Math.random() * 0.3) + 0.7;
		}

		draw(x, y, alpha, color) {
			context.beginPath();
			// context.rect(x * this.sizeVariance, y * this.sizeVariance, this.size, this.size)
			context.arc(x * this.sizeVariance, y * this.sizeVariance, this.size, 0, 2 * Math.PI, false);
			context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
			context.fill();
		}
	}


	for (let i = 1; i <= fireworkQ; i++){
		fireworks.push(new Firework(i))
	}
	
	const background = new Background();
	function animate () {
		context.clearRect(0,0,canvas.width,canvas.height);
		background.draw();
		for (let i = 0; i < fireworkQ; i++){
			fireworks[i].draw()
		}
		requestAnimationFrame(animate)
	}
	animate();





})()