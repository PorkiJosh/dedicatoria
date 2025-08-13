var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");
const playBtn = document.getElementById("playBtn");

// 🕒 Ajusta estos tiempos a tu canción real
var lyricsData = [
  { text: "💖 Desde el momento en el que te conocí KIARA 💖", time:2  },
  { text: "⏳ Resumiendo con prisas tiempo de silencio ⏳", time: 5 },
  { text: "💌 Te juro que a nadie le he vuelto a decir 💌", time: 8 },
  { text: "Que tenemos el récord del mundo en querernos 💕", time: 13 },
  { text: "Por eso esperaba con la carita empapada", time: 20 },
  { text: "🌹 A que llegaras con rosas 🌹", time: 25 },
  { text: "🌹🌹 Con mil rosas para mí 🌹🌹 ", time: 28 },
  { text: "Porque ya sabes que me encantan esas cosas 😊", time: 30 },
  { text: "Que no importa si es muy tonto, soy así 😌", time: 34},
  { text: "Y aún me parece mentira 🎵🎵", time: 38},
  { text: "Que se escape mi vida 😊", time: 41 },
  { text: "Imaginando que vuelves ✨", time: 43 },
  { text: "A pasarte por aquí 😍 🥰", time: 45},
  { text: "Donde los viernes cada tarde como siempre 💖✨", time: 48 },
  { text: "🤩La esperanza dice: Quieta, hoy quizás SI ...", time: 52 },
  { text: "💖✨🌹 Te quiero mucho, Kiara 🌹✨💖", time: 55 },
];

var fadeInDuration = 0.5; // segundos
var lastIndex = -1;

// 🔹 Muestra la línea correspondiente
function updateLyrics() {
  var time = audio.currentTime;
  var index = lyricsData.findIndex((line, i) =>
    time >= line.time &&
    (i === lyricsData.length - 1 || time < lyricsData[i + 1].time)
  );

  if (index !== -1 && index !== lastIndex) {
    lastIndex = index;
    lyrics.style.opacity = 0;
    lyrics.innerHTML = lyricsData[index].text;
    fadeIn();
  }

  requestAnimationFrame(updateLyrics);
}

// 🔹 Animación de entrada de texto
function fadeIn() {
  let opacity = 0;
  let step = 0.02;
  let fade = setInterval(() => {
    opacity += step;
    lyrics.style.opacity = opacity;
    if (opacity >= 1) clearInterval(fade);
  }, 16);
}

// 🔹 Inicia al hacer click en cualquier parte
/*document.body.addEventListener("click", () => {
  audio.play();
});
*/

// Evento click en el botón para iniciar música
playBtn.addEventListener("click", () => {
  audio.play().then(() => {
    playBtn.style.display = "none";  // Ocultar botón
    lastIndex = -1;
    updateLyrics();  // Iniciar sincronización
  }).catch(e => {
    alert("Error al reproducir música: " + e);
  });
});

// 🔹 Cuando el audio empiece, arranca la sincronización
audio.addEventListener("play", () => {
  lastIndex = -1;
  requestAnimationFrame(updateLyrics);
});

// 🔹 Oculta el título después de 65 segundos
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(() => {
      titulo.style.display = "none";
    }, 3000);
  }
}
setTimeout(ocultarTitulo, 65000);
