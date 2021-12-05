import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './Listing';
import { User } from './User';

@Entity('reviews')
export class Reviews extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('int') rating: number;

  @Column('text') text: string;

  @Column('uuid') userId: string;

  @ManyToOne(() => User)
  user: User;

  @Column('uuid') listingId: string;

  @ManyToOne(() => Listing)
  listing: Listing;
}
