import "./input-box.style.scss";

export const InputBox = ({ handleChange }) => {
        return ( 
            <div className="input-box">
                <input className="city" placeholder="Enter the city here..." onBlur={handleChange} />
            </div>
         );
}
 
