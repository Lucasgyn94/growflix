const listaGrowcast = document.querySelector("#lista-growcast");
const listaWebinar = document.querySelector("#lista-webinar");
const listaUxUi = document.querySelector("#lista-ux-ui");
const listaDiversos = document.querySelector("#lista-diversos");

const botaoHero = document.querySelector(".hero-home__botao");

const formularioBusca = document.querySelector(".busca-home");
const campoBusca = document.querySelector("#campo-busca");

const mensagemSemResultados =
    document.querySelector("#mensagem-sem-resultados");

const modalVideo = document.querySelector("#modal-video");
const playerVideo = document.querySelector("#player-video");


const secoesPorCategoria = {
    growcast: listaGrowcast,
    webinar: listaWebinar,
    "ux-ui": listaUxUi,
    diversos: listaDiversos
};


const secoesCatalogo = {
    growcast: document.querySelector("#secao-growcast"),
    webinar: document.querySelector("#secao-webinar"),
    "ux-ui": document.querySelector("#secao-ux-ui"),
    diversos: document.querySelector("#secao-diversos")
};


function abrirVideo(linkVideo) {
    playerVideo.src = linkVideo;

    const modal =
        bootstrap.Modal.getOrCreateInstance(modalVideo);

    modal.show();
}


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

    card.tabIndex = 0;

    card.setAttribute(
        "role",
        "button"
    );

    card.setAttribute(
        "aria-label",
        `Assistir ${video.title}`
    );

    card.dataset.link = video.link;


    const imagem = document.createElement("img");

    imagem.src = video.img;
    imagem.alt = `Capa do vídeo ${video.title}`;

    imagem.classList.add(
        "card-video__imagem",
        "img-fluid"
    );


    const conteudo = document.createElement("div");

    conteudo.classList.add(
        "card-video__conteudo"
    );


    const titulo = document.createElement("h3");

    titulo.textContent = video.title;

    titulo.classList.add(
        "card-video__titulo"
    );


    conteudo.appendChild(titulo);

    card.appendChild(imagem);
    card.appendChild(conteudo);


    card.addEventListener("click", () => {
        abrirVideo(card.dataset.link);
    });


    card.addEventListener("keydown", (evento) => {

        if (
            evento.key === "Enter" ||
            evento.key === " "
        ) {
            evento.preventDefault();

            abrirVideo(card.dataset.link);
        }

    });


    coluna.appendChild(card);

    elementoDestino.appendChild(coluna);
}


function limparCatalogo() {

    Object
        .values(secoesPorCategoria)
        .forEach((secao) => {
            secao.innerHTML = "";
        });

}


function atualizarVisibilidadeSecoes(listaDeVideos) {

    Object
        .keys(secoesCatalogo)
        .forEach((categoria) => {

            const possuiVideos =
                listaDeVideos.some((video) => {
                    return video.category === categoria;
                });

            secoesCatalogo[categoria].hidden =
                !possuiVideos;

        });

}


function renderizarCatalogo(listaDeVideos) {

    limparCatalogo();


    listaDeVideos.forEach((video) => {

        const elementoDestino =
            secoesPorCategoria[video.category];


        if (!elementoDestino) {

            console.warn(
                `Categoria: ${video.category} não encontrada.`
            );

            return;
        }


        renderizarVideo(
            video,
            elementoDestino
        );

    });


    atualizarVisibilidadeSecoes(
        listaDeVideos
    );


    mensagemSemResultados.hidden =
        listaDeVideos.length > 0;
}


botaoHero.addEventListener("click", () => {
    abrirVideo(botaoHero.dataset.link);
});


formularioBusca.addEventListener("submit", (evento) => {
    evento.preventDefault();
});


campoBusca.addEventListener("input", () => {

    const termoBusca =
        campoBusca.value
            .trim()
            .toLowerCase();


    const videosFiltrados =
        videos.filter((video) => {

            const titulo =
                video.title.toLowerCase();

            const categoria =
                video.category.toLowerCase();


            return (
                titulo.includes(termoBusca) ||
                categoria.includes(termoBusca)
            );

        });


    renderizarCatalogo(
        videosFiltrados
    );

});


modalVideo.addEventListener(
    "hidden.bs.modal",
    () => {
        playerVideo.src = "";
    }
);


renderizarCatalogo(videos);