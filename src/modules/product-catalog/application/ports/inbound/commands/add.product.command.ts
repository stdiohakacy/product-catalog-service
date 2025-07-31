import { ICommand } from '@nestjs/cqrs';

export interface AddProductCommandProps {
  name: string;
  description: string;
  imageUrls: string[];
  price: number;
  availableItemCount: number;
  category: {
    name: string;
    description?: string;
  };
}

export class AddProductCommand implements ICommand {
  constructor(public readonly props: AddProductCommandProps) {}
}
