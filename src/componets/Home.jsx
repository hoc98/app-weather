import React from 'react'
import { useState, useEffect } from 'react'
import "./style.css"
const Home = () => {
    const [searchValue, setSearchValue] = useState("")
    const [weatherData, setweatherData] = useState({})
    const [wicon, setwicon] = useState("")
    const getWeatherInfo = async () => {
        try {
            const url =
                `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
         &units=metric&appid=d6cf4b0616ded77abdf6f54f14d90923`
            const res = await fetch(url)
            const data = await res.json()
            console.log(data)
            const { temp, pressure, humidity } = data.main
            const { main: wm } = data.weather[0]
            const { name } = data
            const { speed } = data.wind
            const { country, sunset } = data.sys;
            const newData = {
                temp, pressure, humidity, wm, speed, country, sunset, name
            }
            setweatherData(newData)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        getWeatherInfo();

        if (weatherData.wm) {
            switch (weatherData.wm) {
                case "Clouds":
                    setwicon("wi-day-cloudy")
                    break;
                case "Haze":
                    setwicon("wi-fog")
                    break
                case "Clear":
                    setwicon("wi-day-sunny")
                    break
                case "Rain":
                    setwicon("wi-strom-showers")
                    break
                default:
                    setwicon("wi-day-suny")
                    break;
            }
        }

    }, [weatherData.wm])

    const sec = weatherData.sunset
    const data = new Date(sec * 1000)
    const timestr = `${data.getHours()} :${data.getMinutes()}`

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input
                        type="search"
                        placeholder="search..."
                        autoFocus
                        id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        className="searchButton"
                        type="button"
                        onClick={getWeatherInfo}
                    >
                        search
                    </button>
                </div>
            </div>

            <article className="widget">
                <div className="weatherIcon">
                    <i className={`wi ${wicon}`}></i>
                </div>
                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{weatherData.temp}&deg;</span>
                    </div>
                    <div className="description">
                        <div className="weatherCondition">{weatherData.wm}</div>
                        <div className="place">
                            {weatherData.name},{weatherData.country}
                        </div>
                    </div>
                </div>
                <div className="date"> {new Date().toLocaleString()} </div>

                <div className="extra-temp">
                    <div className="temp-info-minmax">
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-sunset"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {timestr} PM <br />
                                Sunset
                            </p>
                        </div>
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-humidity"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {weatherData.humidity} <br />
                                Humidity
                            </p>
                        </div>
                    </div>
                    <div className="weather-extra-info">
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-rain"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {weatherData.pressure} <br />
                                Pressure
                            </p>
                        </div>
                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-windy"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {weatherData.speed}
                                <br />
                                Speed
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </>
    )
}

export default Home