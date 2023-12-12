const say = msg => console.log(msg);


const URL="/test";
const rfuncs = {};


async function sendmsg(data) {
	const response = fetch('/test', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			data
		})
	})
	.then(response => response.json())
	.then(data => getmsg(data))
	.catch(error => console.error('Error sending data:', error));
}


function getmsg(data) {
	if (data['t'] in rfuncs) {
		rfuncs[data['t']](data);
	}
	else { say('no js handler for ' + data['t']); }
}


// ############################ LOGIC ############################


const main = document.querySelector('main');
const psections = document.getElementsByClassName('psection');
for (let i = 1; i < psections.length; i++) { psections[i].classList.add('low'); }

function printMainScrollPosition() {
	let h = psections[0].offsetHeight-200;
    let scrollPositionVertical = main.scrollTop;
    let n = Math.round(scrollPositionVertical / h);
	for (let i = 0; i < psections.length; i++) {
		psections[i].classList.add('low');
	}
	psections[n].classList.remove('low');
	say(n);
}

main.addEventListener('scroll', printMainScrollPosition);

