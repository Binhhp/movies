function convertTime(str) {
    var date = new Date(str);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    if(day < 10) day = "0" + day;
    if(month < 10) month = "0" + month;
    return [day, month , date.getFullYear() ].join("/");
}

export default convertTime;