const checkSession = (duration: string, appDate: string, appTime: string) => {
  const currentDate: Date = new Date();
  const appointmentDate: Date = new Date(appDate);
  appointmentDate.setHours(
    parseInt(appTime.split(":")[0]) + parseInt(duration.split(" ")[0]),
    parseInt(appTime.split(":")[1])
  );
  if (currentDate > appointmentDate) {
    return true;
  } else {
    return false;
  }
};

export const isSessionInFuture = (
  duration: string,
  appDate: string,
  appTime: string
) => {
  const currentDate: Date = new Date();
  const appointmentDate: Date = new Date(appDate);
  appointmentDate.setHours(
    parseInt(appTime.split(":")[0]),
    parseInt(appTime.split(":")[1])
  );
  console.log("duration", duration);
  console.log("appDate", appDate);
  console.log("appTime", appTime);
  console.log(appointmentDate);

  if (currentDate < appointmentDate) {
    return true;
  } else {
    return false;
  }
};

export default checkSession;
