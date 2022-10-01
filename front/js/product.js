// // Récupération de l'id du produit via l' URL
// //la variable PARAMS récupère l'url de la page   
// const PARAMS = new URLSearchParams(document.location.search);
// // la variable id va récupérer la valeur du paramètre _id
// const ID = PARAMS.get("_id");
// console.log(ID);

// // Récupération des produits de l'api et traitement des données (voir index.js)
// fetch("http://localhost:3000/api/products")
//     .then((res) => res.json())
//     .then((canapes) => {
//         // execution de la fontion lesProduits
//         products(canapes);
//     })
//     .catch((err) => {
//         document.querySelector(".item").innerHTML = "<h1>erreur 404</h1>";
//         console.log("erreur 404, sur ressource api: " + err);
//     });

// // Création d'objet articleClient
// // déclaration objet articleClient prêt à être modifiée par les fonctions suivantes d'évènements
// let articleClient = {};
// // id du procuit
// articleClient._id = ID;

// // fonction d'affichage du produit de l'api
// function products(product) {
//     // déclaration des variables pointage des éléments
//     let imageAlt = document.querySelector("article div.item__img");
//     let title = document.querySelector("#title");
//     let price = document.querySelector("#price");
//     let description = document.querySelector("#description");
//     let colorOption = document.querySelector("#colors");
//     // boucle for pour chercher un indice
//     for (let choice of product) {
//         //si id (définit par l'url) est identique à un _id d'un des produits du tableau, on récupère son indice de tableau qui sert pour les éléments produit à ajouter
//         if (ID === choice._id) {

//             //ajout des éléments de manière dynamique
//             imageAlt.innerHTML = `<img src="${choice.imageUrl}" alt="${choice.altTxt}">`;
//             title.textContent = `${choice.name}`;
//             price.textContent = `${choice.price}`;
//             description.textContent = `${choice.description}`;
//             // boucle pour chercher les couleurs pour chaque produit en fonction de sa clef/valeur (la logique: tableau dans un tableau = boucle dans boucle)
//             for (let color of choice.colors) {
//                 // ajout des balises d'option couleur avec leur valeur
//                 colorOption.innerHTML += `<option value="${color}">${color}</option>`;
//             }
//         }
//     }
// }

// // choix couleur dynamique
// // définition des variables
// let choiceColor = document.querySelector("#colors");
// // On écoute ce qu'il se passe dans #colors
// choiceColor.addEventListener("input", (ec) => {
//     let colorProduct;
//     // on récupère la valeur de la cible de l'évenement dans couleur
//     colorProduct = ec.target.value;
//     // on ajoute la couleur à l'objet panierClient
//     articleClient.color = colorProduct;
//     //ça reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit
//     document.querySelector("#addToCart").style.color = "white";
//     document.querySelector("#addToCart").textContent = "Ajouter au panier";
//     console.log(colorProduct);
// });

// // choix quantité dynamique
// // définition des variables
// let choiceQuantity = document.querySelector('input[id="quantity"]');
// let quantityProduct;
// // On écoute ce qu'il se passe dans input[name="itemQuantity"]
// choiceQuantity.addEventListener("input", (eq) => {
//     // on récupère la valeur de la cible de l'évenement dans couleur
//     quantityProduct = eq.target.value;
//     // on ajoute la quantité à l'objet panierClient
//     articleClient.quantity = quantityProduct;
//     //ça reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit
//     document.querySelector("#addToCart").style.color = "white";
//     document.querySelector("#addToCart").textContent = "Ajouter au panier";
//     console.log(quantityProduct);
// });

// // conditions de validation du clic via le bouton ajouter au panier
// // déclaration variable
// let choiceProduct = document.querySelector("#addToCart");
// // On écoute ce qu'il se passe sur le bouton #addToCart pour faire l'action :
// choiceProduct.addEventListener("click", () => {
//     //conditions de validation du bouton ajouter au panier
//     if (
//         // les valeurs sont créés dynamiquement au click et à l'arrivée sur la page, tant qu'il n'y a pas d'action sur la couleur et/ou la quantité, c'est 2 valeurs sont undefined.
//         articleClient.quantity < 1 ||
//         articleClient.quantity > 100 ||
//         articleClient.quantity === undefined ||
//         articleClient.color === "" ||
//         articleClient.color === undefined
//     ) {

//         // joue l'alerte
//         alert("Pour valider le choix de cet article, veuillez renseigner une couleur, et/ou une quantité valide entre 1 et 100");
//         // si ça passe le controle
//     } else {
//         // joue panier
//         Panier();
//         console.log("clic effectué");
//         //effet visuel d'ajout de produit
//         document.querySelector("#addToCart").style.color = "rgb(0, 205, 0)";
//         document.querySelector("#addToCart").textContent = "Produit ajouté !";
//     }
// });

// // Déclaration de tableaux utiles
// // déclaration tableau qui sera le 1er, unique et destiné à initialiser le panier
// let choiceProductClient = [];
// // déclaration tableau qui sera ce qu'on récupère du local storage appelé panierStocker et qu'on convertira en JSon (importance dans Panier())
// let productsChecked = [];
// // déclaration tableau qui sera un choix d'article/couleur non effectué donc non présent dans le panierStocker
// let productsTemporary = [];
// // déclaration tableau qui sera la concaténation des productsPush et de productsTemporary
// let productsPush = [];

