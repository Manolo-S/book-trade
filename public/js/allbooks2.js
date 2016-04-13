'use strict';

(function(){
	var owner;


	

	function displayBook(book){
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
		div += '<p id="industryIdentifier">' + book.industryIdentifier + '</p>';
		div += '<span id="request-details">' + book.owner + ',' + book.industryIdentifier + ',' + book.timestamp + '</span>';
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
			var requestDetails = target.siblings('#request-details').text();
			console.log(requestDetails);
			target.parents('.book').remove();
			$.post('http://localhost:3000/request-book', {'requestDetails': requestDetails});
		});
	}
	
	$.get('http://localhost:3000/get-all-books', usersDataFun);

})();