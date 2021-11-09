class Usuarios {
  constructor() {
    this.personas = [];
  }

  agregarPersona(id, nombre,sala) {
    let persona = {id,nombre,sala};
    // let personas = { id, nombre };

    this.personas.push(persona);

    return this.personas;
  }

  getPersona(id) {
      // la primera ocnicidencia se toma y s emuetsra ya que le id es unico solo se ocupa la posicion 0
    let persona = this.personas.filter((persona) => (persona.id === id))[0];

    return persona;
  }

  getPersonas() {
    return this.personas;
  }

  getPersonasPorSala(sala) {
    let personaEnSala = this.personas.filter(persona =>  persona.sala === sala );
    return personaEnSala
  }

  borrarPersonas(id) {
    let personaBorrada = this.getPersona(id);

    //se elimina el id elejido y se genera un nuevo arreglo sin el
    this.personas = this.personas.filter(personas => personas.id != id);

    // esto e spara decir que la peronsa dejo el chat

    return personaBorrada;
  }
}

module.exports = {
  Usuarios,
};
