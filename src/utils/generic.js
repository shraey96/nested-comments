/**
 * @function getFormattedTodaysDate
 * @param {object} today
 * @param {object} options
 *
 * @description Returns date in "Date Month, Year" format
 * @returns {string}
 */
export const getFormattedTodaysDate = (
  today = new Date(),
  options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => {
  return today.toLocaleDateString("en-US", options);
};

/**
 * @function getTimeAgoString
 * @param {number} timeStampInMs
 *
 * @description Returns time in "Month/Years/Days/Minutes/Hours/Seconds ago" format
 * @returns {string}
 */
export const getTimeAgoString = (timeStampInMs) => {
  const date = new Date();
  const timestamp = date.getTime();
  const seconds = Math.floor(timestamp / 1000);

  const difference = seconds - timeStampInMs;
  let output = ``;
  if (difference < 60) {
    // Less than a minute has passed:
    output = `${difference === 0 ? "a few" : difference} seconds ago`;
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)} minutes ago`;
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)} hours ago`;
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} days ago`;
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} months ago`;
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} years ago`;
  }

  return output;
};

/**
 * @function isEmpty
 * @param {any} value
 *
 * @description Returns boolean depending on if value is empty or not
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (typeof value === "undefined" || value === null) return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === "object" && Object.keys(value).length === 0) return true;
  if (typeof value === "string" && value === "") return true;
  return false;
};

/**
 * @function getAbbreviatedNumber
 * @param {number} number
 * @param {string} lang
 * @param {object} options
 *
 * @description Formats number as per '1M', '1K', '10K' etc
 * @returns {string}
 */
export const getAbbreviatedNumber = (
  number,
  lang = "en",
  options = { notation: "compact" }
) => {
  const formatter = Intl.NumberFormat(lang, options);
  return formatter.format(number);
};

/**
 * @function deepClone
 * @param {object} obj
 *
 * @description Deep clones an object
 * @returns {object}
 */
export const deepClone = (obj = {}) => {
  if (window.structuredClone) {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj));
};

/**
 * @function getRandomItem
 * @param {array} items
 *
 * @description Return random item from array
 * @returns {nubmer}
 */
export const getRandomItem = (items = []) => {
  return items[Math.floor(Math.random() * items.length)];
};

export const getValueFromLocalStorage = (key, defaultValue = null) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return defaultValue;
  }
};

export const setValueToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(`Error Setting Value to localstorage: `, key, value);
  }
};
