const menu = [];

let idCounter = 1;

foodItems.forEach((fdItem) => {
  for (let i = 0; i < 20; i++) {
    idCounter++;
    if (idCounter > 102) {
    menu.push({
      id: idCounter,
      name: `${fdItem.name.charAt(0).toUpperCase() + fdItem.name.slice(1)} Special ${i + 1}`,
      price: Math.floor(Math.random() * 200) + 100, // Price between 100-300
      description: `Delicious ${fdItem.name.replace("-", " ")} dish with a unique twist.`,
      category: fdItem.name,
      ratings: (Math.random() * 2 + 3).toFixed(1), // Ratings between 3.0 - 5.0
      image: `https://foodish-api.com/images/${fdItem.name}/${fdItem.name}${(i % fdItem.value) + 1}.jpg`
    });
  }}
});
console.log(menu);