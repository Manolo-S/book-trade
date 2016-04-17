'use strict';

(function (){
	var user = store.get('user');
	var book = store.get('book');
	// var owner = book.owner;
	console.log(book);
	var image = book.image;
	var title = book.title;
	var authors = book.authors;
	var publishedDate = book.publishedDate;
	var pages = book.pages;
	var language = book.language;
	var industryIdentifier = book.industryIdentifier;
	var timestamp = book.timestamp;
	var div = '<div class="book">'; //start format book display
	div += '<div class="row">';
	div += '<div class="col-sm-3">';
	if (image !== 'no-image') {
		div += '<img src="' + image + '">';
	}
	div += '</div>'; // col-sm-3
	div += '<div class="col-sm-9 book-details">';
	div += '<p class="book-title">' + title + '</p>';
	if (authors) {
		div += '<p class="authors">by ' + authors + '</p>';
	}
	div += '<p>' + publishedDate + '</p>';
	if (pages) {
		div += '<p>' + pages + ' pages</p>';
	}
	div += '<p>' + 'Language: ' + language + '</p>';
	div += '<p id="industryIdentifier">' + industryIdentifier + '</p>';
	div += '</div>'; //col-sm-9
	div += '</div>'; // row
	div += '</div>'; //end format book display
	console.log(div);
	$('#requested-book').append(div);

	function displayBooks(booksArr) {
		// $('#mybooks').empty();

		for (var i = 0; i < booksArr.length; i++) {
			var book = booksArr[i];
			var div = '<div class="book">'; //start format book display
			div += '<div class="row">';
			div += '<div class="col-sm-3">';
			if (book.image && book.image !== 'no-image') {
				div += '<img src="' + book.image + '">';
			}
			div += '</div>'; // col-sm-3
			div += '<div class="col-sm-9 book-details">';
			div += '<p class="book-title">' + book.title + '</p>';
			div += '<button type="button" class="btn btn-primary btn-xs swap-button">Offer to swap</button>';
			if (book.authors) {
				div += '<p class="authors">by ' + book.authors + '</p>';
			}
			div += '<p>' + book.publishedDate + '</p>';
			if (book.pages) {
				div += '<p>' + book.pages + ' pages</p>';
			}
			div += '<p>' + 'Language: ' + book.language + '</p>';
			div += '<p id="industryIdentifier">' + book.industryIdentifier + '</p>';
			div += '<span id="timestamp">' + book.timestamp + '</span>';
			div += '<span id="user">' + book.owner + '</span>';
			div += '<span id="requestedBy">' + book.requestedBy + '</span>';
			div += '</div>'; //col-sm-9
			div += '</div>'; // row
			div += '</div>'; //end format book display
			$('#mybooks').append(div);
		}
	}

	$('.swap-button').click(function(){window.close()});

	$.post('http://localhost:3000/get-my-books', {'user': user}, displayBooks);

})();