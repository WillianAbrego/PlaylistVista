fetch("http://localhost:3000/api/v1/artista")
  .then((response) => response.json())
  .then((data) => data.map(mostrarData));

const mostrarData = (d) => {
  document.getElementById(
    "contenedor"
  ).innerHTML += `<article class="full-box tile artista" >
  <div class="full-box tile-title text-center text-titles text-uppercase">
      ${d.nombre}
  </div>
  <div class="hidden">${d.id}</div>

</div>
  <div class="full-box tile-icon text-center">
      <i class="zmdi zmdi-account"></i>
  </div>
  <div class="full-box tile-number text-titles">
      <p class="full-box">albunes</p>
      
  </div>
</article>`;

  //console.log(d.id);
  let arti = document.querySelectorAll(".artista");
  arti.forEach(function (elemento) {
    elemento.addEventListener("click", function () {
      let album = elemento.firstChild.parentNode.childNodes[3].textContent;
      document.getElementById("contenedor").innerHTML = "";
      MostrarAlbum(album);

      //console.log(album);
    });
  });
};

const MostrarAlbum = (album) => {
  fetch(`http://localhost:3000/api/v1/album/${album}`)
    .then((response) => response.json())
    // .then((data) => data.map(mostrarData));
    .then((data) => data.map(mostrarData2));

  const mostrarData2 = (da) => {
    document.getElementById(
      "contenedor"
    ).innerHTML += `<article class="full-box tile album">
      <div class="full-box tile-title text-center text-titles text-uppercase">
          ${da.nombre_Album}
      </div>
      <div class="hidden">${da.id}</div>
    
    </div>
      <div class="full-box tile-icon text-center">
          <i class="zmdi zmdi-account"></i>
          <small>nombre</small>
          <small>año</small>
          <small>autor</small>
          </div>
      <div>
          <p>kakkakakakak</p>
          
      </div>
     
    </article>`;

    console.log(da);
    let arti = document.querySelectorAll(".album");
    arti.forEach(function (elemento) {
      elemento.addEventListener("click", function () {
        let album = elemento.firstChild.parentNode.childNodes[3].textContent;

        MostrarCancion(album);
        document.getElementById("contenedor").innerHTML = "";
        //console.log(album);
      });
    });
  };
};

const MostrarCancion = (cancion) => {
  fetch(`http://localhost:3000/api/v1/cancion/${cancion}`)
    .then((response) => response.json())
    // .then((data) => data.map(mostrarData));
    .then((data) => data.map(mostrarData3));
  // .then((data) => console.log(data));

  const mostrarData3 = (da) => {
    document.getElementById(
      "contenedor"
    ).innerHTML += `<article class="full-box tile album">
      <div class="full-box tile-title text-center text-titles text-uppercase">
          ${da.nombre_cancion}
      </div>
      <div class="hidden">${da.nombre_cancion}</div>

    </div>
      <div class="full-box tile-icon text-center">
          <i class="zmdi zmdi-account"></i>
          <small>nombre</small>
          <small>año</small>
          <small>autor</small>
          </div>
      <div>
          <p>kakkakakakak</p>

      </div>

    </article>`;

    console.log(da);
    let arti = document.querySelectorAll(".album");
    arti.forEach(function (elemento) {
      elemento.addEventListener("click", function () {
        let album = elemento.firstChild.parentNode.childNodes[3].textContent;

        //MostrarAlbum(album);
        //console.log(album);
      });
    });
  };
};

//comienza usuario/administrador

fetch("http://localhost:3000/api/v1/user")
  .then((response) => response.json())
  .then((data) => ShowUser(data));

const ShowUser = (user) => {
  document.getElementById(
    "user"
  ).innerHTML += `${user[0].nombre} <div class="hidden">${user[0].id}</div>`;
};
//comienza playlist nombre y id
fetch("http://localhost:3000/api/v1/playlist")
  .then((response) => response.json())
  .then((data) => data.map(ShowPlaylist));

const ShowPlaylist = (play) => {
  console.log(play);
  document.getElementById("play").innerHTML += `<li>
  <a href="#"><i class="zmdi zmdi-book zmdi-hc-fw"></i> ${play.nombre}</a>
  <div class="hidden">${play.id}</div>
</li>`;
};
