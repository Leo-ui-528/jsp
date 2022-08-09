const goods = [
    { id: 1, title: 'Dog', price: 2000, image: 'image/dog1.png' },
    { id: 2, title: 'Mouse', price: 20, image: 'image/mouse.jpeg' },
    { id: 3, title: 'Cat', price: 200, image: 'image/cat.jpg' },
    { id: 4, title: 'Parrot', price: 50, image: 'image/parrot.jpeg' },
];

class GoodsItem {
    constructor({ title, price, image }) {
      this.title = title;
      this.price = price;
      this.image = image;
    }
    render() {
      return `
      <div class="goods-item">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <image src="${this.image}"></image>
      </div>
    `;
    }
  }
  class GoodsList {
    items = [];
    fetchGoods() {
      this.items = goods;
    }

    calculate() {
        return this.items.reduce((prev, { price }) => {
            return prev + price;
          }, 0)
        
    }

    

    render() {
      const goods = this.items.map(item => {
        const goodItem = new GoodsItem(item);
        return goodItem.render()
      }).join('');
    
      document.querySelector('.goods-list').innerHTML = goods;
    }
  }
  
  const goodsList = new GoodsList();
  goodsList.fetchGoods();
  goodsList.render();

