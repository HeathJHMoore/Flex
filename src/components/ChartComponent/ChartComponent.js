import React from 'react';
import { Line } from 'react-chartjs-2';



class ChartComponent extends React.Component {

  state = {
    selectedWorkout : '',
  }

  render() {
    return (
      <div>
        <Line
           data={  
             {
              labels : this.props.labels,
              datasets : [
                {
                  label : this.props.exerciseName,
                  data : this.props.data
                }
              ]
            }}
           options={{
             scales : {
               yAxes : [{
                 scaleLabel : {
                   display : true,
                   labelString : this.props.yAxisLabel
                 }
               }]
             }
           }}
        />
      </div>
    )
  }
}

export default ChartComponent;
