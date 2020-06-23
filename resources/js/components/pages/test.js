isMember: function isNumber(obj) {
    return obj !== undefined && typeof obj === "number" && !isNaN(obj);
}

function filterByID(item) {
    if (isNumber(item.id) && item.id !== 0) {
        return true;
    }
    invalidEntries++;
    return false;
}

isMember: state => meetupId => {
    return (
        state.user &&
        state.user["meetups"] &&
        state.user["meetups"].forEach(element => console.log(element.id))
    );
};
