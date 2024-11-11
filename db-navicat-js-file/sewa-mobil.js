/*
 Navicat Premium Dump Script

 Source Server         : Sewa Mobil
 Source Server Type    : MongoDB
 Source Server Version : 40003 (4.0.3)
 Source Host           : localhost:27017
 Source Schema         : sewa-mobil

 Target Server Type    : MongoDB
 Target Server Version : 40003 (4.0.3)
 File Encoding         : 65001

 Date: 11/11/2024 08:55:04
*/


// ----------------------------
// Collection structure for migrations
// ----------------------------
db.getCollection("migrations").drop();
db.createCollection("migrations");

// ----------------------------
// Documents of migrations
// ----------------------------
db.getCollection("migrations").insert([ {
    _id: ObjectId("672c0d4bf95cdb7b420cdf82"),
    migration: "2019_12_14_000001_create_personal_access_tokens_table",
    batch: Int32("1")
} ]);
db.getCollection("migrations").insert([ {
    _id: ObjectId("673151b507f52e09990bb0b2"),
    migration: "2024_11_06_162338_create_pengguna_table",
    batch: Int32("2")
} ]);
db.getCollection("migrations").insert([ {
    _id: ObjectId("673151b507f52e09990bb0b3"),
    migration: "2024_11_06_162351_create_mobil_table",
    batch: Int32("2")
} ]);
db.getCollection("migrations").insert([ {
    _id: ObjectId("673151b507f52e09990bb0b4"),
    migration: "2024_11_06_162359_create_peminjaman_table",
    batch: Int32("2")
} ]);

// ----------------------------
// Collection structure for mobil
// ----------------------------
db.getCollection("mobil").drop();
db.createCollection("mobil");
db.getCollection("mobil").createIndex({
    nomor_plat: Int32("1")
}, {
    name: "nomor_plat_1",
    unique: true
});

// ----------------------------
// Documents of mobil
// ----------------------------
db.getCollection("mobil").insert([ {
    _id: ObjectId("6731533f1f834a4b980a7e53"),
    merek: "Honda",
    model: "Pajero",
    nomor_plat: "W 6859 NR",
    tarif_sewa_harian: "500000",
    updated_at: ISODate("2024-11-11T01:38:59.155Z"),
    created_at: ISODate("2024-11-11T00:43:43.816Z"),
    deleted_at: null
} ]);
db.getCollection("mobil").insert([ {
    _id: ObjectId("6731534e1f834a4b980a7e54"),
    merek: "Toyota",
    model: "Fortuner",
    nomor_plat: "W 1234 AA",
    tarif_sewa_harian: "250000",
    updated_at: ISODate("2024-11-11T00:43:58.184Z"),
    created_at: ISODate("2024-11-11T00:43:58.184Z")
} ]);
db.getCollection("mobil").insert([ {
    _id: ObjectId("67315dd6b83df7df1503e7b3"),
    merek: "Daihatsu",
    model: "Avanza",
    nomor_plat: "W 6859 NG",
    tarif_sewa_harian: "400000",
    updated_at: ISODate("2024-11-11T01:39:08.424Z"),
    created_at: ISODate("2024-11-11T01:28:54.423Z"),
    deleted_at: ISODate("2024-11-11T01:39:08.424Z")
} ]);

// ----------------------------
// Collection structure for peminjaman
// ----------------------------
db.getCollection("peminjaman").drop();
db.createCollection("peminjaman");

