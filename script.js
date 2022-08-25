const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
    return new Promise((resolve) => {
        fetch(url)
            .then((res) => {
                setTimeout(() => {
                    resolve(res.json())
                }, 2000)
            })
    })
}

function init() {
    const app = new Vue({
        el: '#root',
        data: {
            isVisibleCard: false,
            items: [],
            filteredItems: [],
            search: 'searchline'
        },
        methods: {
            fetchGoods() {
                service(GET_GOODS_ITEMS).then((data) => {
                    this.items = data;
                    this.filteredItems = data;
                });
            },
            filterItems() {
                this.filteredItems = this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.search, 'gui'))
                })
            },
            changeVisibleCard() {
                this.isVisibleCard = !this.isVisibleCard;
            }
        },
        computed: {
            calculatePrice() {
                return this.filteredItems.reduce((prev, { price }) => {
                    return prev + price;
                }, 0)
            }
        },
        mounted() {
            this.fetchGoods();
        }
    })
}
window.onload = init