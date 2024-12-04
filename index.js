/* let gallery = document.querySelector(".gallery");

function crearCard() {
    fetch("./tareas.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                gallery.innerHTML += ` 
                <div class="image-block">
        <a
          href="${element.link}"
          class="link-button"
          target="_blank"
          >Ver Diseño Original</a
        >
        <img src="${element.img}" alt="Imagen 1" />
        <div class="caption">
          <h4>${element.nombre}</h4>
          <p>${element.desc}</p>
        </div>
      </div>`
            });
        }

        )
}

crearCard() */


let main = document.querySelector('.main');
let section = document.querySelector('.inicio');
let lista = document.querySelectorAll('.filter');
let asignaciones = document.querySelector('.asignaciones')
// Función para crear las tareas
function crearTareas() {
  fetch(`./tareas.json`)
    .then(response => response.json()) // Convierte la respuesta en JSON
    .then(data => {
      // Limpiar la sección antes de añadir contenido nuevo
      section.innerHTML = '';

      // Agregar artículos al DOM
      data.forEach((element, index) => {
        section.innerHTML += `
          <article class="${element.clase} articles">
            <div>
              <img src="./${element.img[0]}" alt="">
            </div>
            <h3>${element.nombre}</h3>
            <a href="#" class="verTarea" data-index="${index}">Ver asignación</a>
          </article>
        `;
      });
      // Seleccionar los artículos después de crearlos
      const listaArticles = document.querySelectorAll('.articles');
      

      // Asignar eventos a los filtros
      lista.forEach(filtro => {
        filtro.addEventListener('click', () => {
          const filterClass = filtro.getAttribute('data-filter');

          listaArticles.forEach(article => {
            if (filterClass === 'home') {
              // Mostrar todos los artículos
              article.classList.remove('hidden');
              asignaciones.classList.add('hidden')
              section.classList.remove('hidden')
            } else {
              // Mostrar solo los artículos que coinciden con la clase
              if (article.classList.contains(filterClass)) {
                article.classList.remove('hidden');
                asignaciones.classList.add('hidden')
                section.classList.remove('hidden')
              } else {
                article.classList.add('hidden');
                asignaciones.classList.add('hidden')
                section.classList.remove('hidden')
              }
            }
          });
        });
      });
      let botonesVerTarea = document.querySelectorAll('.verTarea');
      botonesVerTarea.forEach(boton => {
        boton.addEventListener('click', function (event) {
          event.preventDefault();  // Prevenir la acción por defecto del enlace
          let index = event.target.getAttribute('data-index');
          section.classList.add('hidden')
          asignaciones.classList.remove('hidden')
          mostrarTarea(data[index]);
        });
      });

    })
    .catch(error => console.error('Error al cargar el JSON:', error));
}


function mostrarTarea(elemento) {
    let imagenesHTML = '';
    elemento.img.forEach(e => {
      imagenesHTML += `<img src="./${e}" alt="">`;
    });

  asignaciones.innerHTML = `
          <a href="./intex.html" class="atras">Atrás</a>
      <section class="asig">
        <h2>${elemento.nombre}</h2>
        <article>
          <div class="texto">
            <p> ${elemento.desc}</p>
          </div>
          <div class="imagen">
            <img src="./${elemento.img[0]}" alt="">
            <a href="${elemento.link}" target="_blank">Archivos</a>
          </div>
        </article>
      </section>
      <h3>Diseños</h3>
      <section class="images-rec">
        ${imagenesHTML}
      </section>`
}


crearTareas();
/*  <a href="${elemento.link}" target="_blank">Archivos</a> */