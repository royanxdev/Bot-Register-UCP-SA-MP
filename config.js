module.exports = {
    client: {
        token: "", //id token discord
        id: "1373258268897575043", //id bot discord
        guild: "1338881722573656144", //id guild server
    },
    ticket: {
        categoryid: "1384945033706340362", // Id Category Untuk Tempat Create ticket
        logticket: "1384945033706340362", //Id Chennel Untuk Log Ticket
    },
    mysql: {
        host: "", //your ip database no port!!!
        user: "", //your username database
        password: "", //your password database
        database: "" //your name database
    },
    github: {
    	username: "", // Username Github Kamu
    	token: "", // Tokens Github Kamu
    },
    handler: {
        prefix: "!",
        deploy: true,
        commands: {
            prefix: true,
            slash: true,
            user: true,
            message: true,
        }
    },
    users: {
        developers: ["563698931599671298", "769759712039796736"],
        ownerId: "1371450724822552687", // ID pemilik bot
    },
    development: {
        enabled: false,
        guild: "1338881722573656144",
    },
    messageSettings: {
        ownerMessage: "Pengembang bot memiliki satu-satunya izin untuk menggunakan perintah ini.",
        developerMessage: "Anda tidak berwenang untuk menggunakan perintah ini.",
        cooldownMessage: "Pelan-pelan sobat! Anda terlalu cepat untuk menggunakan perintah ini ({cooldown}s).",
        globalCooldownMessage: "Pelan-pelan sobat! Perintah ini berada pada cooldown global ({cooldown}s).",
        notHasPermissionMessage: "Anda tidak memiliki izin untuk menggunakan perintah ini.",
        notHasPermissionComponent: "Anda tidak memiliki izin untuk menggunakan komponen ini.",
        missingDevIDsMessage: "Ini adalah perintah khusus pengembang, tetapi tidak dapat dijalankan karena ID pengguna tidak ada di file konfigurasi."
    }
};
