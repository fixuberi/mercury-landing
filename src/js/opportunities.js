function toggleContent(button) {
    const MAXIMIZED = 'opportunity-maximized';
    const MINIMIZED = 'opportunity-minimized';
    let parentNode = button.parentNode;

    toggleClass(parentNode);

    function toggleClass(node) {
        let newClassList = node.classList.value;

        if (newClassList.includes(MAXIMIZED)) {
            newClassList = newClassList.replace(MAXIMIZED, MINIMIZED);
        } else if (newClassList.includes(MINIMIZED)) {
            newClassList = newClassList.replace(MINIMIZED, MAXIMIZED);
        }

        node.classList.value = newClassList;
    }
}

let buttons = document.getElementsByClassName('button__opportunity');
buttons.forEach = Array.prototype.forEach;
buttons.forEach(el => {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        toggleContent(e.target);
    });
});