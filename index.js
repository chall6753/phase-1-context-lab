/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 function createEmployeeRecord(arr){
    let newObj = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents:[],
        timeOutEvents:[]
        }
        // console.log(this)
       return newObj
    }

function createEmployeeRecords(arrOfArr){
    // console.log(arrOfArr)
    let employeeObj = arrOfArr.map(createEmployeeRecord)//employeeObj is an array of objects each object is an employee record
    // console.log(this)
    return employeeObj
}

function createTimeInEvent(dateTime){
    let timeInObj = {
        type: 'TimeIn',
        hour: parseFloat(dateTime.slice(11,15)),
        date:dateTime.slice(0,10)
    }
    this.timeInEvents[this.timeInEvents.length] = timeInObj
    return this
}

function createTimeOutEvent(dateTime){
    let timeOutObj = {
        type: 'TimeOut',
        hour: parseFloat(dateTime.slice(11,15)),
        date:dateTime.slice(0,10)
    }
    this.timeOutEvents[this.timeOutEvents.length] = timeOutObj
    return this
}

function hoursWorkedOnDate(dateWorked){
    let timeIn = 0
     let timeOut = 0
     console.log(this)
     this.timeInEvents.map(function(obj){
        if (obj.date === dateWorked){
             timeIn = obj.hour
             console.log(`time in ${timeIn}`)
        }})   
     this.timeOutEvents.map(function(obj){
         
         if (obj.date === dateWorked){
             timeOut = obj.hour
             console.log(`time out ${timeOut}`)
     }})
     let hoursWorked = (timeOut-timeIn)/100
     return hoursWorked
 }

 function wagesEarnedOnDate(dateWorked){
    let hoursWorked = hoursWorkedOnDate.call(this, dateWorked)
    console.log(`daily pay ${hoursWorked * this.payPerHour}`)
    return hoursWorked * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(array){
    return array.reduce(function(accumulator, obj){
        let totalEmployeePay = allWagesFor.call(obj)
        accumulator += totalEmployeePay
        return accumulator
    },0)
}

function findEmployeeByFirstName(srcArray, firstName){
        let foundEmployee
        srcArray.map(function(employee){
        // console.log(employee)
        if (employee.firstName === firstName){
            // console.log(employee.firstName)
            foundEmployee = employee
        }
    })
    return foundEmployee
}

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]

  let employeeRecords = createEmployeeRecords(csvDataEmployees)
            employeeRecords.forEach(function (rec) {
              let timesInRecordRow = csvTimesIn.find(function (row) {
                return rec.firstName === row[0]
              })

              let timesOutRecordRow = csvTimesOut.find(function (row) {
                return rec.firstName === row[0]
              })

              timesInRecordRow[1].forEach(function(timeInStamp){
                createTimeInEvent.call(rec, timeInStamp)
              })

              timesOutRecordRow[1].forEach(function(timeOutStamp){
                createTimeOutEvent.call(rec, timeOutStamp)
              })
            })

            calculatePayroll(employeeRecords)