let dropPlace = $('.dropdown')[0];
let progresTickets = $('#inProgresColumn .features__tickets').children();

dropPlace.addEventListener('dragover', mouseDragHandler);
dropPlace.addEventListener('drop', mouseDragHandler);


progresTickets.forEach = Array.prototype.forEach;
progresTickets.forEach(el => {
    el.setAttribute('draggable', 'true');
    el.addEventListener('dragstart', mouseDragHandler);
    el.addEventListener('touchmove', touchDragHandler);
    el.addEventListener('touchend', touchDragHandler);
});

function touchDragHandler(event) {
    switch(event.type) {
        case 'touchmove': dragTicket(event); break;
        case 'touchend': drop(event); break;
        default: return;
    }

    function dragTicket(ev) {
        ev.preventDefault();
        var ticket = ev.target.closest('.ticket-wrapper');

        if (ticket) cursorСhaseFor(ticket, true, ev);
    }

    function drop(ev) {
        var ticket = $('#'+ev.currentTarget.id);
        cursorСhaseFor(ticket, false);

        if (dropHappenOn(dropPlace, ev)) moveToCompleteStack(ticket);
    }

    function cursorСhaseFor(el, boolean, event) {
        if (boolean) {
            el.style.position = 'fixed';
            el.style.zIndex   = 2;
            el.style.left     = event.touches[0].clientX - el.scrollWidth/2 + 'px';
            el.style.top      = event.touches[0].clientY- el.scrollHeight/2  + 'px';
        } else {
            el[0].style.position = "";
        }
    }

    function dropHappenOn(target, event) {
        target.style.zIndex = 10;
        var onDropElement = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        target.style.zIndex = 0;
        if (onDropElement.closest('.'+target.className)) return true;
    }
}

function mouseDragHandler(event) {
    switch(event.type) {
        case 'dragstart': dragTicket(event); break;
        case 'dragover': allowDrop(event); break;
        case 'drop': drop(event); break;
        default: return;
    }

    function dragTicket(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
    
    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drop(ev) {
        ev.preventDefault();
        var ticket = $('#' + ev.dataTransfer.getData("text"));
        moveToCompleteStack(ticket);
    }
}



function moveToCompleteStack(ticket) {
    let completeColumn = $('#completeColumn');
    let inProgresColumn = $('#inProgresColumn');

    let completeStack = $('#completeColumn .features__tickets');
    let completedStatusHTML = '<span class="complete">Copleted!</span>';

    completeStack.append(ticket);
    makeCompleted(ticket);
    changeTicketsCountIn(completeColumn, +1);
    changeTicketsCountIn(inProgresColumn, -1);

    function makeCompleted(ticket) {
        let statusEl = ticket.find('.text__status');
        statusEl.html(completedStatusHTML);
        ticket.removeClass('pulse');
    }

    function changeTicketsCountIn(column, num) {
        let tittle = column.find('span[data-count]');
        let currCount = tittle[0].attributes['data-count'].value;
        let newCount = add(currCount, num);
        tittle.attr('data-count', newCount);

        function add(string) {
            incrementedNum = parseInt(string.replace(/[^0-9.]/g, "")) + parseInt(num);
            return string.replace(/[0-9]/g, incrementedNum);
        }
    }    
}
