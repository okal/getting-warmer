# Introduction


Getting Warmer provides a visual cue for password inputs without compromising
security, by generating a piece of abstract art from a hash of the contents of
the input. The sequence of pieces generated becomes familiar over time, making
it obvious to the user when they've mistyped a character.


## Usage

``` javascript
var setup = {
	"passwordInputSelector": "<CSS selector>"
	"thumbnailContainerSelector": "<CSS selector>",
}

var warmer = GettingWarmer(setup);
warmer.init();
```

## License

[MIT License](http://opensource.org/licenses/MIT)
