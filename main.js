objects=[];
status="";
function preload(){}
function setup(){
    canvas= createCanvas(400,375);
    canvas.position(485,275);
    video= createCapture(VIDEO);
    video.hide();
}
function start(){
    objectDetector= ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status_detection").innerHTML= "Status: Detecting Objects";
    find_object=document.getElementById("object_input").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
}
function gotResult(error,results){
    if(error){
        console.error();
    }
    else{
        console.log(results);
        objects=results
    }
}
function draw(){
    image(video,0,0,400,375);

    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status_detection").innerHTML="Objects Detected";

            fill("#73716c");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#73716c");
            rect(objects[i].x, objects[i].y ,objects[i].width ,objects[i].height);

            if(objects[i].label==find_object){
                video.stop();
                objectDetector.detect(video,gotResult);
                document.getElementById("object_found").innerHTML= find_object + " found";
                var synth= window.speechSynthesis;
                speak_data= find_object + " found";
                var utterthis= new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterthis);
            }
            else{
                document.getElementById("object_found").innerHTML= find_object + " not found";
            }
        }
    }
}