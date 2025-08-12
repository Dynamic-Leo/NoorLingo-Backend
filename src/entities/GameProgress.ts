import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Children from "./Children";

@Entity()
export default class GameProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Children, (child) => child.gameProgress, {
    onDelete: "CASCADE",
  })
  child: Children;

  @Column()
  lesson: string;

  @Column()
  gameName: string;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: "float", default: 0 })
  score: number;

  @Column({ type: "float", default: 0 })
  xpEarned: number;

  @Column({ default: 0 })
  attempts: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  pronunciation: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  speed: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  intonation: string;

  @Column({ type: "varchar", nullable: true })
  paragraph: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
