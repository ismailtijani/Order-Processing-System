export enum Routes {
  // User Routes
  CREATE_USER = '',
  GET_USERS = '',
  UPDATE_USER = ':userId',
  DELETE_USER = ':userId',
  GET_ONE_USER = ':userId',

  // Brand Routes
  CREATE_BRAND = '',
  GET_BRANDS = '',
  UPDATE_BRAND = ':brandId',
  DELETE_BRAND = ':brandId',
  GET_ONE_BRAND = ':brandId',

  // Meal Routes
  CREATE_MEAL = '',
  GET_MEALS = '',
  UPDATE_MEAL = ':mealId',
  DELETE_MEAL = ':mealId',
  GET_ONE_MEAL = ':mealId',
  GET_MEALS_BY_BRAND = 'brand/:brandId',

  // Addon Routes
  CREATE_ADDON = '',
  GET_ADDONS = '',
  UPDATE_ADDON = ':addonId',
  DELETE_ADDON = ':addonId',
  GET_ONE_ADDON = ':addonId',
  GET_ADDONS_BY_MEAL = 'meal/:mealId',

  // Order Routes
  CREATE_ORDER_ROUTE = '',
  GET_ORDERS_ROUTE = '',
  UPDATE_ORDER = ':orderId',
  DELETE_ORDER = ':orderId',
  GET_ONE_ORDER = ':orderId',
  PROCESS_ORDER = ':orderId/process',
  GET_ORDER_LOGS = ':orderId/logs',
  GET_USER_ORDERS = 'user/:userId',

  // Calculated Order Routes
  CREATE_CALCULATED_ORDER_ROUTE = '',
  GET_CALCULATED_ORDERS_ROUTE = '',
  UPDATE_CALCULATED_ORDER = ':calculatedOrderId',
  DELETE_CALCULATED_ORDER = ':calculatedOrderId',
  GET_ONE_CALCULATED_ORDER = ':calculatedOrderId',

  // Order Log Routes
  CREATE_ORDER_LOG_ROUTE = '',
  GET_ORDER_LOGS_ROUTE = '',
  UPDATE_ORDER_LOG = ':orderLogId',
  DELETE_ORDER_LOG = ':orderLogId',
  GET_ONE_ORDER_LOG = ':orderLogId',

  // Order Type Routes
  CREATE_ORDER_TYPE_ROUTE = '',
  GET_ORDER_TYPES_ROUTE = '',
  UPDATE_ORDER_TYPE = ':orderTypeId',
  DELETE_ORDER_TYPE = ':orderTypeId',
  GET_ONE_ORDER_TYPE = ':orderTypeId',
}
