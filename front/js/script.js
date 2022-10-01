// // Récupération des produits de l'api
// fetch("http://localhost:3000/api/products")
//   // quand tu as la réponse donne le résultat en json.
//   .then((res) => res.json())
//   // ce que l'on a reçu et qui a été traité en json sera appelé canapes
//   .then((canapes) => {
//     // donne moi des informations en console sur ce qui est récupéré sous forme tableau.
//     console.table(canapes);
//     // appel de la fonction d'affichage des produits
//     kanaps(canapes);
//   })
//   // dans le cas d'une erreur remplace le contenu de titre par un h1 au contenu de erreur 404 et renvoit en console l'erreur.
//   .catch((err) => {
//     document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
//     console.log("erreur 404, sur ressource api:" + err);
//   });

// // fonction d'affichage des produits de l'api sur la page index
// function kanaps(index) {
//   // déclaration de variable de la zone d'article
//   let zoneArticle = document.querySelector("#items");
//   // boucle pour chaque indice(nommé 'article') dans index
//   for (let article of index) {
//     let a=document.createElement("a")
//     a.href=`./product.html?_id=${article._id}`
//     let art=document.createElement("article")
//     a.appendChild(art)
//     let img=document.createElement("img")
//     img.alt=`${article.altTxt}`
//     img.src=`${article.imageUrl}`
//     art.appendChild(img)
//     let h3=document.createElement("h3")
//     h3.className="productName"
//     h3.textContent=`${article.name}`
//     art.appendChild(h3)
//     let p=document.createElement("p")
//     p.className="productDescription"
//     p.textContent=`${article.description}`
//     art.appendChild(p)
//     zoneArticle.appendChild(a)
    // création et ajout des zones d'articles, insertion de l'adresse produit via chemin produit + paramètres(son id);
  //   zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
  //   <article>
  //     <img src="${article.imageUrl}" alt="${article.altTxt}">
  //     <h3 class="productName">${article.name}</h3>
  //     <p class="productDescription">${article.description}</p>
  //   </article>
  // </a>`;
//   }
// }


fillSection();

// Récupération des articles de l'API
async function getArticles() {
    var articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

    // Répartition des données de l'API dans le DOM
async function fillSection() {
    var result = await getArticles ()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {

            // Insertion de l'élément "a"
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // Insertion de l'image
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // Insertion du titre "h3"
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // Insertion de la description "p"
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
}


