export default (e1, e2) => {
    let rect1 = e1.getBoundingClientRect();
    let rect2 = e2.getBoundingClientRect();

    return (rect1.top <= rect2.bottom 
        && rect1.bottom >= rect2.top 
        && rect1.left <= rect2.right 
        && rect1.right >= rect2.left);
}