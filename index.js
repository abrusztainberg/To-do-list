const ingresos = document.getElementById('ingresos');
const input = document.getElementById('input');
var usuario= document.getElementById('usuario');
var contraseña= document.getElementById('contraseña');
const boton=document.getElementById('validar');
const templateTareas= document.getElementById('templateTareas').content;
const fragment = document.createDocumentFragment();
let tareas = {};



window.onload= function modal(){
   $('#ventanaModal').modal({ backdrop: 'static', keyboard: false });
   $('#ventanaModal').modal('show');

}


function alertaContraseña(){
   alert('El usuario es "ensolvers", y la contraseña es "12345" ');

}

function cerrarSesion(){
   sesion=false;
   $('#ventanaModal').modal({ backdrop: 'static', keyboard: false });
   $('#ventanaModal').modal('show');
   login.reset();
}

function validarLogIn(){
   if (contraseña.value ===''||usuario.value===''){
      alert('Ambos campos son obligatorios para iniciar sesión');
      sesion=false;
   }else if (contraseña.value==='12345'&& usuario.value==='ensolvers'){
      $('#ventanaModal').modal('hide');
      sesion=true;
   } else{
      alert('El usuario o contraseña son incorrectos.');
      sesion=false;
   }
   return false;
}


document.addEventListener('DOMContentLoaded', () =>{
   if(localStorage.getItem('tareas')){
      tareas =JSON.parse(localStorage.getItem('tareas'));
   }
   completarTareas();
})

ingresos.addEventListener('submit', e =>{
   e.preventDefault();
   console.log(input.value);

   setTareas(e);
})

listaTareas.addEventListener('click', e =>{
   btnAccion(e);
})


const setTareas = e=> {
   if (input.value.trim() ===''){
      alert('Tiene que ingresar un texto')
      input.focus();
      return
   }

   const tarea ={
      id: Date.now()   ,
      texto: input.value ,
      estado: false,
      carpeta: ''
   }
   tareas[tarea.id] =tarea;
   ingresos.reset();
   input.focus();
   completarTareas();
}

const completarTareas = () => {
   localStorage.setItem('tareas', JSON.stringify(tareas));
   if(Object.values(tareas).length === 0){
      listaTareas.innerHTML=`
      <div class="alert alert-dark text-center alerta">
          No hay tareas pendientes</div>`
      return
   }
   listaTareas.innerHTML='';
   Object.values(tareas).forEach(tarea =>{
      const clone= templateTareas.cloneNode(true);
      clone.querySelector('p').textContent =tarea.texto;
      
      if (tarea.estado){
         clone.querySelector('.alert').classList.replace('alert-info', 'alert-warning');
         clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt');    
         clone.querySelector('p').style.textDecoration = 'line-through';
      }


      clone.querySelectorAll('.fas')[0].dataset.id=tarea.id;
      clone.querySelectorAll('.fas')[1].dataset.id=tarea.id;
      clone.querySelectorAll('.fas')[2].dataset.id=tarea.id;
      

      fragment.appendChild(clone);
   })
   listaTareas.appendChild(fragment);
}





const btnAccion = e =>{
   if(e.target.classList.contains('fa-check-circle')){
      tareas[e.target.dataset.id].estado = true;
      completarTareas();
   }
   if(e.target.classList.contains('fa-times')){
      delete tareas[e.target.dataset.id];
      completarTareas();
   } 

   if(e.target.classList.contains('fa-undo-alt')){
      tareas[e.target.dataset.id].estado = false;
      completarTareas();
   }
   if(e.target.classList.contains('fa-edit')){
     const inputEdit = document.getElementById('inputEdit');
     if (inputEdit.value.trim() ===''){
      alert('Tiene que ingresar un texto en la casilla"ingrese tarea editada"')
      input.focus();
      return
   }
     delete tareas[e.target.dataset.id].texto;
     tareas[e.target.dataset.id].texto = inputEdit.value;
     ingresos.reset();
     input.focus();
     completarTareas();
}
if(e.target.classList.contains('far')){
   const inputCarpeta = document.getElementById('inputCarpeta');
     if (inputCarpeta.value.trim() ===''){
      alert('Tiene que ingresar el nombre de la carpeta a donde quiere mandar la tarea')
      input.focus();
      return
   }
     delete tareas[e.target.dataset.id];
     ingresos.reset();
     input.focus();
     completarTareas();
}
   }


