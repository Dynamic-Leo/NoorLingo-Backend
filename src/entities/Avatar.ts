// src/entities/Avatar.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Children from "./Children";

@Entity()
export default class Avatar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g. "Boy" or "Girl"

  @Column()
  imageUrl: string; // URL or relative path to avatar image

  @OneToMany(() => Children, (child) => child.avatar)
  children: Children[];
}
