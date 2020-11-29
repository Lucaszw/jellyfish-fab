let square = (e1, e2) => {
    let rect1 = e1.getBoundingClientRect();
    let rect2 = e2.getBoundingClientRect();

    return (rect1.top <= rect2.bottom 
        && rect1.bottom >= rect2.top 
        && rect1.left <= rect2.right 
        && rect1.right >= rect2.left);
}

let circle = (e1, circleEl, coords) => {
    let bbox = e1.getBoundingClientRect();
    coords = coords || {x: bbox.left+bbox.width/2 , y: bbox.top + bbox.height/2};

    let circleBox = circleEl.getBoundingClientRect();
    let center = {};
    center.x = (circleBox.left + circleBox.width/2);
    center.y = (circleBox.top + circleBox.height/2);

    let angle = Math.atan2((coords.y - center.y), (coords.x - center.x));
    if (angle < 0) angle += 2 * Math.PI;
    let overlapping = (((coords.x - center.x)**2) + ((coords.y - center.y)**2) <= (circleBox.width/2)**2)
    return {overlapping, angle};
}

export default square;
export {circle};