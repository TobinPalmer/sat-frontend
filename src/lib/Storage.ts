import {browser} from "$app/environment";

export interface StorageType {
    seen: string[]
    correct: string[]
    incorrect: string[]
    bookmarked: string[]
}

export default class Store {
    private static instance: Store | null = null;
    private storage: StorageType;

    public get getStorage(): StorageType {
        return this.storage;
    }

    public set setStorage(val: StorageType) {
        if (Object.keys(val).length === 0) return
        if (browser) localStorage.setItem("storage", JSON.stringify(val));
        this.storage = val;
    }

    private constructor() {
        this.storage = browser && localStorage.getItem("storage") ? JSON.parse(localStorage.getItem("storage")!) : {
            seen: [],
            correct: [],
            incorrect: [],
            bookmark: [],
        };
    }
    public static getInstance(): Store {
        if (!Store.instance) {
            Store.instance = new Store();
        }
        return Store.instance;
    }

    public save() {
        if (browser) localStorage.setItem("storage", JSON.stringify(this.storage));
    }
}