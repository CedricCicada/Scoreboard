///////////////////////////////////////////////////////////All score related elements

//Key variables defaults and corresponding html id
var curshooter = 1;  //curshooter & curshooter_disp
var player1DisksShot = 0; //player1DisksShot
var player2DisksShot = 0; //player2DisksShot
var player1Twenties = 0; //p1_20s & p1_20s_disp
var player2Twenties = 0; //p2_20s & p2_20s_disp
var player1Points = 0; //p1_pts & p1_pts_disp
var player2Points = 0; //p2_pts & p2_pts_disp
var player1Games = 0; //p1_gms & p1_gms_disp
var player2Games = 0; //p2_gms & p2_gms_disp
var playersPerSide = 1;

// Variables for use in undoing shots
var player1Prev20s = 0;
var player2Prev20s = 0;
var player1PrevDisksShot = 0;
var player2PrevDisksShot = 0;

// Valriables for use in undoing scores
var player1PrevPoints = 0;
var player2PrevPoints = 0;
var player1PrevGames = 0;
var player2PrevGames = 0;

//Other variables
var roundnumber = 1; //round_number
var gamenumber = 1; //game_number
var numdiscs = 8; //internal javascript only - unless disc display references
var bestofXgames = 1; //bestofXgames
var points_per_game = 5; //points_per_game
var games_to_win_match = 0;  //internal
var player1 = "P1"; //player1
var player2 = "P2"; //player2
var player1a = "Team 1 player 1"
var player1b = "Team 1 player 2"
var player2a = "Team 2 player 1"
var player2b = "Team 2 player 2"
var eventID = "Event ID"; //eventID
var matchDetail = "Tournament stage"; //matchDetail
var p1hamind = "1st Shot"; //p1hammerind
var p2hamind = "Hammer"; //p2hammerind
var shortcutsCreated = false;

//Setup game info to enter match data like player names, match name, and the criteria to win the match
  //calls resetround() and startmatchtime() - RE-evaluate the use of this
  //adds event listener so that keyboard shortcuts can be used
  //-(Apr 7, 2020) Working decently, stuff to improve like remove redundancies and ensuring all keycodes work

function set_up_descriptions()
{
    eventID = prompt("Enter tournament name or other event ID for bottom of scoreboard", eventID);
    eventID = eventID.toUpperCase();
    matchDetail = prompt("Enter match detail to show at top of scoreboard, ie Semifinal - First to 11", 
                          matchDetail);

}

function set_up_goal()
{
    bestofXgames = prompt("Match is best of X Games (ex. If in Tavistock, X=3 as the match is a best of 3 games. Whereas a race to 11 points is best of 1 game)",
                          bestofXgames);	
    games_to_win_match = Math.ceil(bestofXgames/2)
    points_per_game = prompt("Each game requires X points to win (ex. If in Tavistock, X=5, whereas a race to 9 points has X=9)", 
                        points_per_game);
}

function set_up_players()
{
    var playersPerSide= 0;
    playersPerSide = prompt("How many players on each side? (1 for singles, 2 for doubles", "1");
    while (playersPerSide != 1 && playersPerSide && 2)
    {
        if (playersPerSide == 1)
        {
            set_up_singles_game();
        }
        else if (playersPerSide == 2)
        {
            set_up_doubles_game();
        }
        else
        {
            alert ("Please enter 1 or 2");
        }
    }
}

function set_up_singles_game()
{
    player1 = prompt("Enter player name #1", "Player 1");
    player2 = prompt("Enter player name #2", "Player 2");

    setSinglesAlignment();
    numdiscs = 8;
    showPlayers(1);
}

function set_up_doubles_game()
{
    var useTeamName = ""

    while (useTeamName.toUpperCase() != "Y" && useTeamName.toUpperCase())
    {
        useTeamName = prompt("Use team names? (y/n)");
        
        if (useTeamName.toUpperCase() == "Y")
        {
            player1 = prompt("Enter team name #1", "Team 1");
            player2 = prompt("Enter team name #2", "Team 2");
            showPlayers(1);
        }
        else if (useTeamName.toUpperCase() == "N")
        {
            player1a = prompt("Enter first team's first player name", "Team 1 Player 1");
            player1b = prompt("Enter first team's second player name", "Team 1 Player 2");
            player2a = prompt("Enter second team's first player name", "Team 2 Player 1");
            player2b = prompt("Enter second team's second player name", "Team 2 Player 2");
            showPlayers(2);
        }
        else 
        {
            alert ("Please enter Y or N");
        }
    }
    setDoublesAlignment();
    numdiscs = 12;
}

