'use strict';

(function(){
	var owner;
	var user = store.get('user');

	function displayBook(book){
		if (book.requestedBy !== ""){return;}
		var industryIdentifier = book.industryIdentifier;
		var div = '<div class="book">'; //start format book display
		div += '<div class="row">';
		div += '<div class="col-sm-3">';
		if (book.image && book.image !== 'no-image'){
			div += '<img src="' + book.image + '">';
		}	
		div += '</div>'; // col-sm-3
		div += '<div class="col-sm-9 book-details">';
		div += '<p class="book-title">' + book.title + ' ' + '</p>';
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
		div += '<span class="book-details">' + book.owner + ',' + book.image + ',' + book.title + ',';
		div +=  book.authors + ',' + book.publishedDate + ',' + book.pages + ',' + book.language + ',';
		div +=  book.industryIdentifier + ',' + book.timestamp + '</span>';
		div += '</div>'; //col-sm-9
		div += '</div>'; // row
		div += '</div>'; //end format book display
		$('#content').append(div);		
	}

	

	function usersDataFun(results){
		var usersArr = results.results;
		console.log(usersArr);

		$('#content').empty();

		for (var i = 0; i < usersArr.length; i++) {
			var userData = usersArr[i];
			owner = userData.user;
			userData.books.map(displayBook);
		}

		$('.request-button').click(function(e){
			var target = $(e.target);
			var bookDetails = target.siblings('.book-details').text();
			target.parents('.book').remove();
			$.post('http://localhost:3000/request-book', {'bookRequest': {requestedBy: user, bookDetails: bookDetails}});
		});
	}
	
	$.get('http://localhost:3000/get-all-books', usersDataFun);

})();