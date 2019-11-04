// JAY HAN PROJECT 4  A/V INSTRUMENT //

// VARIABLES //
let mousePress = false; // Mouse press check
let sine; // sine wave (changes)
let otamatoneFill = 255; //(otamatone color)
let tone = 'triangle'; // type of wave
let mouth = 793; // Y value of the mouth

// MUSIC NOTE VARIABLES //
let musicNote;
let noteLoc;
let noteAmount=0;
let noteArray = [];
let noteOption = true;
let noteHover = false;

// MARKER VARIABLES //
let markerImg;
let markerAmount = 0;
let markerOption = false;
let markerHover = false;
let markerArray = [];

// PRELOAD IMAGES //
function preload(){
	musicNote = loadImage('images/musicnote.png'); // loads the music note image
	markerImg = loadImage('images/marker.png'); // loads the marker image
}

// SETUP //
function setup() {
	createCanvas(1000, 900);
	background(0,100,200);
}

// DRAW FUNCTION //
function draw() {
	rectMode(CENTER);
	background(0,100,otamatoneFill);
	
	drawLines(); // draws the lines
	drawOtamatone(); // draws the otamatone itself
	noteButton(); // displays the note button
	markerButton(); // displays the marker button
	optionCheck(); // checks which options are selected and indicates it
	
	if(mouseX < 835 && mouseX > 800){ // if the mouse is within range of the otamatone
		if(mouseY < 700 && mouseY > 100){
			otamatoneSound(); // the otamatone will make a noise
			
	}}
	
	if(noteOption == true){ // if the note option is selected
		drawNotes(noteLoc); // draw the notes corresponding to the mouse
	}
	drawMarkers(); //draws the markers whereever the person clicks
	
	fill(255,0,0); 
	text('^^^ markers ^^^', 880, 700); // shows where you can put markers
}

// DRAW LINES FUNCTION //
function drawLines(){ // draws the evenly distributed lines 
	for(let i = 2; i < 7; i++){
	line(0,i*100,1000,i*100);
	}
}

// OPTION CHECK FUNCTION //
function optionCheck(){
	if(markerOption == true){ // checks if the marker option is on
		fill(0,255,0);
		ellipse(300,750, 50,50);
	}
	if(noteOption == true){ // checks if the note option is on
		fill(0,255,0);
		ellipse(150,750, 50,50);
	}
}

// NOTE BUTTON FUNCTION //
function noteButton(){
	if(mouseX < 200 && mouseX > 100){ // if the mouse is within range of the button (note)
		if(mouseY < 800 && mouseY > 700){
			fill(0,255,0); // makes the button green when hovering
			noteHover = true; // set the hover to true
		}
		else{
			fill(255); // makes the button white
			noteHover = false; // set the hover to false
		}
	}
	else{
		noteHover = false; // set the hover to false
		fill(255); // makes the button white
	}
	rect(150,750, 100,100); // draws the button
	image(musicNote, 100, 700, 100,100); // the image icon on the button
	/*fill(0);
	ellipse(150,750,60,60);*/ // in case images dont work
}

// MARKER BUTTON FUNCTION //
function markerButton(){
	if(mouseX < 350 && mouseX > 250){ // if the mouse is within range of the button (marker)
		if(mouseY < 800 && mouseY > 700){
			fill(0,255,0); // makes the button green when hovering
			markerHover = true; // set the hover to true
		}
		else{
			fill(255); // makes the button white
			markerHover = false; // set the hover to false
		}
	}
	else{
		markerHover = false; // set the hover to false
		fill(255); // makes the button white
	}
	rect(300,750, 100,100); // draws the button
	image(markerImg, 250, 700, 100,100); // the image icon the marker button
	/*fill(255,0,0);
	rect(300,750,70,40);*/ // in case images dont work
}

// DRAW OTAMATONE FUNCTION //
function drawOtamatone(){
	fill(otamatoneFill); // fills the body
	rect(820,420,50,650); // draws the body of the otamatone
	
	fill(150); // fills the metal part
	rect(820, 400, 25, 600); // draws the metal part of the otamatone
	
	fill(otamatoneFill); // fills the head
	arc(760, 790, 200,200,PI,0); // draws the top part of the head 
	
	fill(abs(otamatoneFill-255)); //fills the eyes
	ellipse(720, 750, 20,20); // draws the left eye
	ellipse(780, 750, 20,20); // draws the right eye
	mouthAction(); // mouth movement function is called
}

