let arr = [1, 2];
let arr2 = [55, 66];

let arr3 = [...arr, ...arr2];
console.log(arr3);

//videos: [videosOnPage2, ...this.state.videos]

console.log('cases');

var a = 'https://www.youtube.com/embed/';

console.log(a.split('//')[1].split('/')[0]);

let ari = [];
if (ari) {
	console.log('True');
}

let arrr = [1, 2, 45, 66];
let arrr2 = [55, 66, 2, 77];



let uniqueVideos = arrr.filter((newVideo) => {

	let isUnique = true;

	arrr2.forEach((oldVideo) => {
		if (newVideo === oldVideo) {
			isUnique = false;
			return;
		}
	});

	return isUnique;
});

console.log('Filtered: ' + uniqueVideos);
