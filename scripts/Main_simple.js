var loadingLayer;
var backLayer;
var wallLayer;
var bird, centerlayer;
var bitmap, slingshotJoin;
var imglist = {};
var imgData = new Array(
		{name:"background",path:"./images/bg.png"},
		{name:"bird1",path:"./images/bird1.png"},
		{name:"bird2",path:"./images/bird2.png"},
		{name:"slingshot1",path:"./images/slingshot1.png"},
		{name:"slingshot2",path:"./images/slingshot2.png"},
		{name:"remove",path:"./images/remove.png"},
		{name:"pig01",path:"./images/pig01.png"},
		{name:"pig02",path:"./images/pig02.png"},
		{name:"st01",path:"./images/st01.png"},
		{name:"st02",path:"./images/st02.png"},
		{name:"st11",path:"./images/st11.png"},
		{name:"st12",path:"./images/st12.png"},
		{name:"st21",path:"./images/st21.png"},
		{name:"st22",path:"./images/st22.png"},
		{name:"st31",path:"./images/st31.png"},
		{name:"st32",path:"./images/st32.png"},
		{name:"desk",path:"./images/desk.png"}
		);
var startX, startY;
var numberOfPig = 2,
    numberOfBird = 2;

function main() {
    LGlobal.setDebug(true);
    backLayer = new LSprite();
    addChild(backLayer);

    // 加载中、、、
    loadingLayer = new LoadingSample3();
    backLayer.addChild(loadingLayer);
    LLoadManage.load(
        imgData,
        function (progress) {
            loadingLayer.setProgress(progress);
        },
        function (result) {
            imglist = result;
            backLayer.removeChild(loadingLayer);
            loadingLayer = null;
            gameInit();
        }
    );
}

// 初始化游戏画面
function gameInit(event) {

    // 背景
    LGlobal.box2d = new LBox2d();
    var back = new LSprite();
    // back.alpha = 0.1;
    backLayer.addChild(back);
    bitmap_back = new LBitmap(new LBitmapData(imglist["background"]));
    back.addChild(bitmap_back);
    // back.graphics.drawRect(1,"#ffffff",[0, 0, 1600, 480]);

    // 黑色底
    wallLayer = new LSprite();
    wallLayer.y = 480;
    backLayer.addChild(wallLayer);
    wallLayer.addBodyPolygon(1600, 10, 0);
    backLayer.graphics.drawRect(1, "#ffffff", [0, 475, 1600, 1], true, "#000000");

    // 显示弹弓的一边
    bitmap = new LBitmap(new LBitmapData(imglist["slingshot1"]));
    bitmap.x = 215;
    bitmap.y = 290;
    backLayer.addChild(bitmap);

    // 进击的小鸟
    bird = new LSprite();
    bird.name = "bird01";
    backLayer.addChild(bird);
    bitmap = new LBitmap(new LBitmapData(imglist["bird1"]));
    bird.addChild(bitmap);
    bird.rotate = 0;
    bird.x = 300;
    bird.y = 430;
    bird.yspeed = -5;

    bird2 = new LSprite();
    bird2.name = "bird02";
    backLayer.addChild(bird2);
    bitmap2 = new LBitmap(new LBitmapData(imglist["bird2"]));
    bird2.addChild(bitmap2);
    bird2.rotate = 0;
    bird2.x = 350;
    bird2.y = 430;
    bird2.yspeed = -5;

    // 显示弹弓的另一边
    bitmap = new LBitmap(new LBitmapData(imglist["slingshot2"]));
    bitmap.x = 190;
    bitmap.y = 290;
    backLayer.addChild(bitmap);

    // 显示舞台
    setStage(["desk"], 800, 430, 0, 10, false);
    setStage(["desk"], 970, 430, 0, 10, false);
    setStage(["st11", "st12"], 935, 410, 0, 1, true);
    setStage(["st01", "st02"], 905, 370, 90, 1, true);
    setStage(["st01", "st02"], 965, 370, 90, 1, true);
    setStage(["st11", "st12"], 935, 310, 0, 1, true);
    setStage(["st31", "st32"], 817, 370, 90, 1, true);
    setStage(["st31", "st32"], 970, 370, 90, 1, true);
    setStage(["st31", "st32"], 895, 250, 0, 1, true);
    setStage(["st21", "st22"], 955, 230, 0, 1, true);
    setStage(["st31", "st32"], 858, 150, 90, 1, true);
    setStage(["st31", "st32"], 925, 150, 90, 1, true);
    setStage(["st11", "st12"], 935, 50, 0, 1, true);
    setStage(["st21", "st22"], 950, 30, 90, 1, true);
    setStage(["st21", "st22"], 800, 430, 90, 1, true);
    setStage(["st21", "st22"], 1100, 430, 90, 1, true);

    // 显示猪
    var pig = new Pig();
    pig.x = 950;
    pig.y = 173;
    backLayer.addChild(pig);

    var pig2 = new Pig();
    pig2.x = 830;
    pig2.y = 382;
    backLayer.addChild(pig2);

    // 开始时，舞台向右移动效果
    backLayer.x = LGlobal.width - 1300;
    LGlobal.box2d.synchronous();
    LTweenLite.to(backLayer, 1, {
        x: 0,
        delay: 2,
        onUpdate: function () {
            LGlobal.box2d.synchronous();
        },
        onComplete: function () {
            angryBird(bird);
            // if(angryBird(bird))
            // 	angryBird(bird2);
        },
        ease: Sine.easeIn
    });
    // setInterval("angryBird(bird2)",16000);
    // angryBird(bird2);
}


