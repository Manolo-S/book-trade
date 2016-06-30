'use strict';


(function(){
	// var user = 'facebook,6789,klaas'; //TODO: change to store userid string after setting login via twitter/facebook
	var user = 'twitter,1234,jan';  //TODO: change to store userid string after setting login via twitter/facebook
	var userReg = 'jan,1234,twitter';
	var owner;
	store.remove('name');
	store.remove('email');
	store.set('user', user);
	var user = store.get('user');
	// var requestBookUrl = 'https://book-trade-ms.herokuapp.com/request-book';
	var requestBookUrl = 'http://localhost:3000/request-book';
	// var getAllBooksUrl = 'https://book-trade-ms.herokuapp.com/get-all-books'
	var getAllBooksUrl = 'http://localhost:3000/get-all-books'
	var book;
	var settings = 'http://localhost:3000/settings';
	var name = $('#name').text();
	var email = $('#email').text();



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
			//$.post('http://localhost:3000/request-book', {'bookRequest': {requestedBy: user, bookDetails: bookDetails}});
			store.set('book', book);
			window.open(requestBookUrl);
		});
	}

	$('#settings').click(function(e){
		e.preventDefault();
		var name = store.get('name') || "janneman"; 
		var email = store.get('email') || "janneman@hotmail";
		$('#myModal').modal('show');
		$('#name-modal').val(name);
		$('#email-modal').val(email);
	})

	$('#save').click(function(){
		var name-modal = $('#name-modal').val();
		var email-modal = $('#email-modal').val();
		if (name === name-modal && email === email-modal){
			$('#myModal').modal('hide');
			return;
		}
		newUser = (!store.get('swapbooksuser'))?false:true;

		store.set('name', name-modal);
		store.set('email', email-modal);
		$.post(settings, {'user', user, 'name': name-modal, 'email': email-modal, 'newuser', newUser}); //TODO implement routes/settings.js and add route to app.js
		$('#myModal').modal('hide');
	})
	
	$.get(getAllBooksUrl, usersDataFun);

})();

