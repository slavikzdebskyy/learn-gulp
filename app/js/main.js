function toggleMobileMenu () {
	var header = document.getElementById('header-id');
	var menu = document.getElementById('mobile-menu');
	var hClassName = header.className;	
	if(hClassName == '') {
		header.style.backgroundImage = 'url(./images/bg-mobile.jpg)';
		menu.style.visibility = 'visible';
		header.className = 'someClassName';
	} else {
		header.style.backgroundImage = 'url(./images/bg-header.jpg)';
		menu.style.visibility = 'hidden';
		header.className = '';
	}
}


function toggleSearchFeild () {
	var input = document.getElementById('search-feild');
	var d = Boolean(input.style.display === 'none');
	if(d){
		input.style.display = 'block';
	} else {
		input.style.display = 'none';
	}	
}
toggleSearchFeild();