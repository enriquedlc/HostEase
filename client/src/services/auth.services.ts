import bcrypt from 'bcryptjs';

const SALTROUNDS = 10;

export function encryptPassword(passwordToEncrypt: string): Promise<string> {
	return new Promise((resolve, reject) => {
		bcrypt.hash(passwordToEncrypt, SALTROUNDS, (err: Error, hash: string) => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(hash);
			}
		});
	});
}