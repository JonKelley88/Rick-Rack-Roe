$(document).ready(function() {
  const winCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  let player = {
    char: "Rick",
    icon: [
      "mkecsm/Rick1.png",
      "jK0iXm/Rick2.png",
      "caGe56/Rick3.png",
      "j21CQ6/Rick4.png",
      "eGkHsm/Rick5.png",
      "gBiRk6/Rick6.png",
      "mvSmk6/rick7.png",
      "ce78yR/Rick8.png"
    ],
    moves: [],
    possWins: []
  };
  let computer = {
    char: "Morty",
    icon: [
      "jDkiXm/Morty1.png",
      "hGEz56/Morty2.png",
      "bTEMJR/Morty3.png",
      "cMUoyR/Morty4.png",
      "e111JR/Morty5.png",
      "ezTRk6/Morty6.png",
      "eywqCm/Morty7.png",
      "mBo3Xm/Morty8.png"
    ],
    moves: [],
    possWins: []
  };
  let playerTurn = true;
  let easyMode = true;
  let playerWon = false;
  let computerWon = false;
  let availSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let lastMove, compPick;
  let playerScore = 0;
  let draws = 0;
  let computerScore = 0;

  /*
FUNCTIONS --------------------------
*/

  function findWins(object) {
    // make an array of every combo of squares the player/computer can use to still win
    object.possWins = [];
    $.each(object.moves, function(x, num) {
      for (i = 0; i < 8; i++) {
        if (winCombos[i].indexOf(num) >= 0) {
          let temp = winCombos[i].filter(function(elem, index, array) {
            if (object.moves.indexOf(elem) === -1) {
              return elem != num;
            }
          });
          object.possWins.push(temp);
        }
      }
    });
  } // end of findWins()

  function computerMove() {
    // pick random numbers while the computer is Morty
    if (easyMode === true) {
      compPick =
        availSquares[Math.ceil(Math.random() * availSquares.length - 1)];
    } else {
      // take the middle block if available otherwise pick random
      if (availSquares.indexOf(5) >= 0) {
        compPick = 5;
      } else {
        compPick =
          availSquares[Math.ceil(Math.random() * availSquares.length - 1)];
      }

      // if the player is 1 move away from winning, block that shit
      $.each(player.possWins, function(x, arr) {
        if (arr.length === 1 && availSquares.indexOf(arr[0]) >= 0) {
          compPick = arr[0];
        }
      });

      // if the computer is 1 move away from winning, win that shit
      $.each(computer.possWins, function(x, arr) {
        if (arr.length === 1 && availSquares.indexOf(arr[0]) >= 0) {
          compPick = arr[0];
        }
      });
    }

    // push the computer's icon into the square
    $(`.square:nth-child(${compPick})`).html(
      `<img class='icon' src='${randomIcon(computer)}'>`
    );
    computer.moves.push(compPick);
    availSquares.splice($.inArray(compPick, availSquares), 1);
    playerTurn = true;
    $("#whoseMove").html(`${player.char}'s Move`);
    checkWin();
  } // end of computerMove()

  function checkWin() {
    // check if any of the player's moves match a winning combo
    $.each(winCombos, function(x, arr) {
      function checkWin(num) {
        return player.moves.indexOf(num) >= 0;
      }
      let test = arr.every(checkWin);
      if (test === true) {
        playerWon = true;
        playerTurn = false;
        availSquares = [];
        $("#whoseMove").html(`${player.char} Wins!`);
        winnerPortal(player, computer);
      }
    });

    // check if any of the computer's moves match a winning combo
    $.each(winCombos, function(x, arr) {
      function checkWin(num) {
        return computer.moves.indexOf(num) >= 0;
      }
      let test = arr.every(checkWin);
      if (test === true) {
        computerWon = true;
        playerTurn = false;
        availSquares = [];
        $("#whoseMove").html(`${computer.char} Wins!`);
        winnerPortal(computer, player);
      }
    });

    // if nobody wins and all the squares are used
    if (
      availSquares.length === 0 &&
      playerWon === false &&
      computerWon === false
    ) {
      playerTurn = false;
      $("#whoseMove").html("It's a Draw!");
      $("#draws").html(`Draws: ${draws}`);
      winnerPortal(player, computer);
    }
  } // end of checkWin()

  function winnerPortal(winner, loser) {
    $("#playButton").remove();
    $("#playAgainButton").css("visibility", "visible");
    $("#resetButton").css("visibility", "visible");
    $("#scores")
      .delay(1000)
      .animate({ opacity: 0 }, 500);
    setTimeout(function() {
      $("#scores").css({ color: "white" });
      $(".scores").css({ "text-shadow": "1px 1px 0 black" });
      if (playerWon === true) {
        playerScore++;
        $("#playerScore").html(`${player.char}: ${playerScore}`);
      } else if (computerWon === true) {
        computerScore++;
        $("#computerScore").html(`${computer.char}: ${computerScore}`);
      } else {
        draws++;
        $("#draws").html(`Draws: ${draws}`);
      }
    }, 1500);
    $("#scores")
      .delay(250)
      .animate({ opacity: 1 }, 500);

    if (playerWon === true || computerWon === true) {
      $(".pickPic")
        .parent()
        .removeClass()
        .addClass("col-xs-12 col-md-12");
      $("#whoText").html(`${winner.char} Wins!`);
      $(`.${winner.char}`).show();
      $(`.${loser.char}`).hide();
      $("#portal")
        .css("z-index", "5")
        .delay(1000)
        .animate({ opacity: 1 }, 500);
    } else {
      $(".pickPic")
        .parent()
        .removeClass()
        .addClass("col-xs-6 col-md-6");
      $(".Rick").show();
      $(".Morty").show();
      $("#whoText").html("It's a Draw!");
      $("#portal")
        .css("z-index", "5")
        .delay(1000)
        .animate({ opacity: 1 }, 500);
    }
  }

  // pick a random icon to use on the board then take it out of the available icons to avoid duplicates
  function randomIcon(object) {
    let temp = object.icon[Math.ceil(Math.random() * object.icon.length) - 1];
    object.icon.splice($.inArray(temp, object.icon), 1);
    return "https://image.ibb.co/" + temp;
  }

  /*
END OF FUNCTIONS --------------------------
*/

  // show the portal on load for the player to choose a character
  $("#portal")
    .delay(750)
    .animate({ opacity: 1 }, 500);

  // change style / character assignment while clicking on the two pictures
  $(".pickPic").click(function() {
    if (playerTurn === true) {
      let tempID = $(this).attr("id");
      if (tempID === "Rick") {
        // toggle the css on the two pictures as the player clicks between them
        $("#gameMode").html(
          "Play <span style='color:#03D37A'>Easy</span> Mode"
        );
        $(".Morty").css({
          color: "white",
          filter: "grayscale(100%) brightness(0.5)"
        });
        $(".Rick").css({ color: "white", filter: "initial" });
      } else if (tempID === "Morty") {
        $("#gameMode").html(
          "Play <span style='color:#A24E00'>Hard</span> Mode"
        );
        $(".Rick").css({
          color: "white",
          filter: "grayscale(100%) brightness(0.5)"
        });
        $(".Morty").css({ color: "white", filter: "initial" });
      }
      // show the play button after the player picks a character
      $("#playButton").css("visibility", "visible");

      let tempPlayer = player;
      let tempComp = computer;

      // upon clicking play, it sets the player character then closes the portal and shows the current score
      $("#playButton").click(function() {
        if (tempID === "Rick") {
          player = tempPlayer;
          computer = tempComp;
          easyMode = true;
        } else if (tempID === "Morty") {
          player = tempComp;
          computer = tempPlayer;
          easyMode = false;
        }
        $("#whoseMove").html(`${player.char}'s Move`);
        $("#playButton").animate({ opacity: 0, "z-index": "-1" }, 500);
        $("#portal").animate({ opacity: 0, "z-index": "-1" }, 500);
        $("#playerScore").html(`${player.char}: ${playerScore}`);
        $("#draws").html(`Draws: ${draws}`);
        $("#computerScore").html(`${computer.char}: ${computerScore}`);
        $("#scores").animate({ opacity: 1 }, 500);
        $("#RickText").remove();
        $("#MortyText").remove();
        $(".Rick")
          .css({ color: "white", filter: "initial", cursor: "default" })
          .prop("disabled", true);
        $(".Morty")
          .css({ color: "white", filter: "initial", cursor: "default" })
          .prop("disabled", true);
      });
    }
  }); // end of .pickPic.click (hehe)

  $(".square").click(function() {
    lastMove = $(this).index() + 1;
    // Player's move
    if (playerTurn === true && availSquares.includes(lastMove)) {
      $(this).html(`<img class='icon' src='${randomIcon(player)}'>`);
      $("#whoseMove").html(`${computer.char}'s Move`);
      player.moves.push(lastMove);
      availSquares.splice($.inArray(lastMove, availSquares), 1);
      checkWin();
      findWins(player);
      findWins(computer);
      playerTurn = false;
      setTimeout(computerMove, 1750);
    }
  }); // end of .square.click

  // if they want to play again, reset all relevant variables (need to find a better way)
  $("#playAgainButton").click(function() {
    $("#portal").animate({ opacity: 0, "z-index": "-1" }, 500);
    $(".square").empty();
    $("#whoseMove").html(`${player.char}'s Move`);
    $("#scores").animate({ opacity: 0 }, 500);
    setTimeout(function() {
      $("#scores").css({ color: "#0dfc5e" });
      $(".scores").css({ "text-shadow": "0 0 10px #00b22f" });
    }, 500);
    $("#scores")
      .delay(250)
      .animate({ opacity: 1 }, 500);
    if (player.char === "Rick") {
      player = {
        char: "Rick",
        icon: [
          "mkecsm/Rick1.png",
          "jK0iXm/Rick2.png",
          "caGe56/Rick3.png",
          "j21CQ6/Rick4.png",
          "eGkHsm/Rick5.png",
          "gBiRk6/Rick6.png",
          "mvSmk6/rick7.png",
          "ce78yR/Rick8.png"
        ],
        moves: [],
        possWins: []
      };
      computer = {
        char: "Morty",
        icon: [
          "jDkiXm/Morty1.png",
          "hGEz56/Morty2.png",
          "bTEMJR/Morty3.png",
          "cMUoyR/Morty4.png",
          "e111JR/Morty5.png",
          "ezTRk6/Morty6.png",
          "eywqCm/Morty7.png",
          "mBo3Xm/Morty8.png"
        ],
        moves: [],
        possWins: []
      };
    } else {
      computer = {
        char: "Rick",
        icon: [
          "mkecsm/Rick1.png",
          "jK0iXm/Rick2.png",
          "caGe56/Rick3.png",
          "j21CQ6/Rick4.png",
          "eGkHsm/Rick5.png",
          "gBiRk6/Rick6.png",
          "mvSmk6/rick7.png",
          "ce78yR/Rick8.png"
        ],
        moves: [],
        possWins: []
      };
      player = {
        char: "Morty",
        icon: [
          "jDkiXm/Morty1.png",
          "hGEz56/Morty2.png",
          "bTEMJR/Morty3.png",
          "cMUoyR/Morty4.png",
          "e111JR/Morty5.png",
          "ezTRk6/Morty6.png",
          "eywqCm/Morty7.png",
          "mBo3Xm/Morty8.png"
        ],
        moves: [],
        possWins: []
      };
    }
    playerTurn = true;
    playerWon = false;
    computerWon = false;
    availSquares = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  });

  $("#resetButton").click(function() {
    history.go(0);
    location.reload(true);
  });
}); // end of document.ready
