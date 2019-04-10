// update time
function updateTimer(deadLine) {
	var time = deadLine - new Date();
	return {
		'days': Math.floor( time/(1000*60*60*24) ),
		'hours': Math.floor( (time/(1000*60*60)) % 24),
		'minutes': Math.floor( (time/1000/60) % 60 ),
		'seconds': Math.floor( (time/1000) % 60 ),
		'total': time
	};
}

function animateClock (span) {
	span.className = 'turn';
	setTimeout (function() {
		span.className = '';
	}, 700);
}


// f of start time, set interval and fire f every miliSeconds (1000s)
function startTimer (id, deadLine) {
	var timerInterval = setInterval (function() {
		var clock = document.getElementById(id);
		var timer = updateTimer(deadLine);
		clock.innerHTML = '<span>' + timer.days + '</span>'
		                + '<span>' + timer.hours + '</span>'
		                + '<span>' + timer.minutes + '</span>'
		                + '<span>' + timer.seconds + '</span>';

		// animations
		var spans = clock.getElementsByTagName('span');
		animateClock(spans[3]);
		if (timer.seconds === 59) animateClock(spans[2]);
		if (timer.minutes === 59 && timer.seconds === 59) animateClock(spans[1]);
		if (timer.hours === 23 && timer.minutes === 59 && timer.seconds === 59 ) animateClock(spans[0]);


        // check for end of timer
        if (timer.total < 1) {
        	clearInterval(timerInterval);
        	clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>'
        }

	}, 1000);
}


// when the window loads,fire this f
window.onload = function (){
	var deadLine = new Date ('April 18, 2020 17:15:00');
	startTimer ('clock', deadLine);
};