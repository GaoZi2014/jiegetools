let scene;
let bg;
let hoopRight;
let basketRight;
let hoopLeft;
let basketLeft;
let ball;
let floor;

let player1;
let p1Body;
let p1Head;

let player2;
let p2Body;
let p2Head;

let keyA;
let keyD;
let keyW;
let keyV;

let keyLeft;
let keyRight;
let keyUp;
let keyK;

let rightHoopTop;
let rightHoopBottom;
let leftHoopTop;
let leftHoopBottom;

let passTop = false;
let passBottom = false;

let p1Score = 0;
let p1ScoreText;
let p2Score = 0;
let p2ScoreText;

function preload() {
    scene = this;
    scene.load.image("background", "https://app.bsd.education/resources/basketball_courtBG.jpg");
    scene.load.image("hoop_right", "https://app.bsd.education/resources/hoop_right.png");
    scene.load.image("basket_right", "https://app.bsd.education/resources/basket_right.png");
    scene.load.image("hoop_left", "https://app.bsd.education/resources/hoop_left.png");
    scene.load.image("basket_left", "https://app.bsd.education/resources/basket_left.png");
    
    scene.load.image("basketball", "https://app.bsd.education/resources/basketball.png");
    
    scene.load.image("player1_head", "https://app.bsd.education/resources/player1_head.png");
    scene.load.spritesheet("player1_stand", "https://app.bsd.education/resources/player1_stand.png", { frameWidth: 124, frameHeight: 79 });
    scene.load.spritesheet("player1_run", "https://app.bsd.education/resources/player1_run.png", { frameWidth: 130, frameHeight: 98 });
    scene.load.spritesheet("player1_jump", "https://app.bsd.education/resources/player1_jump.png", { frameWidth: 126, frameHeight: 129 });
    scene.load.spritesheet("player1_stand_ball", "https://app.bsd.education/resources/player1_stand_ball.png", { frameWidth: 125, frameHeight: 79 });
    scene.load.spritesheet("player1_run_ball", "https://app.bsd.education/resources/player1_run_ball.png", { frameWidth: 130, frameHeight: 98 });
    scene.load.spritesheet("player1_jump_ball", "https://app.bsd.education/resources/player1_jump_ball.png", { frameWidth: 126, frameHeight: 129 });
    
    scene.load.image("player2_head", "https://app.bsd.education/resources/player2_head.png");
    scene.load.spritesheet("player2_stand", "https://app.bsd.education/resources/player2_stand.png", { frameWidth: 124, frameHeight: 79 });
    scene.load.spritesheet("player2_run", "https://app.bsd.education/resources/player2_run.png", { frameWidth: 130, frameHeight: 98 });
    scene.load.spritesheet("player2_jump", "https://app.bsd.education/resources/player2_jump.png", { frameWidth: 126, frameHeight: 129 });
    scene.load.spritesheet("player2_stand_ball", "https://app.bsd.education/resources/player2_stand_ball.png", { frameWidth: 125, frameHeight: 79 });
    scene.load.spritesheet("player2_run_ball", "https://app.bsd.education/resources/player2_run_ball.png", { frameWidth: 130, frameHeight: 98 });
    scene.load.spritesheet("player2_jump_ball", "https://app.bsd.education/resources/player2_jump_ball.png", { frameWidth: 126, frameHeight: 129 });
}

function create() {
    createBG();
    
    createScoreboard();
    
    createBall();
    
    createPlayer1();
    
    createPlayer2();
    
    createInputKeys();
    
    scene.matter.world.on('collisionstart', onCollision);
}