function setup() 
{
    set_up_descriptions();
    set_up_goal();
    set_up_players();

    // player1 = prompt("Enter player/team name #1", "Player 1");
    // player1 = player1.toUpperCase();
    // player2 = prompt("Enter player/team name #2", "Player 2");
    // player2 = player2.toUpperCase();

    // eventID = prompt("Enter Event ID", eventID);
    // eventID = eventID.toUpperCase();
    // matchDetail = prompt("Enter match detail to show at top of scoreboard, ie Semifinal - First to 11", 
    //                       matchDetail);
    // bestofXgames = prompt("Match is best of X Games (ex. If in Tavistock, X=3 as the match is a best of 3 games. Whereas a race to 11 points is best of 1 game)",
    //                       bestofXgames);	
    // games_to_win_match = Math.ceil(bestofXgames/2)
    // points_per_game = prompt("Each game requires X points to win (ex. If in Tavistock, X=5, whereas a race to 9 points has X=9)", 
    //                     points_per_game);
    numdiscs = parseInt(prompt("Each round consists of X discs each. (max 13 for disc visuals)", numdiscs));

    curshooter = 1;  //curshooter & curshooter_disp
    player1DisksShot = 0; //player1DisksShot
    player2DisksShot = 0; //player2DisksShot
    player1Twenties = 0; //p1_20s & p1_20s_disp
    player2Twenties = 0; //p2_20s & p2_20s_disp
    player1Points = 0; //p1_pts & p1_pts_disp
    player2Points = 0; //p2_pts & p2_pts_disp
    player1Games = 0; //p1_gms & p1_gms_disp
    player2Games = 0; //p2_gms & p2_gms_disp
    document.getElementById("p1_20s").innerHTML = player1Twenties;
    document.getElementById("p1_20s_disp").innerHTML = player1Twenties;
    document.getElementById("p2_20s").innerHTML = player2Twenties;
    document.getElementById("p2_20s_disp").innerHTML = player2Twenties;
    document.getElementById("curshooter").innerHTML = curshooter;
    document.getElementById("p1_gms_disp").innerHTML = player1Games;
    document.getElementById("p2_gms_disp").innerHTML = player2Games;
    document.getElementById("player1DisksShot").innerHTML = player1DisksShot ; 
    document.getElementById("player2DisksShot").innerHTML = player2DisksShot;

    page_update(0);
    discupdate(0);
    p2hamind = "Hammer"
    p1hamind = "1st Shot"
    curshooter = 1
    document.getElementById("curshooter_disp").innerHTML = document.getElementById("player1").innerHTML

    if (!shortcutsCreated)
    {
        shortcutsCreated = true;
        document.body.addEventListener("keydown", function(e) 
        {
            switch (e.key)
            {
                case "1": 
                    shotupdate(1);  // No 20
                    break;
                case "2":
                    shotupdate(2);  // 20
                    break;
                case "9":
                    shotupdate(9);  // Opponent 20
                    break;
                case "4":
                    ptsupdate(4);   // Player 1 wins
                    break;
                case "5":
                    ptsupdate(5);   // Tie
                    break;
                case "6":
                    ptsupdate(6);   // Player 2 wins
                    break;
                case "0":
                    swaphammer();
                    break;
                default:
                    alert("Unexpected key pressed.");
                    break;
            }
        })
    }
}

//updates html for latest javascript values
  //x is used as indicator for type of update so not all elements are called on to update if unnecessary
  //working as intended (Apr 7, 2020)
