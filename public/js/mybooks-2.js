'use strict';

function handleResponse(response) {
	for (var i = 0; i < response.items.length; i++) {
		var item = response.items[i];
		// in production code, item.text should have the HTML entities escaped.
		document.getElementById('content').innerHTML += '<br>' + item.volumeInfo.title;
	}
}

$('#search-button').click(function() {
	var searchStr = $('#search-box').val();
	var searchURL = encodeURI('https://www.googleapis.com/books/v1/volumes?q=' + searchStr);
	console.log(searchURL);
	$.getJSON(searchURL, handleResponse );
});

$('#search-box').keypress(function(e) {
	if (e.which === 13) {
		var searchStr = window.$('#search-box').val();
		var searchURL = encodeURI('https://www.googleapis.com/books/v1/volumes?q=' + searchStr);
		console.log(searchURL);
		$.getJSON(searchURL, handleResponse );
		console.log(searchStr);
	}
});