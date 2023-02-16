// Last 1 Months Order Chart //

var options = {
    series: [{
    name: 'Net Profit',
    data: [ 3000, 4000, 2500, 1156, 1461, 6400, 6300, 12000, 1266, 2300, 7748, 2679, 8990, 4779, 8000, 9000, 7000, 6000, 7500, 7600, 8766, 9889, 1288, 7899, 7889, 4568, 8800, 9978, 1255]
  }],
    chart: {
    type: 'bar',
    height: '240%'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '65%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'],
  },
  yaxis: {
    title: {
      text: 'Amount (INR)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "INR " + val + " thousands"
      }
    }
  }
  };

  var chart = new ApexCharts(document.querySelector("#revenue"), options);
  chart.render();

  // Total Order Chart //

  var options = {
    series: [130, 314, 718],
    chart: {
    height: '240%',
    type: 'pie',
  },
  labels: ["Cancelled Order", "New Order", "Delivered Order"],

  fill: {
    type: 'gradient',
  },

  plotOptions: {
    pie: {
      dataLabels: {
        offset: -5
      }
    }
  },
  

  colors: ['#ee2261', '#008ffb', '#67ac1d'],

  dataLabels: {
    formatter(val, opts) {
      const name = opts.w.globals.labels[opts.seriesIndex]
      return [name, val.toFixed(1) + '%']
    },
    style: {
      colors: ['#fff'],
    }
  },
  legend: {
    show: true,
    position: 'bottom'
  }
  };

  var chart = new ApexCharts(document.querySelector("#order"), options);
  chart.render();


  // Last 12 Months Order //

  var options = {
    series: [{
      name: "Order",
      data: [0, 10, 41, 35, 51, 49, 62, 69, 91, 148]
  }],
    chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  title: {
    text: 'Product Trends by Month',
    align: 'left'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: ['2022', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  }
  };

  var chart = new ApexCharts(document.querySelector("#twelvemonthsorder"), options);
  chart.render();


  // Order Past 15 Days //

  var optionsLine = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    series: [{
        name: "Delivered Orders",
        data: [1, 0, 2, 3, 4, 2, 4, 7, 2, 3, 4, 8]
      },
      {
        name: "Orders to be Delivered",
        data: [2, 0, 1, 0, 2, 3, 1, 0, 2, 0, 0, 4]
      },
      {
        name: "Cancelled Orders",
        data: [0, 0, 1, 0, 1, 0, 1, 1, 1, 2, 0, 0]
      }
    ],
    title: {
      text: 'Media',
      align: 'left',
      offsetY: 25,
      offsetX: 20
    },
    subtitle: {
      text: 'Statistics',
      offsetY: 55,
      offsetX: 20
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9
      }
    },
    grid: {
      show: true,
      padding: {
        bottom: 0
      }
    },
    colors: ['#73ba21', '#008ffb', '#e4181b'],
    labels: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan', '10 Jan', '11 Jan', '12 Jan'],
    xaxis: {
      tooltip: {
        enabled: false
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -20
    }
  }
  
  var chartLine = new ApexCharts(document.querySelector('#orderpast'), optionsLine);
  chartLine.render();


  // Visits by Day //

  var options = {
    series: [{
    name: 'Views',
    data: [200, 350, 120, 190, 400, 300, 200]
  }],
    chart: {
    height: 350,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      dataLabels: {
        position: 'top', // top, center, bottom
      },
    }
  },
  
  xaxis: {
    categories: ["S", "M", "T", "W", "T", "F", "S"],
    position: 'top',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#bdaf13',
          stops: [0, 10],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        }
      }
    },
    tooltip: {
      enabled: true,
    }
  },

  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: [ '#396bde'],
      shadeIntensity: 1,
      type: 'vertical',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100, 100]
    },
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    }
  
  }
  };

  var chart = new ApexCharts(document.querySelector("#visitbyday"), options);
  chart.render();