function page_update(x) 
{
    if (x == 0)
    { //setup call
        document.getElementById("player1").innerHTML = player1;
        document.getElementById("player2").innerHTML = player2;
        document.getElementById("player1a").innerHTML = player1a;
        document.getElementById("player1b").innerHTML = player1b;
        document.getElementById("player2a").innerHTML = player2a;
        document.getElementById("player2b").innerHTML = player2b;
        document.getElementById("eventid").innerHTML = eventID;
        document.getElementById("matchDetail").innerHTML = matchDetail;
        document.getElementById("bestofXgames").innerHTML = "Best of " + bestofXgames + " Games";
        document.getElementById("Xptstowin").innerHTML = "(First to " + points_per_game + " Points)"; 
    }

    if (x == 1)
    { //swaphammer call
        document.getElementById("curshooter").innerHTML = curshooter
        document.getElementById("p2hammerind").innerHTML = p2hamind
        document.getElementById("p1hammerind").innerHTML = p1hamind
    }

  if (x==2){ //shot update call
    document.getElementById("p1_20s").innerHTML = player1Twenties
    document.getElementById("p1_20s_disp").innerHTML = player1Twenties
    document.getElementById("p2_20s").innerHTML = player2Twenties
    document.getElementById("p2_20s_disp").innerHTML = player2Twenties
    document.getElementById("curshooter").innerHTML = curshooter
    document.getElementById("player1DisksShot").innerHTML = player1DisksShot
    document.getElementById("player2DisksShot").innerHTML = player2DisksShot
    swapShooter();
  }

  if (x==3){ //pts update, shots and 20s should be 0s
    document.getElementById("p1_20s").innerHTML = player1Twenties
    document.getElementById("p1_20s_disp").innerHTML = player1Twenties
    document.getElementById("p2_20s").innerHTML = player2Twenties
    document.getElementById("p2_20s_disp").innerHTML = player2Twenties
    document.getElementById("curshooter").innerHTML = curshooter //is this line needed?
    if (curshooter == 1) {document.getElementById("curshooter_disp").innerHTML = player1} //not sure why but these need to be backwards -> because used below
    if (curshooter == 2) {document.getElementById("curshooter_disp").innerHTML = player2}
    document.getElementById("player1DisksShot").innerHTML = player1DisksShot
    document.getElementById("player2DisksShot").innerHTML = player2DisksShot
    document.getElementById("p1_pts").innerHTML = player1Points
    document.getElementById("p1_pts_disp").innerHTML = player1Points
    document.getElementById("p2_pts").innerHTML = player2Points
    document.getElementById("p2_pts_disp").innerHTML = player2Points}

  if (x==4){ //pts update and games update
    document.getElementById("p1_pts").innerHTML = player1Points
    document.getElementById("p1_pts_disp").innerHTML = player1Points
    document.getElementById("p2_pts").innerHTML = player2Points
    document.getElementById("p2_pts_disp").innerHTML = player2Points
    document.getElementById("p1_gms").innerHTML = player1Games
    document.getElementById("p1_gms_disp").innerHTML = player1Games
    document.getElementById("p2_gms").innerHTML = player2Games
    document.getElementById("p2_gms_disp").innerHTML = player2Games}

}


//Swap Hammer - Working as intended (Apr 7, 2020)
  //swaps hammer indicator and sets curshooter to the opponent
function swaphammer() 
{
  if (p1hamind == "1st Shot")
  {
    p1hamind = "Hammer"
    p2hamind = "1st Shot"
    curshooter = 2
    document.getElementById("curshooter_disp").innerHTML = document.getElementById("player2").innerHTML
  }
  else
  {
    p2hamind = "Hammer"
    p1hamind = "1st Shot"
    curshooter = 1
    document.getElementById("curshooter_disp").innerHTML = document.getElementById("player1").innerHTML
  }
  page_update(1);
}


//Updates curshooter, p1/p2discshot, p1/p2_20s and calls ptsupdate() in case round is over
  //x is shot result indicator (none, 20 or oppo 20), p is curshooter indicator (1 or 2)
  // - Working as intended (Apr 7, 2020)
function shotupdate(actionCode) 
{
  if (document.getElementById("curshooter_disp").innerHTML == "Allocate Points")
  {
    return;
  } //protects against an accidental click

  saveCurrentShots();
  saveCurrentScore();

  if (curshooter == 1) 
  {
    if (actionCode == 2) 
    { 
      player1Twenties +=1;
    }
    if (actionCode == 9) 
    { 
      player2Twenties += 1;
    }
    player1DisksShot += 1;
    discupdate(1);
  }

  if (curshooter == 2) 
  {
    if (actionCode == 2) 
    { 
      player2Twenties += 1;
    }
    if (actionCode == 9) 
    { 
      player1Twenties += 1;
    }
    player2DisksShot += 1;
    discupdate(2);
  }

  slidenumber += 1;
  page_update(2);

  if ((player1DisksShot >= numdiscs) && (player2DisksShot >= numdiscs)) 
  {
    document.getElementById("curshooter_disp").innerHTML = "Allocate Points"
  }
}

function swapShooter()
{
  curshooter = curshooter == 1 ? 2 : 1;
  if (curshooter == 1) 
  {
    document.getElementById("curshooter_disp").innerHTML = player1;
  } 
  if (curshooter == 2) 
  {
    document.getElementById("curshooter_disp").innerHTML = player2;
  }
}

