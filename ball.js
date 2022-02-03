class Ball{
  constructor(_pos,_posy){
    this.pos=createVector()
    if(_posy)
      this.pos=createVector(_pos,_posy)
    else
      this.pos=_pos
    this.vel=createVector()
    this.r=20
    this.acc=createVector()
  }
  
  render(){
    ellipse(this.pos.x,this.pos.y,this.r*2)
  }
  update(){
    this.vel.add(this.acc)
    this.vel.mult(0.98)
    this.pos.add(this.vel)
    this.acc.mult(0)
    
    balls.forEach(b=>{
      if(b!=this&&this.checkCollision(b)){
        //print("cehea")
        this.collide(b)
      }
    })
    this.resolveEdgesDynamically()
    
    
    if(this.checkMouse()){
      this.applyForce(p5.Vector.mult(p5.Vector.sub(createVector(mouseX,mouseY),this.pos),0.1))
    }
    
  }
  
  applyConsts(iter){
    for(let i=0;i<iter;i++){
      
      for(let b=0;b<balls.length;b++){
        if(balls[b]!=this){
        
        if(this.checkCollision(balls[b])){
          this.staticCollide(balls[b])
        }
        }
      }
      
      this.resolveEdgesStatically()
    }
  }
    
  checkMouse(){
    if(DistSq(this.pos,createVector(mouseX,mouseY))<=this.r**2){
      return true
    }
    return false
  }
  
  checkCollision(ball){
    if((this.r+ball.r)**2>=DistSq(this.pos,ball.pos)){
      //print("cehea")
      fill(255,0,0)
      return true
    }
    fill(255)
    return false
  }
  
  applyForce(f){
    this.acc.add(f)
  }
  
  collide(ball){
    let fv=p5.Vector.sub(this.vel,ball.vel) //first velocity as if the 2nd ball was static
    let normal=p5.Vector.sub(this.pos,ball.pos) //normal going to first ball
    normal.normalize()
    
    let force=p5.Vector.sub(reflect(fv,normal),fv) //the "force" exerted on the first one
    
    force.mult(0.5)
    this.applyForce(force)
    
  }
  staticCollide(ball){
    
    let overlap=p5.Vector.sub(this.pos,ball.pos) //overlap pointed at first ball
    overlap.setMag(this.r+ball.r-overlap.mag())
    this.pos.add(overlap)
    overlap.mult(-1)
    ball.pos.add(overlap)
    
  }
  resolveEdgesDynamically(){
    if(this.pos.y>=height-this.r){
      this.pos.y=height-this.r
      this.vel.y*=-1
    }
    if(this.pos.x>=width-this.r){
      this.pos.x=width-this.r
      this.vel.x*=-1
    }else if(this.pos.x<=this.r){
      this.pos.x=this.r
      this.vel.x*=-1
    }
  }
  resolveEdgesStatically(){
    if(this.pos.y>=height-this.r){
      this.pos.y=height-this.r
    }
    if(this.pos.x>=width-this.r){
      this.pos.x=width-this.r
    }else if(this.pos.x<=this.r){
      this.pos.x=this.r
    }
  }
}