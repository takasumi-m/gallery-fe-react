import React from "react";
import './ErrorMessage.css';

const ErrorMessage = ({ errorMessage }) => {
    console.log(errorMessage);
    if (!errorMessage) {
        return null; // メッセージがない場合は何も表示しない
    }

    return (
        <div className="error-message">
            {errorMessage} {/* メッセージを表示 */}
        </div>
    );
}

export default ErrorMessage;