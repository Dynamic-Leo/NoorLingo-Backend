import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Users from "./Users";

@Entity()
export default class UserBankDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users)
  @JoinColumn()
  user: Users;

  @Column({ nullable: false })
  bankName: string;

  @Column({ nullable: false })
  accountNumber: string;

  @Column({ nullable: false })
  accountHolderName: string;

  @Column({ nullable: true })
  iban?: string;

  @Column({ nullable: true })
  swiftCode?: string;

  @Column({ nullable: true })
  branchCode?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
