// // pour différencier la page confirmation et panier
// const PAGE = document.location.href;

// // Récupération des produits de l'api
// // appel de la ressource api product (voir index.js) si on est sur la page panier
// if (PAGE.match("cart")) {
// fetch("http://localhost:3000/api/products")
//   .then((res) => res.json())
//   .then((canapes) => {
//       console.log(canapes);
//       // appel de la fonction displayPanier
//       displayPanier(canapes);
//   })
//   .catch((err) => {
//       document.querySelector("#cartAndFormContainer").innerHTML = "<h1>erreur 404</h1>";
//       console.log("erreur 404, sur ressource api: " + err);
//   });
// } 


// // Fonction détermine les conditions d'affichage des produits du panier
// function displayPanier(index) {
//   // on récupère le panier converti
//   let panier = JSON.parse(localStorage.getItem("panierStocker"));
//   // si il y a un panier avec une taille différente de 0 (donc supérieure à 0)
//    if (panier && panier.length != 0) {
//     // zone de correspondance clef/valeur de l'api et du panier grâce à l'id produit choisit dans le localStorage
//     for (let choice of panier) {
//       console.log(choice);
//       for (let g = 0, h = index.length; g < h; g++) {
//         if (choice._id === index[g]._id) {
//           // création et ajout de valeurs à panier qui vont servir pour les valeurs dataset
//           choice.name = index[g].name;
//           choice.price = index[g].price;
//           choice.image = index[g].imageUrl;
//           choice.description = index[g].description;
//           choice.alt = index[g].altTxt;
//         }
//       }
//     }
//     // on joue display,  panier a des clefs/valeurs ajoutés que l'on a pas remonté dans le local storage et sont pourtant réelles
//     // ici panier à les valeurs du local storage + les valeurs définies au dessus
//     //on demande à display() de jouer avec les données panier 
//     //les valeurs ajoutés à panier ont un scope agrandi puisque appelé via la fonction display() d'ailleur dans display() il n'y a pas d'appel à panier de local storage.
//     display(panier);
//   } else {
//     // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
//     document.querySelector("#totalQuantity").innerHTML = "0";
//     document.querySelector("#totalPrice").innerHTML = "0";
//     document.querySelector("h1").innerHTML =
//       "Vous n'avez pas d'article dans votre panier";
//   }
//   // reste à l'écoute grâce aux fonctions suivantes pour modifier l'affichage
//   modifyQuantity();
//   deletion();
// }

// //Fonction d'affichage d'un panier (tableau)
// function display(indexer) {
//   // on déclare et on pointe la zone d'affichage
//   let zonePanier = document.querySelector("#cart__items");
//   // on créait les affichages des produits du panier via un map et introduction de dataset dans le code
//   zonePanier.innerHTML += indexer.map((choice) => 
//   `<article class="cart__item" data-id="${choice._id}" data-color="${choice.color}" data-quantity="${choice.quantity}" data-price="${choice.price}"> 
//     <div class="cart__item__img">
//       <img src="${choice.image}" alt="${choice.alt}">
//     </div>
//     <div class="cart__item__content">
//       <div class="cart__item__content__titlePrice">
//         <h2>${choice.name}</h2>
//         <span>color : ${choice.color}</span>
//         <p data-price="${choice.price}">${choice.price} €</p>
//       </div>
//       <div class="cart__item__content__settings">
//         <div class="cart__item__content__settings__quantity">
//           <p>Qté : </p>
//           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${choice.quantity}">
//         </div>
//         <div class="cart__item__content__settings__delete">
//           <p class="deleteItem" data-id="${choice._id}" data-color="${choice.color}">Supprimer</p>
//         </div>
//       </div>
//     </div>
//   </article>`
//     ).join(""); //on remplace les virgules de jonctions des objets du tableau par un vide
//   // reste à l'écoute des modifications de quantité pour l'affichage et actualiser les données
//   totalProduct();
// }

// // fonction modifQuantité on modifie dynamiquement les quantités du panier
// function modifyQuantity() {
//   const CART = document.querySelectorAll(".cart__item");
//   /* manière de regarder ce que l'on a d'affiché dynamiquement grace au dataset
//    cart.forEach((cart) => {console.log("item panier en dataset: " + " " + cart.dataset.id + " " + cart.dataset.color + " " + cart.dataset.quantity); }); */
//   // On écoute ce qu'il se passe dans itemQuantity de l'article concerné
//   CART.forEach((cart) => {
//     cart.addEventListener("change", (eq) => {
//       // vérification d'information de la valeur du clic et son positionnement dans les articles
//       let panier = JSON.parse(localStorage.getItem("panierStocker"));
//       // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur
//       for (article of panier)
//         if (
//           article._id === cart.dataset.id &&
//           cart.dataset.color === article.color
//         ) {
//           article.quantity = eq.target.value;
//           localStorage.panierStocker = JSON.stringify(panier);
//           // on met à jour le dataset quantité
//           cart.dataset.quantity = eq.target.value;
//           // on joue la fonction pour actualiser les données
//           totalProduct();
//         }
//     });
//   });
// }