function createBG() {
    scene.matter.world.setBounds();
    
    bg = scene.add.image(config.width/2, config.height/2, "background");
    hoopRight = scene.add.image(832, 310, "hoop_right");
    basketRight = scene.add.image(794, 269, "basket_right");
    basketRight.depth = 10;
    hoopLeft = scene.add.image(120, 310, "hoop_left");
    basketLeft = scene.add.image(165, 269, "basket_left");
    basketLeft.depth = 10;
    
    floor = scene.matter.add.rectangle(480, 470, 960, 60, { isStatic: true});
    
    // right board
    scene.matter.add.rectangle(820, 210, 5, 75, { isStatic: true });
    
    // right hoop
    scene.matter.add.rectangle(771, 242, 5, 5, { isStatic: true });
    
    // right hoop top
    rightHoopTop = scene.matter.add.rectangle(795, 242, 40, 5, { isStatic: true, isSensor: true });
    
    // right hoop bottom
    rightHoopBottom = scene.matter.add.rectangle(795, 270, 40, 5, { isStatic: true, isSensor: true });
    
    // left board
    scene.matter.add.rectangle(140, 210, 5, 75, { isStatic: true, friction: 0 });

    // left hoop
    scene.matter.add.rectangle(187, 242, 5, 5, { isStatic: true, friction: 0 });
    
    // left hoop top
    leftHoopTop = scene.matter.add.rectangle(163, 242, 40, 5, { isStatic: true, isSensor: true });
    
    // left hoop bottom
    leftHoopBottom = scene.matter.add.rectangle(163, 270, 40, 5, { isStatic: true, isSensor: true });
}

function createScoreboard() {
    p1ScoreText = scene.add.text(417, 95, "00", {color: "white", fontSize: 40, align: "center", fontFamily: "Arial"});
    
    p2ScoreText = scene.add.text(477, 95, "00", {color: "white", fontSize: 40, align: "center", fontFamily: "Arial"});
}

function createBall() {
    ball = scene.matter.add.image(470, 350, "basketball");
    ball.setCircle();
    ball.setBounce(0.97);
    ball.setVelocity(0, -15);
    ball.setAngularVelocity(0.25);
}

