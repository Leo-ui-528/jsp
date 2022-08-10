const goods = [
  { id: 1, title: 'Dog', price: 2000 },
  { id: 2, title: 'Mouse', price: 20 },
  { id: 3, title: 'Cat', price: 200 },
  { id: 4, title: 'Parrot', price: 50 },
];

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'


function makeGETRequest(url, callback) {
  var xhr;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      callback(xhr.responseText);
    }
  }
  xhr.open('GET', url, true);
  xhr.send();
}


class GoodsItem {
  constructor({ product_name, price }) {
    this.title = product_name;
    this.price = price;
  }
  render() {
    return `
      <div class="goods-item">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
      </div>
    `;
  }
}
class GoodsList {
  items = [];

  fetchGoods(cb) {
    makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
      this.goods = JSON.parse(goods);
      cb();
    })
  }

  calculate() {
    return this.items.reduce((prev, { price }) => {
      return prev + price;
    }, 0)

  }



  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
}

const list = new GoodsList();
list.fetchGoods(() => {
  list.render();

});
 

