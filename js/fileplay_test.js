//let mediaFilePath = "http://mspartserver.synology.me/test-streams/genericav/";
let mediaFilePath = "/home/hong/testmedia/";
//let mediaFilePath = "C:/TestMedia/";

let jsondata = [];

let data1 = [
  {
    "id": 1, 
    "container":["mp4","mpeg4"], 
    "video":["avc","avc1","h264"], 
    "audio":["aac"], 
    "resolution":["1920x800"], 
    "framerate": 25, 
    "duration": 129, 
    "subtitle":[""], 
    "name": "Girls_Day_Dont_forget_me_mv_1080p.mp4", 
    "others":["socts","ccc","salmon","sanity","irc", "tvplat-144892"]
  },
  { 
    "id": 2, 
    "container":["mp4","mpeg4"], 
    "video":["avc","avc1","h264"], 
    "audio":["aac"], 
    "resolution":["1920x800"], 
    "framerate": 25, 
    "duration": 129, 
    "subtitle":[""], 
    "name": "2D_APINK_NoNoNo.ts", 
    "others":["socts","ccc","salmon","sanity","irc", "tvplat-144892"]
  }, 
  { 
    "id": 3, 
    "container":["mp4","mpeg4"], 
    "video":["avc","avc1","h264"], 
    "audio":["aac"], 
    "resolution":["1920x800"], 
    "framerate": 25, 
    "duration": 129, 
    "subtitle":[""], 
    "name": "Big_Buck_Bunny_UHD.mp4", 
    "others":["socts","ccc","salmon","sanity","irc", "tvplat-144892"]
  }
];
                
let data2 = [
  {
    "id": 1, 
    "container":["mp4","mpeg4"], 
    "video":["avc","avc1","h264"], 
    "audio":["aac"], 
    "resolution":["1920x800"], 
    "framerate": 25, 
    "duration": 129, 
    "subtitle":[""], 
    "name": "Dubai_UAE.mp4", 
    "others":["socts","ccc","salmon","sanity","irc", "tvplat-144892"]
  },
  { 
    "id": 2, 
    "container":["mp4","mpeg4"], 
    "video":["avc","avc1","h264"], 
    "audio":["aac"], 
    "resolution":["1920x800"], 
    "framerate": 25, 
    "duration": 129, 
    "subtitle":[""], 
    "name": "Hong_Kong.mp4", 
    "others":["socts","ccc","salmon","sanity","irc", "tvplat-144892"]
  }, 
  { 
    "id": 3, 
    "container":["mp4","mpeg4"], 
    "video":["avc","avc1","h264"], 
    "audio":["aac"], 
    "resolution":["1920x800"], 
    "framerate": 25, 
    "duration": 129, 
    "subtitle":[""], 
    "name": "New_York_City.mp4", 
    "others":["socts","ccc","salmon","sanity","irc", "tvplat-144892"]
  },
  { 
    "id": 4, 
    "container":["mp4","mpeg4"], 
    "video":["avc","avc1","h264"], 
    "audio":["aac"], 
    "resolution":["1920x800"], 
    "framerate": 25, 
    "duration": 129, 
    "subtitle":[""], 
    "name": "Travel_Seoul.mp4", 
    "others":["socts","ccc","salmon","sanity","irc", "tvplat-144892"]
  }
];              

let videoSource = new Array();
let i = 0;
videoSource = data1;
const videoCount = videoSource.length;
const vid = document.getElementById("myVideo");
document.getElementById('myVideo').addEventListener('ended', myHandler, false);


function updatelist(id, fileName) {
  var aJson = new Object();
  aJson.id = id;
  aJson.name = fileName;
  
  return JSON.stringify(aJson)
}

