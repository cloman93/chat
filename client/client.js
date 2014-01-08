Meteor.subscribe('tweets');


Template.tweets.tweets = function() {
	return Tweets.find({}).fetch();
}


Template.new_tweet.events = {
	'click #submit' : function (event) {
			if (Meteor.user()) {
				console.log(Meteor.user());
				//USE JQUERY HERE
				var author = Meteor.user().emails[0];
				var body = document.getElementById('tweet');
				if (body.value.length < 140 && body.value.length > -1) {
					Tweets.insert({
						author: author,
						tweet: body.value,
						time: Date.now(),
					});
					Template.new_tweet.tweet.value = ''; //maybe document.getEl?
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
			var remaining = 141 - body.value.length;
		}
		console.log(remaining);
		Template.new_tweet.chars = remaining;
	}
	
}

/*Template.new_tweet.chars.events = {
	'keydown input#tweet' : function(event) {
		var body = document.getElementById('tweet');
		if (body == "" || body == null) return 140;
		var remaining = 140 - body.length;
		return remaining;
	}
}*/

Template.tweets.logged_in = function() {
	return (Meteor.user() != null)
}