// // fonction supression on supprime un article dynamiquement du panier et donc de l'affichage
// function deletion() {
//   // déclaration de variables
//   const CARTDELETE = document.querySelectorAll(".cart__item .deleteItem");
//   // pour chaque élément cartdelete
//   CARTDELETE.forEach((cartdelete) => {
//     // On écoute s'il y a un clic dans l'article concerné
//     cartdelete.addEventListener("click", () => {
//       // appel de la ressource du local storage
//       let panier = JSON.parse(localStorage.getItem("panierStocker"));
//       for (let d = 0, c = panier.length; d < c; d++)
//         if (
//           panier[d]._id === cartdelete.dataset.id &&
//           panier[d].color === cartdelete.dataset.color
//         ) {
//           // déclaration de variable utile pour la suppression
//           const NUM = [d];
//           // création d'un tableau miroir, voir mutation
//           let newPanier = JSON.parse(localStorage.getItem("panierStocker"));
//           //suppression de 1 élément à l'indice num
//           newPanier.splice(NUM, 1);
//           //affichage informatif
//           if (newPanier && newPanier.length == 0) {
//             // si il n'y a pas de panier on crée un H1 informatif et quantité appropriées
//             document.querySelector("#totalQuantity").innerHTML = "0";
//             document.querySelector("#totalPrice").innerHTML = "0";
//             document.querySelector("h1").innerHTML =
//               "Vous n'avez pas d'article dans votre panier";
//           }
//           // on renvoit le nouveau panier converti dans le local storage et on joue la fonction
//           localStorage.panierStocker = JSON.stringify(newPanier);
//           totalProduct(); // logique mais pas obligatoire à cause du reload plus bas qui raffraichit l'affichage; serait necessaire avec suppression sans reload
//           // on recharge la page qui s'affiche sans le produit grace au nouveau panier
//           return location.reload();
//         }
//     });
//   });
// }

// // fonction ajout nombre total produit et coût total
// function totalProduct() {
//   // déclaration variable en tant que nombre
//   let totalArticle = 0;
//   // déclaration variable en tant que nombre
//   let totalPrice = 0;
//   // on pointe l'élément
//   const CART = document.querySelectorAll(".cart__item");
//   // pour chaque élément cart
//   CART.forEach((cart) => {
//     //je récupère les quantités des produits grâce au dataset
//     totalArticle += JSON.parse(cart.dataset.quantity);
//     // je créais un opérateur pour le total produit grâce au dataset
//     totalPrice += cart.dataset.quantity * cart.dataset.price;
//   });
//   // je pointe l'endroit d'affichage nombre d'article
//   document.getElementById("totalQuantity").textContent = totalArticle;
//   // je pointe l'endroit d'affichage du prix total
//   document.getElementById("totalPrice").textContent = totalPrice;
// }

// //  formulaire
// // les données du client seront stockées dans ce tableau pour la commande sur page panier
// if (PAGE.match("cart")) {
//   var contactClient = {};
//   localStorage.contactClient = JSON.stringify(contactClient);
  
//   // on pointe des éléments input, on attribut à certains la même classe, ils régiront pareil aux différentes regex
//   // on pointe les input nom prénom et ville
//   var prenom = document.querySelector("#firstName");
//   prenom.classList.add("regex_texte");
//   var nom = document.querySelector("#lastName");
//   nom.classList.add("regex_texte");
//   var ville = document.querySelector("#city");
//   ville.classList.add("regex_texte");
//   // on pointe l'input adresse
//   var adresse = document.querySelector("#address");
//   adresse.classList.add("regex_adresse");
//   // on pointe l'input email
//   var email = document.querySelector("#email");
//   email.classList.add("regex_email");
//   // on pointe les élément qui ont la classe .regex_texte
//   var regexTexte = document.querySelectorAll(".regex_texte");
//   // modification du type de l'input type email à text à cause d'un comportement de l'espace blanc non voulu vis à vis de la regex 
//   document.querySelector("#email").setAttribute("type", "text");
// }
// // /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i