document.getElementById("filepicker").addEventListener("change", function(event) {
  let files = event.target.files;
  let result = '';
  let listinfo = '';

  for (let i=0; i<files.length; i++) {
    listinfo += updatelist(i, files[i].name);
    result += files[i].name;
    result += '\n';
  };
  jsondata = JSON.stringify(listinfo);
  document.getElementById('outputDiv').textContent = result;
  console.log(jsondata);
}, false);

function makeOption() {
  let options = {};
  options.htmlMediaOption = {};
  options.htmlMediaOption.useUMSMediaInfo = true;
  options.htmlMediaOption.useMediaPlayerManager = false;
  options.option = {};
  options.option.useSoftwareAudioDecoder = true;
  options.option.avSink = {};
  options.option.avSink.videoSink = {};
  options.option.avSink.audioSink = {};
  options.option.avSink.videoSink.type = "graphic";
  return options;
}

function videoPlay(videoNum) {
  console.log(`${mediaFilePath}${videoSource[videoNum].name}`);
  vid.setAttribute("src", `${mediaFilePath}${videoSource[videoNum].name}`);
  vid.autoplay = false;
  vid.load();
}

function myHandler() {
  console.log("myHandler(i):"+ i );
  i++;
  if (i == videoCount) {
      i = 0;
      videoPlay(i);
  } else {
      videoPlay(i);
  }
}

function ensureVideoPlays() {

  if(!vid) return;
  
  const promise = vid.play();
  if(promise !== undefined){
      promise.then(() => {
          console.log("promise then" + promise);
          // Autoplay started
      }).catch(error => {
          console.log("promise catch" + promise);
          // Autoplay was prevented.
          vid.muted = true;
          vid.play();
      });
  }
}


function playDefaultVideo() {

  videoPlay(0); // load the first video
  ensureVideoPlays(); // play the video automatically

}

function getCheckboxValue() {
  const query = 'input[name="scenario"]:checked';
  const selectedEls = document.querySelectorAll(query);

  let result = '';
  selectedEls.forEach((el) => {
    result += el.value + ' ';
  });

  document.getElementById('outputDiv').textContent = result;
}

function runTestScenario() {
  let options = makeOption();
  
  console.log(data[0].id);
  console.log(data[0].name);
  console.log(data[0].video);
  console.log(data[1].id);
  console.log(data[1].name);
  console.log(data[1].video);
  console.log(data[2].id);
  console.log(data[2].name);
  console.log(data[2].video);
  

  var mydata = JSON.parse(contents);
  console.log(mydata[0].name);
  console.log(mydata[0].video);
  console.log(mydata[1].name);
  console.log(mydata[1].video);
  console.log(mydata[2].name);
  console.log(mydata[2].video);

}

function buildPlayList(xmlDoc) {
  var videoSource = new Array();
  let testgroup1 = xmlDoc.getElementsByTagName('testgroup1');
  let playlist = xmlDoc.getElementsByTagName('name');

  for(var i=0; i<playlist.length; i++){
    videoSource[i] = playlist[i].firstChild.nodeValue;
  }
  return videoSource;
}

function startPlayback(videoSource) {
  let vid = document.getElementById("myVideo");
  let options = makeOption();
  var videoCount = videoSource.length;
  var i = 0;

  setSource(mediaFilePath + videoSource[0], options);
  vid.load();
  vid.play();
  vid.onended = function(){
    i++;
    if(i==videoCount){
      i = 0;
      setSource(mediaFilePath + videoSource[i], options);
      vid.load();
      vid.play();
    }
    else{
      setSource(mediaFilePath + videoSource[i], options);
      vid.load();
      vid.play();
    }
  }
}

function stopRunningTest() {
  //TBD
  let vid = document.getElementById("myVideo");
  let options = makeOption();
  vid.unload();
}

function keypress() {
  let keycode = event.keyCode;
  if (keycode == 48) { //number 0
    location.href='media_test.html';
  } else if (keycode == 49) { //number 1
    playDefaultVideo();
  } else if (keycode == 50) { //number 2
    runTestScenario();
  }
}

