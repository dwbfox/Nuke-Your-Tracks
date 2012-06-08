window.onload = init;


function loadSettings() {
	var options = document.querySelectorAll('input[type="checkbox"]');
	
	for (var i=0; i<options.length; i++) {
		var optionVal = localStorage.getItem(options[i].value);
		if (optionVal !== null ) {
			if (optionVal === 'true') {
				options[i].checked = true;
			} else {
				options[i].checked = false;
			}
		}
	}	
}


function init() {
	loadSettings();
	
    var saveButton = document.querySelector('#saveButton');
    var options;
	
	// Save button was clicked
    saveButton.addEventListener('click', function () {
        options = document.querySelectorAll('input[type="checkbox"]');
		
        // save the settings
        for (i = 0; i < options.length; i++) {
            localStorage.setItem(options[i].value, options[i].checked);
        }
        var fColor = this.style.backgroundColor;
		this.style.backgroundColor = "#00FF00";
		this.innerHTML = "Saved";
		setTimeout(function() {
			saveButton.style.backgroundColor = fColor;
			saveButton.innerHTML = "Save";

		},1400);

    });
}
