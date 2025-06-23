module.exports = {
    client: {
        token: "", // isi dengan token Discord bot kamu
        id: "", // isi dengan ID bot Discord kamu
        guild: "", // isi dengan ID guild server kamu
    },
    ticket: {
        categoryid: "", // ID Category untuk ticket
        logticket: "", // ID Channel log ticket
    },
    mysql: {
        host: "", // IP atau host database kamu
        user: "", // username database
        password: "", // password database
        database: "" // nama database
    },
    github: {
        username: "", // Username GitHub kamu (jika pakai fitur GitHub API)
        token: "", // Token GitHub kamu
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
        developers: [], // Masukkan array ID developer (contoh: ["1234567890"])
        ownerId: "", // ID pemilik bot
    },
    development: {
        enabled: false,
        guild: "", // ID guild dev
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
