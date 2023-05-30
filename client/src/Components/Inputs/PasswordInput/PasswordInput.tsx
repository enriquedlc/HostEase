import { ChangeEventHandler, useState } from 'react';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi';
import './PasswordInput.css';

interface PasswordInputProps {
	className?: string;
	placeholder: string;
	name: string;
	onChange: ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput = (props: PasswordInputProps) => {
	const { className, placeholder, name, onChange } = props;
	const [showPass, setShowPass] = useState<boolean>(false);

	return (
		<div className={`inputBody ${className}`}>
			<input
				type={showPass ? 'text' : 'password'}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
				autoComplete="off"
			/>
			{showPass ? (
				<div className="showPass">
					<HiLockOpen onClick={() => setShowPass(!showPass)} />
				</div>
			) : (
				<div className="showPass">
					<HiLockClosed onClick={() => setShowPass(!showPass)} />
				</div>
			)}
		</div>
	);
};

export default PasswordInput;
