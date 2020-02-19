'use strict';
import './../styles/app.css';
import NetManager from './netManager';
window.onload = () => {
  init();
};

function init() {
  const ul = document.getElementById('fList');
  const txtName = document.getElementById('txtName');
  const txtVersion = document.getElementById('txtVersion');
  const btnCancel = document.getElementById('cancel');
  const nm = new NetManager();
  document.getElementById('addFr').addEventListener('click', addFramework);
  btnCancel.addEventListener('click', () => location.reload());

  //Get form fields and call function to save  
  function addFramework() {
    const newFramework = {
      name: txtName.value,
      version: txtVersion.value
    };
    nm.postToApi(newFramework);
  }

  //Create framework list element 
  function createFrameworkUI(pFramework) {
    const liText = document.createElement('li');
    const liButtons = document.createElement('li');
    const deleteButton = document.createElement('input');
    const editbutton = document.createElement('input');

    liText.classList.add('li');
    liButtons.classList.add('li');
    editbutton.classList.add('li-button');
    deleteButton.classList.add('li-button');
    deleteButton.addEventListener('click', () => {
      nm.deleteToApi(pFramework);
    });
    editbutton.addEventListener('click', () => {
      selectFrameworkToEdit(pFramework);
    });
    deleteButton.type = 'button';
    deleteButton.value = 'Delete';
    editbutton.type = 'button';
    editbutton.value = 'Edit';
    liText.innerText = `${pFramework.name} v${pFramework.version} `;
    liButtons.appendChild(editbutton);
    liButtons.appendChild(deleteButton);
    ul.appendChild(liText);
    ul.appendChild(liButtons);
  }

  //create framework obj and call edittoapi
  function clickEdit(pId) {
    let framework = {
      name: txtName.value,
      version: txtVersion.value,
      _id: pId
    }
    nm.editToApi(framework);
  }
  
  //GotoEdit
  function selectFrameworkToEdit(framework) {
    const editButton = document.getElementById('editFr');
    txtName.value = framework.name;
    txtVersion.value = framework.version;
    editButton.classList.add('d-inl-bl');
    editButton.classList.remove('d-none');
    btnCancel.classList.remove('d-none');
    document.getElementById('addFr').classList.add('d-none');
    editButton.addEventListener('click', () => {
      clickEdit(framework._id);
    });
  }

  //Get frameworks from api
  async function loadFrameworks() {
    ul.innerHTML = '';
    const frameworks = await nm.getToApi();
    frameworks.forEach(framework => {
      createFrameworkUI(framework);
    });
  }

  //load registered frameworks
  loadFrameworks();
}