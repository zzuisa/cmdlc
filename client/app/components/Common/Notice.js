function notice() {
    let au = new Audio('assets/vio.mp3');
    au.play();
}
function verify(id) {
    let list = ['vue', 'react', 'angular'];
    for (let i = 0; i < list.length; i++) {
        if (id.includes(list[i])) {
            return true;
        }
    }
    return false;
}
export { notice, verify };
