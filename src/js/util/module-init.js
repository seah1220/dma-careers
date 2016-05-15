function moduleInit(selector, constructor) {
	if(!selector) return false;
	if(!constructor) return false;

	var objs = $(selector);

	if(objs.length) {
		objs.map(function(index, item) {
			constructor(item);
		});
	};
};