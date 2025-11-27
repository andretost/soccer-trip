import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import AgendaList from './components/AgendaList'

// Sample trip data
const tripData = {
  title: "Soccer Trip to Germany - November 2025",
  days: [
    {
      id: 1,
      name: "Day 1 - Wednesday",
      date: "December 3",
      items: [
        { id: 1, time: "8am", title: "Getting ready", description: "Kevin has 1 disgusting breakfast, Nick runs 5 miles, Shawn drinks 8 cups of coffee." },
        { id: 2, time: "9am", title: "Still getting ready", description: "Kevin is trying to find his passport, Shawn is trying to find an excuse for going on the 13th vacation trip this year, Nick is trying to find enough fresh underwear for at least every other day of the trip." },
        { id: 3, time: "5pm", title: "Flying to Amsterdam", description: "Kevin and Shawn sit in row 21, Nick sits in row 89." },
        { id: 4, time: "10pm", title: "Still flying to Amsterdam", description: "Everyone is trying to sleep, no one can because of that crying baby in row 51." },
      ]
    },
    {
      id: 2,
      name: "Day 2 - Thursday",
      date: "December 4",
      items: [
        { id: 1, time: "9am", title: "Arriving in Amsterdam", description: "Plane lands, rain in Amsterdam." },
        { id: 2, time: "11am", title: "Still in the airport", description: "Waiting in line for immigration, because no one in the group has a European passort." },
        { id: 3, time: "12pm", title: "Hotel", description: "Checking in at the 'Prince Charming' hotel."},
        { id: 4, time: "1pm", title: "Red Light District", description: "Everyone pretending they ended up there by accident and just wanted to go sightseeing." },
        { id: 5, time: "2pm", title: "Amsterdam's Oldest Pub", description: "Enjoying a nice round of Heinekens and making friends wit a bunch of drunk people from Scotland." },
        { id: 6, time: "5pm", title: "Still at the pub", description: "Nick and Shawn want to leave, Kevin orders another round and pretends it is by accident." },
        { id: 7, time: "8pm", title: "Red Light District", description: "Everyone pretending they ended up there by accident and were just on the way back to the hotel." },
        { id: 8, time: "10pm", title: "'Sleep'", description: "Let's just pretend everyone is back at the hotel sleeping." },
      ]
    },
    {
      id: 3,
      name: "Day 3",
      date: "Friday, December 5",
      items: [
        { id: 1, time: "7am", title: "Leaving the hotel", description: "Kevin finds out there is no disgusting breakfast options, Nick runs 5 miles, Shawn finds that Dutch coffee is not that great and only has 4 cups." },
        { id: 2, time: "10:38am", title: "Train to Oberhausen", description: "Since it is a German train, chances are it will be an hour late." },
        { id: 3, time: "12:31pm", title: "Arriving in Oberhausen", description: "Find Andre (aka \"The Driver\") outside the station." },
        { id: 4, time: "1:30pm", title: "Arrival at Claudia's house", description: "Prolonged driving time due to excessive number of bathroom stops." },
        { id: 5, time: "4:20pm", title: "Getting ready for the game", description: "Everyone goes to the bathroom one more time before leaving." },
        { id: 6, time: "4:40pm", title: "Still getting ready for the game", description: "Waiting for Nick to finish his bathroom visit..." },
        { id: 7, time: "4:41pm", title: "Leaving for the stadium", description: "Taking a train from Dortmund to Essen, Stadion an der Hafenstrasse." },
        { id: 8, time: "7pm", title: "Game: Rot-Weiss Essen vs VfB Stuttgart II", description: "Don't forget to find out where the bathrooms in the stadium are." },
        { id: 9, time: "9pm", title: "Returning to Claudia's house in Dortmund", description: "Make sure you go to the bathroom one more time before leaving." },
        { id: 10, time: "10pm", title: "Arriving at Claudia's house in Dortmund", description: "Everyone is back at the house and ready to sleep." },
        { id: 11, time: "12am", title: "Sleeping", description: "Everyone is sleeping. Big day tomorrow." },
      ]
    },
    {
      id: 4,
      name: "Day 4",
      date: "Saturday, December 6",
      items: [
        { id: 1, time: "8am", title: "Breakfast", description: "Kevin does not a disgusting breakfast, Nick runs five miles, Shawn has 6 cups of coffee. Andre enjoys a nice German breakfast." },
        { id: 2, time: "8:30am", title: "Drive to Georgsmarienhütte/Osnabrück", description: "Make sure everyone goes to the bathroom one more time before leaving." },
        { id: 3, time: "10am", title: "Arrival at hotel 'Rittergut Osthoff'", description: "See if check-in at the hotel is available. At least drop off bags." },
        { id: 4, time: "12pm", title: "Bus to Osnabrück", description: "Meet at bus stop 'Oesede Weghaus'." },
        { id: 5, time: "12:25pm", title: "Arriving at Osnabrück Hauptbahnhof", description: "Note: no decent bathrooms at the station. Walk to stadium 'Bremer Brücke'. " }
      ]
    },
    {
      id: 5,
      name: "Day 5",
      date: "Sunday, December 7",
      items: [
        { id: 1, time: "10:00", title: "Breakfast at Hotel", description: "Continental breakfast included" },
        { id: 2, time: "11:00", title: "Sunday Activity", description: "Relaxing day activity" },
        { id: 3, time: "13:00", title: "Lunch", description: "Group lunch" },
        { id: 4, time: "15:00", title: "Free Time", description: "Last-minute shopping or sightseeing" },
        { id: 5, time: "18:00", title: "Evening at Leisure", description: "Personal time" },
        { id: 6, time: "20:00", title: "Farewell Dinner", description: "Final dinner together" }
      ]
    },
    {
      id: 6,
      name: "Day 6",
      date: "Monday, December 8",
      items: [
        { id: 1, time: "07:00", title: "Hotel Check-out", description: "Settle bills and collect luggage" },
        { id: 2, time: "08:00", title: "Transfer to Airport", description: "Bus departure from hotel" },
        { id: 3, time: "10:30", title: "Flight Departure", description: "Check terminal and gate details" },
        { id: 4, time: "14:00", title: "Arrival Home", description: "End of trip" }
      ]
    }
  ]
};

function App() {
  const [selectedDay, setSelectedDay] = useState(tripData.days[0]);

  return (
    <div className="app">
      <Header title={tripData.title} />
      <div className="main-container">
        <Navigation 
          days={tripData.days} 
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
        <AgendaList 
          day={selectedDay}
        />
      </div>
    </div>
  )
}

export default App
