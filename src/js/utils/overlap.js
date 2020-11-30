let square = (e1, e2) => {
    let rect1 = e1.getBoundingClientRect();
    let rect2 = e2.getBoundingClientRect();

    return (rect1.top <= rect2.bottom 
        && rect1.bottom >= rect2.top 
        && rect1.left <= rect2.right 
        && rect1.right >= rect2.left);
}

let circlePoint = (circleEl, elem, options) => {
    const circleBox = circleEl.getBoundingClientRect();
    
    let coords = options?.coords;
    if (!coords) {
        const bbox = elem.getBoundingClientRect();
        coords = {x: bbox.left+bbox.width/2 , y: bbox.top + bbox.height/2};
    }
    
    const linewidth = options?.linewidth || 0;

    const center = {};
    center.x = (circleBox.left + circleBox.width/2);
    center.y = (circleBox.top + circleBox.height/2);

    let angle = Math.atan2((coords.y - center.y), (coords.x - center.x));
    if (angle < 0) angle += 2 * Math.PI;

    const R = circleBox.width/2 - linewidth;

    let overlapping = (((coords.x - center.x)**2) + ((coords.y - center.y)**2) <= (R)**2)
    return {overlapping, angle};
}

let circleBox = (circleEl, elem, options) => {
    let bbox = elem.getBoundingClientRect();
    let points = [
        {x: bbox.left, y: bbox.top},
        {x: bbox.left, y: bbox.bottom},
        {x: bbox.right, y: bbox.top},
        {x: bbox.right, y: bbox.bottom},
    ];

    let collision = false;
    let numCollision = 0;
    let fullyContained = false;

    for (let coords of points) {
        options.coords = coords;
        let {overlapping} = circlePoint(circleEl, null, options);
        if (overlapping) {
            collision = true;
            numCollision ++;
        }
    }
    if (numCollision == 4) fullyContained = true;
    return {collision, fullyContained};
}

export default square;
export {square, circlePoint, circleBox};