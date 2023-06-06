const isValidText = (value, minLength = 1) => {
    return value && value.trim().length >= minLength;
}

const isValidDate = (value, minDate = new Date('2023-05-01'), maxDate = new Date('2023-12-15')) => {
    const date = new Date(value);
    return date >= minDate && date <= maxDate;
}

const isValidStatus = (value, validStatuses = ['Completed', 'In progress']) => {
    return value && validStatuses.includes(value);
}

exports.isValidTask = (task) => {
    return isValidText(task.title) && isValidText(task.desc) && isValidDate(task.deadline) && isValidStatus(task.status);
}