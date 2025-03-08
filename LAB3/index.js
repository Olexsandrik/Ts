"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchDataFromMultipleFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        const [categoriesResponse, electronikResponse, clothingResponse, BookResponse, foodsResponse,] = yield Promise.all([
            fetch("./src/components/api/categories.json"),
            fetch("./src/components/api/electronik.json"),
            fetch("./src/components/api/things.json"),
            fetch("./src/components/api/book.json"),
            fetch("./src/components/api/foods.json"),
        ]);
        const categoriesData = yield categoriesResponse.json();
        const electronikData = yield electronikResponse.json();
        const clothingData = yield clothingResponse.json();
        const BookData = yield BookResponse.json();
        const FoodsData = yield foodsResponse.json();
        return { categoriesData, electronikData, clothingData, BookData, FoodsData };
    });
}
let specialsLinkInserted = false;
function loadHomePage() {
    const content = document.getElementById("content");
    if (content)
        content.innerHTML = "";
    const container_nav_menu = document.querySelector(".container__nav-menu");
    if (container_nav_menu) {
        const navMenuChildren = container_nav_menu.children;
        if (navMenuChildren.length >= 3) {
            container_nav_menu.removeChild(navMenuChildren[2]);
        }
    }
    specialsLinkInserted = false;
}
function loadCatalog() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchDataFromMultipleFiles();
            const categories = data.categoriesData;
            const content = document.getElementById("content");
            const container_nav_menu = document.querySelector(".container__nav-menu");
            if (content)
                content.innerHTML = "";
            for (const category of categories) {
                const categoryContainer = `
                <div class="catalog_container">
                    <div class="category_img">
                        <a href="#" class="mainLink" id="${category.id}"><img src="${category.img}" alt="img"></a>
                    </div>
                    <div class="category_shortname">${category.shortname}</div>
                    <div class="category_name">${category.name}</div>
                </div>
            `;
                if (content)
                    content.innerHTML += categoryContainer;
            }
            const categoryLinks = document.querySelectorAll(".mainLink");
            categoryLinks.forEach((link) => {
                link.addEventListener("click", function (event) {
                    event.preventDefault();
                    const target = event.target;
                    if (target.parentElement) {
                        const categoryId = target.parentElement.id;
                        loadSubCategoties(categoryId);
                    }
                });
            });
            if (!specialsLinkInserted && container_nav_menu) {
                const specialsLi = document.createElement("li");
                const specialsLink = document.createElement("a");
                specialsLink.href = "#";
                specialsLink.innerText = "Specials";
                specialsLi.appendChild(specialsLink);
                specialsLink.style.fontSize = "20px";
                specialsLink.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
                specialsLink.classList.add("clickForSubCatalog");
                specialsLink.addEventListener("mouseover", function () {
                    this.style.textDecoration = "underline";
                });
                specialsLink.addEventListener("mouseout", function () {
                    this.style.textDecoration = "none";
                });
                specialsLink.addEventListener("click", function () {
                    randomSubCategories();
                });
                container_nav_menu.appendChild(specialsLi);
                specialsLinkInserted = true;
            }
        }
        catch (error) {
            console.error("Помилка завантаження каталогу: ", error);
        }
    });
}
function loadSubCategoties(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = document.getElementById("content");
        if (content)
            content.innerHTML = "";
        const data = yield fetchDataFromMultipleFiles();
        let categories = null;
        if (id === "1") {
            categories = data.electronikData;
        }
        else if (id === "2") {
            categories = data.clothingData;
        }
        else if (id === "3") {
            categories = data.BookData;
        }
        else if (id === "4") {
            categories = data.FoodsData;
        }
        if (!categories)
            return;
        for (const category of categories) {
            const categoryContainer = `
                <div class="catalog_container">
                    <div class="category_img">
                        <a href="#" class="mainLink" id="${category.id}"><img src="${category.img}" alt="img"></a>
                    </div>
                    <div class="category_shortname">${category.shortname}</div>
                    <div class="category_name">${category.name}</div>
                    <div class="category_discription">${category.description}</div>
                    <div class="category_price">${category.price}</div>
                </div>
            `;
            if (content)
                content.innerHTML += categoryContainer;
        }
    });
}
function randomSubCategories() {
    const randomId = Math.floor(Math.random() * 4) + 1;
    console.log(`Random category ID selected: ${randomId}`);
    loadSubCategoties(randomId.toString());
}
