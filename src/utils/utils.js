export const formatDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}