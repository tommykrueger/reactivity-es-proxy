import EventBus from '../EventBus.js';
import ProductView from "../views/ProductView.js";

export default class Product {
    constructor(data = {}) {
        this.data = data;
        this.model = this.proxyObject(data);
        // this.init();
    }
    init() {
        EventBus.trigger('INIT', {
            data: this.getData()
        });
        EventBus.on('PROPERTY_SET', ({ data }) => {
            if (data.property === 'stock') {
                this.updatePrice(data);
            }
            this.view.render();
            this.view.events();
        });
    }
    registerView(node) {
        this.view = new ProductView(this);
        this.view.registerToDOM(node);
    }
    getData() {
        return this.model;
    }
    setData(data = {}) {
        this.model = data;
    }
    addStock(amount = 1) {
        this.setProperty('stock',this.getProperty('stock')+amount);
    }
    updatePrice(stock) {
        let currentPrice = this.getProperty('price');
        let newPrice = (stock.oldValue < stock.value) ? currentPrice-0.2 : currentPrice+0.2;
        this.setProperty('price', newPrice);
    }
    proxyObject(object) {
        return new Proxy(object, {
            get(target, property) {
                EventBus.trigger('PROPERTY_GET', {
                    data: {
                        property: property,
                        value: target[property]
                    }
                });
                return target[property];
            },
            set(target, property, value) {
                const oldValue = target[property];

                if (property === 'stock') {
                    if (!Number.isInteger(value)) {
                        throw new TypeError('The stock value is not an integer');
                    }
                }

                target[property] = value;
                EventBus.trigger('PROPERTY_SET', {
                    data: {
                        property: property,
                        value: value,
                        oldValue: oldValue
                    }
                });
                return true;
            },
        });
    }
    getProperty(propertyName) {
        if (this.model.hasOwnProperty(propertyName)) {
            return this.model[propertyName];
        }
    }
    setProperty(propertyName, value) {
        if (this.data.hasOwnProperty(propertyName)) {
            this.model[propertyName] = value;
        }
    }
}