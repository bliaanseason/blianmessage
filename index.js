var stage, w, h;
var captureContainers = [];

function init() {
    var canvas = document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);

    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;

    
  var text = new createjs.Text(
    "the longer I'm with you\nthe more I love you",
    "bold 24px Arial",
    "rgba(211, 57, 134, 1)"
);

    text.textAlign = "center";
    text.x = w / 2;
    text.y = h / 2 - text.getMeasuredLineHeight();
    stage.addChild(text);

    for (var i = 0; i < 100; i++) {
        var captureContainer = new createjs.Container();
        captureContainer.cache(0, 0, w, h);
        captureContainers.push(captureContainer);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);

    drawHearts();
}


function createHeart() {
    var heart = new createjs.Shape();
    var g = heart.graphics;

    g.beginFill("#ff66b2"); // pink lebih keliatan
    g.moveTo(0, 0);
    g.bezierCurveTo(0, -10, -15, -10, -15, 0);
    g.bezierCurveTo(-15, 10, 0, 15, 0, 20);
    g.bezierCurveTo(0, 15, 15, 10, 15, 0);
    g.bezierCurveTo(15, -10, 0, -10, 0, 0);
    g.closePath();

    return heart;
}

function drawHearts() {
    for (var i = 0; i < 50; i++) {
        var heart = createHeart();

        heart.x = Math.random() * w;
        heart.y = Math.random() * h;
        heart.scaleX = heart.scaleY = 0.5 + Math.random(); // variasi ukuran
        heart.alpha = 0.7 + Math.random() * 0.3;

        stage.addChild(heart);

        createjs.Tween.get(heart, { loop: true })
            .to({ y: -50, alpha: 0 }, 3000 + Math.random() * 3000)
            .to({ y: h, alpha: 1 }, 0);
    }
}

function tick(event) {
    stage.update(event);
}