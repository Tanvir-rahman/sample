import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  ManyToMany,
  RelationCount,
} from 'typeorm';

import slugify from 'slug';

import { IsNotEmpty, Length } from 'class-validator';
import { classToPlain } from 'class-transformer';

import { AbstractEntity } from './abstract.entity'
import { UserEntity } from './user.entity';

@Entity('murmur')
export class MurmurEntity extends AbstractEntity {

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  slug: string;

  @Column()
  @IsNotEmpty()
  @Length(1, 280)
  description: string;

  @ManyToMany(
    type => UserEntity,
    user => user.favouriteMurmurs,
    { eager: true },
  )
  @JoinTable()
  favouriteBy: UserEntity[];
  
  @RelationCount(
    (murmur: MurmurEntity) => murmur.favouriteBy
  )
  favouriteCount: number;

  @ManyToOne(
    type => UserEntity,
    user => user.murmurs,
    {eager: true},
  )
  writer: UserEntity;

  @BeforeInsert()
  toSlug() {
    this.slug = `${slugify(this.title, { lower: true })} - ${((Math.random() * Math.pow(36, 6)) | 0).toString(36)}`;
  }

  toJson() {
    return classToPlain(this);
  }

  toMurmur(user?: UserEntity): any {
    let favouriteBy = null;
    if(user) {
      favouriteBy = this.favouriteBy.map(user => user.id).includes(user.id);
    }
    const murmur: any = this.toJson();
    return { ...murmur, favouriteBy }
  }

}