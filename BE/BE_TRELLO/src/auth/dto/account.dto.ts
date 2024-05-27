import { IsString, Matches, IsNotEmpty } from "class-validator";
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,24}$/;

export class AccountDto {
    @IsNotEmpty({message:'Ten email khong duoc de trong'})
    email:string;

    @Matches(PASSWORD_REGEX, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 6 to 24 characters long' })
    password: string;
  }