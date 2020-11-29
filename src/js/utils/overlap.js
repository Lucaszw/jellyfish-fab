let square = (e1, e2) => {
    let rect1 = e1.getBoundingClientRect();
    let rect2 = e2.getBoundingClientRect();

    return (rect1.top <= rect2.bottom 
        && rect1.bottom >= rect2.top 
        && rect1.left <= rect2.right 
        && rect1.right >= rect2.left);
}

let circle = (e1, circleEl) => {
    let bbox = e1.getBoundingClientRect();
    let circleBox = circleEl.getBoundingClientRect();

    let center = {};
    center.x = circleBox.left + circleBox.width/2;
    center.y = circleBox.top + circleBox.height/2;

    let newX = x - bbox.width / 2;
    let newY = y - bbox.height / 2;

    let angle = Math.atan((newY - center.y)/(newX - center.x));
    
    let w = 0.5*circleBox.width*Math.cos(angle);
    let h = 0.5*circleBox.width*Math.sin(angle);

    let minX = center.x - w;
    let maxX = center.x + w;
    let minY = center.y - h;
    let maxY = center.y + h;

    let outside = true;
    if ((newX > maxX) && (newY > maxY)) outside = false;
    if ((newX < minX) && (newY > maxY)) outside = false;
    if ((newX < minX) && (newY < minY)) outside = false;
    if ((newX > maxX) && (newY < minY)) outside = false;    
}

export default square;
export {circle};