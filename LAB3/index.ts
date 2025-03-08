type categoriesData = {
  id: number;
  name: string;
  img: string;
  shortname: string;
  notes: string;
};

type universalData = {
  id: number;
  name: string;
  img: string;
  shortname: string;
  description: string;
  price: number;
};

type Categories = {
  categoriesData: categoriesData[];
  electronikData: universalData[];
  clothingData: universalData[];
  BookData: universalData[];
  FoodsData: universalData[];
};
async function fetchDataFromMultipleFiles(): Promise<Categories> {
  const [
    categoriesResponse,
    electronikResponse,
    clothingResponse,
    BookResponse,
    foodsResponse,
  ] = await Promise.all([
    fetch("./src/components/api/categories.json"),
    fetch("./src/components/api/electronik.json"),
    fetch("./src/components/api/things.json"),
    fetch("./src/components/api/book.json"),
    fetch("./src/components/api/foods.json"),
  ]);

  const categoriesData = await categoriesResponse.json();
  const electronikData = await electronikResponse.json();
  const clothingData = await clothingResponse.json();
  const BookData = await BookResponse.json();
  const FoodsData = await foodsResponse.json();

  return { categoriesData, electronikData, clothingData, BookData, FoodsData };
}

let specialsLinkInserted: boolean = false;

function loadHomePage(): void {
  const content = document.getElementById("content");
  if (content) content.innerHTML = "";

  const container_nav_menu = document.querySelector(".container__nav-menu");
  if (container_nav_menu) {
    const navMenuChildren = container_nav_menu.children;
    if (navMenuChildren.length >= 3) {
      container_nav_menu.removeChild(navMenuChildren[2]);
    }
  }
  specialsLinkInserted = false;
}

async function loadCatalog(): Promise<void> {
  try {
    const data = await fetchDataFromMultipleFiles();
    const categories = data.categoriesData;
    const content = document.getElementById("content");
    const container_nav_menu = document.querySelector(".container__nav-menu");
    if (content) content.innerHTML = "";

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
      if (content) content.innerHTML += categoryContainer;
    }

    const categoryLinks = document.querySelectorAll(".mainLink");
    categoryLinks.forEach((link) => {
      link.addEventListener("click", function (event: Event) {
        event.preventDefault();
        const target = event.target as HTMLElement;
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
  } catch (error) {
    console.error("Помилка завантаження каталогу: ", error);
  }
}

async function loadSubCategoties(id: string): Promise<void> {
  const content = document.getElementById("content");
  if (content) content.innerHTML = "";
  const data = await fetchDataFromMultipleFiles();
  let categories: any = null;

  if (id === "1") {
    categories = data.electronikData;
  } else if (id === "2") {
    categories = data.clothingData;
  } else if (id === "3") {
    categories = data.BookData;
  } else if (id === "4") {
    categories = data.FoodsData;
  }

  if (!categories) return;

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
    if (content) content.innerHTML += categoryContainer;
  }
}

function randomSubCategories(): void {
  const randomId = Math.floor(Math.random() * 4) + 1;
  console.log(`Random category ID selected: ${randomId}`);
  loadSubCategoties(randomId.toString());
}
