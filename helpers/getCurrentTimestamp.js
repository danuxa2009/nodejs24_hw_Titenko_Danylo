const getCurrentTimestamp = () => {
    const [date, time] = new Date().toISOString().split("T");
    const formattedTime = time.split('.')[0];
    return `[${date} | ${formattedTime}]`;
}

module.exports = {
    getCurrentTimestamp
}