import EventBus from '../EventBus.js';

export default class ProductView {
    constructor(productInstance = {}) {
        this.model = productInstance;
        this.node = null;

        EventBus.on('INIT', ({ data }) => {
            this.render();
            this.events();
        });
        EventBus.on('PROPERTY_SET', ({ data }) => {
            this.render();
            this.events();
        });
    }
    registerToDOM(node) {
        this.node = node;
    }
    template() {
        return `
            <span>${this.model.getProperty('id')}</span>
            <span>${this.model.getProperty('name')}</span>
            <span>${this.model.getProperty('size')}</span>
            <span>${this.model.getProperty('price').toFixed(2)} €</span>
            <span>${this.model.getProperty('stock')}</span>
            <span>
                <button class="button-buy">+</button>
                <button class="button-sell">-</button>
            </span>
        `;
    }
    events() {
        this.node.querySelector('.button-buy').addEventListener('click', () => {
            this.model.addStock();
        });
        this.node.querySelector('.button-sell').addEventListener('click', () => {
            this.model.addStock(-1);
        });
    }
    render() {
        this.node.innerHTML = this.template();
    }
}
