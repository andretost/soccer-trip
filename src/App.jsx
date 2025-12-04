import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import AgendaList from './components/AgendaList'

// Sample trip data
const tripData = {
  title: "Soccer Trip to Germany - November 2025",
  sharedNote: "Note that all travel is in the lowest possible class! No first class travel ever, so if you end up in a train or tram or bus and it says First Class, you are in the wrong place!",
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
        { id: 2, time: "11am", title: "Still in the airport", description: "Waiting in line for immigration, because no one in the group has a European passport." },
        { id: 3, time: "12pm", title: "Hotel", description: "Checking in at the 'Prince Charming' hotel."},
        { id: 4, time: "1pm", title: "Red Light District", description: "Everyone pretending they ended up there by accident and just wanted to go sightseeing." },
        { id: 5, time: "2pm", title: "Amsterdam's Oldest Pub", description: "Enjoying a nice round of Heinekens and making friends with a bunch of drunk people from Scotland." },
        { id: 6, time: "5pm", title: "Still at the pub", description: "Nick and Shawn want to leave, Kevin orders another round and pretends it is by accident." },
        { id: 7, time: "8pm", title: "Red Light District", description: "Everyone pretending they ended up there by accident and were just on the way back to the hotel." },
        { id: 8, time: "10pm", title: "'Sleep'", description: "Let's just pretend everyone is back at the hotel sleeping. Big day tomomorow." },
      ]
    },
    {
      id: 3,
      name: "Day 3 - Friday",
      date: "December 5",
      items: [
        { id: 1, time: "7am", title: "Leaving the hotel", description: "Kevin finds out there is no disgusting breakfast options, Nick runs 5 miles, Shawn finds that Dutch coffee is not that great and only has 4 cups." },
        { id: 2, time: "10:38am", title: "Train to Oberhausen", description: "ICE 123, leaving from platform 4 at Amsterdam Centraal. Since it is a German train, chances are it will be an hour late." },
        { id: 3, time: "12:31pm", title: "Arriving in Oberhausen", description: "Find Andre (aka \"The Driver\") outside the station." },
        { id: 4, time: "1:30pm", title: "Arrival at Claudia's house", description: "Prolonged driving time due to excessive number of bathroom stops." },
        { id: 5, time: "4:20pm", title: "Getting ready for the game", description: "Everyone goes to the bathroom one more time before leaving." },
        { id: 6, time: "4:40pm", title: "Still getting ready for the game", description: "Waiting for Nick to finish his bathroom visit..." },
        { id: 7, time: "4:41pm", title: "Leaving for the stadium", description: "Taking a train from Dortmund to Essen, Stadion an der Hafenstrasse. Details tbd." },
        { id: 8, time: "7pm", title: "Game: Rot-Weiss Essen vs VfB Stuttgart II", description: "Don't forget to find out where the bathrooms in the stadium are." },
        { id: 9, time: "9pm", title: "Returning to Claudia's house in Dortmund", description: "Use shuttle to Essen main train station. Make sure you go to the bathroom one more time before leaving." },
        { id: 10, time: "10:04pm", title: "Train to Dortmund", description: "ICE 528, leaving from platform 4 at Essen main train station." },
        { id: 11, time: "10:27pm", title: "From Dortmund Central station to Claudia's house in Dortmund", description: "Taxi to Claudia's house." },
        { id: 12, time: "12am", title: "Sleeping", description: "Everyone is sleeping. Big day tomorrow." },
      ]
    },
    {
      id: 4,
      name: "Day 4 - Saturday",
      date: "December 6",
      items: [
        { id: 1, time: "8am", title: "Breakfast", description: "Kevin does not get a disgusting breakfast, Nick runs five miles, Shawn has 6 cups of coffee. Andre enjoys a nice German breakfast." },
        { id: 2, time: "8:30am", title: "Drive to Georgsmarienhütte/Osnabrück", description: "Make sure everyone goes to the bathroom one more time before leaving. Still need to make a number of stops along the way." },
        { id: 3, time: "10am", title: "Arrival at hotel 'Rittergut Osthoff'", description: "See if check-in at the hotel is available. At least drop off bags." },
        { id: 4, time: "12:12pm", title: "Bus to Osnabrück", description: "Meet at bus stop 'Oesede Weghaus'." },
        { id: 5, time: "12:27pm", title: "Arriving at Osnabrück Hauptbahnhof", description: "Note: no decent bathrooms at the station. Walk to stadium 'Bremer Brücke'. " },
        { id: 6, time: "2pm", title: "Game: VfL Osnabrück vs SV Wehen Wiesbaden", description: "Note: standing only, in the 'monkey rock' section." },
        { id: 7, time: "4pm", title: "Christmas Market", description: "Walking from stadium into the old town of Osnabrück. No idea about he bathroom situation there." },
        { id: 8, time: "7pm", title: "Return to hotel in Georgsmarienhütte", description: "Details tbd." },
        { id: 9, time: "7:30pm", title: "Optional: visit at 'Gildehaus'", description: "Aka the closest thing to a Glynners you can find in northern Germany." },
        { id: 10, time: "10pm", title: "Sleeping", description: "Everyone is sleeping. Big day tomorrow." },
      ]
    },
    {
      id: 5,
      name: "Day 5 - Sunday",
      date: "December 7",
      items: [
        { id: 1, time: "8am", title: "Breakfast", description: "Still no hope for Kevin, Nick skips his morning run, Shawn has even more coffee than usual. No one has a clue where Andre is." },
        { id: 2, time: "10:45am", title: "Leave for the train station", description: "Going to Osnabrück Hauptbahnhof. Silkes mom to pick up from the hotel and drive to train station." },
        { id: 3, time: "11:37am", title: "Train to Dortmund", description: "ICE 519, leaving from platform 2 at Osnabrück Hauptbahnhof." },
        { id: 4, time: "12:32pm", title: "Arrive in Dortmund", description: "Find a way to get to Claudia's house. By now you should know the way." },
        { id: 5, time: "4pm", title: "Leave for the stadium", description: "Walking across the cemetery to the stadium. Definitely make sure everyone goes to the bathroom one more time before leaving. Bring a beer for the long walk." },
        { id: 6, time: "5:30pm", title: "Game: Borussia Dortmund vs TSG Hoffenheim", description: "We got assigned seats for this one. Bring a yellow/black scarf." },
        { id: 7, time: "7:30pm", title: "Return to Claudia's house in Dortmund", description: "Possible detour to the 'B-Trieb' for further post game analysis." },
        { id: 8, time: "11pm", title: "Sleeping", description: "Everyone is sleeping. Big day tomorrow." },
      ]
    },
    {
      id: 6,
      name: "Day 6 - Monday",
      date: "December 8",
      items: [
        { id: 1, time: "6:45am", title: "Claudia and Dirk leaving for work", description: "Yeah, some people still have to go to work..." },
        { id: 2, time: "8am", title: "Silke and Andre leaving for Amsterdam", description: "Catching a plane to Austin leaving at 1:05pm" },
        { id: 3, time: "9am", title: "Do Whatever You Want", description: "Kevin, Nick and Shawn are doing something. Eating breakfast, running 5 miles, I don't give a flying fart." },
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
          sharedNote={tripData.sharedNote}
        />
      </div>
    </div>
  )
}

export default App
