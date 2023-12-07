module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("errors", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        details: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        applicationId: {
          type: Sequelize.INTEGER,
          references: {
            model: "applications",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
      await queryInterface.dropTable("errors");
    },
  };
  