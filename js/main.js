//定義
const fileInput = document.querySelector("#imageFileInput");
var canvas = new fabric.Canvas('canvas');
const canvasCtx = canvas.getContext("2d");

//画像処理のための設定を格納するための空のオブジェクト
const settings = {};
let image = null;

function updateSetting(key, value) {
  if (!image) return; //画像がない場合リターン

  settings[key] = value;
  canvasCtx.filter = generateFilter();
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

document.getElementById("imageFileInput").onchange = function(e) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var image = new Image();
    image.src = e.target.result;
    image.onload = function() {
      var img = new fabric.Image(image);
      img.set({
        left: 100,
        top: 60
      });
      img.scaleToWidth(200);
      canvas.add(img).setActiveObject(img).renderAll();
    }
  }
  reader.readAsDataURL(e.target.files[0]);
}


resetSettings();
