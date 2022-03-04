import ProductData from '../data/ProductData.js';
import Product from './models/Product.js';
import EventBus from './EventBus.js';

class App {
    constructor() {

        // init product model with data
        let product = new Product(ProductData);

        // register the product view to the view model
        product.registerView(document.getElementById('products'));
        product.init();

        let eventList = document.getElementById('event-list');

        EventBus.on('PROPERTY_GET', ({ data }) => {
            // eventList.innerHTML += `<p>Get prop: ${data.property} => ${data.value}</p>`;
        });
        EventBus.on('PROPERTY_SET', ({ data }) => {
            eventList.innerHTML += `<p>Set prop: ${data.property} => ${data.value}</p>`;
        });
    }

}

window.App = new App();