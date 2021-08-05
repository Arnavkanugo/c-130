song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftWrist=0;
scorerightWrist=0;
function preload(){
 
    song=loadSound("videoplayback (1).mp4");
}
function setup (){
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotposes);
}


function Play(){
song.play();
song.setVolume(1);
song.rate(1);

}
function Stop(){
song.stop();
}
function modelLoaded(){
    console.log("poseNet loaded");
}
function gotposes(results)
{
    if(results.length>0){
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist= "+scoreleftWrist);
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("scorerightWrist= "+scorerightWrist);
leftwristx=results[0].pose.leftWrist.x;
leftwristy=results[0].pose.leftWrist.y;
console.log("leftwristx= "+leftwristx);
console.log("leftwristy= "+leftwristy);
rightwristx=results[0].pose.rightWrist.x;
rightwristy=results[0].pose.rightWrist.y;
console.log("rightwristx= "+rightwristx);
console.log("rightwristy= "+rightwristy);
  }

}
function draw (){
    image(video,0,0,600,500);
    fill("#56BFE8");
    stroke("#56BFE8");
    if(scorerightWrist>0.2)
    {
    circle(rightWristx,rightWristy,20);
    if(rightWristy>0 && rightWristy<=100)
    {
        document.getElementById("speed").innerHTML="Speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristy>100 && rightWristy<=200)
    {
        document.getElementById("speed").innerHTML="Speed=1x";
        song.rate(1);
    }
    else if(rightWristy>200 && rightWristy<=300)
{
    document.getElementById("speed").innerHTML="Speed=1.5x";
        song.rate(1.5);
}
else if(rightWristy>300 && rightWristy<=400)
{
    document.getElementById("speed").innerHTML="Speed=2x";
        song.rate(2);
}
else if(rightWristy>400 && rightWristy<=500)
{
    document.getElementById("speed").innerHTML="Speed=2.5x";
        song.rate(2.5);
}
    }









    if(scoreleftWrist>0.2) {
     circle(leftwristx,leftwristy);
    InNumberleftWristy=Number(leftWristy);
    remove_decimals=floor(InNumberleftWristy);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
    }
}

