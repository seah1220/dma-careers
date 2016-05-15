function ModuleName (element) {
	
	var $self 			= $(element);
		$self.button	= $self.find('.js-module-name-button');

	$self.button.on('click', function(e){
		e.preventDefault();
		
		alert('i am working!')
	});

	return $self;
};