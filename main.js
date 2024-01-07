window.addEventListener("load",() => {

//selecting the inputs elements
const all = document.getElementById('all');
const grow = document.getElementById('grow');
const wink = document.getElementById('wink');
const float = document.getElementById('float');
const hide = document.getElementById('hide');

//html canvas tag
const canvas  =  document.getElementById('canvas')
canvas.width =  innerWidth  ;
canvas.height =  innerHeight  ;

const c =  canvas.getContext("2d");

//mandrake blueprint
class Mandrake {
constructor(effect){
    this.effect = effect;
    this.canvasWidth =  this.effect.canvasWidth ;
    this.canvasHeight =  this.effect.canvasHeight  ;
    this.image = document.getElementById("mandrake");
    this.spritWidth =  256;
    this.spritheight =  256;
    this.width =  this.spritWidth;
    this.height =  this.spritheight;
    this.scale =  1;
    this.x = this.canvasWidth / 2 - this.width / 2 + 50 ;
    this.y =  this.canvasHeight / 2  -  this.height / 2;
    this.minFrame =  0;
    this.maxFrame = 356 ;
    this.frame =  0;
    this.frameX =  0;
    this.frameY = 0;
}
draw(context){
context.drawImage(this.image, this.frameX * this.spritWidth, this.frameY  * this.spritheight, this.spritWidth,this.spritheight, this.x,this.y,this.width * this.scale,this.height * this.scale)
}

update(){
if(this.frame < this.maxFrame) this.frame++
   else this.frame =  this.minFrame;
    this.frameX =  this.frame % 18;
    this.frameY =  Math.floor( this.frame / 18);
}

}

class Effect{
    constructor(canvasWidth,canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.mandrake = new Mandrake(this);

        //resizing the window
        addEventListener("resize",(e)=>{
            this.reset(e.target.innerWidth,e.target.innerHeight)
        })
    }

    //user interectivity
    customAnimation(addMinFrame,addMaxFrame){
        this.mandrake.minFrame = addMinFrame;
        this.mandrake.maxFrame  =  addMaxFrame
        this.mandrake.frame = addMinFrame

    }

    //initial rendering....
    render(context){
         this.mandrake.draw(context)
         this.mandrake.update()
          all.addEventListener("click",()=>{
          this.customAnimation(0,356)
     });
     grow.addEventListener("click",()=>{
        this.customAnimation(0,75)
     });
      wink.addEventListener("click",()=>{
        this.customAnimation(76,112)
     });
     float.addEventListener("click",()=>{
        this.customAnimation(113,262)
     });
     hide.addEventListener("click",()=>{
        this.customAnimation(263,356)
     })
}

// replacing the positions based on the new height and width

  reset(newWidth,newHeight){
    this.canvasWidth = newWidth
    this.canvasHeight = newHeight;
    this.mandrake.x = this.canvasWidth / 2 - this.mandrake.width / 2 + 50 ;
    this.mandrake.y =  this.canvasHeight / 2  -  this.mandrake.height / 2;
    this.mandrake.draw(c);
}

}
//creating the new class object
const effect = new Effect(canvas.width,canvas.height)

//animation function
function animation (){
c.clearRect(0,0,canvas.width,canvas.height)
effect.render(c)

requestAnimationFrame(animation)
}

animation()
})
