//initialize variables
'use strict';
// var secretNumber, 
// userGuess, 
// pastGuesses = [], 
// count,
// guessHtml, 
// userFeedback,
// alreadyGuessed,
// newButton,
// form ,
// input,
// feedback,
// countElement,
// guessList;

$(document).ready(function() {

	/*--- Display information modal box ---*/
	$(".what").click(function(){
  	$(".overlay").fadeIn(1000);

	});

	/*--- Hide information modal box ---*/
	$("a.close").click(function(){
		$(".overlay").fadeOut(1000);
	});

	// When user clicks New Game 
	$("a.new").click(function(){
		newGame();
	});

	// When user clicks the Guess button
	$("#guessButton").click(function(event){
		event.preventDefault();
		var guess = $("#userGuess").val();
		giveFeedbackOnGuess(guess);
	})

	// When user hits Enter/Return key after entering guess
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

	// Provide feedback to user after entering guess
	function giveFeedbackOnGuess(guess) {

		// Remove the guess text from the Enter your Guess input
		$("#userGuess").val('');
		
		// Increment the number of guesses and append the new guess
		numGuesses++;
		$('#count').text(numGuesses + '');	
		$('#guessList').append('<li>' + guess + '</li>');

		// Check if the guess is an integer
		if (guess % 1 != 0 || guess.indexOf(".")!=-1) {
			$('#feedback').text("Please enter an integer.");
			return;
		}

		// Check if the guess is in the correct range
		if ((guess < 1) || (guess > 100)) {
			$('#feedback').text("Please enter a number between 1 inclusive and 100 inclusive.");
			return;			
		}

		// Check if the guess is equal to the secret number
		if (guess == secretNum) {
			$('#feedback').text("Congrats! You guessed it!");
		}
		// Otherwise, provide feedback (hot, cold, etc.)
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

	// New game function
	function newGame() {

		numGuesses = 0;
		$('#count').text(numGuesses + '');
		$('#feedback').text("Make your Guess!");
		$("#userGuess").val('');
		$('#guessList').empty();

		secretNum = getRandomInt(1, 100);
		// For debugging purposes
		console.log(secretNum);
	}

	// Start a new game on load
	newGame();

});
  	
  	

  




