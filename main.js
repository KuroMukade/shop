let items = [{
    title: 'Kimetsu no Yaiba',
    price: 30,
    image: 'https://d2y6mqrpjbqoe6.cloudfront.net/image/upload/f_auto,q_auto/media/library-400/124_636906541255068496Demon_Slayer_Small_RU_hq.jpg',
    category: 'Senen',
} , {
    title: 'Shingeki no Kyojin',
    price: 30,
    image: 'https://d2y6mqrpjbqoe6.cloudfront.net/image/upload/f_auto,q_auto/media/library-400/266_636971768415039001SNK_S1_Small_RU_hq.jpg',
    category: 'Senen',
} , {
    title: 'Naruto',
    price: 25,
    image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/e63beb56-0433-4bbf-ae70-5d85a5ed8945/600x900',
    category: 'Big tree',
} , {
    title: 'Bleach',
    price: 50,
    image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/046160b1-b36e-47ec-8dae-3e9c683bc4e1/600x900',
    category: 'Big tree',
} , {
    title: 'Gintama',
    price: 30,
    image: 'https://mangalib.me/uploads/cover/gintama/cover/kxF1YQPS26tt_250x350.jpg',
    category: 'Sitcom',
} , {
    title: 'Hunter x Hunter',
    price: 20,
    image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/80503ec6-1779-4c1a-aae1-b3afe88762ca/300x450',
    category: 'Senen',
} , {
    title: 'Boku no Hero Academia',
    price: 10,
    image: 'https://upload.wikimedia.org/wikipedia/ru/5/58/Boku_no_Hero_Academia_tom1.jpeg',
    category: 'Senen',
} , {
    title: 'Death Note',
    price: 50,
    image: 'https://static.insales-cdn.com/images/products/1/5490/170513778/AF5pPJGW2_0_1_.jpg',
    category: 'Detective',
} , {
    title: 'Tokyo Ghoul',
    price: 35,
    image: 'https://64.media.tumblr.com/ef2b7146e98334d738e545f1a7e2ec19/tumblr_inline_o3ki2sddEZ1r3v1o3_1280.jpg',
    category: 'Senen',
} , {
    title: 'One Piece',
    price: 35,
    image: 'https://www.glenat.com/sites/default/files/images/livres/couv/9782344049020-001-T.jpeg',
    category: 'Big tree'
} , {
    title: 'The Disastrous Life of Saiki K',
    price: 35,
    image: 'https://upload.wikimedia.org/wikipedia/ru/c/cd/Saikikusuono%CF%88nanvol0cover.jpg',
    category: 'Sitcom'
} , {
    title: 'ERASED',
    price: 30,
    image: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/7bd73d08-43a3-4aff-88d0-b9cc983e3d3b/300x450',
    category: 'Detective'
}];
items = [...items, ...items];
items = [...items, ...items];

const PAGINATION_GAP = 14;
let currentPage = 1;

function getVisibleItems(items) {
    return items.slice(PAGINATION_GAP * (currentPage - 1), PAGINATION_GAP * currentPage);
}

function getCategoriesList() {
    const categoriesMapping = items.reduce((mapping, item) => {
        mapping[item.category] = 1;
        return mapping;
    }, {});

    return Object.keys(categoriesMapping);
}

function filterByCategory(category) {
    const filteredItems = items.filter(item => item.category === category);
    renderItemList(filteredItems);
    resetItemsList(filteredItems);
}


function filterByParams(text, category, minPrice, maxPrice) {
    text = text.toLowerCase().trim();
    const filteredByText = items.filter(item => item.title.toLowerCase().includes(text));
    
    function filteredByPrice(value) {
        return value.filter(item => (item.price >= minPrice) && (item.price <= maxPrice));
    }

    if(category === '') {
        return resetItemsList(filteredByPrice(filteredByText));
    }

    const filteredByCategory = filteredByText.filter(item => item.category === category);
    
    return resetItemsList(filteredByPrice(filteredByCategory));
}

function initSearchForm() {
    const searchButton = document.querySelector('#init-search');
    searchButton.addEventListener('click', () => {
        const searchQuery = document.querySelector('#search').value,
              categoryName = document.querySelector('#category').value,
              priceFrom = document.querySelector('#price-from').value,
              priceTo = document.querySelector('#price-to').value;


        filterByParams(searchQuery, categoryName, priceFrom, priceTo);
    });

    const categoriesList = getCategoriesList();
    const categoriesSelect = document.querySelector('#category');
    categoriesList.forEach((category) => {
        categoriesSelect.insertAdjacentHTML('beforeend', `
        <option value='${category}'>${category}</option>
        `);
    });

    categoriesSelect.insertAdjacentHTML('beforeend', `
        <option value='' selected>Все</option>
        `);
}

function tabsInit() {
    const tabsList = document.querySelector('#category-tabs');

    const categoriesList = getCategoriesList();

    tabsList.addEventListener('click', (e) => {
        if (e.target.nodeName.toLowerCase() === 'a') {
            e.preventDefault();
            const categoryName = e.target.getAttribute('data-category');

            if (categoryName === 'All') {
                return renderItemList(items);
            } else {
                filterByCategory(categoryName);                
            }
        }
    });   

    tabsList.insertAdjacentHTML('beforeend', `
    <div class="tab">
        <a href='#' data-category='All'>Все категории</a>
    </div>
    `);

    categoriesList.forEach(category => {
        const html = `
        <div class="tab">
            <a href='#' data-category='${category}'>${category}</a>
        </div>
        `;
        tabsList.insertAdjacentHTML('beforeend', html);
    });    
}

function renderPagination(items) {
    const pages = Math.ceil(items.length / PAGINATION_GAP);
    const pagesList = document.querySelector('#pagination');
    pagesList.innerHTML = '';
    if (pages < 2) {
        return;
    }

    for (let i = 0; i < pages; i++) {
        pagesList.insertAdjacentHTML('beforeend', `
        <div class="page"><a href="#" data-page='${i + 1}' ${currentPage == i + 1 ? 'class="active"' :''}>${i + 1}</a></div>
        `);
    }

    pagesList.addEventListener('click', (e) => {
        if (e.target.nodeName.toLowerCase() === 'a') {
            const pageNumber = Number(e.target.getAttribute('data-page')); 
            currentPage = pageNumber;
            renderItemList(items);
        }
    });
}

function resetItemsList(items) {
    currentPage = 1;
    renderItemList(items);
}

function renderItemList(items) {

    renderPagination(items);
    const itemsContainer = document.querySelector('#items-list');
    itemsContainer.innerHTML = '';

    const visibleItems = getVisibleItems(items);
    visibleItems.forEach((item) => {
    const html = `
        <div class = 'item'>
            <figure>
                <img src = "${item.image}">
                <figcaption>
                    <h2>${item.title}</h2>
                    <h3>Цена: ${item.price}</h3>
                    <p>${item.category}</p>
                </figcaption>
            </figure>
        </div>
        `;
    itemsContainer.insertAdjacentHTML('beforeend', html);
    }); 
}


renderItemList(items);
tabsInit();
initSearchForm();

