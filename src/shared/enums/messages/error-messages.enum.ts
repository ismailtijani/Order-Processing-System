export enum ErrorMessages {
  // Generic Error Messages
  ENTITY_NOT_FOUND = 'The requested resource was not found',
  VALIDATION_ERROR = 'Validation failed',
  UNAUTHORIZED = 'Unauthorized access',
  FORBIDDEN = 'Forbidden resource',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  DATABASE_ERROR = 'Database error occurred',
  RESOURCE_NOT_FOUND = 'Resource not found',

  // User Error Messages
  USER_NOT_FOUND = 'User not found',
  USER_ALREADY_EXISTS = 'User already exists',
  EMAIL_ALREADY_EXISTS = 'User with this email already exists',
  PHONE_ALREADY_EXISTS = 'User with this phone number already exists',
  USER_CREATION_FAILED = 'Failed to create user',
  USER_UPDATE_FAILED = 'Failed to update user',
  USER_DELETION_FAILED = 'Failed to delete user',

  // Brand Error Messages
  BRAND_NOT_FOUND = 'Brand not found',
  BRAND_ALREADY_EXISTS = 'Brand already exists',
  BRAND_CREATION_FAILED = 'Failed to create brand',
  BRAND_UPDATE_FAILED = 'Failed to update brand',
  BRAND_DELETION_FAILED = 'Failed to delete brand',

  // Meal Error Messages
  MEAL_NOT_FOUND = 'Meal not found',
  MEAL_ALREADY_EXISTS = 'Meal already exists',
  MEAL_CREATION_FAILED = 'Failed to create meal',
  MEAL_UPDATE_FAILED = 'Failed to update meal',
  MEAL_DELETION_FAILED = 'Failed to delete meal',
  MEAL_NOT_ACTIVE = 'Meal is not active',
  MEAL_OUT_OF_STOCK = 'Meal is out of stock',

  // Addon Error Messages
  ADDON_NOT_FOUND = 'Addon not found',
  ADDON_ALREADY_EXISTS = 'Addon already exists',
  ADDON_CREATION_FAILED = 'Failed to create addon',
  ADDON_UPDATE_FAILED = 'Failed to update addon',
  ADDON_DELETION_FAILED = 'Failed to delete addon',
  ADDON_CATEGORY_NOT_FOUND = 'Addon category not found',

  // Order Error Messages
  ORDER_NOT_FOUND = 'Order not found',
  ORDER_ALREADY_EXISTS = 'Order already exists',
  ORDER_CREATION_FAILED = 'Failed to create order',
  ORDER_UPDATE_FAILED = 'Failed to update order',
  ORDER_DELETION_FAILED = 'Failed to delete order',
  ORDER_ALREADY_COMPLETED = 'Order is already completed',
  ORDER_ALREADY_CANCELLED = 'Order is already cancelled',
  ORDER_CANNOT_BE_CANCELLED = 'Order cannot be cancelled at this stage',
  ORDER_PROCESSING_FAILED = 'Failed to process order',
  INVALID_ORDER_STATUS = 'Invalid order status',

  // Calculated Order Error Messages
  CALCULATED_ORDER_NOT_FOUND = 'Calculated order not found',
  CALCULATED_ORDER_CREATION_FAILED = 'Failed to create calculated order',
  CALCULATED_ORDER_UPDATE_FAILED = 'Failed to update calculated order',
  CALCULATED_ORDER_DELETION_FAILED = 'Failed to delete calculated order',

  // Order Log Error Messages
  ORDER_LOG_NOT_FOUND = 'Order log not found',
  ORDER_LOG_CREATION_FAILED = 'Failed to create order log',
  ORDER_LOG_UPDATE_FAILED = 'Failed to update order log',
  ORDER_LOG_DELETION_FAILED = 'Failed to delete order log',

  // Order Type Error Messages
  ORDER_TYPE_NOT_FOUND = 'Order type not found',
  ORDER_TYPE_ALREADY_EXISTS = 'Order type already exists',
  ORDER_TYPE_CREATION_FAILED = 'Failed to create order type',
  ORDER_TYPE_UPDATE_FAILED = 'Failed to update order type',
  ORDER_TYPE_DELETION_FAILED = 'Failed to delete order type',

  // Kitchen Process Error Messages
  KITCHEN_NOT_ACCEPTED = 'Order not accepted by kitchen',
  KITCHEN_NOT_PREPARED = 'Order not prepared by kitchen',
  KITCHEN_NOT_DISPATCHED = 'Order not dispatched by kitchen',
  KITCHEN_ALREADY_CANCELLED = 'Order already cancelled by kitchen',

  // Database Error Messages
  DATABASE_DUPLICATE_KEY = 'Duplicate key violation',
  DATABASE_FOREIGN_KEY_VIOLATION = 'Foreign key constraint violation',
  DATABASE_CONNECTION_ERROR = 'Database connection error',
  DATABASE_TRANSACTION_FAILED = 'Database transaction failed',
}
