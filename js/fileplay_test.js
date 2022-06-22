//let mediaFilePath = "http://mspartserver.synology.me/test-streams/genericav/";
let mediaFilePath = "/home/hong/testmedia/";
//let mediaFilePath = "C:/TestMedia/";

let data = [
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
                
              


document.getElementById("filepicker").addEventListener("change", function(event) {
  let files = event.target.files;
  let result = '';

  for (let i=0; i<files.length; i++) {
    result += files[i].webkitRelativePath;
    result += '\n';
  };
  document.getElementById('outputDiv').textContent = result;
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

function setSource(target, options) {
  let source = document.getElementById('playersource');
  source.setAttribute("src", target);
  source.setAttribute('type', 'video/mp4;mediaOption=' + escape(JSON.stringify(options)));
}

function playDefaultVideo() {
  let options = makeOption();
  let vid = document.getElementById("myVideo");
  setSource(`${mediaFilePath}${data[0].name}`, options);
  vid.load();
  vid.play();
  vid.onended = function() {
    vid.currentTime = 0;
    vid.play();
  }
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
  let vid = document.getElementById("myVideo");
  let options = makeOption();
  var videoSource = new Array();
/*
  let url = 'https://raw.githubusercontent.com/jhongsuk/mediatest/main/testmediafile.xml'

  fetch(url)
  .then(response=>response.text())
  .then(data=>{
    let parse = new DOMParser();
    let xmlDoc = parse.parseFromString(data,'text/xml');
    document.getElementById('outputDiv').textContent = data;
    videoSource = buildPlayList(xmlDoc);
    startPlayback(videoSource);
  });
*/
  
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

