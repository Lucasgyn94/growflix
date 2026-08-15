const listaGrowcast = document.querySelector("#lista-growcast");
const listaWebinar = document.querySelector("#lista-webinar");
const listaUxUi = document.querySelector("#lista-ux-ui");
const listaDiversos = document.querySelector("#lista-diversos");

const secoesPorCategoria = {
    growcast: listaGrowcast,
    webinar: listaWebinar,
    "ux-ui": listaUxUi,
    diversos: listaDiversos
}




const modalVideo = document.querySelector("#modal-video");
const playerVideo = document.querySelector("#player-video")

const videosGrowcast = videos.filter((video) => {
    return video.category === "growcast"
});

function renderizarVideo(video, elementoDestino) {

    const coluna = document.createElement("div");

    coluna.classList.add(
        "col-12",
        "col-sm-6",
        "col-lg-4",
        "col-xl-3"
    );


    const card = document.createElement("article");

    card.classList.add("card-video");

    card.dataset.link = video.link;


    const imagem = document.createElement("img");

    imagem.src = video.img;
    imagem.alt = `Capa do vídeo ${video.title}`;

    imagem.classList.add(
        "card-video__imagem",
        "img-fluid"
    );


    const conteudo = document.createElement("div");

    conteudo.classList.add("card-video__conteudo");


    const titulo = document.createElement("h3");

    titulo.textContent = video.title;

    titulo.classList.add("card-video__titulo");


    conteudo.appendChild(titulo);

    card.appendChild(imagem);
    card.appendChild(conteudo);


    card.addEventListener("click", () => {

        playerVideo.src = card.dataset.link;

        const modal =
            bootstrap.Modal.getOrCreateInstance(modalVideo);

        modal.show();

    });


    coluna.appendChild(card);

    elementoDestino.appendChild(coluna);
}

function renderizarCatalogo() {
    videos.forEach((video) => {
        const elementoDestino = secoesPorCategoria[video.category];

        if (!elementoDestino) {
            console.warn(`Categoria: ${video.category} não encontrada`);
            return;
        }
        
        renderizarVideo(
            video, elementoDestino
        );
    })
}

modalVideo.addEventListener("hidden.bs.modal", () => {
    playerVideo.src = "";
})

// renderizarVideos(videosGrowcast, listaGrowcast);
renderizarCatalogo();