import { rankItem, compareItems } from '@tanstack/match-sorter-utils';
import { sortingFns } from '@tanstack/react-table';

export const convertToTitle = (str = '') => {
	const arr = str.split(' ');

	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}

	return arr.join(' ');
};

export const currentDateTime = (today = new Date()) => {
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

export const padTo2Digits = (num) => {
	return num.toString().padStart(2, '0');
};

export const formatDate = (date) => {
	return [
		padTo2Digits(date.getMonth() + 1),
		padTo2Digits(date.getDate()),
		date.getFullYear(),
	].join('/');
};

export const fuzzyFilter = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

export const fuzzySort = (rowA, rowB, columnId) => {
	let dir = 0;

	// Only sort by rank if the column has ranking information
	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(
			rowA.columnFiltersMeta[columnId]
				? rowA.columnFiltersMeta[columnId].itemRank
				: null,
			rowB.columnFiltersMeta[columnId]
				? rowB.columnFiltersMeta[columnId].itemRank
				: null
		);
	}

	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};
