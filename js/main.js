//定義
const fileInput = document.querySelector("#imageFileInput");
var canvas = new fabric.Canvas('canvas');
const canvasCtx = canvas.getContext("2d");
const brightnessInput = document.querySelector("#brightness");
const saturationInput = document.querySelector("#saturation");
const blurInput = document.querySelector("#blur");
const inversionInput = document.querySelector("#inversion");

//画像処理のための設定を格納するための空のオブジェクト
const settings = {};
let image = null;

// 画像処理の設定をリセットするための関数
function resetSettings() {
  // 各設定項目にデフォルトの値を設定
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";

  // 対応する入力要素にもデフォルトの値を設定
  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
}

function updateSetting(key, value) {
  if (!image) return; //画像がない場合リターン

  settings[key] = value;
  canvasCtx.filter = generateFilter();
}

function generateFilter() {
  const { brightness, saturation, blur, inversion } = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage() {
  canvas.width = image.width;
  canvas.height = image.height;

  canvasCtx.filter = generateFilter();
  canvasCtx.drawImage(image, 0, 0);
}

//ユーザーがスライダーで変更を行った場合の処理
brightnessInput.addEventListener("change", () =>
  updateSetting("brightness", brightnessInput.value)  //明るさの変更
);
saturationInput.addEventListener("change", () =>
  updateSetting("saturation", saturationInput.value)  //彩度
);
blurInput.addEventListener("change", () =>  //ぼかし
  updateSetting("blur", blurInput.value)
);
inversionInput.addEventListener("change", () =>
  updateSetting("inversion", inversionInput.value)  //反転
);

//画像ファイルの取得
fileInput.addEventListener("change", () => {
  image = new Image();

  image.addEventListener("load", () => {
    resetSettings();
    renderImage();
  });

  image.src = URL.createObjectURL(fileInput.files[0]);
});

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
