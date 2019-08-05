import React from 'react';
import { Line } from 'react-chartjs-2';



class ChartComponent extends React.Component {

  state = {
    data : {
      labels : ['cool', 'cooler', 'coolest'],
      datasets : [
        {
          label : 'Numbers Are Cool',
          data : [
            150,
            300,
            500
          ]
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <Line
           data={this.state.data}
           options={{}}
        />
      </div>
    )
  }
}

export default ChartComponent;
