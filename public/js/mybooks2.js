'use strict';

(function(){
	var user = 'twitter,12345,Jan';  //TODO: change to store userid string after setting login via twitter/facebook
	
	function displayBooks(booksArr){
		console.log('data', booksArr);
		var imageLink;
		for (var i = 0; i < booksArr.length; i++) {
			var book = booksArr[i];
			var div = '<div class="book">'; //start format book display
			div += '<div class="row">';
			div += '<div class="col-sm-3">';
			if (book.image){
				div += '<img src="' + book.image + '">';
				imageLink = book.image;
			} else {
				imageLink = 'no-image'; //some books have a link to an image but it's just a white block, so decided not to display anything if the book has no imagelink
			}	
			div += '</div>'; // col-sm-3
			div += '<div class="col-sm-9 book-details">';
			div += '<p class="book-title">' + book.title + ' ' + '</p>';
			div += '<button type="button" class="btn btn-primary btn-xs add-button">Add book</button>';
			if (book.authors){
				div += '<p class="authors">by ' + book.authors + '</p>';
			}
			div += '<p>' + book.publishedDate + '</p>';
			if (book.pages){
				div += '<p>' + book.pages + ' pages</p>';
			}
			div += '<p>' + 'Language: ' + book.language + '</p>';
			div += '<p>' + bookId + '</p>';
			div += '<span>{"owner": "' + user + '", "image": "' + imageLink + '", "title": "' + book.title;
			div += '", "authors": "' + authors + '", "publishedDate": "' + book.publishedDate;
			div += '", "pages": "' + book.pageCount + '", "language": "' + lang + '", "industryIdentifier": "' + bookId + '"}</span>';
			div += '</div>'; //col-sm-9
			div += '</div>'; // row
			div += '</div>'; //end format book display
			console.log(div);
			$('#content').append(div);
		}
	}


	store.set('user', user);
	$.post('http://localhost:3000/getmybooks', {'user': user}, displayBooks);


})();