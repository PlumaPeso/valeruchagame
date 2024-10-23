let imagenFondo;
let imagenPared;
let imagenInicio;
let imagenPersonaje;
let musicaJuego;
let musicaRecord;
let x = 0;
let posY = 50;
let dY = 3;
let wallX = [900, 1200];
let wallY = [600, 800];
let estado = 0; // 0 = pantalla inicial, 1 = jugando
let record = 0;
let recordAnterior = 0;
let puntaje = 0;

function preload() {
  imagenFondo = loadImage("./images/fondo.jpg", img => {
    imagenFondo = img;
    imagenFondo.resize(750, 1334); // Ajusta el tamaño del fondo
  });
  imagenPared = loadImage("./images/pared.png", img => {
    imagenPared = img;
    imagenPared.resize(100, 1200); // Ajusta el tamaño de las paredes según sea necesario
  });
  imagenInicio = loadImage("./images/inicio.jpg", img => {
    imagenInicio = img;
    imagenInicio.resize(750, 1334); // Ajusta el tamaño de la pantalla de inicio
  });
  imagenPersonaje = loadImage("./images/jugador.png", img => {
    imagenPersonaje = img;
    imagenPersonaje.resize(100, 100); // Ajusta el tamaño del personaje
  });

  musicaJuego = loadSound("./sounds/cupid.mp3", 
    () => console.log("Música del juego cargada correctamente"), 
    (err) => console.log("Error al cargar la música del juego:", err)
  );

  musicaRecord = loadSound("./sounds/record.mp3", 
    () => console.log("Música de récord cargada correctamente"), 
    (err) => console.log("Error al cargar la música de récord:", err)
  );
}

function setup() {
  createCanvas(750, 1334); // Ajusta el tamaño del lienzo para iPhone
  textSize(40);
}

function draw() {
  if (estado === 1) {
    background(0, 255, 0);
    imageMode(CORNER);
    image(imagenFondo, x, 0);
    image(imagenFondo, x + imagenFondo.width, 0);
    x -= 6;
    dY += 1;
    posY += dY;

    if (abs(x) > imagenFondo.width) {
      x = 0;
    }

    for (let i = 0; i < 2; i++) {
      imageMode(CENTER);
      image(imagenPared, wallX[i], wallY[i] - (imagenPared.height / 2 + 150));
      image(imagenPared, wallX[i], wallY[i] + (imagenPared.height / 2 + 150));

      if (wallX[i] < 0) {
        wallX[i] = width;
        wallY[i] = random(200, height - 200);
      }

      // Incrementar el puntaje cuando el personaje pasa entre las paredes
      if (wallX[i] < width / 2 && wallX[i] + 6 >= width / 2) {
        puntaje++;
        record = max(puntaje, record);
      }

      // Verificar colisiones
      if (posY > height || posY < 0 || (abs(width / 2 - wallX[i]) < 50 && abs(posY - wallY[i]) > 150)) {
        estado = 0;
        if (musicaJuego && musicaJuego.isPlaying()) {
          musicaJuego.stop();
        }
        cursor();
      }

      wallX[i] -= 6;
    }

    image(imagenPersonaje, width / 2, posY, 50, 50);
    text("Puntaje: " + puntaje, width / 2 - 50, 50);

  } else {
    imageMode(CENTER);
    image(imagenInicio, width / 2, height / 2);
    text("Record: " + record, 60, 450);

    // Reproduce la música de inicio si no está sonando
    if (musicaRecord && !musicaRecord.isPlaying()) {
      musicaRecord.play();
    }
  }
}


function mousePressed() {
  if (estado === 0) {
    estado = 1;
    x = 0;
    dY = 3;
    posY = 50;
    noCursor();
    wallX = [900, 1200];
    wallY = [600, 800];
    puntaje = 0;
    recordAnterior = record;

    if (musicaRecord && musicaRecord.isPlaying()) {
      musicaRecord.stop();
    }

    if (musicaJuego && musicaJuego.isLoaded()) {
      console.log("Reproduciendo música del juego");
      musicaJuego.setVolume(1.0);
      musicaJuego.play();
    } else {
      console.log("La música del juego no está cargada");
    }
  } else {
    dY = -15;
  }
}