function saveCurrentShots()
{
  player1Prev20s = player1Twenties;
  player2Prev20s = player2Twenties;
  player1PrevDisksShot = player1DisksShot;
  player2PrevDisksShot = player2DisksShot;
}

function saveCurrentScore()
{
  player1PrevPoints = player1Points;
  player2PrevPoints = player2Points;
  player1PrevGames = player1Games;
  player2PrevGames = player2Games;
}

function undoShot()
{
  var player1DiskNumber = player1DisksShot;
  var player2DiskNumber = player2DisksShot;
  player1Twenties = player1Prev20s;
  player2Twenties = player2Prev20s;
  player1DisksShot = player1PrevDisksShot;
  player2DisksShot = player2PrevDisksShot;
  slidenumber -= 1;
  page_update(2);
  showDisc(curshooter, curshooter == 1 ? player1DiskNumber : player2DiskNumber);
}

function undoScore()
{
  player1Points = player1PrevPoints;
  player2Points = player2PrevPoints;
  player1Games = player1PrevGames;
  player2Games = player2PrevGames;
  // Recording a score resets disks shot to zero.  Put them back to numdisks so recording a new score will work.
  player1DisksShot = numdiscs;
  player2DisksShot = numdiscs;
  // When the score is recorded, the hammer is swapped, so we need to swap it back.
  swaphammer();
  document.getElementById("p1_pts").innerHTML = player1Points;
  document.getElementById("p1_pts_disp").innerHTML = player1Points;
  document.getElementById("p2_pts").innerHTML = player2Points;
  document.getElementById("p2_pts_disp").innerHTML = player2Points;
  document.getElementById("p1_20s").innerHTML = player1Twenties;
  document.getElementById("p1_20s_disp").innerHTML = player1Twenties;
  document.getElementById("p2_20s").innerHTML = player2Twenties;
  document.getElementById("p2_20s_disp").innerHTML = player2Twenties;
  document.getElementById("curshooter_disp").innerHTML = "Allocate Points"
}

//when round is done (when both sides shot all discs), reset 20s and discs to 0, prompt for board score to determine points to allocate, update page, call gmsupdate
  // - Working as intended (Apr 7, 2020)
  //x=4, 2pts for p1, x=5, 1 pt each, x=6, 2pts for p2
  //function does nothing if hit accidentally before all shots are taken
function ptsupdate(actionCode) 
{
  if ((player1DisksShot >= numdiscs) && (player2DisksShot >= numdiscs)) 
  { //then the round is over

    if (actionCode == 4) // player 1 wins
    {
      player1Points += 2
    }
    if (actionCode == 5) // tie round
    {
      player1Points += 1; 
      player2Points +=1;
    }
    if (actionCode == 6) 
    {
      player2Points += 2;
    }

    //now resetting for next round and sending info to shotlog
    resetgame();
    // player1Twenties = 0;
    // player2Twenties = 0;
    // player1DisksShot = 0;
    // player2DisksShot = 0;
    // discupdate(0);
    // slidenumber +=1 //if you put a semicolon here then it doesn't work for some reason
    // //curshooter = (curshooter-2)*(-1)+1 //flipping curshooter so that hammer switches in following round
    // swaphammer();
    // page_update(3)
    gmsupdate();
  }
}

function resetgame()
{
    player1Twenties = 0;
    player2Twenties = 0;
    player1DisksShot = 0;
    player2DisksShot = 0;
    discupdate(0);
    slidenumber +=1 //if you put a semicolon here then it doesn't work for some reason
    swaphammer();
    page_update(3);
}

function clearscores()
{
    player1Games = 0;
    player2Games = 0;
    player1Points = 0;
    player2Points = 0;
    resetgame();
    page_update(2);
}

//when game is done, reset points (discs and 20s should already be reset), update page, prompt if match is over
   //- Working as intended (Apr 7, 2020)
function gmsupdate() {
  if (!(player1Points == player2Points) && ((player1Points >= points_per_game) || (player2Points >= points_per_game))){
      if (player1Points > player2Points){player1Games += 1}
      if (player2Points > player1Points){player2Games += 1}
    player1Points = 0
    player2Points = 0
    slidenumber += 1
    page_update(4);
  }
  if (player1Games >= games_to_win_match) {//window.alert("Match complete: winner is " + player1); //call shotlog to enter final row with games updated
                          shotlog();}
  if (player2Games >= games_to_win_match) {//window.alert("Match complete: winner is " + player2)
                          shotlog();} //call shotlog to enter final row with games updated
}

