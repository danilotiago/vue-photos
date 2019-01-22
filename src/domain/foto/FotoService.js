export default class FotoService {

  constructor(resource) {
    this._resource = resource('v1/fotos{/id}')
  }

  lista() {
    // retorna promisse e converte para json
    return this._resource
      .query()
      .then(fotos => fotos.json())
  }

  cadastra(foto) {
    // retorna promisse
    return this._resource
      .save(foto)
  }

  apaga(id) {
    // retorna promisse
    return this._resource
      .delete({id})
  }
}
