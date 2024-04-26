/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zui5eventm/zui5eventm/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
