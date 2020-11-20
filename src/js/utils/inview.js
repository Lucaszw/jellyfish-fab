export default function (element) {
    let bbox = element.getBoundingClientRect();

    let y1 = bbox.top + window.pageYOffset
    let y2 = bbox.top + window.pageYOffset + bbox.height;

    if (window.pageYOffset < y1 && (window.pageYOffset + window.innerHeight) > y2) {
        return true;
    } else {
        return false;
    }
}