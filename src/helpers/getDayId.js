export const getDayId = (appointmentId) => {
  switch (appointmentId) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return 0;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      return 1;
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
      return 2;
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      return 3;
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
      return 4;
    default:
      return undefined;
  }
};
