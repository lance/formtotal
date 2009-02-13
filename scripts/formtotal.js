/**
* This is a simple javascript class that will add up input fields 
* with a class of 'addend' in a form and place the running total
* in an input field with a user-defined id.  In this sample, the
* running total is in the input field with the ID 
* 'subtotal' The running total field is disabled by default.
*
* Each time the total field is updated, a cookie is set in the
* browser to maintain the total value.  Any form field with the ID
* of 'total' will be prepopulated with the value of this cookie
* and the 'total' field will be disabled.
*
* Author: Lance Ball, Shovelpunks, Inc.
*/
var addendClassName = 'addend';
var totalFieldID    = 'total';
var cookieName      = 'total';

Event.observe(window, 'load', initialize);

var Summarizer = Class.create({
	addends : 0,
	total_field : 0,
	cookieName : 0,
	
	initialize: function(addends, total_field, cookieName) {
		this.addends = addends;
		this.total_field = total_field;
		this.cookieName = cookieName;
		
		for(i = 0; i < this.addends.length; i++) {
			Event.observe(this.addends[i], 'change', this.summarize.bindAsEventListener(this));
		}
		this.prepopulate();
		this.set_cookie(0);
	},
	
	set_cookie: function(total) {
		document.cookie = cookieName+"="+total+"; path=/";
	},
	
	read_cookie: function(cookieName) {
		var theCookie = ""+document.cookie;
		var ind = theCookie.indexOf(cookieName);
		if (ind==-1 || cookieName=="") {return "";} 
		else {
			var ind1=theCookie.indexOf(';',ind);
			if (ind1==-1) ind1=theCookie.length; 
			return unescape(theCookie.substring(ind+cookieName.length+1,ind1));	
		}
	},

	prepopulate: function() {
		value = this.read_cookie(this.cookieName);
		if (value && $(this.total_field)) {
			$(this.total_field).value = value;
		}
		$(this.total_field).disabled = true;
	},	
	
	summarize: function() {
		total = 0;
		for(i = 0; i < this.addends.length; i++) {
			if (this.addends[i].value) {
				var fieldvalue = this.addends[i].value;
				value = parseFloat(fieldvalue);
				if (value) {
					total += value;
				} else { 
					alert(fieldvalue + " is not a number."); 
				}
			}
		}
		$(this.total_field).value = total;
		this.set_cookie(total);
	}
	
});

function initialize() {
	// var summary_fields = [];
	// for(var i=1; i<6; i++) {
	// 	elementID = "invoice_amount_" + i;
	// 	if ($(elementID)) {
	// 		summary_fields.push($(elementID));
	// 	}
	// }
	summary_fields = document.getElementsByClassName(addendClassName);
	var summarizer = new Summarizer(summary_fields, totalFieldID, cookieName);
}


