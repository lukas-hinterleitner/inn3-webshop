export class LoginCredentials {

    private email: string;
    private password: string;

    constructor(newEmail, newPassword) {
        this.email = newEmail;
        this.password = newPassword;
    }

    toJSONString() {
        return '{email: ' + this.email + ', password: ' + this.password + '}';
    }

    setEmail(newEmail: string) {
        this.email = newEmail;
        console.log('login-credentials: email set to', newEmail);
    }

    setPassword(newPassword: string) {
        // TODO encryption

        this.password = newPassword;
        console.log('login-credentials: password set to', newPassword);
    }

    getEmail() {
        return this.email;
    }

    getEncryptedPassword() {
        return this.password;
    }

    clear() {
        this.email = '';
        this.password = '';
    }
}
