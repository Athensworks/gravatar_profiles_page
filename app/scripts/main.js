'use strict';

var NAMES_URL = 'https://gist.githubusercontent.com/rickychilcott/5332681/raw/829d68b9fa6ff897d8d9fca71f71b059b3783203/athensworks_members.json';
var GRAVATAR_URL = 'https://en.gravatar.com/';
var COL = "left";
var users = [];

var render = function(user) {
	if(user.name.formatted === undefined) {
	    return '';
	}
	return '<div class="media">' +
						'<img class="media-left" src="' + user.thumbnailUrl + '"></img>' +
						'<div class="media-body">' +
							'<h4 class="media-heading">' + user.name.formatted + '</h4>' +
							'<p>' + user.aboutMe + '</p>' +
						'</div>' +
					'</div>' +
					'<hr />';
};

/*
<div class="media">
  <a class="media-left" href="#">
    <img src="..." alt="...">
  </a>
  <div class="media-body">
    <h4 class="media-heading">Media heading</h4>
    ...
  </div>
</div>
*/


$(document).ready(function(){
    $.getJSON(NAMES_URL, function(data){
        users = data;
				users.map(function(user){
					$.getJSON(GRAVATAR_URL + user + '.json?callback=?', function(data){
		    		if(COL === "left") {
							COL = "right";
							document.querySelector('.users-left').innerHTML = document.querySelector('.users-left').innerHTML + render(data.entry[0]);
						} else {
							COL = "left";
							document.querySelector('.users-right').innerHTML = document.querySelector('.users-right').innerHTML + render(data.entry[0]);
						}
					});
			});
    });
});
