if (Meteor.isClient) {

    Template.machineStart.events({
        'submit .submitGreen': function (event) {
            event.preventDefault();
            var machineId = event.target.machineId.value;
            var workCenter = event.target.workCenter.value;
            document.title = machineId + '  -  ' + workCenter;
            var centerId = machineId + 'workCenter';
            Session.set('machineId', machineId);
            Session.set('workCenter', workCenter);
            Session.set('centerId', centerId);
            Meteor.call('setWorkCenter', machineId, centerId, workCenter);
            FlowRouter.go('startRecorder');
        }
    });



    Template.highChart.onRendered(function() {

            machinesArray();
            machinesProcess();
            nonValueTime();
            time();
        var nonValue = Session.get('nonValueTime');
        var process = Session.get('processTime');
        var machines = Session.get('machineArray');
        

        Highcharts.setOptions({
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#CE39C8', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#91e8e1', '#f45b5b', '#E846FF']
        });

        $('#container-column').highcharts({
            chart: {
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 30,
                    depth: 50
                },
                marginRight: 180,
                marginTop: 50,
                marginBottom: 140,

                type: 'column',
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Build Time per Machine'
            },
            xAxis: {
                categories: machines
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total time in min'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: 0,
                verticalAlign: 'top',
                layout: 'vertical',
                y: 100,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: [{
                name: 'Material Movement',
                data: []
            },{
                name: 'Tech Error',
                data: []
            },{
                name: 'Lack of Tool',
                data: []
            },{
                name: 'Undefined',
                data: []
            },{
                name: 'Communication COL',
                data: []
            },{
                name: 'Communication COA',
                data: []
            },{
                name: 'Communication CSE',
                data: []
            },{
                name: 'Part Fitment',
                data: []
            },{
                name: 'Damaged Part',
                data: []
            }, {
                name: 'Missing in Stock',
                data: []
            },{
                name: 'Missing out of Stock',
                data: []
            },{
                name: 'Non Value Time',
                data: nonValue
            },{
                name: 'Process Time',
                data: process
            }],

            exporting: {
                allowHtml: true,
                enabled: false
            }
        });
    });


    function time() {
        for (k = 0; k < 100000; k++){
            for (j = 0; j < 1000; j++) {}
        }
    }


    function machinesArray() {
        Meteor.call('arrayGraph', function(error, machineArray) {
            if (machineArray) {
                Session.set('machineArray', machineArray);
            } else {
              
            }
        });
    }
    
    function machinesProcess() {
        Meteor.call('processTime', function(error, processArray) {
            if (processArray) {
                Session.set('processTime', processArray);
             }
        });
    }

    function nonValueTime() {
        Meteor.call('nonValueTime', function(error, nonValueArray) {
            if (nonValueArray) {
                Session.set('nonValueTime', nonValueArray);
            }
        });
    }


    function builtColumn() {

        var nonValue = Session.get('nonValueTime');
        var process = Session.get('processTime');
        var machines = Session.get('machineArray');
      

        Highcharts.setOptions({
            colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#CE39C8', '#64E572', '#FF9655', '#FFF263', '#6AF9C4', '#91e8e1', '#f45b5b', '#E846FF']
        });

        $('#container-column').highcharts({
            chart: {
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 30,
                    depth: 50
                },
                marginRight: 180,
                marginTop: 50,
                marginBottom: 140,

                type: 'column',
                backgroundColor: {
                    linearGradient: [0, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(200, 200, 255)']
                    ]
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Build Time per Machine'
            },
            xAxis: {
                categories: machines
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total time in min'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: 0,
                verticalAlign: 'top',
                layout: 'vertical',
                y: 100,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black'
                        }
                    }
                }
            },
            series: [{
                name: 'Material Movement',
                data: []
            },{
                name: 'Tech Error',
                data: []
            },{
                name: 'Lack of Tool',
                data: []
            },{
                name: 'Undefined',
                data: []
            },{
                name: 'Communication COL',
                data: []
            },{
                name: 'Communication COA',
                data: []
            },{
                name: 'Communication CSE',
                data: []
            },{
                name: 'Part Fitment',
                data: []
            },{
                name: 'Damaged Part',
                data: []
            }, {
                name: 'Missing in Stock',
                data: []
            },{
                name: 'Missing out of Stock',
                data: []
            },{
                name: 'Non Value Time',
                data: nonValue
            },{
                name: 'Process Time',
                data: process
            }],

            exporting: {
                allowHtml: true,
                enabled: false
            }
        });
    }
}

