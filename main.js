//https://teachablemachine.withgoogle.com/models/jgNNHI2tM/
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
   Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='capture_image'src='"+data_uri+"'>";

   });
}
console.log("The ml5 version used:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/jgNNHI2tM/model.json",model_loaded);
function model_loaded(){
    console.log("model_loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data="The prediction is "+prediction;
    var utterthis=new SpeechSynthesisUtterance(speak_data );
    synth.speak(utterthis);
}
function predict_emotion(){
    img=document.getElementById("capture_image");
    classifier.classify(img,got_result);
}
function got_result(error,success){
if(error){
    console.error(error);
}
else{
    console.log(success);
    document.getElementById("result_emotion_name").innerHTML=success[0].label;
    
    prediction=success[0].label;
  
    speak();
if(success[0].label=="Highfive"){
    document.getElementById("update_emoji").innerHTML="&#9995;";
}
if(success[0].label=="Peace"){
    document.getElementById("update_emoji").innerHTML="&#9996;";
}
if(success[0].label=="Headsdown"){
    document.getElementById("update_emoji").innerHTML="&#128071;";
}
}
}