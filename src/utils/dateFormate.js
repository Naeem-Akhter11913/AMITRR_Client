export const formateDate = (dateString) => {

    // Extract date components
    const dateObject = new Date(dateString);

    // Extract only the date part
    const dateOnlyString = dateObject.toISOString().split('T')[0];

    return dateOnlyString
}