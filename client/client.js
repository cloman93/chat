Meteor.subscribe('tweets');

Template.tweets.tweets = function() {
	return Tweets.find({}, {sort: {time: -1, limit: 50}}).fetch();
}

Template.new_tweet.events = {
	'click #submit' : function (event) {
			if (Meteor.user()) {
				console.log(Meteor.user());
				//use jquery here
				var author = Meteor.user().emails[0].address;
				var body = document.getElementById('tweet');
				if (body.value.length < 140 && body.value.length > -1) {
					Tweets.insert({
						author: author,
						tweet: body.value,
						time: Date.now(), //moment js won't install
					});
					document.getElementById('tweet').value='';
					chars = 140;
				} else {
					alert("Tweets cannot exceed 140 characters!");
				}
			} else {
				alert("You must be logged in to post.");
			}
		},
		

	'keydown #tweet' : function(event) {
		var body = document.getElementById('tweet');
		if (body.value == "" || body.value == null) {
			var remaining = 140;
		} else {
			var remaining = 140 - body.value.length;
		}
		console.log(remaining);
		$('#count').text('Characters left: ' + remaining);
	}
	
}

Template.tweets.logged_in = function() {
	return (Meteor.user() != null)
}