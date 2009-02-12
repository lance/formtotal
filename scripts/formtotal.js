/**
* This is a simple javascript class that will add up input fields 
* with a class of 'addend' in a form and place the running total
* in an input field with a user-defined id.  In this sample, the
* running total is in the input field with the ID 
* 'subtotal' The running total field is disabled 
* by default.
*
* Each time the total field is updated, a cookie is set in the
* browser to maintain the total value.  Any form field with the ID
* of 'total' will be prepopulated with the value of this cookie
* and the field will be disabled.
*
* Author: Lance Ball, Shovelpunks, Inc.
*/
var addendClassName = 'addend';
var totalFieldID    = 'subtotal';
var prepopulatedID  = 'total';

Event.observe(window, 'load', initialize);
Event.observe(window, 'load', prepopulate);

var Summarizer = Class.create({
	addends : 0,
	total_field : 0,
	
	initialize: function(addends, total_field) {
		this.addends = addends;
		this.total_field = total_field;
		for(i = 0; i < this.addends.length; i++) {
			Event.observe(this.addends[i], 'change', this.summarize.bindAsEventListener(this));
		}
	},
	
	set_cookie: function(total) {
		document.cookie = "total="+total+"; path=/";
	},
	
	summarize: function() {
		total = 0;
		for(i = 0; i < this.addends.length; i++) {
			if (this.addends[i].value) {
				value = parseInt(this.addends[i].value);
				if (value) {
					total += value;
				} else { 
					alert(this.addends[i].value + " is not a number."); 
				}
			}
		}
		$(this.total_field).value = total;
		this.set_cookie(total);
	}
	
});

function initialize() {
	summary_fields = document.getElementsByClassName(addendClassName);
	$(totalFieldID).disabled = true;
	new Summarizer(summary_fields, totalFieldID);
}

function read_cookie(cookieName) {
	var theCookie = ""+document.cookie;
	var ind = theCookie.indexOf(cookieName);
	if (ind==-1 || cookieName=="") {return "";} 
	else {
		var ind1=theCookie.indexOf(';',ind);
		if (ind1==-1) ind1=theCookie.length; 
		return unescape(theCookie.substring(ind+cookieName.length+1,ind1));	
	}
}

function prepopulate() {
	value = read_cookie('total');
	if (value && $(prepopulatedID)) {
		$(prepopulatedID).value = value;
		$(prepopulatedID).disabled = true;
	}
}

