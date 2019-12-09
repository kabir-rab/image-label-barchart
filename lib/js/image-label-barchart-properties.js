define( [], function ( ) {

	var chartBackground = {
		label:"Chart Background",
		component: "color-picker",
		ref: "chartColor",
		type: "object",
		defaultValue: {
			index: 1,
			color: "#ffffff"
		}
	}

	var chartBackgroundCheck = {
		type: "boolean",
		component: "switch",
		label: "Use Custom Colour",
		ref: "chartColorSwitch",
		options: [{
			value: true,
			label: "On"
		}, {
			value: false,
			label: "Not using"
		}],
		defaultValue: true
	}
	
	var myCustomSection = {	
		component: "expandable-items",
		label: "Settings",
		items: {
			header1: {
				type: "items",
				label: "Colour",
				items: {
					first: chartBackgroundCheck,
					second: chartBackground										
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
			barColour: myCustomSection
		}
	}; 
});