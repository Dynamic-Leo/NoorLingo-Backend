"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.FluencyLevel = exports.AgeGroup = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = __importDefault(require("./Users"));
const Avatar_1 = __importDefault(require("./Avatar"));
var AgeGroup;
(function (AgeGroup) {
    AgeGroup["TWO_TO_THREE"] = "2-3";
    AgeGroup["THREE_TO_FIVE"] = "3-5";
    AgeGroup["FIVE_TO_TEN"] = "5-10";
})(AgeGroup || (exports.AgeGroup = AgeGroup = {}));
var FluencyLevel;
(function (FluencyLevel) {
    FluencyLevel["BEGINNER"] = "Beginner";
    FluencyLevel["INTERMEDIATE"] = "Intermediate";
    FluencyLevel["ADVANCED"] = "Advanced";
})(FluencyLevel || (exports.FluencyLevel = FluencyLevel = {}));
var Gender;
(function (Gender) {
    Gender["BOY"] = "Boy";
    Gender["GIRL"] = "Girl";
})(Gender || (exports.Gender = Gender = {}));
let Children = class Children {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Children.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Children.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: AgeGroup,
    }),
    __metadata("design:type", String)
], Children.prototype, "ageGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: FluencyLevel,
    }),
    __metadata("design:type", String)
], Children.prototype, "fluencyLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Gender,
    }),
    __metadata("design:type", String)
], Children.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.default, (user) => user.children, { onDelete: "CASCADE" }),
    __metadata("design:type", Users_1.default)
], Children.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Avatar_1.default, (avatar) => avatar.children, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "avatarId" }),
    __metadata("design:type", Avatar_1.default)
], Children.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Children.prototype, "avatarId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Children.prototype, "rewards", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Children.prototype, "totalXP", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { default: "" }),
    __metadata("design:type", Array)
], Children.prototype, "badges", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Children.prototype, "lessonsCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Children.prototype, "remainingLessons", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { default: "" }),
    __metadata("design:type", Array)
], Children.prototype, "differentLessons", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Children.prototype, "currentStreak", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Children.prototype, "longestStreak", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Object)
], Children.prototype, "lastActivityDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Children.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Children.prototype, "updatedDate", void 0);
Children = __decorate([
    (0, typeorm_1.Entity)()
], Children);
exports.default = Children;
