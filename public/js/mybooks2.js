'use strict';

(function(){
	var user = 'twitter,1234,Jan';  //TODO: change to store userid string after setting login via twitter/facebook
	store.set('user', user);

	function displayBooks(booksArr){
		console.log('data', booksArr);
		$('#content').empty();

		for (var i = 0; i < booksArr.length; i++) {
			var book = booksArr[i];
			var div = '<div class="book">'; //start format book display
			div += '<div class="row">';
			div += '<div class="col-sm-3">';
			if (book.image && book.image !== 'no-image'){
				div += '<img src="' + book.image + '">';
			}	
			div += '</div>'; // col-sm-3
			div += '<div class="col-sm-9 book-details">';
			div += '<p class="book-title">' + book.title + ' ' + '</p>';
			div += '<button type="button" class="btn btn-danger btn-xs remove-button">Remove book</button>';
			if (book.authors){
				div += '<p class="authors">by ' + book.authors + '</p>';
			}
			div += '<p>' + book.publishedDate + '</p>';
			if (book.pages){
				div += '<p>' + book.pages + ' pages</p>';
			}
			div += '<p>' + 'Language: ' + book.language + '</p>';
			div += '<p id="industryIdentifier">' + book.industryIdentifier + '</p>';
			div += '<span id="timestamp">' + book.timestamp + '</span>';
			div += '<span id="user">' + book.owner + '</span>';
			div += '</div>'; //col-sm-9
			div += '</div>'; // row
			div += '</div>'; //end format book display
			$('#content').append(div);
		}
		$('.remove-button').click(function(e){
			var target = $(e.target);
			var industryIdentifier = target.siblings('#industryIdentifier').text();
			var timestamp = target.siblings('#timestamp').text();
			var user = target.siblings('#user').text();
			target.parents('.book').remove();
			$.post('http://localhost:3000/remove-book', {'user': user, 'industryIdentifier': industryIdentifier, 'timestamp': timestamp});
		});
	}
	
	$.post('http://localhost:3000/get-my-books', {'user': user}, displayBooks);

})();