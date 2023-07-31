import { browser } from "$app/environment";
import { writable, type Updater, type Writable } from "svelte/store";

function ReactiveLocalStore<T>(store: string, defaultvalue: T): Writable<T> {
  let value = browser
    ? JSON.parse(localStorage.getItem(store) || JSON.stringify(defaultvalue))
    : defaultvalue;
  const { subscribe, set: setStore } = writable<T>(value);

  function set(newvalue: T) {
    if (!newvalue) {
      value = defaultvalue;
    } else {
      value = newvalue;
    }
    localStorage.setItem(store, JSON.stringify(value));
    setStore(value);
  }

  function update(fn: Updater<T>) {
    set(fn(value));
  }

  return {
    subscribe,
    set,
    update,
  };
}

export const carsList = ReactiveLocalStore("carsList", [] as string[]);
export const maxRowsCount = ReactiveLocalStore("maxRowsCount", 18);
