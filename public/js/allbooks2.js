'use strict';
//TODO work on request button if clicked and no swap-email and swap-user available display modal
//alter title of modal to say 'please enter your'

(function(){
	var user = 'facebook,6789,klaas'; //TODO: change to store userid string after setting login via twitter/facebook
	// var user = 'twitter,1234,jan';  //TODO: change to store userid string after setting login via twitter/facebook
	var owner;
	store.remove('swap-user');
	store.remove('swap-email');
	store.set('user', user);
	var user = store.get('user');
	// var requestBookUrl = 'https://book-trade-ms.herokuapp.com/request-book';
	var requestBookUrl = 'http://localhost:3000/request-book';
	// var getAllBooksUrl = 'https://book-trade-ms.herokuapp.com/get-all-books'
	var getAllBooksUrl = 'http://localhost:3000/get-all-books'
	var book;
	var settingsUrl = 'http://localhost:3000/settings';
	var name;
	var email;
	var newUser = 'yes';



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

		console.log('usersfun')
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
		var name = store.get('swap-user'); 
		var email = store.get('swap-email');
		$('#myModal').modal('show');
		$('#name-modal').val(name);
		$('#email-modal').val(email);
	})

	$('#save').click(function(){
		var name = store.get('swap-user'); 
		var email = store.get('swap-email');
		var nameModal = $('#name-modal').val();
		var emailModal = $('#email-modal').val();
		if (name === nameModal && email === emailModal){
			$('#myModal').modal('hide');
			return;
		}
		store.set('swap-user', nameModal);
		store.set('swap-email', emailModal);
		$.post(settingsUrl, {'user': user, 'name': nameModal, 'email': emailModal, 'newuser': newUser}); 
		$('#myModal').modal('hide');
	})

	function callback(results){
		var results = results.results[0];
		store.set('swap-user', results.name);
		store.set('swap-email', results.email);
	}

	$.get(getAllBooksUrl, usersDataFun);

	if ($('#username').text() !== "" ){
		//compose var user out of socialmedia, id, username TODO
		$.post(settingsUrl, {'user': user, 'newuser': 'get'}, callback); //rename key 'newuser'
	}

})();

