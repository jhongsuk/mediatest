

let videoSource = new Array();
videoSource[0] = '/home/hong/testmedia/Girls_Day_Dont_forget_me_mv_1080p.mp4';
videoSource[1] = '/home/hong/testmedia/Big_Buck_Bunny_UHD.mp4';
let i = 0; // global
const videoCount = videoSource.length;
const element = document.getElementById("videoPlayer");
 
function videoPlay(videoNum) {
    console.log(videoSource[videoNum]);
    element.setAttribute("src", videoSource[videoNum]);
//    element.autoplay = true;
    element.load();
}
document.getElementById('videoPlayer').addEventListener('ended', myHandler, false);
 
videoPlay(0); // load the first video
ensureVideoPlays(); // play the video automatically
 
function myHandler() {
    console.log("videoCount:" + videoCount)
    console.log("i:" + i);
    i++;
    if (i == videoCount) {
//        i = 0;
        videoPlay(i);
    } else {
        videoPlay(i);
    }
}
 
function ensureVideoPlays() {
    const video = document.getElementById('videoPlayer');
 
    if(!video) return;
    
    const promise = video.play();
    if(promise !== undefined){
        promise.then(() => {
            console.log("promise then" + promise);
            // Autoplay started
        }).catch(error => {
            console.log("promise error" + promise);
            // Autoplay was prevented.
            video.muted = true;
            video.play();
        });
    }
}