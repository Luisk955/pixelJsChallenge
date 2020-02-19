class NetManager {
  constructor() {
    this.url = "https://crudcrud.com/api/4a3a437852884d9395f0c350e692681c/framework/";

    //Methods

    //Save framework to api
    this.postToApi = pFramework => {
      let formattedFramework = JSON.stringify(pFramework);
      fetch(`${this.url}`, {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          method: 'POST',
          body: formattedFramework
        })
        .then(location.reload())
    }

    //Get all frameworks from api
    this.getToApi = async () => {
      const promise = await fetch(this.url);
      const data = await promise.json();
      return data;
    }

    //Delete framework to api
    this.deleteToApi = framework => {
      fetch(
          `${this.url}${framework._id}`, {
            method: 'DELETE'
          })
        .then(response => location.reload())
    }

    //Edit framework to api
    this.editToApi = framework => {
      let formattedFramework = JSON.stringify({
        name: framework.name,
        version: framework.version
      });
      fetch(
          `${this.url}${framework._id}`, {
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            method: 'PUT',
            body: formattedFramework
          })
        .then(location.reload())
    }
  }
}
export default NetManager;