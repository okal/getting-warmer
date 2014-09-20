var jsSHA = require('jssha');
var _ = require('underscore');

function GettingWarmer(setup) {
	var paint, canvas, context, generateFillColour;
	var passwordInput = document.querySelector(setup.passwordInputSelector);
	var thumbnailContainer = document.querySelector(setup.thumbnailContainerSelector);

	var init = function() {
		canvas = document.createElement('canvas');
		context = canvas.getContext('2d');
		canvas.setAttribute('height', '256');
		canvas.setAttribute('width', '256');
		thumbnailContainer.appendChild(canvas);
		passwordInput.onkeyup = paint;
		paint();
	}

	generateFillColour = function(string) {
		var color = '#', hash = 0;
		for(var i = 0; i < string.length; i++) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}
		for(var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xFF;
			color += ('00' + value.toString(16)).substr(-2);
		}
		return color;
	}

	paint = function() {
		canvas.width = canvas.width
		var seed = new jsSHA((this.value), 'TEXT').getHash('SHA-256', 'HEX');
		var instructions = (seed + seed + seed + seed + seed + seed).match(/.{1,6}/g);
		var color;
		_.each(instructions, function(instruction, index) {
			var x, y;
			x = ((index + 1) % 2) ? (256 - (index * 8.3)) : (index * 8.2);
			y = (Math.log(x) % 1) * 256;
			var length = index;
			var alpha = Math.log((index + 1) / (index % 16)) % 1;
			var color = generateFillColour(instruction + index);
			context.globalAlpha = 1 - alpha;
			context.fillStyle = color;
			context.rotate((index + 1) * 360 / 16);
			console.log(x)
			console.log(y)
			context.fillRect(3, 3, x, y);
			context.beginPath();
			context.bezierCurveTo(x + (Math.log(parseInt(seed)) % 1) * 256, y + (Math.log(parseInt(seed))), x + 32, y - 67, x, Math.abs(6 - y));
			context.bezierCurveTo(x + 32, y - 67, x, x + (Math.log(parseInt(seed)) % 1) * 256, y + (Math.log(parseFloat(instruction))), Math.abs(6 - y));
			context.lineWidth = (Math.log(seed) % 1) * 32;
			context.strokeStyle = generateFillColour(seed + seed);
			context.stroke();
			context.rotate((index + 1) * 360 / Math.log(parseInt(seed)));
		})
		console.log(seed);
	}

	return {
		init: init,
	}
}

exports.GettingWarmer = GettingWarmer

