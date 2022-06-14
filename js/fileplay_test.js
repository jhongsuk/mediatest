//let mediaFilePath = "http://mspartserver.synology.me/test-streams/genericav/";
let mediaFilePath = "C:/TestMedia/";

const input = document.querySelector('input');
const preview = document.querySelector('.file_list');

input.addEventListener('change', showTextFile);

function showTestFile() {
  const selectedFiles = input.files;
  const list = document.createElement('ul');
  preview.appendChild(list);

  for(const file of selectedFiles) {
    const listItem = document.createElement('li');
    const summary = document.createElement('div');
  }
}

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

function disableAudio(target) {
  let vid = document.getElementById(target);
  let msg = {};
  msg.command = "SetSink";
  msg.parameter = {};
  msg.parameter.audioSink = {};
  vid.send(JSON.stringify(msg));
}

function enableAudio(target) {
  let vid = document.getElementById(target);
  let msg = {};
  msg.command = "SetSink";
  msg.parameter = {};
  msg.parameter.audioSink = {};
  msg.parameter.audioSink.type = "main_sound";
  vid.send(JSON.stringify(msg));
}

function muteOn() {
  disableAudio("myVideo");
}

function muteOff() {
  enableAudio("myVideo");
}

function setSource(target, options) {
  let source = document.getElementById('playersource');
  source.setAttribute("src", target);
  source.setAttribute('type', 'video/mp4;mediaOption=' + escape(JSON.stringify(options)));
}

function playDefaultVideo() {
  let options = makeOption();
  let vid = document.getElementById("myVideo");
  setSource(`${mediaFilePath}Big_Buck_Bunny.mp4`, options);
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

