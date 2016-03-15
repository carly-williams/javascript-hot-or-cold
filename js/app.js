
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

	/*--- When user clicks New Game ---*/
	$("a.new").click(function(){
		newGame();
	});

	$("#guessButton").click(function(event){
		event.preventDefault();
		var guess = $("#userGuess").val();
		giveFeedbackOnGuess(guess);
	})

	$('#userGuess').keydown(function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			var guess = $("#userGuess").val();
			giveFeedbackOnGuess(guess);
		}
	});


	var secretNum = null;
	var numGuesses = 0;

	// Generate a secret number between 1 and 100
	function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function giveFeedbackOnGuess(guess) {

		numGuesses++;
		$('#count').text(numGuesses + '');
		$('#guessList').append('<li>' + guess + '</li>');

		if (guess % 1 != 0 || guess.indexOf(".")!=-1) {
			$('#feedback').text("Please enter an integer.");
			return;
		}

		if ((guess < 1) || (guess > 100)) {
			$('#feedback').text("Please enter a number between 1 inclusive and 100 inclusive.");
			return;			
		}

		if (guess == secretNum) {
			$('#feedback').text("Congrats! You guessed it!");
		}
		else {
			var diff = Math.abs(secretNum - guess);

			if (diff >= 50) {
				$('#feedback').text("You are ice cold.");
			}
			else if ((diff >= 30) && (diff < 50)) {
				$('#feedback').text("You are cold.");
			}
			else if ((diff >= 20) && (diff < 30)) {
				$('#feedback').text("You are warm.")
			}
			else if ((diff >= 10) && (diff < 20)) {
				$('#feedback').text("You are hot.")
			}
			else {
				$('#feedback').text("You are very hot.")
			}			
		}
	}

	function newGame() {

		numGuesses = 0;
		$('#count').text(numGuesses + '');
		$('#feedback').text("Make your Guess!");
		$("#userGuess").val('');
		$('#guessList').empty();

		secretNum = getRandomInt(1, 100);
		console.log(secretNum);
	}

	newGame();

});


