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
              labels : this.state.labels,
              datasets : [
                {
                  label : this.state.selectedWorkout.name,
                  data : this.state.data
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
