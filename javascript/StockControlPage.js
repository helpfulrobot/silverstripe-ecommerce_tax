/**
*@author nicolaas[at]sunnysideup . co . nz
*
**/

(function($){
	$(document).ready(
		function() {
			StockControlPage.init();
		}
	);


})(jQuery);


var StockControlPage = {

	url: "update-stock",
		set_url: function(s) {this.url = s;},

	ulSelector: "#StockProductObjects",

	inputSelector: "#StockProductObjects input.updateField",

	feedbackSelector: ".StockObjectsFeedback",

	historyLinkSelector: ".history a",

	init: function () {
		jQuery(".loadHistoryHere").hide();
		jQuery(StockControlPage.inputSelector).change(
			function () {
				var nameValue = jQuery(this).attr("name");
				jQuery(this).addClass("loading");
				var element = this;
				var nameArray = nameValue.split("/");
				var action = nameArray[0];
				var id = nameArray[1];
				var value = parseInt(jQuery(this).val());
				jQuery.get(
					StockControlPage.url + id + "/" + value + "/",
					{},
					function(data) {
						jQuery(StockControlPage.feedbackSelector).html(data)
						jQuery(element).removeClass("loading");
						jQuery(element).val("");
						jQuery(".item" + id).text(value + " = ");
					}
				);
			}
		);

		jQuery(StockControlPage.historyLinkSelector).click(
			function() {
				var identifier = jQuery(this).attr("rel");
				var selector = "#"+identifier;
				if(jQuery(selector).is(":hidden")) {
					var url = jQuery(this).attr("href");
					jQuery.get(
						url,
						{},
						function(data) {
							jQuery(selector).html(data);
							jQuery(selector).slideDown();
						}
					);
				}
				else {
					jQuery(selector).slideUp();
				}
				return false;
			}
		);
	}



}


