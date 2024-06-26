import { SnowmanLogic } from "./snowman.js";

class SnowmanUI {
  constructor(maxWrong = 5) {
    console.debug("Snowman UI");

    this.maxWrong = maxWrong;
    this.game = new SnowmanLogic(maxWrong);

    this.handleGuessBound = this.handleGuess.bind(this); //1 bound copy for event listeners

    this.$keyboard = document.querySelector("#Snowman-keyboard");
    this.$word = document.querySelector("#Snowman-word");
    this.$image = document.querySelector("#Snowman-image");

    this.updateWord();
    this.addKeyboard();
  }

  /** Add keys to keyboard area and register single event listener for area.  */

  addKeyboard() {
    console.debug("addKeyboard");

    const $letters = [..."abcdefghijklmnopqrstuvwxyz"].map(
      letter => {
        const $letter = document.createElement("button");
        $letter.classList.add("letter");
        $letter.dataset.letter = letter;
        $letter.innerText = letter;
        return $letter;
      },
    );

    this.$keyboard.append(...$letters);
    this.$keyboard.addEventListener("click", this.handleGuessBound);
  }

  /** Update guessed word on board. */

  updateWord() {
    console.debug("updateWord");

    this.$word.innerText = this.game.getGuessedWord();
  }

  /** Update image after a bad guess. */

  updateImage() {
    console.debug("updateImage");

    this.$image.src = `${this.game.numWrong}.png`;
  }

  /** Handle guessing a letter. */

  guessLetter(letter) {
    console.debug("guessLetter", letter);

    const isCorrect = this.game.guessLetter(letter); // returning true or false

    this.updateWord();
    this.updateImage();

    const gameOutcome = this.game.gameState;

    // TODO: Could make more concise - just not "playing"
    // And do not need additional div created here since we wrote in HTML
    // Could also develop the game message further to reveal word
    if (gameOutcome === "WON" || gameOutcome === "LOST") {
      const $gameOutcomeDisplay = document.createElement("div");

      $gameOutcomeDisplay.innerHTML = `YOU ${gameOutcome}`;

      const $announcementArea = document.querySelector(
        "#Snowman-announcement-area");

      $announcementArea.append($gameOutcomeDisplay);

      this.$keyboard.removeEventListener("click", this.handleGuessBound);
    }
  }



  /** Handle clicking a letter button: disable button & handle guess. */

  handleGuess(evt) {
    console.debug("handleGuess");

    if (!evt.target.matches(".letter")) return;

    const letter = evt.target.dataset.letter;
    console.log({ letter });
    this.guessLetter(letter);

    evt.target.disabled = true;

  }
}

export { SnowmanUI };
