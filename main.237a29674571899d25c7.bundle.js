(()=>{"use strict";class t{constructor(){}static init(e,s){var i;t.canvas=document.createElement("canvas"),t.canvas.id="my-canvas",t.canvas.width=e,t.canvas.height=s,null===(i=document.getElementById("game"))||void 0===i||i.appendChild(t.canvas),t.ctx=this.canvas.getContext("2d")}draw(){t.ctx&&(t.ctx.fillStyle="green",t.ctx.fillRect(0,0,t.canvas.width,t.canvas.height))}}class e{constructor(){}static checkPointInRect(t,e,s){const i=Math.abs(t-s.getCenter().x),h=Math.abs(e-s.getCenter().y);return i<=s.getWidth()/2&&h<=s.getHeight()/2}static intersects(t,e,s,i,h,a,r,c){const n=(s-t)*(c-a)-(r-h)*(i-e);if(0===n)return!1;{const o=((c-a)*(r-t)+(h-r)*(c-e))/n,d=((e-i)*(r-t)+(s-t)*(c-e))/n;return 0<o&&o<1&&0<d&&d<1}}}e.deg2rad=Math.PI/180,e.rad2deg=180/Math.PI;class s{constructor(){}draw(){}setScale(t){}getPos(){return{x:0,y:0}}setPos(t,e){}getWidth(){return 0}setWidth(t){}getHeight(){return 0}setHeight(t){}rotate(t){}setDrawable(t){}setDrawOrder(t){}getDrawOrder(){return 0}update(){}setSrc(t){}getCenter(){return{x:0,y:0}}updateCenter(){}_flip(){}setFlip(t){}getDrawable(){return!1}}class i extends s{constructor(t,e,s){super(),this.image=new Image,this.drawable=!0,this.center={x:0,y:0},this.flip=!1,this.pos=t,this.angle=0,""!=e&&(this.image.src=e,this.image.onload=()=>{null==this.width&&(this.width=this.image.width),null==this.height&&(this.height=this.image.height),this.updateCenter()}),this.scale=1,this.drawOrder=s}draw(){t.ctx&&this.drawable&&(t.ctx.save(),this.flip?(t.ctx.translate(this.pos.x+this.width*this.scale,this.pos.y),t.ctx.scale(-1,1),t.ctx.translate(this.getWidth()/2,this.getHeight()/2),t.ctx.rotate(this.angle)):(t.ctx.translate(this.center.x,this.center.y),t.ctx.rotate(this.angle)),t.ctx.drawImage(this.image,-this.width*this.scale/2,-this.height*this.scale/2,this.width*this.scale,this.height*this.scale),t.ctx.restore())}setScale(t){this.scale=t,this.updateCenter()}getPos(){return this.pos}setPos(t,e){this.pos.x=t,this.pos.y=e,this.updateCenter()}getWidth(){return this.width*this.scale}setWidth(t){this.width=t,this.updateCenter()}getHeight(){return this.height*this.scale}setHeight(t){this.height=t,this.updateCenter()}rotate(t){this.angle=e.deg2rad*t}setDrawable(t){this.drawable=t}setDrawOrder(t){this.drawOrder=t}getDrawOrder(){return this.drawOrder}update(){}setSrc(t){this.image.src=t}getCenter(){return this.center}updateCenter(){this.center.x=this.pos.x+this.width*this.scale/2,this.center.y=this.pos.y+this.height*this.scale/2}_flip(){this.flip=!this.flip}setFlip(t){this.flip=t}getDrawable(){return this.drawable}drawBox(){t.ctx&&(t.ctx.beginPath(),t.ctx.strokeStyle="red",t.ctx.rect(-this.width*this.scale/2,-this.height*this.scale/2,this.width*this.scale,this.height*this.scale),t.ctx.stroke())}}class h{constructor(){this.clock=Date.now()}run(){const t=Date.now();h.deltaTime=(t-this.clock)/7,this.clock=t}}h.deltaTime=1;class a extends i{constructor(t,e,s){super(t,e,s),this.scrollSpeedX=0,this.scrollSpeedY=0}draw(){t.ctx&&(0!=this.scrollSpeedX?(t.ctx.drawImage(this.image,this.pos.x,this.pos.y,this.getWidth(),this.getHeight()),this.scrollSpeedX>0?t.ctx.drawImage(this.image,t.canvas.width+this.pos.x,this.pos.y,this.getWidth(),this.getHeight()):t.ctx.drawImage(this.image,-t.canvas.width+this.pos.x,this.pos.y,this.getWidth(),this.getHeight())):0!=this.scrollSpeedY?(t.ctx.drawImage(this.image,this.pos.x,this.pos.y,this.getWidth(),this.getHeight()),this.scrollSpeedY>0?t.ctx.drawImage(this.image,this.pos.x,t.canvas.height+this.pos.y,this.getWidth(),this.getHeight()):t.ctx.drawImage(this.image,this.pos.x,-t.canvas.height+this.pos.y,this.getWidth(),this.getHeight())):t.ctx.drawImage(this.image,this.pos.x,this.pos.y,this.getWidth(),this.getHeight()))}update(){this.pos.x-=this.scrollSpeedX*h.deltaTime,(this.pos.x<=-this.getWidth()||this.pos.x>=t.canvas.width)&&(this.pos.x=0),this.pos.y-=this.scrollSpeedY*h.deltaTime,(this.pos.y<=-this.getHeight()||this.pos.y>=t.canvas.height)&&(this.pos.y=0)}setScrollSpeedX(t){this.scrollSpeedX=t}setScrollSpeedY(t){this.scrollSpeedY=t}}class r{constructor(){this.gameObjectList=[],this.needToSort=!1,this.sleep=!0}addGameObject(t){this.needToSort=!0,this.gameObjectList.push(t)}update(){this.sleep||this.gameObjectList.map((t=>{t.update()}))}getSpriteList(){return this.gameObjectList}draw(){this.needToSort&&(this.needToSort=!1,this.gameObjectList.sort(((t,e)=>t.getDrawOrder()-e.getDrawOrder()))),this.gameObjectList.map((t=>{t.draw()}))}requestSort(){this.needToSort=!0}restart(){}wakeup(){this.sleep=!1}setSleep(){this.sleep=!0}isSleep(){return this.sleep}setDrawOrder(t,e){this.gameObjectList.filter((e=>e==t))[0].setDrawOrder(e),this.needToSort=!0}}class c{constructor(){}static init(){window.addEventListener("keydown",(t=>{c.keydown=t.key,c.keyup=null})),window.addEventListener("keyup",(t=>{c.keydown=null,c.keyup=t.key})),t.canvas.addEventListener("mousedown",(()=>{c.click=!0})),t.canvas.addEventListener("mouseup",(()=>{c.click=!1})),t.canvas.addEventListener("mousemove",(e=>{const s=t.canvas.getBoundingClientRect();c.mouseX=e.clientX-s.left,c.mouseY=e.clientY-s.top}))}static onKeydown(t){return c.keydown==t}static onKeyup(t){return c.keyup==t}static onClick(){return c.click}}c.keydown=null,c.keyup=null,c.click=!1;class n extends i{constructor(t,e,s,i){super(t,e,i),this.frame=0,this.maxFrame=s,this.animationTime=20,this.timeToChangeFrame=0,this.updateCenter()}update(){super.update(),this.timeToChangeFrame+=1*h.deltaTime,this.timeToChangeFrame>=this.animationTime&&(this.timeToChangeFrame=0,this.frame=(this.frame+1)%this.maxFrame)}draw(){t.ctx&&this.drawable&&(t.ctx.save(),this.flip?(t.ctx.translate(this.pos.x+this.width/this.maxFrame,this.pos.y),t.ctx.scale(-1,1),t.ctx.translate(this.getWidth()/2,this.getHeight()/2),t.ctx.rotate(this.angle)):(t.ctx.translate(this.center.x,this.center.y),t.ctx.rotate(this.angle)),t.ctx.drawImage(this.image,this.frame*this.image.width/this.maxFrame,0,this.image.width/this.maxFrame,this.image.height,-this.width*this.scale/(2*this.maxFrame),-this.height*this.scale/2,this.width*this.scale/this.maxFrame,this.height*this.scale),t.ctx.restore())}setAnimationSpeed(t){this.animationTime/=t}getWidth(){return this.width*this.scale/this.maxFrame}setWidth(t){this.width=t*this.maxFrame,this.updateCenter()}updateCenter(){this.center.x=this.pos.x+this.width*this.scale/(2*this.maxFrame),this.center.y=this.pos.y+this.height*this.scale/2}setScale(t){this.scale=t,this.updateCenter()}drawBox(){t.ctx&&(t.ctx.beginPath(),t.ctx.strokeStyle="red",t.ctx.rect(-this.width*this.scale/(2*this.maxFrame),-this.height*this.scale/2,this.width*this.scale/this.maxFrame,this.height*this.scale),t.ctx.stroke())}}class o extends n{constructor(t,e,s,i){super(t,e,s,i),this.gravity=0,this.speed={x:0,y:0},this.direction={x:0,y:0},this.acceleration=0}setDirection(t,e){const s=Math.sqrt(t*t+e*e);this.direction.x=t/s,this.direction.y=e/s}setSpeedX(t){this.speed.x=t}getSpeedX(){return this.speed.x}setSpeedY(t){this.speed.y=t}getSpeedY(){return this.speed.y}setAcceleration(t){this.acceleration=t}setGravity(t){this.gravity=t}update(){super.update(),this.speed.x+=this.acceleration*h.deltaTime,this.speed.y+=(this.gravity+this.acceleration)*h.deltaTime,this.pos.x+=this.direction.x*this.speed.x*h.deltaTime,this.pos.y+=this.direction.y*this.speed.y*h.deltaTime,this.updateCenter()}}class d extends o{constructor(t,e,s){super(t,e,3,s),this.setDirection(1,1),this.setSpeedX(2),this.setSpeedY(0),this.setGravity(.07),this.setFlip(!1)}update(){super.update(),this.pos.x+this.getWidth()>=t.canvas.width?(this.setFlip(!0),this.setDirection(-1,1)):this.pos.x<=0&&(this.setFlip(!1),this.setDirection(1,1))}}class g extends r{constructor(e){super(),this.sceneManager=e,this.background=new a({x:0,y:0},"assets/images/background-night.png",0),this.background.setHeight(600),this.background.setWidth(400),this.background.setScrollSpeedX(2),this.bird=new d({x:t.canvas.width/2-30,y:t.canvas.height/2},"assets/images/yellowbird-animate.png",1),this.bird.setDirection(1,0),this.bird.setSpeedX(0),this.bird.setScale(1.5),this.startButton=new i({x:t.canvas.width/2-60,y:t.canvas.height/2-50},"assets/images/start-button.png",1),this.startButton.setScale(.1),this.addGameObject(this.background),this.addGameObject(this.startButton),this.addGameObject(this.bird)}update(){c.onClick()&&this.f1(),super.update()}wakeup(){super.wakeup()}setSleep(){super.setSleep()}f1(){e.checkPointInRect(c.mouseX,c.mouseY,this.startButton)&&(this.setSleep(),this.sceneManager.wakeupScene(1))}}class p extends s{constructor(t,e,s){super(),this.pos=t,this.color=e,this.scale=1,this.angle=0,this.drawOrder=s}setColor(t){this.color=t}setScale(t){this.scale=t}rotate(t){this.angle=t}getDrawOrder(){return this.drawOrder}setDrawOrder(t){this.drawOrder=t}update(){}draw(){}}class l extends p{constructor(t,e,s,i){super(t,"black",i),this.color="black",this.p1=t,this.p2=e,this.p3=s}draw(){t.ctx&&(t.ctx.beginPath(),t.ctx.fillStyle=this.color,t.ctx.moveTo(this.p1.x,this.p1.y),t.ctx.lineTo(this.p2.x,this.p2.y),t.ctx.lineTo(this.p3.x,this.p3.y),t.ctx.fill())}setColor(t){this.color=t}setDrawOrder(t){this.drawOrder=t}update(){}}class x{constructor(){}static RectanglecollideRectangle(t,e){const s=Math.abs(t.getCenter().x-e.getCenter().x),i=Math.abs(t.getCenter().y-e.getCenter().y),h=(t.getWidth()+e.getWidth())/2,a=(t.getHeight()+e.getHeight())/2;return s<=h&&i<=a}static TriaglecollideRectangle(t,s){const i=e.intersects(t.p1.x,t.p1.y,t.p2.x,t.p2.y,s.getPos().x,s.getPos().y,s.getPos().x+s.getWidth(),s.getPos().y),h=e.intersects(t.p1.x,t.p1.y,t.p2.x,t.p2.y,s.getPos().x,s.getPos().y,s.getPos().x,s.getPos().y+s.getHeight()),a=e.intersects(t.p1.x,t.p1.y,t.p2.x,t.p2.y,s.getPos().x+s.getWidth(),s.getPos().y,s.getPos().x,s.getPos().y+s.getHeight()),r=e.intersects(t.p1.x,t.p1.y,t.p2.x,t.p2.y,s.getPos().x+s.getWidth(),s.getPos().y+s.getHeight(),s.getPos().x,s.getPos().y+s.getHeight()),c=e.intersects(t.p1.x,t.p1.y,t.p3.x,t.p3.y,s.getPos().x,s.getPos().y,s.getPos().x+s.getWidth(),s.getPos().y),n=e.intersects(t.p1.x,t.p1.y,t.p3.x,t.p3.y,s.getPos().x,s.getPos().y,s.getPos().x,s.getPos().y+s.getHeight()),o=e.intersects(t.p1.x,t.p1.y,t.p3.x,t.p3.y,s.getPos().x+s.getWidth(),s.getPos().y,s.getPos().x,s.getPos().y+s.getHeight()),d=e.intersects(t.p1.x,t.p1.y,t.p3.x,t.p3.y,s.getPos().x+s.getWidth(),s.getPos().y+s.getHeight(),s.getPos().x,s.getPos().y+s.getHeight()),g=e.intersects(t.p3.x,t.p3.y,t.p2.x,t.p2.y,s.getPos().x,s.getPos().y,s.getPos().x+s.getWidth(),s.getPos().y),p=e.intersects(t.p3.x,t.p3.y,t.p2.x,t.p2.y,s.getPos().x,s.getPos().y,s.getPos().x,s.getPos().y+s.getHeight()),l=e.intersects(t.p3.x,t.p3.y,t.p2.x,t.p2.y,s.getPos().x+s.getWidth(),s.getPos().y,s.getPos().x,s.getPos().y+s.getHeight()),x=e.intersects(t.p3.x,t.p3.y,t.p2.x,t.p2.y,s.getPos().x+s.getWidth(),s.getPos().y+s.getHeight(),s.getPos().x,s.getPos().y+s.getHeight());return i||h||a||r||c||n||o||d||g||p||l||x}}class u extends n{constructor(t,e,s,i){super(t,e,s,i),this.drawable=!1,this.eaten=!1}setEaten(t){this.eaten=t}update(){super.update()}getEaten(){return this.eaten}}class w{constructor(){this.spikeList=[],this.extraSpikeList=[],this.verticalSpikeList=[],this.spikeSize=30,this.coin=new u({x:0,y:0},"assets/images/coin-animation.png",10,3),this.ctx=t.ctx,this.canvasWidth=t.canvas.width,this.canvasHeight=t.canvas.height,this.coin.setScale(.15),this.coin.setAnimationSpeed(8)}createSpike(t,e,s,i,h,a,r){if(this.extraSpikeList.length){const c=this.extraSpikeList.shift();c&&(c.p1.x=t,c.p1.y=e,c.p2.x=s,c.p2.y=i,c.p3.x=h,c.p3.y=a),c&&(c.setDrawOrder(r),this.spikeList.push(c))}else{const c=new l({x:t,y:e},{x:s,y:i},{x:h,y:a},r);this.spikeList.push(c),console.log("Create new spike")}}deleteSpike(t){const e=this.spikeList.splice(t,1)[0];e&&this.extraSpikeList.push(e)}draw(){this.spikeList.map((t=>t.draw())),this.verticalSpikeList.map((t=>t.draw())),this.coin.draw()}update(){this.coin.update(),this.spikeList.map((t=>{t.update()}))}checkCollide(t){this.coin.getDrawable()&&x.RectanglecollideRectangle(this.coin,t)&&(P.score+=5,this.coin.setDrawable(!1));for(const e of this.spikeList)if(x.TriaglecollideRectangle(e,t))return console.log("collided"),!0;for(const e of this.verticalSpikeList)if(x.TriaglecollideRectangle(e,t))return console.log("collided"),!0;return!1}clear(){for(;this.spikeList.length;){const t=this.spikeList.shift();t&&this.extraSpikeList.push(t)}}createLeftSpike(){this.clear(),this.coin.setDrawable(!1);let t=Math.floor(7*Math.random())+4,e=0;for(let s=2*this.spikeSize;s<this.canvasHeight-this.spikeSize;s+=2*this.spikeSize){let i;if(i=1==e?Math.floor(30*Math.random())%3==0:Math.floor(5*Math.random()),i&&t>0)this.createSpike(this.spikeSize,s,0,s+this.spikeSize,0,s-this.spikeSize,2),t--,e=1;else{const t=Math.floor(30*Math.random())%5;this.coin.getDrawable()||1!=t||(this.coin.setPos(0,s-this.spikeSize),this.coin.setDrawable(!0)),e=0}}}createRightSpike(){this.clear(),this.coin.setDrawable(!1);let t=Math.floor(7*Math.random())+4,e=0;for(let s=2*this.spikeSize;s<this.canvasHeight;s+=2*this.spikeSize){let i;if(i=1==e?Math.floor(60*Math.random())%3==0:Math.floor(2*Math.random()),i&&t>0)this.createSpike(this.canvasWidth-this.spikeSize,s,this.canvasWidth,s+this.spikeSize,this.canvasWidth,s-this.spikeSize,2),t--,e=1;else{const t=Math.floor(30*Math.random())%5;this.coin.getDrawable()||1!=t||(this.coin.setPos(this.canvasWidth-this.coin.getWidth(),s-this.spikeSize),this.coin.setDrawable(!0)),e=0}}}createVerticalSpike(){for(let t=this.spikeSize;t<this.canvasWidth;t+=2*this.spikeSize)this.verticalSpikeList.push(new l({x:t,y:this.spikeSize},{x:t-this.spikeSize,y:0},{x:t+this.spikeSize,y:0},2));for(let t=this.spikeSize;t<this.canvasWidth;t+=2*this.spikeSize)this.verticalSpikeList.push(new l({x:t,y:this.canvasHeight-this.spikeSize},{x:t-this.spikeSize,y:this.canvasHeight},{x:t+this.spikeSize,y:this.canvasHeight},2))}}class m extends s{constructor(t,e,s,i,h){super(),this.drawable=!0,this.pos=t,this.content=e,this.font=s,this.color=i,this.drawOrder=h}draw(){t.ctx&&this.drawable&&(t.ctx.beginPath(),t.ctx.font=this.font,t.ctx.fillStyle=this.color,t.ctx.fillText(this.content,this.pos.x,this.pos.y))}setPos(t,e){this.pos.x=t,this.pos.y=e}setContent(t){this.content=t}getDrawOrder(){return this.drawOrder}setDrawOrder(t){this.drawOrder=t}update(){}}class y extends r{constructor(e){super(),this.spikeManager=new w,this.sceneManager=e,this.background=new a({x:0,y:0},"assets/images/background-night.png",0),this.background.setHeight(600),this.background.setWidth(400),this.bird=new d({x:t.canvas.width/2,y:300},"assets/images/yellowbird-animate.png",3),this.scoreDisplay=new m({x:t.canvas.width/2,y:t.canvas.height/2},`${P.score}`,"60px Audiowide","white",1),this.addGameObject(this.background),this.addGameObject(this.bird),this.addGameObject(this.scoreDisplay),this.spikeManager.createVerticalSpike()}update(){c.onClick()&&this.bird.setSpeedY(-3),c.onKeydown(" ")&&this.bird.setSpeedY(-3),super.update(),this.spikeManager.update(),this.spikeManager.checkCollide(this.bird)?(P.highScore=Math.max(P.score,P.highScore),this.setSleep(),this.sceneManager.wakeupScene(2)):this.bird.getPos().x<=0?(P.score++,this.scoreDisplay.setContent(P.score.toString()),this.spikeManager.createRightSpike()):this.bird.getPos().x+this.bird.getWidth()>=t.canvas.width&&(P.score++,this.scoreDisplay.setContent(P.score.toString()),this.spikeManager.createLeftSpike())}draw(){super.draw(),this.spikeManager.draw()}wakeup(){super.wakeup(),this.restart()}setSleep(){super.setSleep()}restart(){this.bird.setPos(300,200),this.bird.setFlip(!1),this.bird.setDirection(1,1),this.bird.setSpeedX(2),this.bird.setSpeedY(0),this.spikeManager.clear(),this.scoreDisplay.setContent("0"),P.score=0}}class S extends r{constructor(e){super(),this.sceneManager=e,this.gameOverImage=new i({x:t.canvas.width/2-90,y:t.canvas.height/2-100},"assets/images/gameover.png",3),this.scoreDislay=new m({x:t.canvas.width/2-100,y:t.canvas.height/2},`Score: ${P.score}`,"30px Audiowide","white",3),this.highScoreDisplay=new m({x:t.canvas.width/2-100,y:t.canvas.height/2+50},`High Score: ${P.highScore}`,"30px Audiowide","white",3),this.background=new a({x:0,y:0},"assets/images/background-night.png",0),this.background.setHeight(600),this.background.setWidth(400),this.addGameObject(this.gameOverImage),this.addGameObject(this.scoreDislay),this.addGameObject(this.highScoreDisplay),this.addGameObject(this.background)}update(){c.onClick()&&(this.setSleep(),this.sceneManager.wakeupScene(1)),super.update(),this.scoreDislay.setContent(`Score: ${P.score}`),this.highScoreDisplay.setContent(`High Score: ${P.highScore}`)}wakeup(){super.wakeup()}setSleep(){super.setSleep()}}class k{constructor(t){this.sceneManager=t}draw(){this.sceneManager.draw()}}class b{constructor(){this.ctx=t.ctx,this.scenes=[]}draw(){if(this.ctx)for(const t of this.scenes)t.isSleep()||t.draw()}update(){for(const t of this.scenes)t.isSleep()||t.update()}push(t){this.scenes.push(t)}sleepScene(t){this.scenes[t].setSleep()}wakeupScene(t){this.scenes[t].wakeup()}getScenes(){return this.scenes}}class v{constructor(){this.sceneManager=new b,this.renderer=new k(this.sceneManager),this.timer=new h}run(){requestAnimationFrame((()=>this.loop()))}loop(){this.timer.run(),this.sceneManager.update(),this.renderer.draw(),requestAnimationFrame((()=>this.loop()))}}class P{constructor(){t.init(400,600),c.init(),this.gameEngine=new v,this.startScene=new g(this.gameEngine.sceneManager),this.playScene=new y(this.gameEngine.sceneManager),this.gameOverScene=new S(this.gameEngine.sceneManager),this.gameEngine.sceneManager.push(this.startScene),this.gameEngine.sceneManager.push(this.playScene),this.gameEngine.sceneManager.push(this.gameOverScene),this.gameEngine.sceneManager.wakeupScene(0),this.gameEngine.run()}}P.score=0,P.highScore=0,new class{constructor(){this.gameManager=new P}}})();