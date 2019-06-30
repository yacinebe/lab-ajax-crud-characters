const charactersAPI = new APIHandler("http://localhost:8090")

$(document).ready(() => {

  document.getElementById('fetch-all').onclick = displayAll;
  document.getElementById('fetch-one').onclick = function () {

    document.getElementById("main_container").innerHTML = "";
    id = document.getElementById("id_field").value;


    charactersAPI.getOneRegister(id, (res) => {


      textToAdd = '<div class="character-info"> <div class="name"> id: ' + res.id + '</div> <div class="name"> Name: ' + res.name + '</div><div class="occupation"> Occupation: ' + res.occupation + '</div><div class="cartoon"> Is a cartoon' + res.cartoon + '</div><div class="weapon"> Weapon' + res.weapon + '</div></div>';
      document.getElementById("main_container").innerHTML = document.getElementById("main_container").innerHTML + textToAdd;

    });

  }

  document.getElementById('delete-one').onclick = function () {

    id = document.getElementById("id_field_delete").value;
    charactersAPI.deleteOneRegister(id, res => { document.getElementById("delete-one").style.backgroundColor = "green"; displayAll(); }, res => document.getElementById("delete-one").style.backgroundColor = "red");

  }


  document.getElementById('edit-character-form').onsubmit = function (e) {

    e.preventDefault();
    let id = this.elements['chr-id'].value;
    let name = this.elements['name'].value;
    let occupation = this.elements['occupation'].value;
    let weapon = this.elements['weapon'].value;
    let cartoon = this.elements['cartoon'].value;
    data = { "id": id, "name": name, "occupation": occupation, "weapon": weapon, "cartoon": cartoon };

    charactersAPI.updateOneRegister(data.id, data, res => displayAll());

  }

  document.getElementById('new-character-form').onsubmit = function (e) {

    e.preventDefault();
    let name = this.elements['name'].value;
    let occupation = this.elements['occupation'].value;
    let weapon = this.elements['weapon'].value;
    let cartoon = this.elements['cartoon'].value;
    data = { "name": name, "occupation": occupation, "weapon": weapon, "cartoon": cartoon };
    charactersAPI.createOneRegister(data, res => displayAll());

  }
})


function displayAll() {

  document.getElementById("main_container").innerHTML = "";

  charactersAPI.getFullList((res) => {

    res.forEach(element => {


      textToAdd = '<div class="character-info"> <div class="name"> id: ' + element.id + '</div><div class="name"> Name: ' + element.name + '</div><div class="occupation"> Occupation: ' + element.occupation + '</div><div class="cartoon"> Is a cartoon: ' + element.cartoon + '</div><div class="weapon"> Weapon : ' + element.weapon + '</div></div>';
      document.getElementById("main_container").innerHTML = document.getElementById("main_container").innerHTML + textToAdd;

    });

  });

}
