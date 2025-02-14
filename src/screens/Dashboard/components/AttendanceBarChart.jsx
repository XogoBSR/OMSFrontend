import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'; 
import { Bar } from 'react-chartjs-2'; import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js'; // Register Chart.js components 


ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
function AttendanceBarChart({activities}) {

    const[datesData] = useState([])
    const [hoursData] = useState([])

    useEffect(() => {
        // console.warn("Chart Attendances ",activities[0].totalWorkingTime)

        if(datesData.length === 0) {

            for(let i =6; i>=0; i--) {
                const date = new Date(); 
                date.setDate(date.getDate() - i)
                const options = { day: '2-digit', month: 'short', year: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-GB', options);
                datesData.push(formattedDate)
                if(activities) {

                    for(let j=0; j<activities.length; j++) {
                        const workingDate = new Date(activities[j].checkInTime)
                        const optionWorking = { day: '2-digit', month: 'short', year: 'numeric' };
                        const formartWorkingDate = workingDate.toLocaleDateString('en-GB', optionWorking);
                        if(formartWorkingDate === formattedDate) {
                            hoursData.push(activities[j].totalWorkingTime/60)
                        }else {
                            hoursData.push(0)
                        }   
                    }
                }
            }
            // console.log("Hourds Data ",hoursData)
        }

    },[])

// Sample data 
const data = { 
    labels: datesData, 
    datasets: [ 
        { 
        label: 'Attendance', 
        data: hoursData, 
        backgroundColor: 'rgba(0, 128, 0,1)', 
        borderColor: 'rgba(75, 192, 192, 1)', 
        borderWidth: 1,
    }
    ], 
    }; // Chart options 

const options = { 
    responsive: true, 
    plugins: { legend: { position: 'top', }, 
    title: { display: true, text: 'Bar Chart Example', }, }, 
}; 
    return <Bar data={data} options={options} />;
  
}

AttendanceBarChart.propTypes = {
    activities: PropTypes.array,
  }


export default AttendanceBarChart