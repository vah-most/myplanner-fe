export function getRemainingTime(fromTime, toTime) {
    //used code snippet from here: https://stackoverflow.com/a/13904120

    const passed = fromTime > toTime;
    // get total seconds between the times
    let delta = Math.abs(toTime - fromTime) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    console.log("DUE==>", days, hours, minutes);

    if (days > 0)
        return `${passed ? "passed" : "in"} ~${days} day${days > 1 ? "s" : ""} `;

    return (
        <span className="text-danger">
            {passed ? "passed" : "in"} {hours}:{minutes}
        </span>
    );
}
