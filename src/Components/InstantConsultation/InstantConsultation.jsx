import React from 'react';

import BookingConsultation from '../BookingConsultation/BookingConsultation';
import AppointmentFormIC from './AppointmentFormIC';

// Same doctor search and cards as booking, but with the name + phone only form
const InstantConsultation = () => <BookingConsultation Form={AppointmentFormIC} />;

export default InstantConsultation;
