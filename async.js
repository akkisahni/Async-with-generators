window.onload = function(){

	genWrap(function* (){
		var friends = yield $.get('jsons/friends.json');
		console.log(friends);
		var colors = yield $.get('jsons/colors.json');
		console.log(colors);
	});

	function genWrap(generator){
		var gen =  generator();

		function handle(yielded){
			if(!yielded.done){
				yielded.value.then(function(data){
					return handle(gen.next(data));
				});
			}
		}
	return handle(gen.next());	
	}
};
