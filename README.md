# NestJS Order Processing System

## 🚀 Features

- **Comprehensive Order Management**: Full order lifecycle from creation to completion
- **Advanced Business Logic**: Kitchen workflow, order processing, and status management
- **Scalable Architecture**: SOLID principles, DRY code, repository pattern
- **Database Optimization**: Efficient queries, proper indexing, transaction management
- **Error Handling**: Graceful error handling with proper HTTP status codes
- **Logging & Monitoring**: Request logging, error tracking, and performance monitoring
- **Data Validation**: Class-validator, DTOs, and sanitization
- **Pagination**: Efficient data retrieval with metadata

## 🛠 Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Objection.js with Knex.js
- **Validation**: class-validator, class-transformer
- **Language**: TypeScript

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm

## 🔧 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd order-processing-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**

```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Database Setup**

```bash
# Create database
createdb order_system

# Run migrations
npm run migration:run

# Seed database with sample data
npm run seed:run
```

5. **Start the application**

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## 📚 API Endpoints

### Orders

- `POST /api/v1/orders` - Create order
- `GET /api/v1/orders` - Get all orders (paginated)
- `GET /api/v1/orders/:orderId` - Get order by ID
- `PUT /api/v1/orders/:orderId` - Update order
- `DELETE /api/v1/orders/:orderId` - Delete order
- `POST /api/v1/orders/:orderId/process` - Process order through kitchen workflow
- `PUT /api/v1/orders/:orderId/cancel` - Cancel order
- `GET /api/v1/orders/user/:userId` - Get user orders

### Meals

- `POST /api/v1/meals` - Create meal
- `GET /api/v1/meals` - Get all meals (paginated)
- `GET /api/v1/meals/:mealId` - Get meal by ID
- `PUT /api/v1/meals/:mealId` - Update meal
- `DELETE /api/v1/meals/:mealId` - Delete meal
- `GET /api/v1/meals/brand/:brandId` - Get meals by brand

### Brands

- `POST /api/v1/brands` - Create brand
- `GET /api/v1/brands` - Get all brands
- `GET /api/v1/brands/:brandId` - Get brand by ID
- `PUT /api/v1/brands/:brandId` - Update brand
- `DELETE /api/v1/brands/:brandId` - Delete brand

## 🏗 Architecture

### Design Patterns

- **Repository Pattern**: BaseService for common CRUD operations
- **Factory Pattern**: Order code generation
- **Observer Pattern**: Order status logging
- **Dependency Injection**: NestJS IoC container

### Key Components

#### BaseService

Generic service class providing:

- CRUD operations with validation
- Pagination support
- Relation loading
- Error handling
- Soft delete support

#### Order Processing Logic

1. **Order Creation**: Validates meals, calculates totals, creates relations
2. **Kitchen Workflow**: Acceptance → Preparation → Dispatch → Completion
3. **Status Tracking**: Comprehensive logging of state changes
4. **Transaction Management**: Ensures data consistency

#### Error Handling

- Global exception filter
- Database error mapping
- Validation error formatting
- Request/response logging

## 🔍 Key Features Explained

### Order Processing (`processOrder`)

```typescript
// Comprehensive order processing with:
// 1. Status validation
// 2. Kitchen workflow automation
// 3. Automatic logging
// 4. Total recalculation
// 5. Transaction safety
```

### Optimized Queries

- **Eager Loading**: Related data fetched efficiently
- **Indexed Columns**: Performance optimization
- **Query Builder**: Complex filtering support
- **Pagination**: Memory-efficient data retrieval

### Scalability Features

- **Connection Pooling**: Database connection management
- **Caching Ready**: Structured for Redis integration
- **Microservice Ready**: Modular architecture
- **Event-Driven**: Easy integration with message queues

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:e2e

# Coverage report
npm run test:cov
```

## 📊 Database Schema

The system includes comprehensive relationships:

- Users ← Orders → Calculated Orders
- Orders ← Order Logs (audit trail)
- Meals ← Addons → Addon Categories
- Brands → Meals → Categories

## 🚦 Development Guidelines

### Code Style

- TypeScript strict mode
- ESLint + Prettier formatting
- Descriptive variable names
- Comprehensive error messages

### Performance Considerations

- Lazy loading for large datasets
- Optimized N+1 query prevention
- Transaction boundaries
- Connection pooling

### Security Features

- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- Password hashing (bcrypt)
- CORS configuration

## 📈 Monitoring & Logging

- Request/Response logging
- Performance metrics
- Error tracking
- Database query logging
- Health check endpoints

## 📄 License

This project is licensed under the MIT License.
