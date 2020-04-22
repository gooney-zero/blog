/* eslint-disable no-console */
/*
 * @Description: Copyright (C) 2019 PICC, Inc. All Rights Reserved.
 * @Author: zhang wenguang
 * @Date: 2019-11-22 11:17:40
 * @LastEditTime: 2019-12-06 11:35:16
 * @LastEditors: zhang wenguang
 */

export function logError(error: any) {
  if (typeof error === 'string') {
    console.error(error);
  } else {
    console.error(error.message, error.stack);
  }
}
export function log(...param: any) {
  const IS_PRO = process.env.NODE_ENV === 'production';
  if (!IS_PRO) {
    console.log.apply(console, param);
  }
}
