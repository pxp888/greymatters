const say = (...args) => console.log(...args);


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


function scrollPositionChanged() {
	let vh = window.innerHeight;
	for (let i=0; i < psections.length; i++) {
		let s = psections[i];
		let im = s.getElementsByTagName('img')[0];
		let h = s.getBoundingClientRect().top;
		
		let imholder = s.getElementsByClassName('imholder')[0];
		let h2 = imholder.getBoundingClientRect().top;

		s.classList.add('low');
		if (h2 > -vh*.2) {
			s.classList.remove('low');
		}
		if (h2 > vh*.5) {
			s.classList.add('low');
		}
		
		h = -h/1;
		im.style.top = `${h}px`;
	}
}

main.addEventListener('scroll', scrollPositionChanged);

scrollPositionChanged();
