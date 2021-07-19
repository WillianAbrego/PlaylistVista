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

    //console.log(da);
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
          <p></p>

      </div>

    </article>`;

    // console.log(da);
    let arti = document.querySelectorAll(".album");
    arti.forEach(function (elemento) {
      elemento.addEventListener("click", function () {
        let album = elemento.firstChild.parentNode.childNodes[3].textContent;
        document.getElementById("contenedor").innerHTML = "";
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
  <a href="#" class="playlist"><i class="zmdi zmdi-book zmdi-hc-fw"></i> ${play.nombre}
  <div class="hidden">${play.id}</div></a>
  
</li>`;
  let playli = document.querySelectorAll(".playlist");
  playli.forEach(function (event) {
    event.addEventListener("click", function () {
      let pl = event.childNodes[2].innerText;
      document.getElementById("contenedor").innerHTML = "";
      document.getElementById(
        "contenedor"
      ).innerHTML += `<section class="full-box cover">
    <div class="full-box dashboard-sideBar-bg btn-menu-dashboard"></div>
    <div class="full-box dashboard-sideBar-centro">
      <!--SideBar Title -->
      
      <!-- SideBar Menu -->
      <ul class="list-unstyled full-box dashboard-sideBar-Menu" id="ListaDeCanciones">  
      </ul>
    </div>
  </section>`;
      MostrarDetalleCancion(pl);

      //document.getElementById("ListaDeCanciones").innerHTML = "";

      // document.getElementById("contenedor").innerHTML = "";
      //console.log(pl);
    });
  });
};

//comienza listar canciones al dar click en la playlist
const MostrarDetalleCancion = (detalle) => {
  fetch(`http://localhost:3000/api/v1/playlistdetalle/${detalle}`)
    .then((response) => response.json())
    .then((data) => data.map(DetalleCancion));

  const DetalleCancion = (da) => {
    document.getElementById("cabecera").innerHTML = `<div class="page-header">
      <h1 class="text-titles">${da.nombre_playlist}</h1>
    </div>`;
    document.getElementById("ListaDeCanciones").innerHTML += `<li>
    							<a href="#" class="listac">
    								<i class="zmdi zmdi-collection-music  zmdi-hc-fw"></i> <strong>${da.nombre} --</strong>
    								 <i>${da.nombre_cancion}</i><div class="hidden">${da.url}</div>
    							</a>
    						</li>`;
    let arti = document.querySelectorAll(".listac");
    arti.forEach(function (elemento) {
      elemento.addEventListener("click", function () {
        let lista = elemento.childNodes[6].innerText;
        document.getElementById("contenedor").innerHTML = "";
        mostrarVideo(lista);
        //console.log(lista);
      });
    });
  };
};

const mostrarVideo = (vi) => {
  console.log(vi);
  document.getElementById("contenedor").innerHTML += `
    <div id="ytplayer">
    </div>`;
  onYouTubePlayerAPIReady(vi);
};

//script api Youtube
var tag = document.createElement("script");
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubePlayerAPIReady(urlvideo) {
  player = new YT.Player("ytplayer", {
    height: "480px",
    width: "100%",
    videoId: urlvideo,
  });
}
