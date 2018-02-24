module.exports = function(application){
	application.get('/', function(req,res){
		application.app.controllers.cindex.index(application, req, res);
	});
}