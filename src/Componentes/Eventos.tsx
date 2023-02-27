import React, { useEffect, useState } from 'react';
import './Eventos.css';
import Card from 'react-bootstrap/Card';
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs';
import { fetchEventoEntreFechas, fetchEventos } from '../api';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import moment from 'moment';

function Eventos() {
const [eventos, setEventos] = useState<any>();

useEffect(() => {
  fetchEventos().then((data: any) => setEventos(data));
}, []);

const [selectedDateDesde, setSelectedDateDesde] = useState<Date | null>(
  new Date('2020-09-11T12:00:00')
)

const [selectedDateHasta, setSelectedDateHasta] = useState<Date | null>(
  new Date('2020-09-11T12:00:00')
)

const handleDateChangeDesde = (dateDesde: React.SetStateAction<Date | null>) => {
  setSelectedDateDesde(dateDesde)
  
  let formattedDateDesde = moment(dateDesde?.toString()).format('YYYY-MM-DD');
  let formattedDateHasta = moment(selectedDateHasta?.toString()).format('YYYY-MM-DD');

  fetchEventoEntreFechas(formattedDateDesde, formattedDateHasta).then((data: any) => setEventos(data));
}

const handleDateChangeHasta = (dateHasta: React.SetStateAction<Date | null>) => {
  setSelectedDateHasta(dateHasta)

  let formattedDateDesde = moment(selectedDateDesde?.toString()).format('YYYY-MM-DD');
  let formattedDateHasta = moment(dateHasta?.toString()).format('YYYY-MM-DD');

  fetchEventoEntreFechas(formattedDateDesde, formattedDateHasta).then((data: any) => setEventos(data));
}

const token = localStorage.getItem('token');

if(!token){
  window.location.replace("/login");
  return null;
}

  return (
    <>
    <div className="wrapper">
      <div className="filtro-fecha">
      <div className="datePicker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
              className="datePicker"
              label="Fecha desde"
              inputFormat="DD/MM/YYYY"
              value={selectedDateDesde}
              onChange={handleDateChangeDesde}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </div>
        <div className="datePicker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
              label="Fecha hasta"
              inputFormat="DD/MM/YYYY"
              value={selectedDateHasta}
              onChange={handleDateChangeHasta}
              renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        </div>
        
            
      </div>
    
      <div className='App container'>
            {eventos?.map((evento: any) => (
              <>
                <Card key={evento.attributes.nombre} style={{ width: '18rem', margin: '15px' }}>
                  <Card.Body>
                    <Card.Title>{evento?.attributes?.nombre}</Card.Title>
                    <Card.Text>
                      {evento?.attributes?.fecha}
                    </Card.Text>
                  </Card.Body>
                </Card><br />
              </>
            ))}
        </div>
    </div>
      </>
  );
}

export default Eventos;