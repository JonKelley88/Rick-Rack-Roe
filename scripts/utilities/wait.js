export default function wait(time) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve();
		}, time);
	});
}