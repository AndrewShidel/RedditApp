window.onload = function() {
	var httpClient = new HttpClient();
	function getPage(subreddit, callback) {
		var url = "http://www.reddit.com/"
		if (subreddit !== "") {
			url += "r/" + subreddit;
		}
		url += ".json";
		httpClient.get(url, function(data) {
		    callback(JSON.parse(data));
		});
	}
	var params = URLQuery();
	var subreddit = "";
	if (params.r) {
		subreddit = params.r;
	}
	getPage(subreddit, function(data) {
		document.getElementById("posts").innerHTML = buildPage(data);
	});
}

function buildPage(data) {
	var data = data.data.children;
	var html = "";
	for(var i=0; i<data.length; i++) {
		html += buildCard(i, data[i].data);
	}
	return html;
}

function buildCard(i, data) {
	var html = '<div class="card">';
	html += '<span class="rank">'+i+"</span>";
	html += '<div class="vote"><div class="upvote"></div><div class="score">'+data.score+'</div><div class="downvote"></div></div>'
	if (data.thumbnail.indexOf(".") >= 0) {
		html += '<a target="_blank" class="thumbnail" href="'+data.url+'"><img src="'+data.thumbnail+'" width="60" height="60"></a>';
	}
	html += '<div class="mainPost">';
	html += '<a target="_blank" class="title" href="'+data.url+'">'+data.title+'</a>';
	html += '</div>';
	html += '<div class="commentButton" onclick="openComments(\"'+data.permalink+'\")"></div>';
	html += '</div>';
	return html;
}

function URLQuery () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
  return query_string;
}