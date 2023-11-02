import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
useEffect(() => {
  (async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      console.log('Calendario seleccionado:');
      console.log(calendars[4]);

      if (calendars.length > 0) {
        const calendarId = calendars[4].id; // Elije el calendario que quieras

        const startDate = new Date(); // Fecha inicial
        const endDate = new Date(); // Fecha final
        endDate.setDate(endDate.getDate() + 7); // Trae los eventos de los primeros 7 dias

        console.log('Calendar ID:', calendarId);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        const events = await Calendar.getEventsAsync([calendarId], startDate, endDate);
        console.log('Eventos de los proximos 7 dias del calendairo elegido:');
        console.log(events);
      }
    }
  })();
}, []);
async function createEvent() {
  const eventDetails = {
    title: 'EVENTO CREADO POR CALENDARIO QUEE',
    startDate: new Date(), // Add a valid start date
    endDate: new Date(), // Add a valid end date
  };

  const eventID = await Calendar.createEventAsync(5, eventDetails);

  console.log(`Your new event ID is: ${eventID}`);
}

return (
  <View style={styles.container}>
    <Text>Calendar Module Example</Text>
    <Button title="Create a new event" onPress={createEvent} />
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});