import "./weather-details.style.scss"

export const WeatherDetails = ({ data }) => {
    return (
        <div className="weather-details">
            <h1>
                <span>{data.city}</span>
                <sup className="country">{data.country}</sup>
            </h1>
            <h1 className="temp-img">
                <span>{data.temperature}<sup>°C</sup></span>
                <img src={data.icon} alt={data.desc} />
            </h1>
            <h2>{data.desc}</h2>
        </div>
    )
}