import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import Users from "./Users";
import Avatar from "./Avatar";

export enum AgeGroup {
  TWO_TO_THREE = "2-3",
  THREE_TO_FIVE = "3-5",
  FIVE_TO_TEN = "5-10",
}

export enum FluencyLevel {
  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}

export enum Gender {
  BOY = "Boy",
  GIRL = "Girl",
}

@Entity()
export default class Children {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: AgeGroup,
  })
  ageGroup: AgeGroup;

  @Column({
    type: "enum",
    enum: FluencyLevel,
  })
  fluencyLevel: FluencyLevel;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @ManyToOne(() => Users, (user) => user.children, { onDelete: "CASCADE" })
  user: Users;

  @ManyToOne(() => Avatar, (avatar) => avatar.children, { nullable: true })
  @JoinColumn({ name: "avatarId" })
  avatar?: Avatar;

  @Column({ nullable: true })
  avatarId?: number;

  @Column({ default: 0 })
  rewards: number;

  @Column({ default: 0 })
  totalXP: number;

  @Column("simple-array", { default: "" })
  badges: string[]; // e.g., ["Fluency Star", "Vocabulary Champ"]

  @Column({ default: 0 })
  lessonsCompleted: number;

  @Column({ default: 0 })
  remainingLessons: number;

  @Column("simple-array", { default: "" })
  differentLessons: string[]; // e.g., ["Amina's Choice", "Eco Heroes"]

  @Column({ type: "int", default: 0 })
  currentStreak: number;

  @Column({ type: "int", default: 0 })
  longestStreak: number;

  @Column({ type: "date", nullable: true })
  lastActivityDate: Date | null;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
  gameProgress: any;
}
