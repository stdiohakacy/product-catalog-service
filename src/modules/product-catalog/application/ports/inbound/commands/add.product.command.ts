import { ICommand } from '@nestjs/cqrs';

export class AddProductCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly imageUrls: string[],
    public readonly price: number,
    public readonly availableItemCount: number,
    public readonly category: {
      name: string;
      description?: string;
    },
  ) {}
}
