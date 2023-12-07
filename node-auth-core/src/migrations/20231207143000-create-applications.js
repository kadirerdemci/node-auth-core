module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("applications", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("applications");
    },
  };
  