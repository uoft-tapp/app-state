import React from 'react';
import { fromJS } from 'immutable';

const initialState = {
    role: 'admin',
    user: 'user',
};

class AppState {
    constructor() {

	//should these be const? lets?

        // container for application state
        var _data = fromJS(initialState);  //data is an immutable object created from json intialstate

        // list of change listeners
        this._listeners = [];
        // notify listeners of change (sortof ish attaches to each listener)
        var notifyListeners = () => this._listeners.forEach(listener => listener());

        // parses a property path into a list, as expected by Immutable
        var parsePath = path =>
            path
                .split(/(\[.*?\])|\./) // split on brackets and dots
                .filter(key => key) // removed undefined elements (gary says "falsey")
                .map(key => {
                    let ind = key.match(/\[(.*)\]/); // check whether the element is in brackets
                    if (ind) {
                        return eval(ind[1]); //injection attack potential??? what is eval's environment??
                    }
                    return key;
                });

        // getter for appState object
	// why the other syntax of function defn??
        this.get = function(property) {
            return _data.getIn(parsePath(property));
        };

        // setter for appState object
        this.set = function(property, value) {
            // as per the Backbone Model set() syntax, we accept a property and value pair, or
            // an object with property and value pairs as keys
            if (arguments.length == 1) {
                _data = _data.withMutations(map => {
                    Object.entries(property).reduce(
                        (result, [prop, val]) => result.setIn(parsePath(prop), val),
                        map
                    );
                });
            } else {
                _data = _data.setIn(parsePath(property), value);
            }

            // notify listener(s) of change
            notifyListeners();
        };
    }

    // subscribe listener to change events on this model
    subscribe(listener) {
        this._listeners.push(listener);
    }
}

let appState = new AppState();
export { appState };
