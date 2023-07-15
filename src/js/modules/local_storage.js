import {getResource} from './services';

async function loadFromCache(key) {
  const cachedData = localStorage.getItem(JSON.stringify(key));
  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    return null;
  }
}

async function cacheData(key, data) {
  localStorage.setItem(JSON.stringify(key), JSON.stringify(data));
}

async function getData(key, resource) {
  let data = await loadFromCache(key);

  if (!data) {
    data = await getResource(resource);
    await cacheData(key, data);
  } else {
    const newData = await getResource(resource);
    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      data = newData;
      await cacheData(key, data);
    }
  }

  if (Array.isArray(data)) {
    return data;
  } else {
    return Object.entries(data);
  }
}

export {getData};