// // /^ début regex qui valide les caratères a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ aussi les espaces blancs et tiret \s- comprit entre 1 et 31 caratères (nombre de caractère maximum sur carte identité) {1,31} et on termine la regex $/i en indiquant que les éléments selectionnés ne sont pas sensible à la casse
// let regexLettre = /^[a-z][a-z '-.,]{1,31}$|^$/i;
// // /^ début regex qui valide les caratères chiffre lettre et caratères spéciaux a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ aussi les espaces blancs et tiret \s- comprit entre 1 et 60 caratères (nombre de caractère maximum sur carte identité) {1,60} et on termine la regex $/i en indiquant que les éléments selectionnés ne sont pas sensible à la casse
// let regexChiffreLettre = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/;
// let regValidEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
// let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;

// // Ecoute et attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex
// if (PAGE.match("cart")) {
//   regexTexte.forEach((regexTexte) =>
//     regexTexte.addEventListener("input", (e) => {
//       // valeur sera la valeur de l'input en dynamique
//       valeur = e.target.value;
//       // regNormal sera la valeur de la réponse regex, 0 ou -1
//       let regNormal = valeur.search(regexLettre);
//       if (regNormal === 0) {
//         contactClient.firstName = prenom.value;
//         contactClient.lastName = nom.value;
//         contactClient.city = ville.value;
//       }
//       if (
//         contactClient.city !== "" &&
//         contactClient.lastName !== "" &&
//         contactClient.firstName !== "" &&
//         regNormal === 0
//       ) {
//         contactClient.regexNormal = 3;
//       } else {
//         contactClient.regexNormal = 0;
//       }
//       localStorage.contactClient = JSON.stringify(contactClient);
//       colorRegex(regNormal, valeur, regexTexte);
//       validClic();
//     })
//   );
// }

// // le champ écouté via la regex regexLettre fera réagir, grâce à texteInfo, la zone concernée
// texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
// texteInfo(regexLettre, "#lastNameErrorMsg", nom);
// texteInfo(regexLettre, "#cityErrorMsg", ville);

// // Ecoute et attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex
// if (PAGE.match("cart")) {
//   let regexAdresse = document.querySelector(".regex_adresse");
//   regexAdresse.addEventListener("input", (e) => {
//     // valeur sera la valeur de l'input en dynamique
//     valeur = e.target.value;
//     // regNormal sera la valeur de la réponse regex, 0 ou -1
//     let regAdresse = valeur.search(regexChiffreLettre);
//     if (regAdresse == 0) {
//       contactClient.address = adresse.value;
//     }
//     if (contactClient.address !== "" && regAdresse === 0) {
//       contactClient.regexAdresse = 1;
//     } else {
//       contactClient.regexAdresse = 0;
//     }
//     localStorage.contactClient = JSON.stringify(contactClient);
//     colorRegex(regAdresse, valeur, regexAdresse);
//     validClic();
//   });
// }

// // le champ écouté via la regex regexChiffreLettre fera réagir, grâce à texteInfo, la zone concernée
// texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse);
// // Ecoute et attribution de point(pour sécurité du clic) si ce champ est ok d'après les regex
// if (PAGE.match("cart")) {
//   let regexEmail = document.querySelector(".regex_email");
//   regexEmail.addEventListener("input", (e) => {
//     // valeur sera la valeur de l'input en dynamique
//     valeur = e.target.value;
//     let regMatch = valeur.match(regMatchEmail);
//     // quand le resultat sera correct, le console log affichera une autre réponse que null; regValide sera la valeur de la réponse regex, 0 ou -1
//     let regValid = valeur.search(regValidEmail);
//     if (regValid === 0 && regMatch !== null) {
//       contactClient.email = email.value;
//       contactClient.regexEmail = 1;
//     } else {
//       contactClient.regexEmail = 0;
//     }
//     localStorage.contactClient = JSON.stringify(contactClient);
//     colorRegex(regValid, valeur, regexEmail);
//     validClic();
//   });
// }

// // texte sous champ email
// if (PAGE.match("cart")) {
//   email.addEventListener("input", (e) => {
//     // valeur sera la valeur de l'input en dynamique
//     valeur = e.target.value;
//     let regMatch = valeur.match(regMatchEmail);
//     let regValid = valeur.search(regValidEmail);
//     // si valeur est toujours un string vide et la regex différente de 0 (regex à -1 et le champ est vide mais pas d'erreur)
//     if (valeur === "" && regMatch === null) {
//       document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
//       document.querySelector("#emailErrorMsg").style.color = "white";
//       // si valeur n'est plus un string vide et la regex différente de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
//     } else if ( regValid !== 0) {
//       document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";
//       document.querySelector("#emailErrorMsg").style.color = "white";
//       // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
//     } else if (valeur != "" && regMatch == null) {
//       document.querySelector("#emailErrorMsg").innerHTML = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
//       document.querySelector("#emailErrorMsg").style.color = "white";
//     } else {
//       document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
//       document.querySelector("#emailErrorMsg").style.color = "white";
//     }
//   });
// }

