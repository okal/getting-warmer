var jsSHA = require('jssha');
var _ = require('underscore');

function GettingWarmer(setup) {
	var paint, canvas, generateFillColour;
	var passwordInput = document.querySelector(setup.passwordInputSelector);
	var thumbnailContainer = document.querySelector(setup.thumbnailContainerSelector);

	var init = function() {
		canvas = document.createElement('canvas');
		canvas.setAttribute('height', '64');
		canvas.setAttribute('width', '64');
		thumbnailContainer.appendChild(canvas);
		passwordInput.onkeyup = paint
	}

	generateFillColour = function(string) {
		
	}

	paint = function() {
		var seed = new jsSHA((this.value), 'TEXT').getHash('SHA-256', 'HEX');
		var instructions = seed.match(/.{1,4}/g);
		Array.map(instructions);
		console.log(seed);
	}

	return {
		init: init,
	}
}

exports.GettingWarmer = GettingWarmer

