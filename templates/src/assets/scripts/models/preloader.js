export function showPreloader (element, options = {}) {
	const preloader = document.createElement('div');
	preloader.classList.add('preloader');
	if (options.color) {
		preloader.classList.add(`preloader--${options.color}`);
	}
	if (options.size) {
		preloader.classList.add(`preloader--${options.size}`);
	}
	preloader.innerHTML = generatePreloader();
	element.classList.add('has-preloader');
	element.appendChild(preloader);
}

export function hidePreloader (element) {
	element.classList.remove('has-preloader');
	element.removeChild(element.querySelector('.preloader'));
}

function generatePreloader () {
	return `
<div class="preloader__box">
	<div class="preloader__cut">
		<div class="preloader__donut"></div>
	</div>
</div>
`;
}
