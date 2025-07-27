import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
} from '@libs/exceptions';
import { Guard } from '@libs/patterns';
import { convertPropsToObject } from '@libs/utils';

export type AggregateId = string;

export interface BaseEntityProps {
  id: AggregateId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateId;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseEntity<EntityProps> {
  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.validateProps(props);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
    this.validate();
  }

  protected readonly props: EntityProps;

  /**
   * ID is set in the concrete entity implementation to support
   * different ID types depending on your needs.
   * For example it could be a UUID for aggregate root,
   * and shortid / nanoid for child entities.
   */
  protected abstract _id: AggregateId;

  private readonly _createdAt: Date;

  private _updatedAt: Date;

  get id(): AggregateId {
    return this._id;
  }

  private setId(id: AggregateId): void {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  static isEntity(entity: unknown): entity is BaseEntity<unknown> {
    return entity instanceof BaseEntity;
  }

  /**
   *  Checks if two entities are the same BaseEntity by comparing ID field.
   * @param object BaseEntity
   */
  public equals(object?: BaseEntity<EntityProps>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!BaseEntity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  /**
   * Returns entity properties.
   * @return {*}  {Props & EntityProps}
   * @memberof BaseEntity
   */
  public getProps(): EntityProps & BaseEntityProps {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * Convert an BaseEntity and all sub-entities/Value Objects it
   * contains to a plain object with primitive types. Can be
   * useful when logging an entity during testing/debugging
   */
  public toObject(): unknown {
    const plainProps = convertPropsToObject(this.props);

    const result = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...plainProps,
    };
    return Object.freeze(result);
  }

  public getSnapshot(): {
    entityType: string;
    entityId: AggregateId;
    data: EntityProps & BaseEntityProps;
    timestamp: Date;
  } {
    return {
      entityType: this.constructor.name,
      entityId: this.id,
      data: this.getProps(),
      timestamp: new Date(),
    };
  }

  /**
   * There are certain rules that always have to be true (invariants)
   * for each entity. Validate method is called every time before
   * saving an entity to the database to make sure those rules are respected.
   */
  public abstract validate(): void;

  private validateProps(props: EntityProps): void {
    const MAX_PROPS = 50;

    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        'BaseEntity props should not be empty',
      );
    }
    if (typeof props !== 'object') {
      throw new ArgumentInvalidException(
        'BaseEntity props should be an object',
      );
    }
    if (Object.keys(props as any).length > MAX_PROPS) {
      throw new ArgumentOutOfRangeException(
        `BaseEntity props should not have more than ${MAX_PROPS} properties`,
      );
    }
  }
}
