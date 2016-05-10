'use strict';

(function(){
	var owner;
	var user = store.get('user');
	var url = 'http://localhost:3000/request-book';
	var book;

	function displayBook(book){
		// if (book.requestedBy !== ""){return;}
		var industryIdentifier = book.industryIdentifier;
		var div = '<div class="book">'; //start format book display
		div += '<div class="row">';
		div += '<div class="col-sm-3">';
		if (book.image && book.image !== 'no-image'){
			div += '<img src="' + book.image + '" alt="book cover">';
		}	
		div += '</div>'; // col-sm-3
		div += '<div class="col-sm-9 book-details">';
		div += '<cite class="book-title">' + book.title + ' ' + '</cite>';
		div += '<button type="button" class="btn btn-primary btn-xs request-button">Request book</button>';
		if (book.authors){
			div += '<p class="authors">by ' + book.authors + '</p>';
		}
		div += '<p>' + book.publishedDate + '</p>';
		if (book.pages){
			div += '<p>' + book.pages + ' pages</p>';
		}
		div += '<p>' + 'Language: ' + book.language + '</p>';
		div += '<p>' + book.industryIdentifier + '</p>';
		div += '<span class="book">' + book.owner + ',' + book.image + ',';
		div +=  book.publishedDate + ',' + book.pages + ',' + book.language + ',';
		div +=  book.industryIdentifier + ',' + book.timestamp + '</span>';
		div += '<span id="title">' + book.title + '</span>';
		div += '<span id="authors">' + book.authors + '</span>';
		div += '</div>'; //col-sm-9
		div += '</div>'; // row
		div += '</div>'; //end format book display
		$('#content').append(div);		
	}

	

	function usersDataFun(results){
		var usersArr = results.results;

		$('#content').empty();

		for (var i = 0; i < usersArr.length; i++) {
			var userData = usersArr[i];
			owner = userData.user;
			userData.books.map(displayBook);
		}

		$('.request-button').click(function(e){
			var target = $(e.target);
			var title = target.siblings('#title').text();
			var authors = target.siblings('#authors').text();
			var book = target.siblings('.book').text();
			book = book.split(',');
			var owner = book[0] + ',' + book[1] + ',' + book[2];
			var image = book[3];
			var publishedDate = book[4];
			var pages = book[5];
			var language = book[6];
			var industryIdentifier = book[7];
			var timestamp = book[8];
			book = {owner: owner, image: image, title: title, authors: authors, publishedDate: publishedDate,
	            pages: pages, language: language, industryIdentifier: industryIdentifier, timestamp: timestamp};
	        console.log('book', book);
			// target.parents('.book').remove();
			// $.post('http://localhost:3000/request-book', {'bookRequest': {requestedBy: user, bookDetails: bookDetails}});
			store.set('book', book);
			window.open(url);
		});
	}
	
	$.get('http://localhost:3000/get-all-books', usersDataFun);

})();