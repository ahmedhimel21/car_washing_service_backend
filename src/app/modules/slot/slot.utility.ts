import { Types } from 'mongoose'

const createSlots = (
  startTime: string,
  endTime: string,
  date: string,
  service: Types.ObjectId,
) => {
  const serviceDuration = 60
  // convert to minutes -> ["9", "30"][0,1]*60
  const startMinutes =
    parseInt(startTime.split(':')[0]) * serviceDuration +
    parseInt(startTime.split(':')[1])
  const endMinutes =
    parseInt(endTime.split(':')[0]) * serviceDuration +
    parseInt(endTime.split(':')[1])
  // calculate total duration
  const totalDuration = endMinutes - startMinutes
  //   calculate number of slots
  const numberOfSlots = totalDuration / serviceDuration
  const slots = []
  for (let i = 0; i < numberOfSlots; i++) {
    //convert slot start time and end time by iteration value
    const slotStartTime = startMinutes + i * serviceDuration
    const slotEndTime = slotStartTime + serviceDuration

    const startHours = Math.floor(slotStartTime / 60)
      .toString()
      .padStart(2, '0')
    const startMins = (slotStartTime % 60).toString().padStart(2, '0')
    const endHours = Math.floor(slotEndTime / 60)
      .toString()
      .padStart(2, '0')
    const endMins = (slotEndTime % 60).toString().padStart(2, '0')
    //push object to the slots
    slots.push({
      service,
      date,
      startTime: `${startHours}:${startMins}`,
      endTime: `${endHours}:${endMins}`,
      isBooked: 'available',
    })
  }
  return slots
}

export default createSlots
