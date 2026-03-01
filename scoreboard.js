//////////////////////////////////////////////////////////////All time related elements
//Clock variables, all start at 0 by default
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var tenthsLabel = document.getElementById("tenths");
var minutesLabel1 = document.getElementById("minutes1");
var secondsLabel1 = document.getElementById("seconds1");
var tenthsLabel1 = document.getElementById("tenths1");
var minutesLabel2 = document.getElementById("minutes2");
var secondsLabel2 = document.getElementById("seconds2");
var tenthsLabel2 = document.getElementById("tenths2");
var totalSeconds = 0;
var totalSeconds1 = 0;
var totalSeconds2 = 0;
var intervalSeconds = 0;
var prevSeconds = 0;

//Variables for gettime() functionality
var d1 = 0;
var n1 = 0;

//Calls setTime function and then iterates again every 0.1 seconds
function startmatchtime() 
{
	var d = new Date();
	var n = d.getTime()/1000;
	totalSeconds = n - n1
	setTime()
	setTimeout(startmatchtime, 100)
}

//Updates sheet to show current time
function setTime() 
{
	tenthsLabel.innerHTML = parseInt(totalSeconds * 10) % 10;
	secondsLabel.innerHTML = pad(parseInt(totalSeconds % 60));
	minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) 
{
	var valString = val + "";
	if (valString.length < 2) 
	{
		return "0" + valString;
	} 
	else 
	{
		return valString;
	}
}

///////////////////////////////////////////////////////////All score related elements
  /////////////////////////Javascript needs one key variable to associate with all key variables in html
  /////////Needs to read in key variables from initial call
  /////////Then needs to update for following functions: swaphammer, shotupdate, ptsupdate, gmsupdate
  /////////Then needs to send update to html page: page_update()


//Key variables defaults and corresponding html id
var slidenumber = 1; //slide_number
var curshooter = 1;  //curshooter & curshooter_disp
var player1DisksShot = 0; //player1DisksShot
var player2DisksShot = 0; //player2DisksShot
var player1Twenties = 0; //p1_20s & p1_20s_disp
var player2Twenties = 0; //p2_20s & p2_20s_disp
var player1Points = 0; //p1_pts & p1_pts_disp
var player2Points = 0; //p2_pts & p2_pts_disp
var player1Games = 0; //p1_gms & p1_gms_disp
var player2Games = 0; //p2_gms & p2_gms_disp

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
var Xptstowin = 5; //Xptstowin
var player1 = "P1"; //player1
var player2 = "P2"; //player2
var eventID = "Event ID"; //eventID
var matchDetail = "Tournament stage"; //matchDetail
var p1hamind = "1st Shot"; //p1hammerind
var p2hamind = "Hammer"; //p2hammerind
var Xgmstowin = 0;  //internal

//Setup game info to enter match data like player names, match name, and the criteria to win the match
  //calls resetround() and startmatchtime() - RE-evaluate the use of this
  //adds event listener so that keyboard shortcuts can be used
  //-(Apr 7, 2020) Working decently, stuff to improve like remove redundancies and ensuring all keycodes work


function setup() 
{
	player1 = prompt("Enter player/team name #1", "Player 1");
	player1 = player1.toUpperCase();
	player2 = prompt("Enter player/team name #2", "Player 2");
	player2 = player2.toUpperCase();
	eventID = prompt("Enter Event ID", eventID);
	eventID = eventID.toUpperCase();
	matchDetail = prompt("Enter match detail to show at top of scoreboard, ie Semifinal - First to 11", matchDetail);
	bestofXgames = prompt("Match is best of X Games (ex. If in Tavistock, X=3 as the match is a best of 3 games. Whereas a race to 11 points is best of 1 game)",
							bestofXgames);	
	Xgmstowin = Math.ceil(bestofXgames/2)
	Xptstowin = prompt("Each game requires X points to win (ex. If in Tavistock, X=5, whereas a race to 9 points has X=9)", Xptstowin);
	numdiscs = parseInt(prompt("Each round consists of X discs each. (max 13 for disc visuals)", numdiscs));

	//initial time variables
	d1 = new Date();
	n1 = d1.getTime()/1000;

	page_update(0);
	discupdate(0);
	startmatchtime();
	// swaphammer(); //Calling so that Next Shot dialog populates
	p2hamind = "Hammer"
	p1hamind = "1st Shot"
	curshooter = 1
	document.getElementById("curshooter_disp").innerHTML = document.getElementById("player1").innerHTML

	document.body.addEventListener("keydown", function(e) 
	{
		var keyCode1 = e.keyCode;
		if (keyCode1 == 49) {shotupdate(1);}
		if (keyCode1 == 50) {shotupdate(2);}
		if (keyCode1 == 57) {shotupdate(9);}
		if (keyCode1 == 52) {ptsupdate(4);}
		if (keyCode1 == 53) {ptsupdate(5);}
		if (keyCode1 == 54) {ptsupdate(6);}
		if (keyCode1 == 48) {swaphammer();}
		if (keyCode1 == 84) {shotattempt(1);}
		if (keyCode1 == 68) {shotattempt(2);}
		if (keyCode1 == 65) {shotattempt(3);}
		if (keyCode1 == 72) {shotattempt(4);}
		if (keyCode1 == 82) {shotattempt(5);}
		if (keyCode1 == 70) {shotattempt(6);}
		if (keyCode1 == 80) {shotattempt(7);}
		if (keyCode1 == 85) {shotattempt(8);}
		if (keyCode1 == 67) {shotgrade(0);}
		if (keyCode1 == 86) {shotgrade(1);}
		if (keyCode1 == 66) {shotgrade(2);}
		if (keyCode1 == 78) {shotgrade(3);}
		if (keyCode1 == 77) {shotgrade(4);}

	})

}

