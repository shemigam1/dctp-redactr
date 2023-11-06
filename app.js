const redactBtn = document.getElementById("redact-btn");

const redaction = function () {
	let userText = document.getElementById("text").value;
	let redact = document.getElementById("redact").value.split(" "); // Split input into words
	let redactedText = document.getElementById("redacted-text");
	let wordsScanned = 0;
	let wordsMatched = 0;
	let charactersScrambled = 0;
	let startTime = performance.now();

	for (let i = 0; i < redact.length; i++) {
		const regex = new RegExp("\\b" + redact[i] + "\\b", "gi");
		let matches = userText.match(regex);
		const replacementText = "****";
		if (matches) {
			wordsMatched += matches.length;
			charactersScrambled += matches.reduce(
				(total, match) => total + match.length,
				0
			);
			userText = userText.replace(regex, replacementText);
		}
		wordsScanned += userText.match(/\b\w+\b/g).length;
	}
	let endTime = performance.now(); // Record end time
	let timeTaken = (endTime - startTime) / 1000; // Time taken in seconds

	redactedText.textContent = userText;

	// Display stats
	document.getElementById("stats").textContent = `
	Redactr stats: 
        Words Scanned: ${wordsScanned}
        Words Matched: ${wordsMatched}
        Characters Scrambled: ${charactersScrambled}
        Time Taken: ${timeTaken.toFixed(2)} seconds
    `;
};

redactBtn.addEventListener("click", redaction);
