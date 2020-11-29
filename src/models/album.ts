import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, IsNull } from 'typeorm';
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

  @Column({ nullable: true })
  coverImagePath: string;

  @OneToMany(() => Picture, (picture) => picture.album, { cascade: true })
  pictures: Picture[];

  @ManyToOne(() => Category, (category) => category.albums)
  category: Category;
}
