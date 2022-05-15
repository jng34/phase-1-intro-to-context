// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName : firstName,
        familyName : familyName,
        title : title,
        payPerHour : payPerHour,
        timeInEvents : [],
        timeOutEvents : []
    };
};

let kingKong = ['King','Kong','beast','100'];
let inTime = '2022-05-15 0800';
let outTime = '2022-05-15 1000';

function createEmployeeRecords(arrOfArrays) {
    let employeeRecordArr = [];
    for (let arr of arrOfArrays) {
        employeeRecordArr.push(createEmployeeRecord(arr));
    }
    return employeeRecordArr;
};


function createTimeInEvent(employee, dateStamp) {
    let newTimeInEvent = {
        type: 'TimeIn',
        hour: parseInt(dateStamp.substring(11,15)), //number
        date: dateStamp.substring(0,10) //string
    };
    employee.timeInEvents.push(newTimeInEvent);
    return employee;
};

function createTimeOutEvent(employee, dateStamp) {
    let newTimeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(dateStamp.substring(11,15)), //number
        date: dateStamp.substring(0,10) //string
    };
    employee.timeOutEvents.push(newTimeOutEvent);
    return employee;
};

//test
// console.log(kingKong);
// let emp = createEmployeeRecord(kingKong);
// createTimeInEvent(emp, inTime);
// createTimeOutEvent(emp, outTime);
// console.log(emp);

// let targetDate = emp.timeOutEvents.find(day => day.date === '2022-05-15').hour;
// console.log(targetDate);
// console.log(targetDate.hour)


function hoursWorkedOnDate(employee, date) {
    let timeOut = employee.timeOutEvents.find(target => target.date === date).hour;
    let timeIn = employee.timeInEvents.find(target => target.date === date).hour;
    let hoursWorked = (timeOut - timeIn)/100;
    return hoursWorked;
};

// console.log(hoursWorkedOnDate(emp, '2022-05-15'))

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date)*employee.payPerHour;
};

function allWagesFor(employee) {
    let totalPayOwed = 0;
    let allDates = employee.timeOutEvents;
    for (const day of allDates) {
        totalPayOwed += wagesEarnedOnDate(employee, day.date);
    }
    return totalPayOwed;
}

function calculatePayroll(records) {

    let totalPayroll = 0;
    for (let employee of records) {
        let allDates = employee.timeOutEvents;
        for (let day of allDates) {
            totalPayroll += wagesEarnedOnDate(employee, day.date);
        }
    }
    return totalPayroll;
}



//last test
let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
let sRecord = createEmployeeRecord(["Simba", "", "King", 100])
let sTimeData = [
    ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
    ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
  ]

  let rTimeData = [
    ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
    ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
  ]

  sTimeData.forEach(function (d) {
    let [dIn, dOut] = d
    sRecord = createTimeInEvent(sRecord, dIn)
    sRecord = createTimeOutEvent(sRecord, dOut)
  })

  rTimeData.forEach(function (d, i) {
    let [dIn, dOut] = d
    rRecord = createTimeInEvent(rRecord, dIn)
    rRecord = createTimeOutEvent(rRecord, dOut)
  })

  let employees = [sRecord, rRecord]
  let grandTotalOwed = employees.reduce((m, e) => m + allWagesFor(e), 0)
  expect(grandTotalOwed).to.equal(calculatePayroll(employees))