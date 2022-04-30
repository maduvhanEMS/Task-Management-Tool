import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../components/event-utils';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function Calendar() {
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  const getEvents = () => {
    let events = [];
    if (tasks) {
      for (let i = 0; i < tasks.length; i++) {
        let obj = {};

        obj['id'] = tasks[i]._id;
        obj['title'] = tasks[i].task_name;
        obj['start'] = tasks[i].createdAt;
        obj['end'] = tasks[i].endDate;
        obj['allDay'] = false;
        obj['backgroundColor'] =
          `#` + Math.floor(Math.random() * 16777215).toString(16);
        events.push(obj);
      }
    }

    return events;
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className='calendar'>
      <FullCalendar
        height={650}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today listWeek',
          center: 'title',
          right: 'dayGridDay,dayGridWeek,dayGridMonth',
        }}
        initialView='dayGridWeek'
        initialEvents={getEvents()}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <b>{eventInfo.timeText}</b> */}
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Calendar;
