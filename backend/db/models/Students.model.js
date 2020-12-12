/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Students', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gpa: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    balance: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    is_approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Students',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Students_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
