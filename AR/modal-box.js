var modalBox = { }

modalBox.init = function( config ) {
	
	var self = this;
	
	self.bind( '.' + config.link_class, 'click', function( event ) {
		
		self.showUp( config );
		
		event = event || window.event;
		event.preventDefault();
		
	});
	
	self.bind( '.close_box_btn', 'click', function( event ) {
		
		event = event || window.event;
		event.preventDefault();
		
		self.closeUp( config );
		
	});
	
	var utm = config.utm.replace( '=', '\=' );
	utm = utm.replace( '-', '\-' );
	utm = utm.replace( '+', '\+' );
	utm = utm.replace( '%', '\%' );
	utm = utm.replace( '_', '\_' );
	
	var re = new RegExp( utm );
	if( re.test( document.location.href) )
	{
		try
		{
			self.showUp( config );
		}
		catch( e )
		{
			setTimeout( function() { self.showUp( config ); }, 200 );
		}
	}
}

// make background
modalBox.setBackground = function( config ) {
	
	var self = this;
	
	var popUp = document.getElementById( config.popUp );
	popUp.style.zIndex = 5000;
	
	var windowSize = this.getClientSizes( true ); // tue - with scroll bar width
	
	var div = document.createElement( 'div' );
	
	div.id = 'popup__background';
	
	div.style.width = windowSize.w + 'px';
	div.style.height = windowSize.h + 'px';
	div.style.position = 'fixed';
	div.style.left = '0px';
	div.style.top = '0px';
	div.style.zIndex = popUp.style.zIndex - 1;
	
	var backgroundColor = '#000';
	
	div.style.backgroundColor = backgroundColor;
	
	if( typeof config.background != 'undefined' )
	{
		var background = config.background;
	}
	else 
	{
		var background = 'dark';
	}
	
	if( background == 'light' )
	{
		div.style.opacity = .4;
	}
	else if( background == 'dark' )
	{
		div.style.opacity = .7;
	}
	else if( background == 'none' )
	{
		div.style.opacity = 0;
	}
	else 
	{
		div.style.opacity = background;
	}
	
	document.body.appendChild( div );
	
	self.bind( '#popup__background', 'click', function( event ) {
		
		event = event || window.event;
		event.preventDefault();
		
		self.closeUp( config );
		
	});
	
}

modalBox.showUp =  function( config ) {
	
	var self = this;
	
	if( config.speed != 'undefined' )
	{
		var speed = config.speed;
	}
	else 
	{
		var speed = .3;
	}
	
	var popUp = document.getElementById( config.popUp );
	
	popUp.style.zIndex = 5000;
	popUp.style.position = 'fixed';
	popUp.style.display = 'block';
	
	var windowSize = self.getClientSizes( true ); // tue - with scroll bar width
	var popUpSize = self.getSizes( popUp );
	
	if( typeof config.x != 'undefined' )
	{
		var x = config.x;
	}
	else 
	{
		var x = windowSize.w / 2 - popUpSize.w / 2;
	}
	
	if( typeof config.y != 'undefined' )
	{
		var y = config.y;
	}
	else 
	{
		var y = windowSize.h / 2 - popUpSize.h / 2;
	}
	
	self.setLocation( popUp, x, y );
	popUp.style.display = 'block';
	
	self.setBackground( config );
	
	// lock the popUp box as fixed element and prohibit scrolling of the window document
	setTimeout( function() {
		
		var objBody = document.getElementsByTagName('body')[0];
		objBody.style.overflow = 'hidden';
		
	}, 0 );
}

modalBox.closeUp = function( config ) {
	
	var self = this;
	
	var popUp = document.getElementById( config.popUp );
	
	if( config.speed != 'undefined' )
	{
		var speed = config.speed;
	}
	else 
	{
		var speed = .3;
	}
	
	popUp.style.display = 'none';
	
	backgroundObj = document.getElementById( 'popup__background' );
	backgroundObj.parentNode.removeChild( backgroundObj );
	
	var objBody = document.getElementsByTagName('body')[0];
	objBody.style.overflow = 'visible';
	
	setTimeout( function() {
		
		objBody.style.overflow = 'visible';
		
	}, 200 );
	
	setTimeout( function() {
		
		objBody.style.overflow = 'visible';
		
	}, 400 );
	
	setTimeout( function() {
		
		objBody.style.overflow = 'visible';
		
	}, 600 );
}

// get client screen sizes (sizes of the window)
modalBox.getClientSizes = function( withScroll ) {
	
	var self = this;
	
	if(typeof withScroll == "undefined")
	{
		withScroll = false
	}
	
	var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	// if it has a vertical scroll bar
	if(document.body.scrollHeight > document.body.clientHeight && withScroll == false) 
	{
		width -= this.getScrollbarWidth();
	}
	
	return { w: width, h: height, width: width, height: height };
	
}

// get sizes of HTML element
modalBox.getSizes =  function( element ) {
	
	var self = this;
	
	if( typeof element == 'string' )
	{
		var element = document.getElementById( element );
	}
	
	var width = element.offsetWidth;
	var height = element.offsetHeight;
	return { "width": width, "height": height, "w": width, "h": height };
}

// set location to HTML object, move to the place of X and Y coords on the screen
modalBox.setLocation =  function( element, x, y ) {
	
	var self = this;
	
	if( typeof element == 'string' )
	{
		var element = document.getElementById( element );
	}
	
	element.style.left = x + "px";
	element.style.top = y + "px";
	
}

// bind an event to DOM or BOM object
modalBox.bind = function( element, type, handler ) {
	
	var self = this;
	
	if( typeof element == 'string' )
	{
		if( /^\#/.test( element ) )
		{
			var element = element.replace( /^\#/, '' );
			element = document.getElementById( element );
		}
		else if( /^\./.test( element ) )
		{
			var element = element.replace( /^\./, '' );
			
			var OBJECTS = document.getElementsByClassName( element );
			
			for( var i = 0, n = OBJECTS.length; i < n; i++ )
			{
				if( typeof OBJECTS[i] == 'object' )
				{
					this.bind( OBJECTS[i], type, handler );
				}
			}
		}
		else 
		{
			var element = document.getElementById( element );
		}
	}
	
	try
	{
		if( typeof element.addEventListener == 'function' )
		{
			element.addEventListener( type, handler, false );
		} 
		else if( element.attachEvent == 'function' )
		{
			element.attachEvent( 'on' + type, handler );
		}
	}
	catch( e )
	{
		// console.log( e );
	}
	
}
