export function idbPromis(kitName, method, object) {
    return new Promis((resolve, reject) => {
        const request = window.indexedDB.open('cookit', 1);

        let db, tx, store;

        request.onupgradeneeded = function (e) {
            const db = request.result;

            db.createObjectStore('recipes', { keyPath: '_id' });
            db.createObjectStore('ingredients', { keyPath: '_id' });
        };

        request.onerror = function (e) {
            console.log("IndexedDB encountered an error.");
        };

        request.onsuccess = function (e) {
            db = request.result;
            tx = db.transaction(kitName, 'readwrite');
            store = tx.objectStore(kitName);

            db.onerror = function (e) {
                console.log('IndexedDB transaction error', e);
            };

            switch (method) {
                
                case 'put':
                    store.put(object);
                    resolve(object);
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function () {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object._id);
                    break;
                default:
                    console.log('IndexedDB: not a valid method');
                    break;
            }

            tx.oncomplete = function () {
                db.close();
            };
        };
    });
}