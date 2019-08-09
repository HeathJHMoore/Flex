import React from 'react';
import { Line } from 'react-chartjs-2';



class ChartComponent extends React.Component {

  state = {
    selectedWorkout : '',
    labels : [],
    data : []
  }

  render() {
    return (
      <div>
        <Line
          //  data={this.state.data}
           data={  
             {
              // labels : this.state.labels,
              labels : ['8-20-19', '9-05-19', '10-01-19', '10-12-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19', '10-15-19'],
              datasets : [
                {
                  // label : this.state.selectedWorkout.name,
                  // data : this.state.data
                  label : 'Bench Press',
                  data : [125, 130, 135, 135, 140, 145, 145, 150, 150, 160]
                }
              ]
            }}
           options={{}}
        />
      </div>
    )
  }
}

export default ChartComponent;
