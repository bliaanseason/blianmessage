let stage, w, h;

// INIT (AMAN UNTUK HP)
window.addEventListener("load", init);

function init() {
    const canvas = document.getElementById("demoCanvas");
    stage = new createjs.Stage(canvas);

    // ukuran canvas aman untuk HP
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight || document.documentElement.clientHeight;

    // 💌 TEXT 2 BARIS (STYLE ASLI)
    const text = new createjs.Text(
        "the longer I'm with you\nthe more I love you",
        "bold 24px Arial",
        "rgba(211, 57, 134, 1)"
    );

    text.textAlign = "center";
    text.lineHeight = 28;
    text.x = w / 2;
    text.y = h / 2 - text.getMeasuredLineHeight();
    stage.addChild(text);

    drawHearts();

    // animasi
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", tick);
}

// 💖 SHAPE LOVE (AMAN DI HP)
function createHeart() {
    const heart = new createjs.Shape();
    const g = heart.graphics;

    g.beginFill("#ff4da6");
    g.moveTo(0, 0);
    g.bezierCurveTo(0, -10, -15, -10, -15, 0);
    g.bezierCurveTo(-15, 10, 0, 15, 0, 20);
    g.bezierCurveTo(0, 15, 15, 10, 15, 0);
    g.bezierCurveTo(15, -10, 0, -10, 0, 0);
    g.closePath();

    return heart;
}

// 💫 ANIMASI HEART
function drawHearts() {
    for (let i = 0; i < 40; i++) {
        const heart = createHeart();

        heart.x = Math.random() * w;
        heart.y = Math.random() * h;
        heart.scaleX = heart.scaleY = 0.5 + Math.random();
        heart.alpha = 0.7 + Math.random() * 0.3;

        stage.addChild(heart);

        createjs.Tween.get(heart, { loop: true })
            .to({ y: -50, alpha: 0 }, 3000 + Math.random() * 2000)
            .to({ y: h + 50, alpha: 1 }, 0);
    }
}

// UPDATE
function tick(event) {
    stage.update(event);
}