// // fonction couleurRegex qui modifira la couleur de l'input par remplissage tapé, aide visuelle et accessibilité
// // on détermine une valeur de départ à valeur qui sera un string
// let listenValue = "";
// // fonction à 3 arguments réutilisable, la regex, la valeur d'écoute, et la réponse à l'écoute
// function colorRegex(regSearch, listenValue, inputAction) {
//   // si valeur est toujours un string vide et la regex différente de 0 (regex à -1 et le champ est vide mais pas d'erreur)
//   if (listenValue === "" && regSearch != 0) {
//     inputAction.style.backgroundColor = "white";
//     inputAction.style.color = "black";
//     // si valeur n'est plus un string vide et la regex différente de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
//   } else if (listenValue !== "" && regSearch != 0) {
//     inputAction.style.backgroundColor = "rgb(220, 50, 50)";
//     inputAction.style.color = "white";
//     // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
//   } else {
//     inputAction.style.backgroundColor = "rgb(0, 138, 0)";
//     inputAction.style.color = "white";
//   }
// }

// // fonction d'affichage individuel des paragraphes sous input sauf pour l'input email
// function texteInfo(regex, pointage, zoneListen) {
//       if (PAGE.match("cart")) {
//       zoneListen.addEventListener("input", (e) => {
//       // valeur sera la valeur de l'input en dynamique
//       valeur = e.target.value;
//       index = valeur.search(regex);
//     // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)
//       if (valeur === "" && index != 0) {
//         document.querySelector(pointage).textContent = "Veuillez renseigner ce champ.";
//         document.querySelector(pointage).style.color = "white";
//         // si valeur n'est plus un string vide et la regex différente de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
//       } else if (valeur !== "" && index != 0) {
//         document.querySelector(pointage).innerHTML = "Reformulez cette donnée";
//         document.querySelector(pointage).style.color = "white";
//         // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
//       } else {
//       document.querySelector(pointage).innerHTML = "Caratères acceptés pour ce champ.";
//       document.querySelector(pointage).style.color = "white";
//       }
//     });
//   }
// }

// // Fonction de validation/d'accés au clic du bouton du formulaire
// let commande = document.querySelector("#order");
// // la fonction sert à valider le clic de commande de manière interactive
// function validClic() {
//   let contactRef = JSON.parse(localStorage.getItem("contactClient"));
//   let somme =
//     contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
//   if (somme === 5) {
//     commande.removeAttribute("disabled", "disabled");
//     document.querySelector("#order").setAttribute("value", "Commander !");
//   } else {
//     commande.setAttribute("disabled", "disabled");
//     document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
//   }
// }

// // Envoi de la commande
// if (PAGE.match("cart")) {
//   commande.addEventListener("click", (e) => {
//     // empeche de recharger la page on prévient le reload du bouton
//     e.preventDefault();
//     validClic();
//     envoiPaquet();
//   });
// }

// // fonction récupérations des id puis mis dans un tableau
// // définition du panier quine comportera que les id des produits choisi du local storage
// let panierId = [];
// function tableauId() {
// // appel des ressources
// let panier = JSON.parse(localStorage.getItem("panierStocker"));
// // récupération des id produit dans panierId
// if (panier && panier.length > 0) {
//   for (let indice of panier) {
//     panierId.push(indice._id);
//   }
// } else {
//   console.log("le panier est vide");
//   document.querySelector("#order").setAttribute("value", "Panier vide!");
// }
// }

// // fonction récupération des donnée client et panier avant transformation
// let contactRef;
// let commandeFinale;
// function paquet() {
//   contactRef = JSON.parse(localStorage.getItem("contactClient"));
//   // définition de l'objet commande
//   commandeFinale = {
//     contact: {
//       firstName: contactRef.firstName,
//       lastName: contactRef.lastName,
//       address: contactRef.address,
//       city: contactRef.city,
//       email: contactRef.email,
//     },
//     products: panierId,
//   };
// }

// // fonction sur la validation de l'envoi
// function envoiPaquet() {
//   tableauId();
//   paquet();
//   // vision sur le paquet que l'on veut envoyer
//   console.log(commandeFinale);
//   let somme = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
//   // si le panierId contient des articles et que le clic est autorisé
//   if (panierId.length != 0 && somme === 5) {
//     // envoi à la ressource api
//     fetch("http://localhost:3000/api/products/order", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(commandeFinale),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         // envoyé à la page confirmation
//         window.location.href = `./confirmation.html?commande=${data.orderId}`;
//       })
//       .catch(function (err) {
//         console.log(err);
//         alert("erreur");
//       });
//   }
// }