function angryBird(bird) {
    var currentX = 0;
    var currentY = 0;

    run();

    // 小鸟跳上弹弓的效果
    function run() {
        bird.rotate = 0;
        bird.x = 300;
        bird.y = 430;
        bird.yspeed = -5;
        LTweenLite.to(bird, 1, {
            x: 200,
            yspeed: 5,
            delay: 1,
            rotate: -360,
            onUpdate: function () {
                bird.y += bird.yspeed;
            },
            onComplete: function () {
                start();
            },
            ease: Sine.easeIn
        });
        getPosition();
    }

    function getPosition() {
        currentX = bird.x;
        currentY = bird.y;
    }

    // 小鸟被点中，鼠标按下
    function downStart(event) {
        if (event.offsetX > bird.x && event.offsetX < bird.x + bird.getWidth() &&
            event.offsetY > bird.y && event.offsetY < bird.y + bird.getHeight()) {
            backLayer.removeEventListener(LMouseEvent.MOUSE_DOWN, downStart);
            backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, downMove);
            backLayer.addEventListener(LMouseEvent.MOUSE_UP, downOver);
        }
    }
    // 松开鼠标，让小鸟飞奔
    function downOver(event) {
        backLayer.removeEventListener(LMouseEvent.MOUSE_UP, downOver);
        backLayer.removeEventListener(LMouseEvent.MOUSE_MOVE, downMove);

        var startX2 = bird.x + bird.getWidth() * 0.5;
        var startY2 = bird.y + bird.getHeight() * 0.5;
        var r = Math.sqrt(Math.pow((startX - startX2), 2) + Math.pow((startY - startY2), 2));
        var angle = Math.atan2(startY2 - startY, startX2 - startX);

        bird.addBodyCircle(bird.getWidth() * 0.5, bird.getHeight() * 0.5, bird.getWidth() * 0.5, 1, 5, .4, .3);
        var force = 70;
        var vec = new LGlobal.box2d.b2Vec2(-force * r * Math.cos(angle), -force * r * Math.sin(angle));
        bird.box2dBody.ApplyForce(vec, bird.box2dBody.GetWorldCenter());

        backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
    }
    // 鼠标移动，拉拽小鸟，实现下鼠标移动时候的，让小鸟跟随鼠标
    function downMove(event) {
        var r = Math.sqrt(Math.pow((startX - event.selfX), 2) + Math.pow((startY - event.selfY), 2));
        if (r > 100) r = 100;
        var angle = Math.atan2(event.selfY - startY, event.selfX - startX);
        bird.x = Math.cos(angle) * r + startX - bird.getWidth() * 0.5;
        bird.y = Math.sin(angle) * r + startY - bird.getHeight() * 0.5;
        getPosition();
    }
    // 碰撞函数
    function postSolve(contact, impulse) {
        if (contact.GetFixtureA().GetBody().GetUserData().hit) contact.GetFixtureA().GetBody().GetUserData().hit(impulse.normalImpulses[0]);
        if (contact.GetFixtureB().GetBody().GetUserData().hit) contact.GetFixtureB().GetBody().GetUserData().hit(impulse.normalImpulses[0]);
    }

    // 小鸟已经跳上弹弓，等待你去发射
    function start() {
        //检测碰撞
        LGlobal.box2d.setEvent(LEvent.POST_SOLVE, postSolve);
        bird.x = 200, bird.y = 320;
        backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, downStart);
        // 小鸟的中心点
        startX = bird.x + bird.getWidth() * 0.5;
        startY = bird.y + bird.getHeight() * 0.5;
    }
    
    //判断是否完成了任务，如果失败了，显示重来和返回菜单；如果完成了，则显示重玩，下一关以及返回菜单；
    function isDone() {
        if (numberOfPig == 0) {
//            alert("we win");
            document.getElementById("gameWin").style.display="block";
        } else if(numberOfBird == 0) {
//            alert("we lose");
            document.getElementById("gameLose").style.display="block";
        }
    }

    // 让镜头时刻跟随小鸟来移动。
    function onframe() {
        if (bird) {
            backLayer.x = LGlobal.width * 0.5 - (bird.x + bird.getWidth() * 0.5);
            if (backLayer.x > 0) {
                backLayer.x = 0;
            } else if (backLayer.x < LGlobal.width - 1600) {
                backLayer.x = LGlobal.width - 1600;
            }
            LGlobal.box2d.synchronous();
        }
        var child;
        for (var key in backLayer.childList) {
            child = backLayer.childList[key];
            if (child.name == null) continue;
            // alert("1:"+child.getWidth());
            // alert("2:"+backLayer.getWidth());
            if (child.x < -child.getWidth() || child.x > 1600) {
                backLayer.removeChild(child);
                if (child.name == "bird01") {
                    bird = null;
                    numberOfBird--;
                    //alert("1");
                    // 返回左边
                    LTweenLite.to(backLayer, 1, {
                        x: 0,
                        delay: 1,
                        onUpdate: function () {
                            LGlobal.box2d.synchronous();
                        },
                        onComplete: function () {
                            angryBird(bird2);
                        },
                        ease: Sine.easeIn
                    });
                } else if (child.name == "bird02") {
                    bird2 = null;
                    numberOfBird--;
                    // backLayer.addEventListener(LMouseEvent.MOUSE_DOWN, moveStart);
                    // backLayer.addEventListener(LMouseEvent.MOUSE_MOVE, moveRun);
                    // backLayer.addEventListener(LMouseEvent.MOUSE_UP, moveEnd);
                }
                isDone();
            } else if ((child.name == "stage" || child.name == "pig") && child.hp <= 0) {
                if (child.name == "pig") {
                    var removeObj = new RemoveObject();
                    removeObj.x = child.x;
                    removeObj.y = child.y;
                    backLayer.addChild(removeObj);
                }
                backLayer.removeChild(child);
//                isDone();
            } else if (child.name == "remove") {
                child.run();
                if(child.index>21)
                    numberOfPig--;
//                alert(numberOfPig);
                isDone();
            } else if (child.x == currentX && child.y == currentY) {
                /*小鸟没有滚出去*/
                if (child.name == "bird01") {
                    backLayer.removeChild(child);
                    bird = null;
                    numberOfBird--;
                    // 返回左边
                    LTweenLite.to(backLayer, 1, {
                        x: 0,
                        delay: 1,
                        onUpdate: function () {
                            LGlobal.box2d.synchronous();
                        },
                        onComplete: function () {
                            angryBird(bird2);
                        },
                        ease: Sine.easeIn
                    });
                } else if (child.name == "bird02") {
                    backLayer.removeChild(child);
                    bird2 = null;
                    numberOfBird--;
                }
                isDone();
            }
            if (bird) {
                currentX = bird.x;
                currentY = bird.y;
            }
        }

    }

}


// 添加场景元素
function setStage(list, x, y, rotate, m, ctrl) {
    var stageLayer = new Stage(list, rotate, m, ctrl);
    stageLayer.x = x;
    stageLayer.y = y;
    backLayer.addChild(stageLayer);
    return stageLayer;
}
var mouseDownX = -1,
    saveX;

function moveStart(event) {
    mouseDownX = event.offsetX;
    saveX = backLayer.x;
}

function moveRun(event) {
    if (mouseDownX < 0) return;
    backLayer.x = saveX + (event.offsetX - mouseDownX);
    LGlobal.box2d.synchronous();
}

function moveEnd(event) {
    mouseDownX = -1;
}