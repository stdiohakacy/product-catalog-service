import { BaseDomainEvent } from './domain-event.base';
import { BaseEntity } from './entity.base';

export abstract class BaseAggregateRoot<
  EntityProps,
> extends BaseEntity<EntityProps> {
  private _domainEvents: BaseDomainEvent[] = [];

  get domainEvents(): BaseDomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: BaseDomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
