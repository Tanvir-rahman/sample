import {
  Entity,
  BeforeInsert,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';

import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';
import { hash, genSalt } from 'bcrypt';

import { AbstractEntity } from './abstract.entity';
import { MurmurEntity } from './murmur.entity';


@Entity('user')
export class UserEntity extends AbstractEntity {
  @Column()
  @IsNotEmpty()
  name: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @Length(4, 10)
  userName: string;

  @Column()
  @Exclude()
  salt: string;

  @Column()
  @Exclude()
  @IsNotEmpty()
  @Length(6, 50)
  password: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({
    default: null,
    nullable: true
  })
  picture: string

  @Column({
    default: null,
    nullable: true
  })
  dob: Date

  @Column({
    default: ''
  })
  about: string;

  @ManyToMany(
    type => UserEntity,
    user => user.following
  )
  @JoinTable()
  followers: UserEntity[];

  @ManyToMany(
    type => UserEntity,
    user => user.followers
  )
  @JoinTable()
  following: UserEntity[];

  @OneToMany(
    type => MurmurEntity,
    murmur => murmur.writer,
  )
  murmurs: MurmurEntity[]

  @ManyToMany(
    type => MurmurEntity,
    murmur => murmur.favouriteBy,
  )
  favouriteMurmurs: MurmurEntity[];

  @Column({
    default: ''
  })
  city: string;

  @Column({
    default: ''
  })
  address: string;

  @Column({
    default: ''
  })
  mobile: string;


  @BeforeInsert()
  async toLowerCaseEmail() {
    console.log('Email:', this.email);
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  async toHashPassword() {
    this.salt = await genSalt();
    this.password = await hash(this.password, this.salt);
  }

  async passwordCheck(pass: string): Promise<boolean> {
    const hashed = await hash(pass, this.salt);
    return hashed === this.password;
  }

  toProfile(user?: UserEntity):any {
    let following = null;
    if(user) {
      following = this.followers.includes(user);
    }
    const profile: any = this.toJson();
    return { ...profile, following };
  }

  toJson() {
    return classToPlain(this);
  }
}