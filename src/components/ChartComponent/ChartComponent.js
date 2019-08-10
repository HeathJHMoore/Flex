import React from 'react';
import { Line } from 'react-chartjs-2';



class ChartComponent extends React.Component {

  state = {
    selectedWorkout : '',
  }

  render() {
    return (
      <div className="col-12 col-lg-6 bg-white p-1 border border-dark">
        <Line
           data={  
             {
              labels : this.props.labels,
              datasets : [
                {
                  label : this.props.exerciseName,
                  data : this.props.data,
                  backgroundColor : 'rgba(2,48,118, .6)',
                  pointBackgroundColor : 'black'
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
