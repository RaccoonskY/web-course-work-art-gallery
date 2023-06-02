exports.formatDate = (date) => {
    return new Date(date).toLocaleString(undefined, {day:'numeric', month: 'numeric', year: 'numeric'});
};
