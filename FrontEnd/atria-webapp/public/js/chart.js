window.onload = function() {
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';
    var to_date = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');
    var from_date = moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00');
    var custom_date = {
        to_date: to_date,
        from_date: from_date
    };
    var Obj_string = JSON.stringify(custom_date);
    $.ajax({
        url: "/analytics/date_wise",
        type: "POST",
        dataType: "json",
        data: Obj_string,
        contentType: "application/json",
        cache: false,
        timeout: 5000,
        success: function (response) {
            var power_max = response.rooms_power.room_power+5;
            var power_max_length = Math.ceil(power_max / 10) * 10;
            var max_limit_power = power_max_length / 10
            var cost_max = response.rooms_cost.room_cost+5;
            var cost_max_length = Math.ceil(cost_max / 100) * 100;
            var bg_color = [];
            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };
            for (var i in response.room_names) {
                bg_color.push(dynamicColors());
            }
            // var room_chart_power = null;
            // var room_chart_cost = null;
            // var room_pie_power = null;
            // var room_pie_cost = null;
            var pie_chart_power = document.getElementById("room_pie_power");                    
            room_pie_power = new Chart(pie_chart_power, {
                type: 'doughnut',
                data: {
                    labels: response.room_names,
                    datasets: [{
                        data: response.rooms_power.room_power,
                        backgroundColor: bg_color
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 75,
                }
            });
            var pie_chart_cost = document.getElementById("room_pie_cost");
            room_pie_cost = new Chart(pie_chart_cost, {
                type: 'doughnut',
                data: {
                    labels: response.room_names,
                    datasets: [{
                        data: response.rooms_cost.room_cost,
                        backgroundColor: bg_color
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 75,
                }
            });
            $('#header').html("Home Analytics for last 30 Days");
            $('#sub_heading').html(response.sub_heading);
            $('#total_power_kwh').html(response.total_power_kwh + ' kwh');
            $('#total_cost_inr').html('₹ ' + response.total_cost_inr);
            //- var ctx = document.getElementById("room_chart_power");                    
            //- room_chart_power = new Chart(ctx, {
            //-     type: 'bar',
            //-     data: {
            //-         labels: response.device_name,
            //-         datasets: [{
            //-             label: "Power Consumption",
            //-             backgroundColor: "#008aff",
            //-             hoverBackgroundColor: "#008aff",
            //-             borderColor: "#008aff",
            //-             data: response.device_power,
            //-         },{
                        
            //-         }]
            //-     },
            //-     options: {
            //-         maintainAspectRatio: false,
            //-         layout: {
            //-             padding: {
            //-                 left: 10,
            //-                 right: 25,
            //-                 top: 25,
            //-                 bottom: 0
            //-             }
            //-         },
            //-         scales: {
            //-             xAxes: [{
            //-                 time: {
            //-                     unit: 'room'
            //-                 },
            //-                 gridLines: {
            //-                     display: false,
            //-                     drawBorder: false
            //-                 },
            //-                 ticks: {
            //-                     maxTicksLimit: response.total_rooms
            //-                 },
            //-                 maxBarThickness: 20,
            //-             }],
            //-             yAxes: [{
            //-                 ticks: {
            //-                     min: 0,
            //-                     max: response.total_rooms,
            //-                     maxTicksLimit: 10,
            //-                     padding: 5,
            //-                     callback: function(value, index, values) {
            //-                         return number_format(value) + ' kwh';
            //-                     }
            //-                 },
            //-                 gridLines: {
            //-                     color: "rgb(234, 236, 244)",
            //-                     zeroLineColor: "rgb(234, 236, 244)",
            //-                     drawBorder: false,
            //-                     borderDash: [2],
            //-                     zeroLineBorderDash: [2]
            //-                 }
            //-             }],
            //-         },
            //-         legend: {
            //-             display: true
            //-         },
            //-         tooltips: {
            //-             titleMarginBottom: 10,
            //-             titleFontColor: '#6e707e',
            //-             titleFontSize: 14,
            //-             backgroundColor: "rgb(255,255,255)",
            //-             bodyFontColor: "#858796",
            //-             borderColor: '#dddfeb',
            //-             borderWidth: 1,
            //-             xPadding: 15,
            //-             yPadding: 15,
            //-             displayColors: false,
            //-             caretPadding: 10,
            //-             callbacks: {
            //-                 label: function(tooltipItem, chart) {
            //-                     var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            //-                     return datasetLabel + ' ' + number_format(tooltipItem.yLabel) + ' kwh';
            //-                 }
            //-             }
            //-         }
            //-     }
            //- });
            //- var chart_cost = document.getElementById("room_chart_cost");
            //- room_chart_cost = new Chart(chart_cost, {
            //-     type: 'bar',
            //-     data: {
            //-         labels: response.device_name,
            //-         datasets: [{
            //-             label: "Electricity Cost",
            //-             backgroundColor: "#ff0004",
            //-             hoverBackgroundColor: "#ff0004",
            //-             borderColor: "#ff0004",
            //-             data: response.device_cost,
            //-         }],
            //-     },
            //-     options: {
            //-         maintainAspectRatio: false,
            //-         layout: {
            //-             padding: {
            //-                 left: 10,
            //-                 right: 25,
            //-                 top: 25,
            //-                 bottom: 0
            //-             }
            //-         },
            //-         scales: {
            //-             xAxes: [{
            //-                 time: {
            //-                     unit: 'room'
            //-                 },
            //-                 gridLines: {
            //-                     display: false,
            //-                     drawBorder: false
            //-                 },
            //-                 ticks: {
            //-                     maxTicksLimit: response.total_rooms
            //-                 },
            //-                 maxBarThickness: 20,
            //-             }],
            //-             yAxes: [{
            //-                 ticks: {
            //-                     min: 0,
            //-                     max: cost_max_length,
            //-                     maxTicksLimit: 5,
            //-                     padding: 5,
            //-                     callback: function(value, index, values) {
            //-                         return '₹ ' + number_format(value);
            //-                     }
            //-                 },
            //-                 gridLines: {
            //-                     color: "rgb(234, 236, 244)",
            //-                     zeroLineColor: "rgb(234, 236, 244)",
            //-                     drawBorder: false,
            //-                     borderDash: [2],
            //-                     zeroLineBorderDash: [2]
            //-                 }
            //-             }],
            //-         },
            //-         legend: {
            //-             display: true
            //-         },
            //-         tooltips: {
            //-             titleMarginBottom: 10,
            //-             titleFontColor: '#6e707e',
            //-             titleFontSize: 14,
            //-             backgroundColor: "rgb(255,255,255)",
            //-             bodyFontColor: "#858796",
            //-             borderColor: '#dddfeb',
            //-             borderWidth: 1,
            //-             xPadding: 15,
            //-             yPadding: 15,
            //-             displayColors: false,
            //-             caretPadding: 10,
            //-             callbacks: {
            //-                 label: function(tooltipItem, chart) {
            //-                     var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            //-                     return datasetLabel + ' ₹ ' + number_format(tooltipItem.yLabel);
            //-                 }
            //-             }
            //-         }
            //-     }
            //- });
        },
        error: function (error) {                    
            bootbox.alert({
                message: error.message,
                callback: function(){
                    location.reload(); 
                }
            });
        }
    });
};

$('.room_wise_power').click(function(){
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';
    var unit = $('#unit').val();
    var room_name = $(this).data('room_name');
    var to_date = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');            
    var from_date = moment().subtract(unit, 'days').format('YYYY-MM-DD 00:00:00');
    var custom_date = {
        to_date: to_date,
        from_date: from_date,
        unit: unit,
        room_name: room_name
    };
    var Obj_string = JSON.stringify(custom_date);
    $.ajax({
        url: "/analytics/room_wise_power",
        type: "POST",
        dataType: "json",
        data: Obj_string,
        contentType: "application/json",
        cache: false,
        success: function (response) {
            var bg_color = [];
            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };
            for (var i in response.device_name) {
                bg_color.push(dynamicColors());
            }
            var room_pie_power = null;
            var pie_chart_power = document.getElementById("room_pie_power");
            $('#room_pie_power').empty();
            room_pie_power = new Chart(pie_chart_power, {
                type: 'doughnut',
                data: {
                    labels: response.device_name,
                    datasets: [{
                        data: response.device_power,
                        backgroundColor: bg_color
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 75,
                }
            });
            $('#power_room_name').html(response.room_name + ' Devices Power Consumption');
        },
        error: function (error) {                    
            alert(error.message);
        }
    });
});

$('.room_wise_cost').click(function(){
    Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#858796';
    var unit = $('#unit').val();
    var room_name = $(this).data('room_name');
    var to_date = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');            
    var from_date = moment().subtract(unit, 'days').format('YYYY-MM-DD 00:00:00');
    var custom_date = {
        to_date: to_date,
        from_date: from_date,
        unit: unit,
        room_name: room_name
    };
    var Obj_string = JSON.stringify(custom_date);
    $.ajax({
        url: "/analytics/room_wise_cost",
        type: "POST",
        dataType: "json",
        data: Obj_string,
        contentType: "application/json",
        cache: false,
        success: function (response) {
            var bg_color = [];
            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };
            for (var i in response.device_name) {
                bg_color.push(dynamicColors());
            }
            var room_pie_cost = null;
            //- room_pie_cost.reset();
            var pie_chart_cost = document.getElementById("room_pie_cost");                    
            room_pie_cost = new Chart(pie_chart_cost, {
                type: 'doughnut',
                data: {
                    labels: response.device_name,
                    datasets: [{
                        data: response.device_cost,
                        backgroundColor: bg_color
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 75,
                }
            });
            $('#cost_room_name').html(response.room_name + ' Devices Power Cost');
        },
        error: function (error) {                    
            alert(error.message);
        }
    });
});

$('.select_days').click(function(){
    var num_days = $(this).data('unit');
    var to_date = moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00');            
    var from_date = moment().subtract(num_days, 'days').format('YYYY-MM-DD 00:00:00');
    var custom_date = {
        to_date: to_date,
        from_date: from_date,
        num_days: num_days
    };
    var Obj_string = JSON.stringify(custom_date);
    $.ajax({
        url: "/analytics/date_wise",
        type: "POST",
        dataType: "json",
        data: Obj_string,
        contentType: "application/json",
        cache: false,
        success: function (response) {
            var power_max = response.rooms_power.room_power+5;
            var power_max_length = Math.ceil(power_max / 10) * 10;
            var max_limit_power = power_max_length / 10
            var cost_max = response.rooms_cost.room_cost+5;
            var cost_max_length = Math.ceil(cost_max / 100) * 100;
            var bg_color = [];
            var dynamicColors = function() {
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                return "rgb(" + r + "," + g + "," + b + ")";
            };
            for (var i in response.room_names) {
                bg_color.push(dynamicColors());
            }
            var pie_chart_power = document.getElementById("room_pie_power");                    
            room_pie_power = new Chart(pie_chart_power, {
                type: 'doughnut',
                data: {
                    labels: response.room_names,
                    datasets: [{
                        data: response.rooms_power.room_power,
                        backgroundColor: bg_color
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 75,
                }
            });
            var pie_chart_cost = document.getElementById("room_pie_cost");
            room_pie_cost = new Chart(pie_chart_cost, {
                type: 'doughnut',
                data: {
                    labels: response.room_names,
                    datasets: [{
                        data: response.rooms_cost.room_cost,
                        backgroundColor: bg_color
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10,
                    },
                    legend: {
                        display: true
                    },
                    cutoutPercentage: 75,
                }
            });
            $('#header').html("Home Analytics for last "+num_days+" Days");
            $('#sub_heading').html(response.sub_heading);
            $('#total_power_kwh').html(response.total_power_kwh + ' kwh');
            $('#total_cost_inr').html('₹ ' + response.total_cost_inr);
        },
        error: function (error) {                    
            alert(error.message);
        }
    });
});

$('#custom_dates').click(function(){        
    var d1 = moment($("#from_date").val());
    var fromDate = moment(d1).format("YYYY-MM-DD HH:mm:ss");
    var d2 = moment($("#to_date").val());
    var toDate = moment(d2).format("YYYY-MM-DD HH:mm:ss");
    var num_days = d2.diff(d1, 'days');
    if(num_days > 0){
        $('#header').html("Home Analytics for last "+num_days+" Days");
        var custom_date = {
            to_date: toDate,
            from_date: fromDate
        };    
        var Obj_string = JSON.stringify(custom_date);
        $.ajax({
            url: "/analytics/date_wise",
            type: "POST",
            dataType: "json",
            data: Obj_string,
            contentType: "application/json",
            cache: false,
            success: function (response) {
                var power_max = response.rooms_power.room_power+5;
                var power_max_length = Math.ceil(power_max / 10) * 10;
                var max_limit_power = power_max_length / 10
                var cost_max = response.rooms_cost.room_cost+5;
                var cost_max_length = Math.ceil(cost_max / 100) * 100;
                var bg_color = [];
                var dynamicColors = function() {
                    var r = Math.floor(Math.random() * 255);
                    var g = Math.floor(Math.random() * 255);
                    var b = Math.floor(Math.random() * 255);
                    return "rgb(" + r + "," + g + "," + b + ")";
                };
                for (var i in response.room_names) {
                    bg_color.push(dynamicColors());
                }
                var pie_chart_power = document.getElementById("room_pie_power");                    
                room_pie_power = new Chart(pie_chart_power, {
                    type: 'doughnut',
                    data: {
                        labels: response.room_names,
                        datasets: [{
                            data: response.rooms_power.room_power,
                            backgroundColor: bg_color
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        tooltips: {
                            backgroundColor: "rgb(255,255,255)",
                            bodyFontColor: "#858796",
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            xPadding: 15,
                            yPadding: 15,
                            displayColors: false,
                            caretPadding: 10,
                        },
                        legend: {
                            display: true
                        },
                        cutoutPercentage: 75,
                    }
                });
                var pie_chart_cost = document.getElementById("room_pie_cost");
                room_pie_cost = new Chart(pie_chart_cost, {
                    type: 'doughnut',
                    data: {
                        labels: response.room_names,
                        datasets: [{
                            data: response.rooms_cost.room_cost,
                            backgroundColor: bg_color
                        }],
                    },
                    options: {
                        maintainAspectRatio: false,
                        tooltips: {
                            backgroundColor: "rgb(255,255,255)",
                            bodyFontColor: "#858796",
                            borderColor: '#dddfeb',
                            borderWidth: 1,
                            xPadding: 15,
                            yPadding: 15,
                            displayColors: false,
                            caretPadding: 10,
                        },
                        legend: {
                            display: true
                        },
                        cutoutPercentage: 75,
                    }
                });
                $('#sub_heading').html(response.sub_heading);
                $('#total_power_kwh').html(response.total_power_kwh + ' kwh');
                $('#total_cost_inr').html('₹ ' + response.total_cost_inr);
                $('#date_range').modal('hide');
            },
            error: function (error) {                    
                alert(error.message);
            }
        });
    } else {
        bootbox.alert({
            message: "Incorrect Date",
            callback: function(){
                location.reload();
            }
        });
    }
});