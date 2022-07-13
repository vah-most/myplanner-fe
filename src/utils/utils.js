/*
 * Created on Sat Jun 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

export function getRemainingDays(fromTime, toTime) {
  let diff = Math.floor((toTime - fromTime) / (1000 * 86400)) + 1;

  return diff;
}
