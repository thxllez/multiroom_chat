/* importar configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(3000, function(){
	console.log('SERVER ON');
});

var io = require('socket.io').listen(server);

app.set('io', io); //cria uma espécie de "variável global" que será passada para todos os arquivos dentro da variável application.

/* criar a conexão por websocket */
io.on('connection', function(socket){
	console.log('Usuario conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function(data){
		/* DIALOGOS */
		socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
		socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});

		/* PARTICIPANTES */
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit('participantesParaCliente', {apelido: data.apelido});
			socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
		}
	});
});