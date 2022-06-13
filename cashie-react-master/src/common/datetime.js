import moment from "moment";

export function formattedDate(date) {
    return moment(date).format('MMMM Do YYYY, HH:mm')
}

export function formatReportExcelName(start, end) {
    const startName = moment(start).format('MM-DD')
    const endName = moment(end).format('MM-DD')

    return `Report-${startName}-${endName}`
}