'use strict';

export function toDateString (date) {
  return date.toISOString().split('T')[0];
}
