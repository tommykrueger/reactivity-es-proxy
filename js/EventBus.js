let instance;

/**
 * Simple Event Handler class
 * Handles app wide events to use for multiple components
 * Acts as a singleton pattern
 */
class EventBus {
    constructor() {
        if (!instance) {
            instance = this;
        }
        this.eventList = {};
        return instance;
    }

    /**
     * Register a callback function to a certain event
     */
    on(eventName, callback) {
        //if (!this.eventList.has(eventName)) {
        // this.eventList[eventName].push(callback);
        // }
        let listener = {
            callback: callback,
        };

        this.eventList[eventName] = this.eventList[eventName] || [];
        this.eventList[eventName].push(listener);
    }

    /**
     * Trigger a certain Event
     */
    trigger(eventName, arg) {
        try {
            arg = arg || {};
            let eventListeners = this.eventList[eventName] || [];
            eventListeners.forEach((listener) => {
                listener.callback(arg);
            });
        } catch(e) {
            console.log(e);
        }
    }
}

export default new EventBus()