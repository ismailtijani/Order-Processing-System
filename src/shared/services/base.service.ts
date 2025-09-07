import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ModelClass, QueryBuilderType } from 'objection';
import { PaginationDto } from '../dto/pagination.dto';
import { BaseModel } from '../models/base.model';
import { PaginatedResult, PaginationMeta } from '../interfaces/interface';

@Injectable()
export abstract class BaseService<T extends BaseModel> {
  constructor(protected readonly model: ModelClass<T>) {}

  /**
   * Creates a new record in the database.
   * @param data - Data to create the record (matches model schema).
   * @returns Promise resolving to the created record.
   * @throws BadRequestException if creation fails.
   */
  async create(data: Partial<T>): Promise<T> {
    try {
      return (await this.model.query().insert(data)) as T;
    } catch (error) {
      throw new BadRequestException(this.getCreateErrorMessage());
    }
  }

  /**
   * Find a record by ID, optionally fetching related data
   * @param id - The ID of the record
   * @param relations - Optional array of relation names to fetch
   * @returns Promise<T>
   * @throws NotFoundException if the record is not found
   * @throws BadRequestException if invalid relations are provided
   */
  async findById(id: string, relations?: string[]): Promise<T> {
    let query = this.model.query().findById(id);

    if (relations && relations.length > 0) {
      query = query.withGraphFetched(`[${relations.join(', ')}]`);
    }

    const record = await query;
    if (!record) {
      throw new NotFoundException(this.getNotFoundErrorMessage());
    }

    return record as T;
  }

  /**
   * Fetch paginated records with optional filters and relations
   * @param paginationDto - Pagination parameters (page, limit)
   * @param relations - Optional array of relation names to fetch
   * @param filters - Optional key-value pairs for filtering
   * @returns Promise<PaginatedResult<T>>
   * @throws BadRequestException if query execution fails
   */
  async findAll(
    paginationDto: PaginationDto,
    relations?: string[],
    filters?: Record<string, any>,
  ): Promise<PaginatedResult<T>> {
    const { page, limit } = paginationDto;
    const offset = (page - 1) * limit;

    let query = this.model.query();

    // Apply filters if provided
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'string' && key.includes('name')) {
            query = query.where(key, 'ilike', `%${value}%`);
          } else {
            query = query.where(key, value);
          }
        }
      });
    }

    // Apply relations if provided
    if (relations && relations.length > 0) {
      query = query.withGraphFetched(`[${relations.join(', ')}]`);
    }

    const total = await query.resultSize();
    const data = (await query
      .offset(offset)
      .limit(limit)
      .orderBy('created_at', 'desc')) as T[];

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };

    return { data, meta };
  }

  /**
   * Update a record by ID
   * @param id - The ID of the record to update
   * @param data - The data to update the record with
   * @returns Promise<T>
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    try {
      // Check if record exists
      await this.findById(id);

      const updated = (await this.model
        .query()
        .patchAndFetchById(id, data)) as T;
      return updated;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(this.getUpdateErrorMessage());
    }
  }

  /**
   * Delete a record by ID (soft or hard delete based on model schema)
   * @param id - The ID of the record to delete
   * @returns Promise<boolean> - True if deletion was successful
   * @throws NotFoundException if the record is not found
   * @throws BadRequestException if deletion fails
   */
  async delete(id: string): Promise<boolean> {
    try {
      // Check if record exists
      await this.findById(id);

      // Check if model has soft delete capability
      if (this.model.jsonSchema?.properties?.is_deleted) {
        await this.model
          .query()
          .patchAndFetchById(id, { is_deleted: true } as unknown as Partial<T>);
      } else {
        await this.model.query().deleteById(id);
      }

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(this.getDeleteErrorMessage());
    }
  }

  /**
   * Find records by field with pagination
   * @param field - The field to search by
   * @param value - The value to search for
   * @param paginationDto - Pagination parameters
   * @param relations - Optional relations to include
   * @returns Promise<PaginatedResult<T>>
   */
  async findByField(
    field: string,
    value: any,
    paginationDto: PaginationDto,
    relations?: string[],
  ): Promise<PaginatedResult<T>> {
    const { page, limit } = paginationDto;
    const offset = (page - 1) * limit;

    let query = this.model.query().where(field, value);

    if (relations && relations.length > 0) {
      query = query.withGraphFetched(`[${relations.join(', ')}]`);
    }

    const total = await query.resultSize();
    const data = (await query
      .offset(offset)
      .limit(limit)
      .orderBy('created_at', 'desc')) as T[];

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1,
    };

    return { data, meta };
  }

  /**
   * Check if a record exists by field
   * @param field - The field to check
   * @param value - The value to check for
   * @param excludeId - Optional ID to exclude from the check
   * @returns Promise<boolean>
   */
  async existsByField(
    field: string,
    value: any,
    excludeId?: string,
  ): Promise<boolean> {
    let query = this.model.query().where(field, value);

    if (excludeId) {
      query = query.whereNot('id', excludeId);
    }

    const record = await query.first();
    return !!record;
  }

  /**
   * Build a query with optional filters and relations
   * @param filters - Optional key-value pairs for filtering
   * @param relations - Optional array of relation names to fetch
   * @returns QueryBuilderType<T> - The configured query builder
   */
  protected buildQuery(
    filters?: Record<string, any>,
    relations?: string[],
  ): QueryBuilderType<T> {
    let query = this.model.query();

    // Apply soft delete filter by default if model supports it
    if (this.model.jsonSchema?.properties?.is_deleted) {
      query = query.where('is_deleted', false);
    }

    // Apply filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.where(key, value);
        }
      });
    }

    // Apply relations
    if (relations && relations.length > 0) {
      query = query.withGraphFetched(`[${relations.join(', ')}]`);
    }

    return query;
  }

  // Abstract methods to be implemented by derived classes
  protected abstract getCreateErrorMessage(): string;
  protected abstract getUpdateErrorMessage(): string;
  protected abstract getDeleteErrorMessage(): string;
  protected abstract getNotFoundErrorMessage(): string;
}
