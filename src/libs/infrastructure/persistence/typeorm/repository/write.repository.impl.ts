import { Repository } from 'typeorm';
import { Err, Ok, Result } from 'oxide.ts';
import { BASE_SCHEMA } from '../schema/base.schema';
import { BaseEntity } from '../../../../domain/entity.base';
import { BaseOrmEntity } from '../schema/base.orm';
import { MapperInterface } from '../../../../domain/mapper.interface';
import {
  ArgumentNotProvidedException,
  ExceptionBase,
  RepositoryException,
} from '@libs/exceptions';
import { Void } from '@libs/types';
import { WriteRepositoryPort } from './base.repository.port';

export abstract class WriteRepositoryImpl<
  TProps,
  EDomain extends BaseEntity<TProps>,
  EOrm extends BaseOrmEntity,
> implements WriteRepositoryPort<EDomain>
{
  constructor(
    private readonly repository: Repository<EOrm>,
    private readonly schema: { TABLE_NAME: string } & typeof BASE_SCHEMA,
    protected readonly mapper: MapperInterface<EDomain, EOrm>,
  ) {}

  async insert(
    entity: EDomain | EDomain[],
  ): Promise<Result<void, ExceptionBase>> {
    if (!entity) {
      return Err(new ArgumentNotProvidedException('Entity must be provided'));
    }

    try {
      const ormEntities = Array.isArray(entity)
        ? entity.map((e) => this.mapper.toPersistence(e))
        : [this.mapper.toPersistence(entity)];

      await this.repository.save(ormEntities);
      return Ok(Void);
    } catch (error) {
      return Err(
        new RepositoryException(
          `Failed to insert entity/entities: ${error.message}`,
        ),
      );
    }
  }

  async delete(entity: EDomain): Promise<Result<boolean, ExceptionBase>> {
    if (!entity || !entity.id) {
      return Err(new ArgumentNotProvidedException('Entity must be provided'));
    }

    try {
      const result = await this.repository.delete(entity.id);
      return Ok(result.affected !== 0);
    } catch (error) {
      return Err(
        new RepositoryException(`Failed to delete entity: ${error.message}`),
      );
    }
  }

  async update(entity: EDomain): Promise<Result<void, ExceptionBase>> {
    if (!entity || !entity.id) {
      return Err(new ArgumentNotProvidedException('Entity must be provided'));
    }

    try {
      const ormEntity = this.mapper.toPersistence(entity);
      await this.repository.save(ormEntity);
      return Ok(Void);
    } catch (error) {
      return Err(
        new RepositoryException(`Failed to update entity: ${error.message}`),
      );
    }
  }
}
