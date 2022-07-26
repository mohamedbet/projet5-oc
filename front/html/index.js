let produitsData = [];

const fetchProduits = async () => {
await fetch(" http://localhost:3000/api/products")
.then((res) => res.json())
.then((promise) => {
produitsData = promise;
console.log(produitsData);
});
};
