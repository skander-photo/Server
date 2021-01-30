import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Album } from './album';

@Entity()
@Unique('album_picture', ['album', 'fileNameLarge'])
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileNameLarge: string;

  @Column()
  fileNameThumbnail: string;

  @ManyToOne(() => Album, (album) => album.pictures)
  album: Album;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
