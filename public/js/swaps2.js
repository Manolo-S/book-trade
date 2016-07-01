'use strict';

(function() {
	var removeRequestUrl = 'http://localhost:3000/remove-request';
	// var removeRequestUrl = 'https://book-trade-ms.herokuapp.com/remove-request';
	var requestedBooksUrl = 'http://localhost:3000/requested-books';
	// var requestedBooksUrl = 'https://book-trade-ms.herokuapp.com/requested-books';

	var user = store.get('user');

	function whoseRequest(results) {
		var requests = results.requests;
		requests.map(displaySwap);
		if ($('.requests-others').html() === ""){
			$('.requests-others').html('<h4 class="container"> No requests at the moment</h4>');
		}
		if ($('.requests-mine').html() === ""){
			$('.requests-mine').html('<h4 class="container"> No requests at the moment</h4>');
		}

		$('.remove-button').click(function(e) {  
			var target = $(e.target);
			var details = target.parents('.swap').find('.offered-book').text();
			var details = details.split(',');
			var industryIdentifier = details[0];
			var timestamp = details[1];
			var otherPartyUsername = details[2] + ',' +  details[3] + ',' + details[4];
			console.log(user, otherPartyUsername, industryIdentifier, timestamp);
			target.parents('.swap').remove();
			$.post(removeRequestUrl, {
				user: user,
				industryIdentifier: industryIdentifier,
				timestamp: timestamp,
				otherPartyUsername: otherPartyUsername
			});
		})
	}


	function displaySwap(swap) {
		var requesterName = swap.requesterName;
		var requesterEmail = swap.requesterEmail;
		console.log(requesterName, requesterEmail);
		var request = swap.offeredBook.owner === user ? '.requests-mine' : '.requests-others';
		var swapArr = [swap.offeredBook, swap.requestedBook];
		var otherPartyUsername = user === swap.offeredBook.owner? swap.requestedBook.owner : swap.offeredBook.owner;
		var div = '<div class="swap container">'

		for (var i = 0; i < swapArr.length; i++) {
			var book = swapArr[i];
			var userName = (book.owner.split(','))[2];

			if (i === 0 && user === book.owner){
				div += '<h4>I\'ll swap:</h4>';
			} 

			if (i === 0 && user!== book.owner) {
				div += '<h4>' + requesterName + ' (email: ' + requesterEmail + ')</span> would like to swap:</h4>';
			}

			if (i === 1){
				div += '<h4>For:</h4>';
			}

			div += '<div class="book">'; //start format book display
			div += '<div class="row">';
			div += '<div class="col-sm-3">';
			if (book.image && book.image !== 'no-image') {
				div += '<img src="' + book.image + '" alt="book cover">';
			}
			div += '</div>'; // col-sm-3
			div += '<div class="col-sm-9 book-details">';
			div += '<cite class="book-title">' + book.title + '</cite>';
			if (book.authors) {
				div += '<p class="authors">by ' + book.authors + '</p>';
			}
			div += '<p>' + book.publishedDate + '</p>';
			if (book.pages) {
				div += '<p>' + book.pages + ' pages</p>';
			}
			div += '<p>' + 'Language: ' + book.language + '</p>';
			div += '<p>' + book.industryIdentifier + '</p>';
			if (request === '.requests-mine' && i === 0){
				div += '<span class="offered-book">' + book.industryIdentifier + ',' + book.timestamp + ',' + otherPartyUsername + '</span>';
			}
			div += '</div>'; //col-sm-9
			div += '</div>'; // row
			div += '</div>'; //end format book display
		}

		if (request === '.requests-mine'){
			div += '<button type="button" class="btn btn-danger btn-xs remove-button pull-right">Remove request</button>'; 
		} 
		div += '</div>'///end swap
		$(request).append(div);		
	}


	$.post(requestedBooksUrl, {
		'user': user
	}, whoseRequest);


})();