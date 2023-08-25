document.addEventListener("DOMContentLoaded", function() {
    // Retrieve items from local storage
    let items = JSON.parse(localStorage.getItem("items")) || [];

    // Display items
    const itemList = document.getElementById("item-list");
    items.forEach(item => {
        itemList.innerHTML += `<div>${item}</div>`;
    });

    // Add item
    const addButton = document.getElementById("add-button");
    addButton.addEventListener("click", function() {
        const itemName = document.getElementById("item-name").value;
        if (itemName) {
            items.push(itemName);
            localStorage.setItem("items", JSON.stringify(items));
            itemList.innerHTML += `<div>${itemName}</div>`;
            document.getElementById("item-name").value = "";
        }
    });
});
