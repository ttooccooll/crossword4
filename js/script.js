(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			 	{
					clue: "This stacker was a household name for cybersecurity long before the days of bitcoin.",
					answer: "johnmcafee",
					position: 1,
					orientation: "across",
					startx: 1,
					starty: 1
				},
			 	{
					clue: "This bitcoiner was not a household name, but we wouldn't have POW without him.",
					answer: "adamback",
					position: 5,
					orientation: "across",
					startx: 1,
					starty: 3
				},
				{
					clue: "There are two famous bitcoiners with this first name.",
					answer: "jack",
					position: 9,
					orientation: "across",
					startx: 9,
					starty: 7
				},
				{
					clue: "This bitcoiner coined the term network state.",
					answer: "balaji",
					position: 10,
					orientation: "across",
					startx: 1,
					starty: 8
				},
				{
					clue: "I recently heard this bitcoiner say that he was thinking about making a program that solo mined a single hash. If this person does that, and then he makes it open source, I'm totally going to make a UI for it that is either a slot machine or a carny game. Please do what you can to get that person to respond here. Simply tagging is helpful, but if we can get some discussion actually going on taking this great educational idea and making it look goofy, that would be bounty-worthy.",
					answer: "supertestnet",
					position: 12,
					orientation: "across",
					startx: 1,
					starty: 11
				},
				{
					clue: "This is the only person that has been legally declared to not be Satoshi.",
					answer: "craigwright",
					position: 2,
					orientation: "down",
					startx: 6,
					starty: 1
				},
				{
					clue: "This bitcoiner works for sn.",
					answer: "ek",
					position: 3,
					orientation: "down",
					startx: 9,
					starty: 1
				},
				{
					clue: "This stacker works for apple.",
					answer: "timcook",
					position: 4,
					orientation: "down",
					startx: 12,
					starty: 1
				},
				{
					clue: "This stacker's counterpart is named Stacy.",
					answer: "max",
					position: 6,
					orientation: "down",
					startx: 4,
					starty: 3
				},
				{
					clue: "This bitcoiner designed Machankura.",
					answer: "kg",
					position: 7,
					orientation: "down",
					startx: 8,
					starty: 3
				},
				{
					clue: "This bitcoiner is considered a macro-economics guru.",
					answer: "lynalden",
					position: 8,
					orientation: "down",
					startx: 10,
					starty: 4
				},
				{
					clue: "Jameson ____",
					answer: "lopp",
					position: 11,
					orientation: "down",
					startx: 3,
					starty: 8
				}
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)

let toggleState = 0;
let usdPrice = null;
let blockHeight = null;
let satFee = null;

async function fetchPrice() {
	try {
		const response = await fetch('https://mempool.space/api/v1/prices');
		const data = await response.json();
		usdPrice = data.USD.toFixed();
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchBlock() {
	try {
		const response = await fetch('https://blockchain.info/q/getblockcount');
		const data = await response.text();
		blockHeight = parseInt(data).toFixed(0);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchFee() {
	try {
		const response = await fetch('https://mempool.space/api/v1/fees/recommended');
		const data = await response.json();
		satFee = data.halfHourFee.toFixed();
		console.log(satFee);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function togglePrice() {
	if (!usdPrice) {
		await fetchPrice();
	}
	if (!blockHeight) {
		await fetchBlock();
	}
	if (!satFee) {
		await fetchFee();
	}

	const button = document.querySelector('.onesat');
	switch (toggleState) {
		case 0:
			button.textContent = `${blockHeight}`;
			break;
		case 1:
			button.textContent = `${satFee} sat/vB`;
			break;
		case 2:
			button.textContent = `$${usdPrice}`;
			break;
		case 3:
			button.textContent = '1sat=1sat';
			break;
	}
	toggleState = (toggleState + 1) % 4;
}