function resetMatch()
{
	slidenumber = 1; //slide_number
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
    document.getElementById("slide_number").innerHTML = slidenumber;
    document.getElementById("curshooter").innerHTML = curshooter;
    document.getElementById("p1_gms_disp").innerHTML = player1Games;
    document.getElementById("p2_gms_disp").innerHTML = player2Games;
    document.getElementById("player1DisksShot").innerHTML = player1DisksShot ; 
    document.getElementById("player2DisksShot").innerHTML = player2DisksShot;
}

//updates html for latest javascript values
  //x is used as indicator for type of update so not all elements are called on to update if unnecessary
  //working as intended (Apr 7, 2020)
function page_update(x) {
  if (x==0){ //setup call
    document.getElementById("player1").innerHTML = player1
    document.getElementById("player2").innerHTML = player2
    document.getElementById("eventID").innerHTML = eventID
    document.getElementById("matchDetail").innerHTML = matchDetail
    document.getElementById("bestofXgames").innerHTML = "Best of " + bestofXgames + " Games"
    document.getElementById("Xptstowin").innerHTML = "(First to " + Xptstowin + " Points)" }

  if (x==1){ //swaphammer call
    document.getElementById("curshooter").innerHTML = curshooter
    document.getElementById("p2hammerind").innerHTML = p2hamind
    document.getElementById("p1hammerind").innerHTML = p1hamind}

  if (x==2){ //shot update call
    document.getElementById("timelength").innerHTML = Math.round(intervalSeconds*100)/100 //needs to be set in before shotlog
    shotlog(); //call shotlog function
    document.getElementById("p1_20s").innerHTML = player1Twenties
    document.getElementById("p1_20s_disp").innerHTML = player1Twenties
    document.getElementById("p2_20s").innerHTML = player2Twenties
    document.getElementById("p2_20s_disp").innerHTML = player2Twenties
    document.getElementById("slide_number").innerHTML = slidenumber
    document.getElementById("curshooter").innerHTML = curshooter
    document.getElementById("player1DisksShot").innerHTML = player1DisksShot
    document.getElementById("player2DisksShot").innerHTML = player2DisksShot
    swapShooter();
  }

  if (x==3){ //pts update, shots and 20s should be 0s
    document.getElementById("timelength").innerHTML = Math.round(intervalSeconds*100)/100 //needs to be set in before shotlog
    shotlog();
    document.getElementById("p1_20s").innerHTML = player1Twenties
    document.getElementById("p1_20s_disp").innerHTML = player1Twenties
    document.getElementById("p2_20s").innerHTML = player2Twenties
    document.getElementById("p2_20s_disp").innerHTML = player2Twenties
    document.getElementById("slide_number").innerHTML = slidenumber
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
    document.getElementById("timelength").innerHTML = Math.round(intervalSeconds*100)/100 //needs to be set in before shotlog
    shotlog();
    document.getElementById("slide_number").innerHTML = slidenumber
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


//Updates slide_number, curshooter, p1/p2discshot, p1/p2_20s and calls ptsupdate() in case round is over
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

  intervalSeconds = totalSeconds - prevSeconds //setting interal that will be outputted
  prevSeconds = totalSeconds //bumping up prevSeconds so it can be used in next calc
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

    totalSeconds1 += intervalSeconds
    tenthsLabel1.innerHTML = parseInt(totalSeconds1 * 10) % 10;
    secondsLabel1.innerHTML = pad(parseInt(totalSeconds1 % 60));
    minutesLabel1.innerHTML = pad(parseInt(totalSeconds1 / 60));
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

    totalSeconds2 += intervalSeconds;
    tenthsLabel2.innerHTML = parseInt(totalSeconds2 * 10) % 10;
    secondsLabel2.innerHTML = pad(parseInt(totalSeconds2 % 60));
    minutesLabel2.innerHTML = pad(parseInt(totalSeconds2 / 60));
  }

  updatestats(curshooter); //calls formula only after shot is taken (not calling when points are updated)
  slidenumber += 1;
  page_update(2);

  if ((player1DisksShot >= numdiscs) && (player2DisksShot >= numdiscs)) 
  {
    document.getElementById("curshooter_disp").innerHTML = "Allocate Points"
  }

  // swapShooter(); //curshooter updated after so that shot logged with the correct shooter
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
  // swapShooter();  swapShooter() is called by page_update(2)
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

//track the total of the shot grades
var p1ShotGrades = 0;
var p2ShotGrades = 0;
var p1Open20Attempts = 0;
var p1Open20Makes = 0;
var p1Shots = 0;
var p1Errors = 0;
var p2Open20Attempts = 0;
var p2Open20Makes = 0;
var p2Shots = 0;
var p2Errors = 0;

//updates statistics table, x is the 1 or 2 for the current shooter
function updatestats (x) {
  var grade = document.getElementById("shotgrade").innerHTML;
  var gradenumber = parseInt(grade, 10);
  var attempt = document.getElementById("shotattempt").innerHTML;

  if (attempt == "Open 20") {
    if (x == 1) {p1Open20Attempts += 1;
                if (grade == 4) {p1Open20Makes += 1;}
                document.getElementById("p1Open20Ratio").innerHTML = Math.round(p1Open20Makes/p1Open20Attempts*100);
                document.getElementById("p1Open20Makes").innerHTML = p1Open20Makes;
                document.getElementById("p1Open20Attempts").innerHTML = p1Open20Attempts;}
    if (x == 2) {p2Open20Attempts += 1;
                if (grade == 4) {p2Open20Makes += 1;}
                document.getElementById("p2Open20Ratio").innerHTML = Math.round(p2Open20Makes/p2Open20Attempts*100);
                document.getElementById("p2Open20Makes").innerHTML = p2Open20Makes;
                document.getElementById("p2Open20Attempts").innerHTML = p2Open20Attempts;}
    document.getElementById("totalOpen20Ratio").innerHTML = Math.round((p1Open20Makes+p2Open20Makes)
                                                                       /(p1Open20Attempts+p2Open20Attempts)*100);
  }

  if (grade == 0) {
    if (x == 1) {p1Errors += 1;
                document.getElementById("p1Errors").innerHTML = p1Errors;}
    if (x == 2) {p2Errors += 1;
                document.getElementById("p2Errors").innerHTML = p2Errors;}
    document.getElementById("totalErrors").innerHTML = (p1Errors + p2Errors);
  }

  if (x == 1) {
    p1ShotGrades = p1ShotGrades + gradenumber;
    p1Shots += 1;
    document.getElementById("p1Shots").innerHTML = p1Shots;
    document.getElementById("p1ShootingRatio").innerHTML = Math.round(((p1ShotGrades/p1Shots)/4)*100);
  }
  if (x == 2) {
    p2ShotGrades = p2ShotGrades + gradenumber;
    p2Shots += 1;
    document.getElementById("p2Shots").innerHTML = p2Shots;
    document.getElementById("p2ShootingRatio").innerHTML = Math.round(((p2ShotGrades/p2Shots)/4)*100);
  }

  document.getElementById("totalShootingRatio").innerHTML = Math.round((((p1ShotGrades+p2ShotGrades)
                                                                         /(p1Shots+p2Shots))/4)*100);
}

//when round is done (when both sides shot all discs), reset 20s and discs to 0, prompt for board score to determine points to allocate, update page, call gmsupdate
  // - Working as intended (Apr 7, 2020)
  //x=4, 2pts for p1, x=5, 1 pt each, x=6, 2pts for p2
  //function does nothing if hit accidentally before all shots are taken
function ptsupdate(actionCode) 
{
  if ((player1DisksShot >= numdiscs) && (player2DisksShot >= numdiscs)) 
  { //then the round is over
    intervalSeconds = totalSeconds - prevSeconds; //setting interal that will be outputted
    prevSeconds = totalSeconds; //bumping up prevSeconds so it can be used in next calc

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
    player1Twenties = 0;
    player2Twenties = 0;
    player1DisksShot = 0;
    player2DisksShot = 0;
    discupdate(0);
    slidenumber +=1 //if you put a semicolon here then it doesn't work for some reason
    //curshooter = (curshooter-2)*(-1)+1 //flipping curshooter so that hammer switches in following round
    swaphammer();
    page_update(3)
    gmsupdate();
  }
}

//when game is done, reset points (discs and 20s should already be reset), update page, prompt if match is over
   //- Working as intended (Apr 7, 2020)
function gmsupdate() {
  if (!(player1Points == player2Points) && ((player1Points >= Xptstowin) || (player2Points >= Xptstowin))){
      if (player1Points > player2Points){player1Games += 1}
      if (player2Points > player1Points){player2Games += 1}
    intervalSeconds = totalSeconds - prevSeconds //setting interal that will be outputted
    prevSeconds = totalSeconds //bumping up prevSeconds so it can be used in next calc
    player1Points = 0
    player2Points = 0
    slidenumber += 1
    page_update(4);
  }
  if (player1Games >= Xgmstowin) {//window.alert("Match complete: winner is " + player1); //call shotlog to enter final row with games updated
                          shotlog();}
  if (player2Games >= Xgmstowin) {//window.alert("Match complete: winner is " + player2)
                          shotlog();} //call shotlog to enter final row with games updated
}

//updates shotlog when called
  //think it's done, just need to update shotlog id above to format as desired
function shotlog () {
  var log = document.getElementById("Match Log").innerHTML
            + document.getElementById("shotlog").innerHTML //"<table><tr><td>0</td><td>" + curshooter + "</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr></table>"
  document.getElementById("Match Log").innerHTML = log;
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
      if (i == 1)
      {
        document.getElementById(Xdisc).style.backgroundColor = "green";
      }
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
  document.getElementById("player1").style.color = p1disccolor;
  p2disccolor = prompt("Enter player/team #2 disc color. Tested colours include: black, red, blue, purple, green, grey, orange, hotpink, goldenrod (natural)", "black");
  document.getElementById("player2").style.color = p2disccolor;
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
  //font-size.p1name = p1fontsize+"px"
  //document.getElementById("player1").style.fontSize = p1fontsize+"px";
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

//function puts shot attempt into the shot log row
  //x indicates type of attempt
function shotattempt(x) {
  var k;
  if (x == 1) {k = "Open 20"}
  if (x == 2) {k = "Open Defense"}
  if (x == 3) {k = "Tap"}
  if (x == 4) {k = "Hit and stick"}
  if (x == 5) {k = "Hit and roll"}
  if (x == 6) {k = "Follow through"}
  if (x == 7) {k = "Peel"}
  if (x == 8) {k = "Unknown"}

  document.getElementById("shotattempt").innerHTML = k;
}

//function puts shot grade into the shot log row
  //x indicates the grade
function shotgrade (x) {
  document.getElementById("shotgrade").innerHTML = x;
}


//exports match log table as csv
function exporttable(){
    /* Get the HTML data using Element by Id */
    var table = document.getElementById("Match Log");

    /* Declaring array variable */
    var rows =[];

      //iterate through rows of table
    for(var i=0,row; row = table.rows[i];i++){
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
        column1 = row.cells[0].innerText;
        column2 = row.cells[1].innerText;
        column3 = row.cells[2].innerText;
        column4 = row.cells[3].innerText;
        column5 = row.cells[4].innerText;
        column6 = row.cells[5].innerText;
        column7 = row.cells[6].innerText;
        column8 = row.cells[7].innerText;
        column9 = row.cells[8].innerText;
        column10 = row.cells[9].innerText;
        column11 = row.cells[10].innerText;
        column12 = row.cells[11].innerText;
        column13 = row.cells[12].innerText;

    /* add a new records in the array */
        rows.push(
            [
                column1,
                column2,
                column3,
                column4,
                column5,
                column6,
                column7,
                column8,
                column9,
                column10,
                column11,
                column12,
                column13
            ]
        );

        }
        csvContent = "data:text/csv;charset=utf-8,";
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });

        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "Match_Log.csv");
        document.body.appendChild(link);
        link.click();
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

