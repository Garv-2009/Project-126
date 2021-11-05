song1 = "";
song2 = "";
leftwristX="";
leftwristY="";
rightwristX="";
rightwristY="";
leftwristScore=0;
rightwristScore=0;
song1_status = "";
song2_status = "";


function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas= createCanvas(600,600);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',getPoses);
}
function modelloaded(){
    console.log("model")
}
function getPoses(results){
    if(results.length > 0){
        console.log(results);
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;

        console.log("lwx"+leftwristX+"lwy"+leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;

        console.log("rwx"+rightwristX+"rwy"+rightwristY);
        rightwristScore=results[0].pose.keypoints[10].score;
        leftwristScore=results[0].pose.keypoints[9].score;

        console.log(rightwristScore);
        console.log(leftwristScore);
        
    }
}
function draw(){
    image(video,0,0,600,600);
    fill("red");
    stroke("blue");

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
 
    if(leftwristScore > 0.2){
        circle(leftwristX,leftwristY,20);
        song1.stop();
        if(song2_status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Song 1 is Playing";

        }

        }
        if(rightwristScore > 0.2){
            circle(rightwristX,rightwristY,20);
            song2.stop();
            if(song1_status == false){
                song2.play();
                document.getElementById("song").innerHTML = "Song 2 is Playing";
    
            }
    
            }
        
    }


