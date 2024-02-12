import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column({
    type: 'numeric',
    default: 0,
  })
  price: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    unique: true,
  })
  slug: string;

  @Column({
    type: 'int',
    default: 0,
  })
  stock: number;

  @Column({
    type: 'text',
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  @Column({
    array: true,
    default: [],
    type: 'text',
  })
  tags: string[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) this.slug = this.title;

    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('.', '');
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLocaleLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '')
      .replaceAll('.', '');
  }
}
