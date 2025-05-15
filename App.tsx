import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {supabase} from  "./lib/supabase"
import { useEffect, useState } from 'react';

//components
import EventCard from './components/EventCard';
export default function App() {
  const [fetchError, setFetchError] = useState<string|null>(null)
  const [events, setEvents] = useState<any>(null)

  useEffect(()=> {
    const fetchEvents = async () => {
      const {data, error} = await supabase
        .from('Events')
        .select()

        if (error) {
          setFetchError('could not fetch events')
          setEvents(null)
          console.log(error)
        }
        if(data){
          setEvents(data)
          setFetchError(null)
        }
    }
    fetchEvents()
  },[])
   
  return (
    <ScrollView>

    <View style={styles.container}>
      <div>
        {fetchError && (<p>{fetchError}</p>)}
        {events && (
          <div className='events'>
            {/*sign up buttons*/}
            <div style={styles.eventsGrid}>
            {events.map(eventlisting => (<EventCard key={eventlisting.event_id} eventlisting={eventlisting}/>))}
            </div>
            
          </div>
        )}
      </div>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventsGrid: {
    flex: 4,
    marginHorizontal: "auto",
    width: 400,

  }
});
