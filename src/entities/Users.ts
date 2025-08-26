import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import Children from "./Children";
import { OneToMany } from "typeorm";

@Entity()
export default class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @Column({ unique: true, nullable: false })
  // phone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;

  // Added googleId to store the unique identifier from Google.
  @Column({ unique: true, nullable: true })
  googleId?: string;

  @Column({ nullable: false })
  role: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdDate: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  updatedDate: Date;

  @BeforeInsert()
  updateCreatedDate() {
    this.createdDate = new Date();
  }

  @BeforeUpdate()
  updateUpdatedDate() {
    this.updatedDate = new Date();
  }

  // Inside class Users:
  @OneToMany(() => Children, (child: Children) => child.user)
  children: Children[];
}
