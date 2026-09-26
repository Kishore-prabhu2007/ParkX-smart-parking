export type SlotStatus='available'|'reserved'|'occupied'|'maintenance'; export type ReservationStatus='active'|'completed'|'cancelled'|'expired';
export type Slot={id:string;slot_number:string;floor:number;section:string|null;status:SlotStatus;vehicle_number:string|null;created_at:string};
export type Reservation={id:string;user_id:string;slot_id:string;vehicle_number:string;start_time:string;end_time:string;status:ReservationStatus;created_at:string;parking_slots?:Pick<Slot,'slot_number'|'floor'|'section'>};
export type Profile={id:string;name:string;email:string;role:'user'|'admin';vehicle_number:string|null};