// OTAMATONE SOUND FUNCTION //
function otamatoneSound(){ // when clicking on the metal part, the otamatone will play
	sine = new p5.Oscillator(1000-mouseY,tone); // new oscillator
		if (mousePress == true){ // if the mouse is pressed
			sine.start(); 
			sine.amp(0,0.5); // start the sine,triangle or square wave
			sine.stop(1); // stops after 1 second
			mouth = 830; // sets the mouth Y value
			noteLoc = mouseY; // sets the note location Y
		}
		else if (mousePress == false){ // if the mouse is not pressed
			sine.disconnect(); // disconnect the oscillator
			mouth = 793; // sets mouth back to normal
		}
}

// DRAW NOTES FUNCTION //
function drawNotes(){ // draws the notes
	if(mousePress == true){ // if the mouse is pressed
			if(mouseX < 835 && mouseX > 800){ // if the mouse is within this range
		if(mouseY < 700 && mouseY > 100){
 		note = new Note(noteLoc); // make a new note according to the noteLoc set
		noteAmount +=1; // add 1 to the total note count
		noteArray.push(note); // push onto array
		}}
	}
	for(let i = 0; i < noteAmount; i++){
		noteArray[i].display(); // display the notes in array
	}
}

// DRAW MARKERS FUNCTION //
function drawMarkers(){ // draws the markers
	if(markerOption == true){ // if the marker option is selected
		if(mouseX > 840 && mousePress == true){ // if mouse is in range 
		 marker = new Marker(mouseX,mouseY); // create a new marker
		markerAmount +=1; // add 1 to the total marker count
			markerArray.push(marker); // push onto marker array
		}
	}
	for(let i = 0; i < markerAmount; i++){ 
			markerArray[i].display(); // display the markers in array
	}
}

// MOUTH ACTION FUNCTION //
function mouthAction(){ // moves the mouth when sound comes out of it
	fill(otamatoneFill);
	arc(760, mouth, 200,200,0,PI); // draws the bottom part of the mouth
}

function mousePressed(){ // When the mouse is clicked
	mousePress = true; // set the mouse press to true
	if(noteHover == true){ // if the mouse is hovering over the note button
		if(noteOption == false){ // if the option is off
			noteOption = true; // turn it on
		}
		else{
			noteOption = false; // turn it off if it is on
		}
	}
	
	if(markerHover == true){ // the mouse is hovering over the marker button
		if(markerOption == false){ // if the option is off
			markerOption = true; // turn it on
		}
		else{
			markerOption = false; // turn it off if it is on
		}
	}
}

function mouseReleased(){ // if the mouse is released
	mousePress = false; // set the mouse press variable to false
}

function keyPressed(){ // if these keys are pressed
	if(key == '1'){ // 1 will change color and set it to square wave
		otamatoneFill = 0;
		tone = 'square';
	}
	else if (key == '2'){ // 2 will change color and set it to triangle wave
		otamatoneFill = 255;
		tone = 'triangle';
	}
	else if (key == '3'){ // 3 will change color and set it to sine wave
		otamatoneFill = 105;
		tone = 'sine';
	}
	
	if(key == 'c'){ // if c is pressed
		markerArray = [];
		notesArray = [];
		markerAmount = 0; // everything from notes and marker array will be cleared
		notesAmount = 0;
	}
}

// CLASSES //

// NOTE CLASS //
class Note{
constructor(location){ // constructors takes in location of mouseY
	this.x = 800;
	this.location = location;
}
	display(){
		fill(0);
		ellipse(this.x,this.location,20,20);
		this.x -= 5; // moves to the left
	}
}

// MARKER CLASS //
class Marker{
constructor(location_x,location_y){ // constructor takes in location x and y of the mouse
	this.x = location_x;
	this.y = location_y;
}
	display(){
		fill(255,0,0);
		triangle(this.x,this.y, this.x+10, this.y+10, this.x+10, this.y-10); // display a triangle at that spot
	}
	
}
