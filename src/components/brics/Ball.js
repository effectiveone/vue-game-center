import Renderer from "./Renderer.js";

export default class Ball {
    x;
    y;
    dx = 2;
    dy = -2;
    color = "blue";

    constructor(ballRadius) {
        this.ballRadius = ballRadius;
        this.renderer = Renderer.getInstance();
        this.canvas = this.renderer.getCanvas();

        // piła malowana jest względem środka piłki
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 40;
    }

    update = () => {
        // czy jest kolizja na osi x
        if (this.x + this.ballRadius + this.dx > this.canvas.width // prawa ściana
            || (this.x + this.dx) - this.ballRadius < 0 ) { // lewa ściana
            this.dx = -this.dx;
        }

        // odbicie od górnej ściany
        if ( (this.y + this.dy) - this.ballRadius <= 0 ) {
            this.dy = -this.dy; // odbicie na osi y
        }

        this.x += this.dx;
        this.y += this.dy;
    }

    draw = () => {
        this.renderer.drawCircle(this.x, this.y,
            this.ballRadius, this.color);
    }

    getRect = () => {
        // piłka malowana jest względem swojego środka na osi x i y
        return {
            top: this.y - this.ballRadius,
            right: this.x + this.ballRadius,
            bottom: this.y + this.ballRadius,
            left: this.x - this.ballRadius
        }
    }

    checkPaddleCollision = (paddle) => {
        const paddleRect = paddle.getRect();
        const ballRect = this.getRect();

        if (ballRect.right > paddleRect.left
            && ballRect.left < paddleRect.right
            && ballRect.bottom > paddleRect.top ) {
            // kolizje z paletką
            // odbicie
            this.dy = -this.dy;
            return true;
        }
        
        return false;
    }

    checkBottomWallCollision = () => {
        if ( this.y + this.ballRadius > this.canvas.height ) {
            return true; // piłka weszła w dolną ścianą
        } else {
            return false;
        }
    }

    // odbicie po kolizji z brick
    brickCollision = () => {
        this.dy = -this.dy;
    } 

    restart = () => {
        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 40;
        this.dx = Math.random() < 0.5 ? 2 : -2;
        this.dy = -2;        
    }
}




