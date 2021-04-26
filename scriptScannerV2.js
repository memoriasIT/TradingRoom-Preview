// @memoriasIT - 26/04/2021
// Preview coin's chart at https://tools.tradingroom.io/#/

var toggleChart = false;
// Add all graphs to table
$.getScript("https://s3.tradingview.com/tv.js", () => console.log("loaded script!")).done((script, textStatus) => {
    var n = 5;
    var parent = document.querySelector(`#price_block > div > div.price > div:nth-child(${n})`);
    while (!!parent) {
        // Ticker
        var ticker = document.querySelector(`#price_block > div > div.price > div:nth-child(${n}) > div.cont-data > div > span.ng-binding.name-normal`);
        if (!!ticker) {
            ticker.classList.add("hover-popup");
            ticker.id = `${ticker.innerText}`;

            // Add trading view embed graph
            var divTV = document.createElement("div");
            divTV.classList.add("popup-container");

            var graphTV = document.createElement("div");
            graphTV.id = `tv-${ticker.innerText}`;
            graphTV.classList.add("popup-box");

            parent.appendChild(divTV);
            divTV.appendChild(graphTV);
        }

        // Prepare next iteration of child
        n++;
        parent = document.querySelector(`#price_block > div > div.price > div:nth-child(${n})`);
    }

    // Add mouse events on click
    $(".hover-popup").click(function () {
	toggleChart = !toggleChart;
	var tickerID = $(this).attr("id");
        console.log(tickerID);
	var containerID = `tv-${tickerID}`;
	if (toggleChart){
        	new TradingView.widget({
   	        	width: 980,
	            height: 610,
        	    symbol: tickerID,
	            interval: "60",
        	    timezone: "Etc/UTC",
	            theme: "dark",
        	    style: "1",
	            locale: "en",
        	    toolbar_bg: "#f1f3f6",
	            enable_publishing: false,
        	    allow_symbol_change: true,
	            show_popup_button: true,
        	    popup_width: "1000",
	            popup_height: "650",
        	    container_id: containerID,
	        });
        	$("#"+containerID).fadeIn(350);
		$("#popup-box").show();
	} else {
		// Hide div
		$("#"+containerID).fadeOut(350);
		$("#popup-box").hide();
		// Delete iframes for performance
		var iframes = document.querySelectorAll('iframe');
		for (var i = 0; i < iframes.length; i++) {
    			iframes[i].parentNode.removeChild(iframes[i]);
		}
	}

    });

    // Add styles
    var styles = `.popup-container{}.popup-box{position:fixed;margin:0;width:840px;height:400px;background-color:rgba(221, 221, 221,0);padding:0;z-index:1000;margin:auto;top:150px;left:30%;display:none}.popup-box div{clear:both}.popup-box h3{display:inline}.popup-box nav.close{float:right;font-size:20px;color:#000000;background:green;z-index:9999}`;

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
});
