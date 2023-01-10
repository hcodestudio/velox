export const convertToTitle = (str = '') => {
	const arr = str.split(' ');

	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}

	return arr.join(' ');
};

export const currentDateTime = () => {
	let today = new Date();

	// current date
	// adjust 0 before single digit date
	let date = ('0' + today.getDate()).slice(-2);
	// current month
	let month = ('0' + (today.getMonth() + 1)).slice(-2);
	// current year
	let year = today.getFullYear();
	// current hours
	let hours = today.getHours();
	// current minutes
	let minutes = today.getMinutes();
	// current seconds
	let seconds = today.getSeconds();

	return (
		year +
		'-' +
		month +
		'-' +
		date +
		' ' +
		hours +
		':' +
		minutes +
		':' +
		seconds
	);
};
