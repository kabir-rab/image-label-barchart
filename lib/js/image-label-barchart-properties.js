/**
 * @owner Enter you name here (xxx)
 */

define( [], function ( ) {

	/* var chartBackgroup = {
		label:"Chart Background",
		component: "color-picker",
		ref: "chartColor",
		type: "integer",
		defaultValue: 10
	} */

	var chartBackgroup = {
		label:"Chart Background",
		component: "color-picker",
		ref: "chartColor",
		type: "object",
		defaultValue: {
			index: 1,
			color: "#ffffff"
		}
	}
	
	var myCustomSection = {
							// not necessary to define the type, component "expandable-items" will automatically
							// default to "items"
							// type: "items"
							component: "expandable-items",
							label: "Settings",
							items: {
								header1: {
									type: "items",
									label: "Colour",
									items: {
										second: chartBackgroup										
									}
								}
							}
						};

	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: {
				uses: "dimensions",
				min: 1,
				max: 1,
				items: {
					profilePic: {
						type: "string",
						label: "Profile Image Expression",
						ref: "qAttributeExpressions.0.qExpression",
						component: "expression",
					},
					dimColour: {
						type: "string",
						label: "Bar Colour Expression",
						ref: "qAttributeExpressions.1.qExpression",
						component: "expression",
					}
				}
			},
			measures: {
				uses: "measures",
				min: 1,
				max: 1
			},
			sorting: {
				uses: "sorting"
			},
			settings: {
				uses: "settings"
			},
			barClour: myCustomSection
		}
	}; 
});