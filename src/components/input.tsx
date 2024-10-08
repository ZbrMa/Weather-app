import './styles/input.css';
import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    placeholderPosition?: 'inside' | 'outside';
    placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
    ({ placeholderPosition = 'outside', placeholder, ...props }, ref) => {

        if (placeholderPosition === 'inside') {
            return (
                <input ref={ref} {...props} placeholder={placeholder} />
            );
        };

        if (placeholderPosition === 'outside') {
            return (
                <div className="input__container">
                    <label className="input--label">{placeholder}:</label>
                    <input ref={ref} {...props} />
                </div>
            );
        };

        return null;
    }
);
