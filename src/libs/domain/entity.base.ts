import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
} from '@libs/exceptions';
import { Guard } from '@libs/patterns';
import { convertPropsToObject } from '@libs/utils';

export type AggregateId = string;

export interface BaseEntityAudit {
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export interface BaseEntityProps extends BaseEntityAudit {
  id: AggregateId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T> {
  id: AggregateId;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export abstract class BaseEntity<EntityProps> {
  constructor({
    id,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    deletedAt,
    deletedBy,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    this.validateProps(props);

    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;

    this._createdBy = createdBy;
    this._updatedBy = updatedBy;
    this._deletedAt = deletedAt;
    this._deletedBy = deletedBy;

    this.props = props;
    this.validate();
  }

  protected readonly props: EntityProps;

  protected abstract _id: AggregateId;

  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private _createdBy?: string;
  private _updatedBy?: string;

  private _deletedAt?: Date;
  private _deletedBy?: string;

  get id(): AggregateId {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get createdBy(): string | undefined {
    return this._createdBy;
  }

  get updatedBy(): string | undefined {
    return this._updatedBy;
  }

  get deletedAt(): Date | undefined {
    return this._deletedAt;
  }

  get deletedBy(): string | undefined {
    return this._deletedBy;
  }

  get isDeleted(): boolean {
    return !!this._deletedAt;
  }

  protected markUpdated(userId?: string): void {
    this._updatedAt = new Date();
    if (userId) this._updatedBy = userId;
  }

  protected markDeleted(userId?: string): void {
    this._deletedAt = new Date();
    if (userId) this._deletedBy = userId;
  }

  private setId(id: AggregateId): void {
    this._id = id;
  }

  public getProps(): EntityProps & BaseEntityProps {
    return Object.freeze({
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      createdBy: this._createdBy,
      updatedBy: this._updatedBy,
      deletedAt: this._deletedAt,
      deletedBy: this._deletedBy,
      ...this.props,
    });
  }

  public toObject(): unknown {
    return Object.freeze({
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      createdBy: this._createdBy,
      updatedBy: this._updatedBy,
      deletedAt: this._deletedAt,
      deletedBy: this._deletedBy,
      ...convertPropsToObject(this.props),
    });
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

  public equals(object?: BaseEntity<EntityProps>): boolean {
    if (!object) return false;
    if (this === object) return true;
    if (!BaseEntity.isEntity(object)) return false;
    return this.id === object.id;
  }

  public static isEntity(entity: unknown): entity is BaseEntity<unknown> {
    return entity instanceof BaseEntity;
  }

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

  public toString(): string {
    return `${this.constructor.name}<${this.id}>`;
  }
}
