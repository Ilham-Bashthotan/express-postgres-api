"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	// Tambahkan kolom role ke tabel Users
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Users", "role", {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: "user",
		});
	},

	// Hapus kolom role jika rollback
	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Users", "role");
	},
};
