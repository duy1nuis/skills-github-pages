function getWeather(city, elementId) {
    const apiKey = "65cf9ded627df41cefab3d71276ac88f"; // Thay bằng API key của bạn
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không tìm thấy thành phố!");
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById(elementId);
            weatherDiv.innerHTML = `
                <h2>Thời tiết tại ${data.name}</h2>
                <p style="--i: 1">Nhiệt độ: ${data.main.temp}°C</p>
                <p style="--i: 2">Cảm giác như: ${data.main.feels_like}°C</p>
                <p style="--i: 3">Độ ẩm: ${data.main.humidity}%</p>
                <p style="--i: 4">Mô tả: ${data.weather[0].description}</p>
            `;
            weatherDiv.classList.add("loaded");
        })
        .catch(error => {
            const weatherDiv = document.getElementById(elementId);
            weatherDiv.innerHTML = `<p>${error.message}</p>`;
            weatherDiv.classList.add("loaded");
        });
}

// Tự động lấy thời tiết khi trang tải
window.onload = function() {
    getWeather("Hanoi", "hanoiWeather");
    getWeather("Da Nang", "danangWeather");
    getWeather("Da Lat", "dalatWeather");
    getWeather("Ho Chi Minh", "hcmWeather");
};