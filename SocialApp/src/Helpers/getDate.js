export function getCurrentDate(separator=''){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let monthName= months[month-1]
        
    return date+' '+monthName
    }