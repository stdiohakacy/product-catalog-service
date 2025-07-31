import { UniqueEntityID } from './unique-entity-id';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException,
} from '@libs/exceptions';
import { Guard } from '@libs/patterns';
import { convertPropsToObject } from '@libs/utils';

export interface BaseEntityAudit {
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export interface BaseEntityProps<ID extends string | number>
  extends BaseEntityAudit {
  id: UniqueEntityID<ID>;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEntityProps<T, ID extends string | number = string> {
  id: UniqueEntityID<ID>;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export abstract class BaseEntity<
  EntityProps,
  ID extends string | number = string,
> {
  protected readonly props: EntityProps;
  protected _id: UniqueEntityID<ID>;
  private readonly _createdAt: Date;
  private _updatedAt: Date;
  private _createdBy?: string;
  private _updatedBy?: string;
  private _deletedAt?: Date;
  private _deletedBy?: string;

  constructor({
    id,
    createdAt,
    updatedAt,
    createdBy,
    updatedBy,
    deletedAt,
    deletedBy,
    props,
  }: CreateEntityProps<EntityProps, ID>) {
    this._id = id;
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

  get id(): UniqueEntityID<ID> {
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

  public getProps(): EntityProps & BaseEntityProps<ID> {
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
      id: this._id.getValue(),
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
    entityId: UniqueEntityID<ID>;
    data: EntityProps & BaseEntityProps<ID>;
    timestamp: Date;
  } {
    return {
      entityType: this.constructor.name,
      entityId: this._id,
      data: this.getProps(),
      timestamp: new Date(),
    };
  }

  public abstract validate(): void;

  private validateProps(props: EntityProps): void {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Props should not be empty');
    }

    if (typeof props !== 'object') {
      throw new ArgumentInvalidException('Props should be an object');
    }

    const MAX_PROPS = 50;
    if (Object.keys(props as any).length > MAX_PROPS) {
      throw new ArgumentOutOfRangeException(
        `Props should not have more than ${MAX_PROPS} properties`,
      );
    }
  }

  public toString(): string {
    return `${this.constructor.name}<${this._id.getValue()}>`;
  }
}
