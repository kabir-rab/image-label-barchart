define([
		"qlik", 
		"jquery", 
		"./lib/js/image-label-barchart-properties",
		"./lib/js/image-label-barchart-initialprops", 
		"text!./lib/css/image-label-barchart.css"
	],
	function(qlik, $, props, initProps, cssContent) {
		'use strict';
		var palette = [
			"#b0afae",
			"#7b7a78",
			"#545352",
			"#4477aa",
			"#7db8da",
			"#b6d7ea",
			"#46c646",
			"#f93f17",
			"#ffcf02",
			"#276e27",
			"#ffffff",
			"#000000"
		],
		support = {
			snapshot: true,
			export: true,
			exportData : true
		};

		$("<style>").html(cssContent).appendTo("head");
		
		
		return {
			initialProperties : initProps,
			definition : props,
			support : support,

			paint : function($element, layout) {
							
				var self = this, html = "", measures = layout.qHyperCube.qMeasureInfo, w = $element.width() - 60, qData = layout.qHyperCube.qDataPages[0], vmax = (measures && measures[0]) ? measures[0].qMax * 1.25 : 1;
				if(qData && qData.qMatrix) {
					qData.qMatrix.forEach(function( row) {
						if(row.length > 1) {
							//dimension is first, measure second
							var dim = row[0], meas = row[1], profilepic = row[0].qAttrExps.qValues[0].qText, barColour = row[0].qAttrExps.qValues[1].qText;
							//console.log(barColour, "colour test");
							if(dim.qIsOtherCell) {
								dim.qText = layout.qHyperCube.qDimensionInfo[0].othersLabel;
							}
							html += '<div title="' + dim.qText + ':' + meas.qText + '"';
							//total (-1) is not selectable
							if(dim.qElemNumber !== -1) {
								html += "class='selectable' data-value='" + dim.qElemNumber + "'"
							}
							html += '>';
							html += "<div class='item-label' style='width:40px;'><img src='"+ profilepic +"' alt='Avatar' align='right'></div>";
							html += "<div class='bar-2' style='background-color:"+barColour+"; width:" + Math.round(w * (meas.qNum / vmax )) + "px;'>" + dim.qText + "</div><div class='measure-text' style='width:" + Math.round((w-5)-(w * (meas.qNum / vmax ))) + "px;'>"+ meas.qText + "</div>";
							html += "<div class='item-label-gap' style='width:40px;'>&nbsp;</div><div class='bar-gap' style='width:" + Math.round(w) + "px;'></div>";
							html += "</div>";
						}
					});
					$element.html(html);
					$element.find('.selectable').on('click', function() {
						if(this.hasAttribute("data-value")) {
							var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
							self.selectValues(dim, [value], true);
							this.classList.toggle("selected");
						}
					});
				}

				$element.css("background-color", palette[layout.chartColor]);

				return qlik.Promise.resolve();
			}
		};
	}
);