//disc visuals
  //x=0 means reset round and restore all discs, x=1 means p1 shot, x=2 means p2 shot
function discupdate(x) 
{
  //and add discs back
  if (x == 0) 
  {
    var i;
    for (i=1; i <= numdiscs; i++) 
    {
      var Xdisc = "p1disc" + i;
      var Ydisc = "p2disc" + i;
      document.getElementById(Xdisc).setAttribute("class", "disc1remain");
      document.getElementById(Xdisc).style.backgroundColor = p1disccolor;
      document.getElementById(Ydisc).setAttribute("class", "disc2remain");
      document.getElementById(Ydisc).style.backgroundColor = p2disccolor;
    }
  }
  //remove discs as shot
  if (x == 1) {
    var Xdisc = "p1disc" + player1DisksShot;
    document.getElementById(Xdisc).setAttribute("class", "disc1shot")
    document.getElementById(Xdisc).style.backgroundColor = "transparent";}
  if (x == 2) {
    var Xdisc = "p2disc" + player2DisksShot;
    document.getElementById(Xdisc).setAttribute("class", "disc2shot")
    document.getElementById(Xdisc).style.backgroundColor = "transparent";}
}

function showDisc(playerNumber, shotNumber)
{
  var elementName = "p" + playerNumber + "disc" + shotNumber;
  if (playerNumber == 1)
  {
      document.getElementById(elementName).setAttribute("class", "disc1remain");
      document.getElementById(elementName).style.backgroundColor = p1disccolor;
  }
  else
  {
      document.getElementById(elementName).setAttribute("class", "disc2remain");
      document.getElementById(elementName).style.backgroundColor = p2disccolor;
  }
}

//variables for disc colour
var p1disccolor = "red";
var p2disccolor = "black";

//asks for user prompt and inputs as the disc colour
function disccolor() {
  p1disccolor = prompt("Enter player/team #1 disc color. Tested colours include: black, red, blue, purple, green, grey, orange, hotpink, goldenrod (natural)", "red");
  p2disccolor = prompt("Enter player/team #2 disc color. Tested colours include: black, red, blue, purple, green, grey, orange, hotpink, goldenrod (natural)", "black");
  discupdate(0);
}

var p1fontsize = 50;
var p2fontsize = 50;
var r1fontsize = 50;
var r4fontsize = 50;

function fontsize() {
  p1fontsize = prompt("P1 font size (singles=50, doubles=36)", "50");
  document.getElementById("player1").style.fontSize = p1fontsize+"px"
  p2fontsize = prompt("P2 font size (singles=50, doubles=36)", "50");
  document.getElementById("player2").style.fontSize = p2fontsize+"px"
  r1fontsize = prompt("row 1 font size ", "30");
  document.getElementById("row1").style.fontSize = r1fontsize+"px"
  r4fontsize = prompt("row 4 font size ", "40");
  document.getElementById("row4").style.fontSize = r4fontsize+"px"
}

//changes the centring the tournament name in the scoreboard table
function changecolspan() {
  var k = document.getElementById("eventID").colSpan;
  if (k == 4) {
    document.getElementById("eventID").colSpan = 5;
  } else {
    document.getElementById("eventID").colSpan = 4;
  }
}


// These adjust the widths of the table columns that hold the disk images.  For singles,
// the columns are wide enough to show eight disks.  For doubles, they are only wide 
// enough for six, sp twelve disks are shown in two rows.
function setSinglesAlignment()
{
  document.getElementById("col1").style.width = "294px";
  document.getElementById("col2").style.width = "195px";
}

function setDoublesAlignment()
{
    document.getElementById("col1").style.width = "344px";
    document.getElementById("col2").style.width = "145px";
}

function showPlayers(players_per_side)
{
    if (players_per_side == 1)
    {
        document.getElementById("player1").classList.remove("hidden");
        document.getElementById("player2").classList.remove("hidden");
        document.getElementById("team1").classList.add("hidden");
        document.getElementById("team2").classList.add("hidden");
    }
    else
    {
        document.getElementById("player1").classList.add("hidden");
        document.getElementById("player2").classList.add("hidden");
        document.getElementById("team1").classList.remove("hidden");
        document.getElementById("team2").classList.remove("hidden");
    }
}
