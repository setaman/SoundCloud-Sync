import { SOCKET_ITEMS_ONDATA, SOCKET_ITEMS_GET_ERROR } from '../const/socketEvents';
import { datastore } from '../db';
import {
  LIST_SORT_OPTION_ALPHABETIC,
  LIST_SORT_OPTION_NEWEST,
  LIST_SORT_OPTION_OLDEST,
  LIST_SORT_OPTION_STATUS,
  LIST_TYPE_FOLLOWINGS
} from '../const/const';

const formulateSort = (sortOption, type) => {
  switch (sortOption) {
    case LIST_SORT_OPTION_ALPHABETIC:
      return type === LIST_TYPE_FOLLOWINGS ? { username: 1 } : { title: 1 };
    case LIST_SORT_OPTION_NEWEST:
      return {
        order: 1
      };
    case LIST_SORT_OPTION_OLDEST:
      return {
        order: -1
      };
    case LIST_SORT_OPTION_STATUS:
      return {
        status: -1
      };
    default:
      return {
        order: -1
      };
  }
};

const formulateFilter = (type, userId, title, status) => {
  return {
    type,
    userId,
    $or: [
      {
        title: new RegExp(`${title}`, 'i')
      },
      {
        'user.username': new RegExp(`${title}`, 'i')
      },
      {
        username: new RegExp(`${title}`, 'i')
      }
    ],
    status: { $in: status }
  };
};

const countItems = filter => datastore.count(filter);
const countItemsPages = (itemsCount, pageSize) => Math.ceil((itemsCount / pageSize));

const getPaginatedUserItems = async (io, { type, userId, title, status, sort, page = 1 }) => {
  const filter = formulateFilter(type, userId, title, status);
  const pageSize = 30;

  try {
    const items = await datastore.find(filter).sort(formulateSort(sort)).skip(pageSize * (page - 1)).limit(pageSize).exec();
    const itemsCount = await countItems(filter);

    if (io) {
      io.emit(SOCKET_ITEMS_ONDATA, {
        userId,
        items: items,
        from: itemsCount,
        page,
        pages: itemsCount > pageSize ? countItemsPages(itemsCount, pageSize) : 1
      });
    }
  } catch (e) {
    console.error(e);
    if (io) {
      io.emit(SOCKET_ITEMS_GET_ERROR, {
        userId,
        error: e.toString()
      });
    }
  }
};

const getUserItems = async query => {
  const filter = formulateFilter(query.type, query.userId, query.title, query.status);
  const items = await datastore.find(filter).sort(formulateSort(query.sort)).exec();
  if (query.range && query.range.min > 0 && query.range.max > 0) {
    return items.slice(query.range.min - 1, query.range.max);
  }
  return items;
};

export {
  getPaginatedUserItems,
  getUserItems
};
