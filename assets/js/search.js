function mvAnchor(start, end, list) {
    document.documentElement.style.setProperty("--start-anchor", list[start][0] + "px")
    document.documentElement.style.setProperty("--target-anchor", list[end][0] + "px")
    async function wa() {
        $('.anchor').get(0).style.animation = "moveAnchor .5s";
        return;
    }
    wa().then(function() {
        setTimeout(() => {
            $('.anchor').get(0).style.left = list[end][0] + "px";
        }, 250);
    });
    setTimeout(function() {$('.anchor').get(0).style.animation = "";}, 300);
}


function go() {
    let srVal = $('#input').get(0).value;
    if (srVal != null && /^[ ]*$/.test(srVal) !== true) {
        srVal = null;
        window.location = itemList[subject][1] + $('#input').get(0).value;
    }
}



function lR(num, sit) {
    if (sit) {return (Number(num) - 1) + "";}
    else {return (Number(num) + 1) + "";}
}



function keyAction(event) {
    if (event.keyCode === 37) {
        if (subject !== "1") {
            target = lR(subject, true);
            mvAnchor(subject, target, itemList);
            subject = target;
        }
    }
    if (event.keyCode === 39) {
        if (subject !== "5") {
            target = lR(subject, false);
            mvAnchor(subject, target, itemList);
            subject = target;
        }
    }
    if (event.keyCode === 13) {go()}
}




