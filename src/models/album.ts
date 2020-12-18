import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  IsNull,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category';
import { Picture } from './picture';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @OneToOne(() => Picture, { onDelete: 'SET NULL'})
  @JoinColumn()
  coverPicture: Picture;

  @OneToMany(() => Picture, (picture) => picture.album, { cascade: true })
  pictures: Picture[];

  @ManyToOne(() => Category, (category) => category.albums, { onDelete: 'SET NULL'})
  category: Category;
}
