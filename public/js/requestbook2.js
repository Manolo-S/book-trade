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

		for (var i = 0; i < booksArr.length; i++) {
			var bookOffer = booksArr[i];
			var div = '<div class="book">'; //start format book display
			div += '<div class="row">';
			div += '<div class="col-sm-3">';
			if (bookOffer.image && bookOffer.image !== 'no-image') {
				div += '<img src="' + bookOffer.image + '">';
			}
			div += '</div>'; // col-sm-3
			div += '<div class="col-sm-9 book-details">';
			div += '<p class="book-title">' + bookOffer.title + '</p>';
			div += '<button type="button" class="btn btn-primary btn-xs swap-button">Offer to swap</button>';
			if (bookOffer.authors) {
				div += '<p class="authors">by ' + bookOffer.authors + '</p>';
			}
			div += '<p>' + bookOffer.publishedDate + '</p>';
			if (bookOffer.pages) {
				div += '<p>' + bookOffer.pages + ' pages</p>';
			}
			div += '<p>' + 'Language: ' + bookOffer.language + '</p>';
			div += '<p id="industryIdentifier">' + bookOffer.industryIdentifier + '</p>';
			div += '<span class="offered-book">' + bookOffer.owner + ',' + bookOffer.image + ',';
			div +=  bookOffer.publishedDate + ',' + bookOffer.pages + ',' + bookOffer.language + ',';
			div +=  bookOffer.industryIdentifier + ',' + bookOffer.timestamp + '</span>';
			div += '<span id="title">' + bookOffer.title + '</span>';
			div += '<span id="authors">' + bookOffer.authors + '</span>';
			div += '</div>'; //col-sm-9
			div += '</div>'; // row
			div += '</div>'; //end format book display
			$('#mybooks').append(div);
		}

		$('.swap-button').click(function(e){
			var target = $(e.target);
			var title = target.siblings('#title').text();
			var authors = target.siblings('#authors').text();
			var offeredBook = target.siblings('.offered-book').text();
			offeredBook = offeredBook.split(',');
			var owner = offeredBook[0] + ',' + offeredBook[1] + ',' + offeredBook[2];
			var image = offeredBook[3];
			var publishedDate = offeredBook[4];
			var pages = offeredBook[5];
			var language = offeredBook[6];
			var industryIdentifier = offeredBook[7];
			var timestamp = offeredBook[8];
	        // console.log('book', book);

			offeredBook = {owner: owner, image: image, title: title, authors: authors, publishedDate: publishedDate,
	            pages: pages, language: language, industryIdentifier: industryIdentifier, timestamp: timestamp};
			// console.log('offeredBook', offeredBook);

			var request = {requestedBook: book, offeredBook: offeredBook};
			console.log('request', request);
			$.post('http://localhost:3000/request-swap', {'swapProposal': {requestedBook: book, offeredBook: offeredBook}});
			$.post('http://localhost:3000/request-book', {'bookRequest': {requestedBy: user, bookDetails: bookDetails}});

			//TODO: message that book has been requested
			// window.close()
		});
	}

	$('.close-button').click(function(){window.close()});

	$.post('http://localhost:3000/get-my-books', {'user': user}, displayBooks);

})();