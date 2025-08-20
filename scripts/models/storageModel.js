class StorageModel {
    constructor(database) {
        this.database = database;
    }

    saveUserLocation(userId, location) {
        return this.database.ref('userLocations/' + userId).push().set({
            location: location,
            timestamp: Date.now()
        });
    }

    getUserLocation(userId, callback) {
        this.database.ref('userLocations/' + userId).on('value', (snapshot) => {
            const locations = [];
            snapshot.forEach((childsnapshot) => {
                locations.push(childsnapshot.val().location);
            });
            callback(locations);
        });
    }

    removeUserLocation(userId, location) {
        return new Promise((resolve, reject) => {
            this.database.ref('userLocations/' + userId).once('value', (snapshot) => {
                const updates = {};
                const found = false;

                snapshot.forEach((childsnapshot) => {
                    if (childsnapshot.val().location === location) {
                        updates[childsnapshot.key] = null;
                        found = true;
                    }
                });

                if (found) { 
                    this.database.ref('userLocations/'+userId).update(updates)
                    .then(resolve)
                    .catch(reject);
                } else{
                    reject(new Error('Location not found in saved locations'));
                }
            });
        });
    }
}