function createPlayer1() {
    p1Body = scene.matter.add.sprite(285, 350, "player1_stand", null, {
        shape: {
            type: "rectangle",
            width: 30,
            height: 70
        },
    });
    
    scene.anims.create({
        key: 'stand',
        frames: scene.anims.generateFrameNumbers("player1_stand", { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    scene.anims.create({
        key: 'run',
        frames: scene.anims.generateFrameNumbers('player1_run', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: 'jump',
        frames: scene.anims.generateFrameNumbers('player1_jump', { start: 0, end: 0 }),
        frameRate: 16,
        repeat: -1
    });
    scene.anims.create({
        key: 'stand_ball',
        frames: scene.anims.generateFrameNumbers('player1_stand_ball', { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    scene.anims.create({
        key: 'run_ball',
        frames: scene.anims.generateFrameNumbers('player1_run_ball', { start: 0, end: 11 }),
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: 'jump_ball',
        frames: scene.anims.generateFrameNumbers('player1_jump_ball', { start: 0, end: 0 }),
        frameRate: 16,
        repeat: -1
    });
    p1Body.play("stand");
    p1Body.setFixedRotation();
    
    p1Head = scene.add.sprite(285, 330, "player1_head");
    p1Head.setScale(0.5);
    
    player1 = scene.add.container(0, 0);
    player1.add(p1Body);
    player1.add(p1Head);
    player1.isJump = false;
    player1.hasBall = false;
}

function createPlayer2() {
    p2Body = scene.matter.add.sprite(670, 350, "player2_stand", null, {
        shape: {
            type: "rectangle",
            width: 30,
            height: 70
        }
    });
    scene.anims.create({
        key: 'p2stand',
        frames: scene.anims.generateFrameNumbers("player2_stand", { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    scene.anims.create({
        key: "p2run",
        frames: scene.anims.generateFrameNumbers("player2_run", { start: 0, end: 11 }),
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: "p2jump",
        frames: scene.anims.generateFrameNumbers("player2_jump", { start: 0, end: 0 }),
        frameRate: 16,
        repeat: -1
    });
    scene.anims.create({
        key: "p2stand_ball",
        frames: scene.anims.generateFrameNumbers("player2_stand_ball", { start: 0, end: 3 }),
        frameRate: 7,
        repeat: -1
    });
    scene.anims.create({
        key: "p2run_ball",
        frames: scene.anims.generateFrameNumbers("player2_run_ball", { start: 0, end: 11 }),
        frameRate: 20,
        repeat: -1
    });
    scene.anims.create({
        key: "p2jump_ball",
        frames: scene.anims.generateFrameNumbers("player2_jump_ball", { start: 0, end: 0 }),
        frameRate: 16,
        repeat: -1
    });
    p2Body.play("p2stand");
    p2Body.setFixedRotation();
    
    p2Head = scene.add.sprite(670, 330, "player2_head");
    p2Head.setScale(0.5);
    
    player2 = scene.add.container(0, 0);
    player2.add(p2Body);
    player2.add(p2Head);
    player2.isJump = false;
    player2.hasBall = false;
}

function createInputKeys() {
    keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyV = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
    
    keyLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyUp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyK = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
}

function update() {
    if (keyA.isDown) {
        p1Body.setVelocityX(-5);
    }
    else if (keyD.isDown) {
        p1Body.setVelocityX(5);
    }
    
    if (keyW.isDown && !player1.isJump) {
        p1Body.setVelocityY(-9);
        player1.isJump = true;
    }
    
    // press v to shoot
    if (keyV.isDown && player1.hasBall) {
        shooting();
    }
    
    if (keyRight.isDown) {
        p2Body.setVelocityX(5);
    }
    else if (keyLeft.isDown) {
        p2Body.setVelocityX(-5);
    }
    
    // press up arrow key to jump
    if (keyUp.isDown && !player2.isJump) {
        player2.isJump = true;
        p2Body.setVelocityY(-9);
    }
    
    // press k to shoot
    if (keyK.isDown && player2.hasBall) {
        shooting();
    }
    
    updatePlayer1Position();
    updatePlayer1Anim();
    
    updatePlayer2Position();
    updatePlayer2Anim();
}

function shooting() {
    if (player1.hasBall) {
        ball.visible = true;
        ball.x = p1Body.x + 50;
        ball.y = p1Body.y - 50;
        ball.body.isStatic = false;
        player1.hasBall = false;
        ball.body.force.x = randomForce("right");
        ball.body.force.y = -0.03;
        ball.setAngularVelocity(-0.35);
    }
    else if (player2.hasBall) {
        //alert("shooting");
        ball.visible = true;
        ball.x = p2Body.x - 50;
        ball.y = p2Body.y - 50;
        ball.body.isStatic = false;
        player2.hasBall = false;
        ball.body.force.x = randomForce("left");
        ball.body.force.y = -0.03;
        ball.setAngularVelocity(0.35);
    }
}

function updatePlayer1Position() {
    p1Head.x = p1Body.x;
    p1Head.y = p1Body.y - 75;
    
    if (p1Body.body.velocity.y == 0 && p1Body.y > 400) {
        // player is now on the ground
        player1.isJump = false;
    }
}

function updatePlayer1Anim() {
    if (player1.hasBall) {
        // the player has the basketball
        
        if (player1.isJump) {
            // player is in the air with the ball
            p1Body.play("jump_ball");
        }
        else {
            // player is on the ground
            if (p1Body.body.velocity.x != 0 && p1Body.texture.key != "player1_run_ball") {
                // player moves with the ball
                p1Body.play("run_ball");
            }
            else if (p1Body.body.velocity.x == 0 && p1Body.texture.key != "player1_stand_ball") {
                p1Body.play("stand_ball");
            }
        }
    }
    else {
        // player doesn't have the ball
        
        if (player1.isJump) {
            // player is in the air
            p1Body.play("jump");
        }
        else {
            // player is on the ground
            if (p1Body.body.velocity.x != 0 && p1Body.texture.key != "player1_run") {
                // player is running
                p1Body.play("run");
            }
            else if (p1Body.body.velocity.x == 0 && p1Body.texture.key != "player1_stand") {
                // player stand still
                p1Body.play("stand");
            }
        }
    }
    
}

function updatePlayer2Position() {
    p2Head.x = p2Body.x;
    p2Head.y = p2Body.y - 75;
    
    if (p2Body.body.velocity.y == 0 && p2Body.y > 400) {
        player2.isJump = false;
    }
}

function updatePlayer2Anim() {
    if (player2.hasBall) {
        if (player2.isJump) {
            // player2 is in the air with the ball
            p2Body.play("p2jump_ball");
        }
        else {
            // player2 has the basketball
            if (p2Body.body.velocity.x != 0 && p2Body.texture.key != "player2_run_ball") {
                // player moves with the ball
                p2Body.play("p2run_ball");
            }
            else if (p2Body.body.velocity.x == 0 && p2Body.texture.key != "player2_stand_ball") {
                // player2 is standing with the ball
                p2Body.play("p2stand_ball");
            }  
        }
    }
    else {
        if (player2.isJump) {
            // player is in the air
            p2Body.play("p2jump");
        }
        else {
            if (p2Body.body.velocity.x != 0 && p2Body.texture.key != "player2_run") {
                // player moves
                p2Body.play("p2run");
            }
            else if (p2Body.body.velocity.x == 0 && p2Body.texture.key != "player2_stand") {
                // player stand still
                p2Body.play("p2stand");
            }
        }
    }
}

function onCollision(event, object1, object2) {
    
    if ((object1 == p1Body.body && object2 == ball.body) || (object1 == ball.body && object2 == p1Body.body)) {
        // if ball collides with player1
        ball.body.isStatic = true;
        ball.setAngularVelocity(0);
        ball.setVelocity(0, 0);
        ball.x = 470;
        ball.y = 470;
        ball.visible = false;
        
        player1.hasBall = true;
    }
    else if ((object1 == ball.body && object2 == rightHoopTop) || (object1 == rightHoopTop && object2 == ball.body)) {
        if (passTop == false && passBottom == false) {
            passTop = true;
            //alert("hit the top sensor");
        } 
    }
    else if ((object1 == ball.body && object2 == rightHoopBottom) || (object1 == rightHoopBottom && object2 == ball.body)) {
        if (passTop == true && passBottom == false) {
            passBottom = true;
            //alert("player1 gets 2 points");
            p1Score = p1Score + 2;
            //alert(p1Score);
            let scoreText;
            if (p1Score >= 10) {
                scoreText = p1Score;
            }
            else {
                scoreText = "0" + p1Score;
            }
            p1ScoreText.text = scoreText;
        }
    }
    else if ((object1 == ball.body && object2 == floor) || (object1 == floor && object2 == ball.body)) {
        passTop == false;
        passBottom = false;
    }
    else if ((object1 == p2Body.body && object2 == ball.body) || (object1 == ball.body && object2 == p2Body.body)) {
        // player 2 collides with the ball
        ball.body.isStatic = true;
        ball.setAngularVelocity(0);
        ball.setVelocity(0, 0);
        ball.x = 470;
        ball.y = 470;
        ball.visible = false;
        
        player2.hasBall = true;
    }
    else if ((object1 == ball.body && object2 == leftHoopTop) || (object1 == leftHoopTop && object2 == ball.body)) {
        if (passTop == false && passBottom == false) {
            passTop = true;
            //alert("hit the top sensor");
        } 
    }
    else if ((object1 == ball.body && object2 == leftHoopBottom) || (object1 == leftHoopBottom && object2 == ball.body)) {
        if (passTop == true && passBottom == false) {
            passBottom = true;
            //alert("player2 gets 2 points");
            p2Score = p2Score + 2;
            //alert(p2Score);
            let scoreText;
            if (p2Score >= 10) {
                scoreText = p2Score;
            }
            else {
                scoreText = "0" + p2Score;
            }
            p2ScoreText.text = scoreText;
        }
    }
}

function randomForce(direction) {
    let diffX;
    
    if (direction == "right") {
        diffX = rightHoopTop.position.x - p1Body.x;
    }
    else if (direction == "left") {
        diffX = leftHoopTop.position.x - p2Body.x;
    }
    return diffX / Phaser.Math.Between(17000, 23000);
}

let config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: "gameContainer",
    physics: {
        default: "matter",
        matter: {
            debug: false, 
            gravity: {
                y: 1
            },
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);