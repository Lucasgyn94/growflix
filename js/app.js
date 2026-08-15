const listaGrowcast = document.querySelector("#lista-growcast");

const videosGrowcast = videos.filter((video) => {
    return video.category === "growcast"
});

function renderizarVideos(listaVideos, elementoDestino) {
    listaVideos.forEach(video => {
        const coluna = document.createElement("div");

        coluna.classList.add(
            "col-12",
            "col-sm-6",
            "col-lg-4",
            "col-xl-3"
        );

        const card = document.createElement("article");
        card.classList.add("card-video");

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

        coluna.appendChild(card);

        elementoDestino.appendChild(coluna);


    });
}

renderizarVideos(videosGrowcast, listaGrowcast);