// // fonction affichage auto-invoquée du numéro de commande et vide du storage lorsque l'on est sur la page confirmation
// (function Commande() {
//   if (PAGE.match("confirmation")) {
//     sessionStorage.clear();
//     localStorage.clear();
//     // valeur du numero de commande
//     let numCom = new URLSearchParams(document.location.search).get("commande");
//     // merci et mise en page
//     document.querySelector("#orderId").innerHTML = `<br>${numCom}<br>Merci pour votre achat`;
//     // console.log("valeur de l'orderId venant de l'url: " + numCom);
//     //réinitialisation du numero de commande
//     numCom = undefined;
//   } 

// })();



//Initialisation du local storage
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
function getCart(){
if (produitLocalStorage === null || produitLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
} else {
for (let produit in produitLocalStorage){
    // Insertion de l'élément "article"
    let productArticle = document.createElement("article");
    document.querySelector("#cart__items").appendChild(productArticle);
    productArticle.className = "cart__item";
    productArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);

    // Insertion de l'élément "div"
    let productDivImg = document.createElement("div");
    productArticle.appendChild(productDivImg);
    productDivImg.className = "cart__item__img";

    // Insertion de l'image
    let productImg = document.createElement("img");
    productDivImg.appendChild(productImg);
    productImg.src = produitLocalStorage[produit].imgProduit;
    productImg.alt = produitLocalStorage[produit].altImgProduit;
    
    // Insertion de l'élément "div"
    let productItemContent = document.createElement("div");
    productArticle.appendChild(productItemContent);
    productItemContent.className = "cart__item__content";

    // Insertion de l'élément "div"
    let productItemContentTitlePrice = document.createElement("div");
    productItemContent.appendChild(productItemContentTitlePrice);
    productItemContentTitlePrice.className = "cart__item__content__titlePrice";
    
    // Insertion du titre h3
    let productTitle = document.createElement("h2");
    productItemContentTitlePrice.appendChild(productTitle);
    productTitle.innerHTML = produitLocalStorage[produit].nomProduit;

    // Insertion de la couleur
    let productColor = document.createElement("p");
    productTitle.appendChild(productColor);
    productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
    productColor.style.fontSize = "20px";

    // Insertion du prix
    let productPrice = document.createElement("p");
    productItemContentTitlePrice.appendChild(productPrice);
    productPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";

    // Insertion de l'élément "div"
    let productItemContentSettings = document.createElement("div");
    productItemContent.appendChild(productItemContentSettings);
    productItemContentSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemContentSettingsQuantity = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsQuantity);
    productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
    // Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemContentSettingsQuantity.appendChild(productQte);
    productQte.innerHTML = "Qté : ";

    // Insertion de la quantité
    let productQuantity = document.createElement("input");
    productItemContentSettingsQuantity.appendChild(productQuantity);
    productQuantity.value = produitLocalStorage[produit].quantiteProduit;
    productQuantity.className = "itemQuantity";
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    productItemContentSettings.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

    // Insertion de "p" supprimer
    let productSupprimer = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productSupprimer);
    productSupprimer.className = "deleteItem";
    productSupprimer.innerHTML = "Supprimer";
}
}}
getCart();

function getTotals(){

    // Récupération du total des quantités
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Récupération du prix total
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log(totalPrice);
}
getTotals();

// Modification d'une quantité de produit
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[k].quantiteProduit;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.qttModifValue !== quantityModif);

            resultFind.quantiteProduit = qttModifValue;
            produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQtt();

// Suppression d'un produit
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btn_supprimer.length; j++){
        btn_supprimer[j].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[j].idProduit;
            let colorDelete = produitLocalStorage[j].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( el => el.idProduit !== idDelete || el.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

//Instauration formulaire avec regex
function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    // Ecoute de la modification du prénom
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    // Ecoute de la modification du prénom
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    // Ecoute de la modification du prénom
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    // Ecoute de la modification du prénom
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation du prénom
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation du nom
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'adresse
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de la ville
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

//Envoi des informations client au localstorage
function postForm(){
    const btn_commander = document.getElementById("order");

    //Ecouter le panier
    btn_commander.addEventListener("click", (event)=>{
    
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            localStorage.clear();
            localStorage.setItem("orderId", data.orderId);

            document.location.href = "confirmation.html";
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        })
}
postForm();
