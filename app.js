const diaSolar = document.querySelector(".diaSolar");
const buscar = document.querySelector(".buscar");
const seccion = document.querySelector(".seccion");
const verMas = document.querySelector(".verMas");
const vehiculo = document.querySelector(".vehiculo");
var dia;
var pagina;
var explorador;

buscar.addEventListener("click", () => {
    seccion.innerHTML = "";
    if (diaSolar.value != "") {
        dia = diaSolar.value;
        pagina = 1;
        explorador = (vehiculo.value).toLowerCase();
        mostrarData(dia, pagina);
        verMas.style.display = "flex";
    } else {
        alert("Escribe un día solar");
    }
});

const siguiente = document.querySelector(".fa-chevron-right");
siguiente.addEventListener("click", () => {
    seccion.innerHTML = "";
    pagina++;
    mostrarData(dia, pagina);
    anterior.style.display = "block";
    console.log(pagina);
});

const anterior = document.querySelector(".fa-chevron-left");
anterior.addEventListener("click", () => {
    seccion.innerHTML = "";
    pagina--;
    if (pagina > 1) {
        mostrarData(dia, pagina);
    } else {
        anterior.style.display = "none";
        mostrarData(dia, 1);
    }
    console.log(pagina);
});

const mostrarData = async (day, page) => { //se crea una funcion asincrona que esperará a que la funcion que tenga await se culmine
    try { //se recomienda usar try catch
        const data = await obtenerData(); //await espera a que la funcion obtenerData() se termine
        data.photos.map(foto => { //cuando la funcion de await culmine se ejecuta la siguiente instrucción
            let div = document.createElement("div");
            div.classList.add("divImg");
            let image = document.createElement("img");
            image.setAttribute("src", `${foto.img_src}`);
            image.classList.add("image");
            image.addEventListener("click", () => {
                window.open(`${image.getAttribute("src")}`);
            })
            let fecha = document.createElement("div");
            fecha.classList.add("fecha");
            fecha.innerText = `Fecha terrestre: ${foto.earth_date}`;
            let rover = document.createElement("div");
            rover.innerText = `Rover: ${foto.rover.name}`;
            rover.classList.add("rover");
            div.append(image);
            div.append(fecha);
            div.append(rover);
            seccion.append(div);
            div.addEventListener("mouseenter", () => {
                div.style.animation = "agrandarImg 1s both";
            });
            div.addEventListener("mouseleave", () => {
                div.style.animation = "ajustarImg 1s both";
            });
        });

        if (data.photos == 0) {
            alert("No hay imágenes de este día solar");
        } 

    } catch (err) {
        console.warn("Error de la API:" + err);
    }

    async function obtenerData() { //esta es la funcion fetch o axios que espera await, es mejor escribirla asi y no tipo flecha
        return axios(`https://api.nasa.gov/mars-photos/api/v1/rovers/${explorador}/photos?sol=${day}&page=${page}&api_key=BeO4hV6zUslD93eC5bWyUYcGvLG0QaFGGoido9UC`)
            .then(datos => datos.data); //retorna la data del json de la api
            //retorna los datos de la promesa desencapsulados
        //esa data la recibe la variable data en el await
    }
}