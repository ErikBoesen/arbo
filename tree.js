var canvas = document.getElementById('canv');
canvas.height = window.innerHeight;
canvas.width  = window.innerWidth;
var ctx = canvas.getContext('2d');

var options = {
    sideLengthMultiplier: {
        default: .75,
        min: 0,
        max: 1,
    },
    middleLengthMultiplier: {
        default: .5,
        min: 0,
        max: 1,
    },
    iterations: {
        default: 8,
        min: 3,
        max: 12,
        step: 1,
    }
};

const CONTROLS = document.getElementById('controls');

for (option in options) {
    control = document.createElement('div');
    control.className = 'control';
    slider = document.createElement('input');
    readout = document.createElement('label');
    slider.type = 'range';
    slider.min = options[option].min;
    slider.max = options[option].max;
    slider.value = options[option].default;
    slider.id = option;
    slider.step = options[option].step || 0.01;
    readout.textContent = options[option].default;
    options[option].value = options[option].default;
    options[option].slider = slider;
    options[option].readout = readout;
    control.appendChild(slider);
    control.appendChild(readout);
    CONTROLS.appendChild(control);
}

ctx.strokeStyle = 'white';
function random() {
    return (Math.random() - 0.5) / 80;
}
var height = window.innerHeight;
function drawBranch(iteration, length, startX, startY, angle) {
    ctx.moveTo(startX, height - startY);
    var endX = startX + Math.cos(angle) * length;
    var endY = startY + Math.sin(angle) * length;
    ctx.lineTo(endX, height - endY);
    if (iteration > 0) {
        drawBranch(iteration - 1, length * options.sideLengthMultiplier.value, endX, endY, angle - Math.PI / 3 + random());
        drawBranch(iteration - 1, length * options.middleLengthMultiplier.value, endX, endY, angle + 0 + random());
        drawBranch(iteration - 1, length * options.sideLengthMultiplier.value, endX, endY, angle + Math.PI / 3 + random());
    }
}

function startTree() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw extra line at the bottom so that leaves don't touch the ground too quickly
    ctx.moveTo(canvas.width / 2, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height - 100);

    drawBranch(options.iterations.value, 100, canvas.width / 2, 100, Math.PI / 2);
    ctx.stroke();
}

oninput = function(e) {
    options[e.target.id].value = e.target.value;
    options[e.target.id].readout.textContent = e.target.value;
    startTree();
};

startTree();

/*
options['sideLengthMultiplier'].value = 0.01;
setInterval(function() {
    options['sideLengthMultiplier'].value += 0.001;
    startTree();
}, 50);*/
