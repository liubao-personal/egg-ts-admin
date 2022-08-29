'use strict';
import { v4 as uuidv4 } from 'uuid';
import { fieldEncryption as mongooseFieldEncryption } from 'mongoose-field-encryption';

/**
 * 用户表
 * @param app app应用
 * @return {Model<Document>} 用户表模型
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;
  const UserSchema = new Schema({
    name: {
      type: String,
      unique: true,
    },
    userId: {
      type: String,
      unique: true,
      default: () => uuidv4(),
    },
    mobile: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default: 'https://tvax4.sinaimg.cn/crop.0.0.828.828.180/8febfe5fly8g7ou1l7qh7j20n00n03zq.jpg?KID=imgbed,tva&Expires=1584901438&ssig=tUltQv?imageView2/1/w/80/h/80',
    },
    email: {
      type: String,
    },
    roleIdList: [],
    createTime: {
      type: Date,
      default: Date.now,
    },
    createBy: {
      type: String,
      default: '管理员',
    },
    updateTime: {
      type: Date,
      default: Date.now,
    },
    updateBy: {
      type: String,
      default: '管理员',
    },
  });
  UserSchema.plugin(mongooseFieldEncryption, {
    fields: [ 'mobile' ], // 加密字段
    secret: process.env.DB_SECRET,
    saltGenerator() {
      return '1234567890123456'; // 理想情况下，应使用该机密返回长度为16的字符串
    },
  });
  // 映射到egg-mongo db 库的users表中（不区分大小写）
  return mongoose.model('User', UserSchema);
};