// // fonction ajout Premier Produit qui ajoute l'article choisi dans le tableau vierge
// function addFirstProduct() {
//     console.log(productsChecked);
//     //si produitsEnregistrés est null c'est qu'il n'a pas été créé
//     if (productsChecked === null) {
//         // pousse le produit choisit dans choixProduitClient
//         choiceProductClient.push(articleClient);
//         console.log(articleClient);
//         // dernière commande, envoit choixProduitClient dans le local storage sous le nom de panierStockr de manière JSON stringifier
//         return (localStorage.panierStocker = JSON.stringify(choiceProductClient));
//     }
// }

// // fonction ajout Autre Produit qui ajoute l'article dans le tableau non vierge et fait un tri
// function addAnotherProduct() {
//     // vide/initialise productsPush pour recevoir les nouvelles données
//     productsPush = [];
//     // pousse le produit choisit dans productsTemporary
//     productsTemporary.push(articleClient);
//     // combine productsTemporary et/dans productsChecked, ça s'appele produitsPush
//     productsPush = [...productsChecked, ...productsTemporary];
//     //fonction pour trier et classer les id puis les couleurs
//     productsPush.sort(function triage(a, b) {
//         if (a._id < b._id) return -1;
//         if (a._id > b._id) return 1;
//         if (a._id = b._id) {
//             if (a.color < b.color) return -1;
//             if (a.color > b.color) return 1;
//         }
//         return 0;
//     });
//     // vide/initialise produitsTemporary maintenant qu'il a été utilisé
//     productsTemporary = [];
//     // dernière commande, envoit produitsPush dans le local storage sous le nom de panierStocker de manière JSON stringifier
//     return (localStorage.panierStocker = JSON.stringify(productsPush));
// }

// function checkCartSize() {
//     productsChecked = JSON.parse(localStorage.getItem("panierStocker"));

//     let count = 0;
//     for (let choice of productsChecked) {
//         if (choice.quantity !== undefined) {
//             count += parseInt(choice.quantity);
//         }
//     }
//     count += parseInt (articleClient.quantity);
//     if (count > 100) {
//         return false;
//     }
//     return true;
// }

// // fonction Panier qui ajuste la quantité si le produit est déja dans le tableau, sinon le rajoute si tableau il y a, ou créait le tableau avec un premier article choisi 
// function Panier() {
//     // variable qui sera ce qu'on récupère du local storage appelé panierStocker et qu'on a convertit en JSon
//     productsChecked = JSON.parse(localStorage.getItem("panierStocker"));
//     // si produitChecked existe (si des articles ont déja été choisis et enregistrés par le client)

//     let tmp = localStorage.panierStocker;
//     if (productsChecked) {
//         if (checkCartSize()) {
//             for (let choice of productsChecked) {
//                 if (choice._id === ID && choice.color === articleClient.color) {
//                     //information client
//                     alert("RAPPEL: Vous aviez déja choisit cet article.");
//                     // on modifie la quantité d'un produit existant dans le panier du localstorage
//                     //définition de additionAmount qui est la valeur de l'addition de l'ancienne quantité passé et de la nouvelle passé pour le même produit
//                     let additionQuantity = parseInt(choice.quantity) + parseInt(quantityProduct);
//                     // on convertit en JSON le résultat précédent dans la zone voulue
//                     choice.quantity = JSON.stringify(additionQuantity);
//                     // dernière commande, on renvoit un nouveau panierStocké dans le localStorage
//                     return (localStorage.panierStocker = JSON.stringify(productsChecked));
//                 }
//             }
//             // appel fonction ajout Autre Produit si la boucle au dessus ne retourne rien donc n'a pas d'égalité
//             return addAnotherProduct();
//         }
//     }
//     // appel fonction ajoutPremierProduit si produits Enregistrés n'existe pas
//     return addFirstProduct();
// }


var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document. querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

// Récupération des articles de l'API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        article = await resultatAPI;
        console.table(article);
        if (article){
            getPost(article);
        }
    })
    .catch((error) => {
        console.log("Erreur de la requête API");
    })
}
    
function getPost(article){
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    // Insertion des options de couleurs
    for (let colors of article.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//Gestion du panier
function addToCart(article) {
    const btn_envoyerPanier = document.querySelector("#addToCart");

    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    btn_envoyerPanier.addEventListener("click", (event)=>{
        if (quantityPicked.value > 0 && quantityPicked.value <=100 && quantityPicked.value != 0){

    //Recupération du choix de la couleur
    let choixCouleur = colorPicked.value;
                
    //Recupération du choix de la quantité
    let choixQuantite = quantityPicked.value;

    //Récupération des options de l'article à ajouter au panier
    let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt
    };

    //Initialisation du local storage
    let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //fenêtre pop-up
    const popupConfirmation =() =>{
        if(window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)){
            window.location.href ="cart.html";
        }
    }

    //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
    const resultFind = produitLocalStorage.find(
        (el) => el.idProduit === idProduct && el.couleurProduit === choixCouleur);
        //Si le produit commandé est déjà dans le panier
        if (resultFind) {
            let newQuantite =
            parseInt(optionsProduit.quantiteProduit) + parseInt(resultFind.quantiteProduit);
            resultFind.quantiteProduit = newQuantite;
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        //Si le produit commandé n'est pas dans le panier
        } else {
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            popupConfirmation();
        }
    //Si le panier est vide
    } else {
        produitLocalStorage =[];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
        popupConfirmation();
    }}
    });
}
