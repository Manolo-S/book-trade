'use strict';
console.log('swaps2 called');


(function() {

	var user = store.get('user');

	function whoseRequest(results) {
		// console.log('whoserequest', results);
		var requests = results.requests;
		$('#requests-mine').empty();
		$('#requests-others').empty();
		requests.map(displaySwap);
	}


	function displaySwap(swap) {
		console.log('displaybooks called');
		// console.log(swap.offeredBook.owner, user);
		var request = swap.offeredBook.owner === user ? '#requests-mine' : '#requests-others';
		// console.log(request);
		var swapArr = [swap.offeredBook, swap.requestedBook];
		// console.log(swapArr);


		for (var i = 0; i < swapArr.length; i++) {
			console.log(swapArr[i]);
			var book = swapArr[i];
			var userName = (book.owner.split(','))[2];
			if (i === 0 && user === userName){
				var div = '<h4>Swap:</h4>';
			} 

			if (i === 0 && user!== userName) {
				var div = '<h4>User ' + userName + ' would like to swap:</h4>';
			}

			if (i === 1){
				var div = '<h4>For:</h4>';
			}

			div += '<div class="book">'; //start format book display
			div += '<div class="row">';
			div += '<div class="col-sm-3">';
			if (book.image && book.image !== 'no-image') {
				div += '<img src="' + book.image + '">';
			}
			div += '</div>'; // col-sm-3
			div += '<div class="col-sm-9 book-details">';
			div += '<p class="book-title">' + book.title + '</p>';
			div += '<button type="button" class="btn btn-danger btn-xs remove-button">Remove request</button>';
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
			div += '<span id="user">' + user + '</span>';
			div += '<span id="requestedBy">' + book.requestedBy + '</span>';
			div += '<span id="owner">' + book.owner + '</span>';
			div += '</div>'; //col-sm-9
			div += '</div>'; // row
			div += '</div>'; //end format book display
			console.log(div);
			$(request).append(div);
		}

		$('.remove-button').click(function(e) {
			var target = $(e.target);
			var industryIdentifier = target.siblings('#industryIdentifier').text();
			var timestamp = target.siblings('#timestamp').text();
			var user = target.siblings('#user').text();
			var requestedBy = target.siblings('#requestedBy').text();
			var owner = target.siblings('#owner').text();
			// target.parents('.book').remove();
			$.post('http://localhost:3000/remove-request', {
				user: user,
				industryIdentifier: industryIdentifier,
				timestamp: timestamp,
				requestedBy: requestedBy,
				owner: owner
			});
		});
	}

	$.post('http://localhost:3000/requested-books', {
		'user': user
	}, whoseRequest);


})();