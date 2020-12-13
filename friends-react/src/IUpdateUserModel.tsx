
interface IUpdateUserModel {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    username: string;
    currentPassword: string;
    newPassword : string;
    confirmedNewPassword: string;
    email: string;
    profileImage : any;
}

export default IUpdateUserModel;