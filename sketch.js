let balls=[]
function setup() {
  createCanvas(400,400)
}

function draw() {
  background(220);
  balls.forEach(b=>{
    b.render()
    b.applyForce(createVector(0,0.4))
    b.update()
  })
  balls.forEach(b=>{
    b.applyConsts(4)
  })
}
const DistSq=(v1,v2)=>{
  return ((v2.x-v1.x)**2)+((v2.y-v1.y)**2)
}
function reflect(v,n){
  const d=2*p5.Vector.dot(v,n)
  const a=p5.Vector.mult(n,d)
  return p5.Vector.sub(v,a)
}
function mousePressed(){
  balls.push(new Ball(mouseX,mouseY))
}