// ----------------------------
// Documents of peminjaman
// ----------------------------
db.getCollection("peminjaman").insert([ {
    _id: ObjectId("673153bf1f834a4b980a7e55"),
    pengguna_id: "6731532e1f834a4b980a7e52",
    tanggal_mulai: "2024-11-11",
    tanggal_selesai: "2024-11-13",
    mobil_id: "6731533f1f834a4b980a7e53",
    jumlah_biaya: Int32("600000"),
    status: Int32("1"),
    updated_at: ISODate("2024-11-11T01:01:49.376Z"),
    created_at: ISODate("2024-11-11T00:45:51.637Z")
} ]);
db.getCollection("peminjaman").insert([ {
    _id: ObjectId("673153d21f834a4b980a7e56"),
    pengguna_id: "6731532e1f834a4b980a7e52",
    tanggal_mulai: "2024-11-14",
    tanggal_selesai: "2024-11-16",
    mobil_id: "6731533f1f834a4b980a7e53",
    jumlah_biaya: Int32("600000"),
    status: Int32("1"),
    updated_at: ISODate("2024-11-11T01:03:17.752Z"),
    created_at: ISODate("2024-11-11T00:46:10.322Z")
} ]);
db.getCollection("peminjaman").insert([ {
    _id: ObjectId("67315fd91c6e9882ea0c7f33"),
    pengguna_id: "67315fae1c6e9882ea0c7f32",
    tanggal_mulai: "2024-11-11",
    tanggal_selesai: "2024-11-14",
    mobil_id: "6731533f1f834a4b980a7e53",
    jumlah_biaya: Int32("1200000"),
    status: Int32("1"),
    updated_at: ISODate("2024-11-11T01:38:06.439Z"),
    created_at: ISODate("2024-11-11T01:37:29.34Z")
} ]);
db.getCollection("peminjaman").insert([ {
    _id: ObjectId("6731607a1c6e9882ea0c7f35"),
    pengguna_id: "67315fae1c6e9882ea0c7f32",
    tanggal_mulai: "2024-11-12",
    tanggal_selesai: "2024-11-16",
    mobil_id: "6731533f1f834a4b980a7e53",
    jumlah_biaya: Int32("0"),
    status: Int32("0"),
    updated_at: ISODate("2024-11-11T01:40:29.971Z"),
    created_at: ISODate("2024-11-11T01:40:10.084Z"),
    deleted_at: ISODate("2024-11-11T01:40:29.971Z")
} ]);
db.getCollection("peminjaman").insert([ {
    _id: ObjectId("673163301c6e9882ea0c7f36"),
    pengguna_id: "67315fae1c6e9882ea0c7f32",
    tanggal_mulai: "2024-11-11",
    tanggal_selesai: "2024-11-15",
    mobil_id: "6731533f1f834a4b980a7e53",
    jumlah_biaya: Int32("0"),
    status: Int32("0"),
    updated_at: ISODate("2024-11-11T01:52:01.298Z"),
    created_at: ISODate("2024-11-11T01:51:44.122Z"),
    deleted_at: ISODate("2024-11-11T01:52:01.298Z")
} ]);
db.getCollection("peminjaman").insert([ {
    _id: ObjectId("673163be1c6e9882ea0c7f37"),
    pengguna_id: "67315fae1c6e9882ea0c7f32",
    tanggal_mulai: "2024-11-11",
    tanggal_selesai: "2024-11-15",
    mobil_id: "6731533f1f834a4b980a7e53",
    jumlah_biaya: Int32("0"),
    status: Int32("0"),
    updated_at: ISODate("2024-11-11T01:54:06.422Z"),
    created_at: ISODate("2024-11-11T01:54:06.422Z")
} ]);

// ----------------------------
// Collection structure for pengguna
// ----------------------------
db.getCollection("pengguna").drop();
db.createCollection("pengguna");
db.getCollection("pengguna").createIndex({
    username: Int32("1")
}, {
    name: "username_1",
    unique: true
});

// ----------------------------
// Documents of pengguna
// ----------------------------
db.getCollection("pengguna").insert([ {
    _id: ObjectId("6731532e1f834a4b980a7e52"),
    nama: "Moch. Nafi'ul Irsad Al Ansory",
    alamat: "Cemengbakalan RT 11 RW 02, Kab. Sidoarjo, Jawa Timur 61234",
    nomor_telepon: Long("85806300585"),
    nomor_sim: Long("3515082501010004"),
    username: "nafiulirsad",
    password: "$2y$12$eeqIHn6atyB5mnEJEAxTgec/bAeTcOFy9pKRc12nlsP/u3o7XA9Eq",
    updated_at: ISODate("2024-11-11T00:43:26.244Z"),
    created_at: ISODate("2024-11-11T00:43:26.244Z")
} ]);
db.getCollection("pengguna").insert([ {
    _id: ObjectId("67315fae1c6e9882ea0c7f32"),
    nama: "Admin Web",
    alamat: "Sidoarjo jawa timur indonesia 61234",
    nomor_telepon: Int32("111111"),
    nomor_sim: Int32("222222"),
    username: "adminweb",
    password: "$2y$12$y3xAwlooj7oKEw75g6gJF.sXRNrOaGosFD1fsVAQEwa.7OL6qw40G",
    updated_at: ISODate("2024-11-11T01:36:46.967Z"),
    created_at: ISODate("2024-11-11T01:36:46.967Z")
} ]);

// ----------------------------
// Collection structure for personal_access_tokens
// ----------------------------
db.getCollection("personal_access_tokens").drop();
db.createCollection("personal_access_tokens");
db.getCollection("personal_access_tokens").createIndex({
    tokenable_type: Int32("1"),
    tokenable_id: Int32("1")
}, {
    name: "tokenable_type_1_tokenable_id_1"
});
db.getCollection("personal_access_tokens").createIndex({
    token: Int32("1")
}, {
    name: "token_1",
    unique: true
});

// ----------------------------
// Documents of personal_access_tokens
// ----------------------------
