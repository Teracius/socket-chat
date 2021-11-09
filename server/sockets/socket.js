const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios')
const {crearMensaje} = require('../utilidades/utilidades')

const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarChat',(data, callback)=> {

        console.log(data)

    if(!data.nombre || !data.sala){
        return callback({
            error: true,
            mensaje: 'El nombre es necesario'
        })
    }

    client.join(data.sala);

   let personas =  usuarios.agregarPersona(client.id, data.nombre,data.sala);

client.broadcast.to(data.sala).emit('listaPersonas',usuarios.getPersonasPorSala(data.sala));

   callback(personas)

});

client.on('crearMensaje',(data)=> {

    let persona = usuarios.getPersona(client.id)

    let mensaje = crearMensaje(persona.nombre, data.mensaje);
    //evento + mensaje
    client.broadcast.to(persona.sala).emit('crearMensaje',mensaje);
})

client.on('disconnect',()=>{
    let personaBorrada = usuarios.borrarPersonas(client.id)
    client.broadcast.broadcast.to(personaBorrada.sala).emit('crearMensaje',crearMensaje('Administrador', `${personaBorrada.nombre} salio`))
    client.broadcast.broadcast.to(personaBorrada.sala).emit('listaPersonas',usuarios.getPersonasPorSala(personaBorrada.sala));


});

// Mensajes privados
client.on('mensajePrivado',data => {

    let persona = usuarios.getPersona(client.id);

client.broadcast.to(data.para).emit('mensajePrivado',crearMensaje(persona.nombre,data.mensaje));

})

});