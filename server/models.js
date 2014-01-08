Meteor.publish('tweets', function() {
	// possibly overload this function to return the correct tweets
	// for profiles
	return Tweets.find({}, {sort: {time: -1, limit: 50}});
});

if (true) 
	{Tweets.allow({
		insert: function() {
			return true;
		}
	});
}