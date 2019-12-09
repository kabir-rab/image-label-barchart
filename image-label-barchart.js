define([
		"qlik", 
		"jquery", 
		"./lib/js/image-label-barchart-properties",
		"./lib/js/image-label-barchart-initialprops",		
		"text!./lib/css/image-label-barchart.css"
	],
	function(qlik, $, props, initProps, cssContent) {
		'use strict';
		var support = {
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
				var self = this, 
					measures = layout.qHyperCube.qMeasureInfo, 
					elementWidth = $element.width() - 60, 
					qData = layout.qHyperCube.qDataPages[0], 
					vMax = (measures && measures[0]) ? measures[0].qMax * 1.25 : 1,
					html = "";

				if(qData && qData.qMatrix) {
					qData.qMatrix.forEach(function( row) {
						if(row.length > 1) {
							var dim = row[0], 
								meas = row[1], 
								profilePic = row[0].qAttrExps.qValues[0].qText, 
								barColour = row[0].qAttrExps.qValues[1].qText;
							
							if(dim.qIsOtherCell) {
								dim.qText = layout.qHyperCube.qDimensionInfo[0].othersLabel;
							}
							html += '<div title="' + dim.qText + ':' + meas.qText + '"';
							//total (-1) is not selectable
							if(dim.qElemNumber !== -1) {
								html += "class='selectable' data-value='" + dim.qElemNumber + "'"
							}
							html += '>';
							html += "<div class='qv-object-image-label-barchart-item-label qv-object-image-label-barchart-animated qv-object-image-label-barchart-fadeInTop' style='width:40px;'><img src='"+ profilePic +"' alt='Avatar' align='right'></div>";
							html += "<div class='qv-object-image-label-barchart-bar-2 qv-object-image-label-barchart-animated qv-object-image-label-barchart-fadeInTop' style='background-color:"+barColour+"; width:" + Math.round(elementWidth * (meas.qNum / vMax )) + "px;'";
							html += ">" + dim.qText + "</div><div class='qv-object-image-label-barchart-measure-text qv-object-image-label-barchart-animated qv-object-image-label-barchart-fadeInTop' style='width:" + Math.round((elementWidth-5)-(elementWidth * (meas.qNum / vMax ))) + "px;'>"+ meas.qText + "</div>";
							html += "<div class='qv-object-image-label-barchart-item-label-gap' style='width:40px;'>&nbsp;</div><div class='qv-object-image-label-barchart-bar-gap' style='width:" + Math.round(elementWidth) + "px;'></div>";
							html += '</div>'
						}
					});
					$element.html(html);
					$element.find('.selectable').on('click', function() {
						if(this.hasAttribute("data-value")) {
							var value = parseInt(this.getAttribute("data-value"), 10), 
								dim = 0;
								
							self.selectValues(dim, [value], true);
							this.classList.toggle("selected");
						}
					});					
				}
				var backgroundColor = layout.chartColorSwitch === false ? '':layout.chartColor.color;
				$element.css("background-color", backgroundColor);
				return qlik.Promise.resolve();
			}
		};
	}
);
